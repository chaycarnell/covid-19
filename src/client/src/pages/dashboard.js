import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem
} from 'reactstrap';
import styled from 'styled-components';
import {
  getGloablUpdate,
  getCountryTimeline,
  onSomeUpdate
} from '../queries/queries.graphql';
import { useQuery, useSubscription, useLazyQuery } from '@apollo/react-hooks';
import Chart from '../components/charts/chart';

const OptionsWrapper = styled('div')`
  padding: 15px;
  display: grid;
  grid-gap: 20px;
  grid-template-columns: auto 1fr;
  height: 60px;
  align-content: center;
`;

const initialCountries = {
  AU: { checked: false, label: 'Australia' },
  CN: { checked: false, label: 'China' },
  DE: { checked: false, label: 'Germany' },
  ES: { checked: false, label: 'Spain' },
  GB: { checked: true, label: 'United Kingdom' },
  IT: { checked: false, label: 'Italy' },
  KR: { checked: false, label: 'South Korea' },
  US: { checked: false, label: 'United States' }
};

const Render = () => {
  // const query = useQuery(getGlobalUpdate);
  // const subscription = useSubscription(onSomeUpdate);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [countries, setCountries] = useState(initialCountries);
  const [dataKey, setDataKey] = useState('total_cases');

  const [getCountryData, { loading }] = useLazyQuery(getCountryTimeline, {
    onCompleted: data =>
      data.countryTimeline &&
      setCountryData([...countryData, data.countryTimeline])
  });

  const onCheck = countryCode => {
    if (!countries[countryCode].checked) {
      getCountryData({
        variables: { countryCode: countryCode }
      });
    } else {
      setCountryData(
        countryData.filter(country => country.code !== countryCode)
      );
    }
    setCountries({
      ...countries,
      [countryCode]: {
        ...countries[countryCode],
        checked: !countries[countryCode].checked
      }
    });
  };

  useEffect(() => {
    getCountryData({
      variables: { countryCode: 'GB' }
    });
  }, []);

  const onDataKeyChange = dataKey => {
    setDataKey(dataKey);
  };

  const toggle = () => setDropdownOpen(prevState => !prevState);

  if (loading && !countryData.length) return <div>Loading...</div>;

  return (
    <>
      <OptionsWrapper>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Select Countries</DropdownToggle>
          <DropdownMenu>
            {Object.keys(countries).map((val, idx) => (
              <DropdownItem key={idx}>
                <Label check>
                  <Input
                    type="checkbox"
                    name={val}
                    checked={countries[val].checked}
                    onChange={e => onCheck(e.target.name)}
                  />{' '}
                  {countries[val].label}
                </Label>
              </DropdownItem>
            ))}
          </DropdownMenu>
        </Dropdown>
        <Input
          type="select"
          name="dataKey"
          id="dataKey"
          value={dataKey}
          placeholder="Select chart key..."
          onChange={e => onDataKeyChange(e.target.value)}
        >
          <option value="total_cases">Total Cases</option>
          <option value="total_deaths">Total Deaths</option>
          <option value="new_daily_cases">Daily Cases</option>
          <option value="new_daily_deaths">Daily Deaths</option>
          {/* <option value="total_recoveries">Total Recoveries</option> */}
        </Input>
      </OptionsWrapper>
      <Chart countries={countryData} dataKey={dataKey}></Chart>
    </>
  );
};

export default Render;
