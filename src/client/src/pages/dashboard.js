import React, { useState, useEffect } from 'react';
import {
  Label,
  Input,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Spinner
} from 'reactstrap';
import styled from 'styled-components';
import { getCountryTimeline } from '../queries/queries.graphql';
import { useApolloClient } from '@apollo/react-hooks';
import Chart from '../components/charts/chart';

const LoadingWrapper = styled('div')`
  display: grid;
  justify-content: center;
  align-content: center;
  height: 70vh;
`;

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
  const apolloClient = useApolloClient();
  const [isLoading, setLoading] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [countryData, setCountryData] = useState([]);
  const [countries, setCountries] = useState(initialCountries);
  const [dataKey, setDataKey] = useState('total_cases');

  const getCountryData = variables => {
    setLoading(true);
    apolloClient.query({ query: getCountryTimeline, variables }).then(res => {
      res.data &&
        res.data.countryTimeline &&
        setCountryData([...countryData, res.data.countryTimeline]);
      setLoading(false);
    });
  };

  const onCheck = countryCode => {
    if (!countries[countryCode].checked) {
      getCountryData({ countryCode: countryCode });
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
    getCountryData({ countryCode: 'IT' });
  }, []);

  const onDataKeyChange = dataKey => {
    setDataKey(dataKey);
  };

  const toggle = () => setDropdownOpen(prevState => !prevState);

  if (isLoading)
    return (
      <LoadingWrapper>
        <Spinner style={{ width: '3rem', height: '3rem' }} type="grow" />
      </LoadingWrapper>
    );

  return (
    <>
      <OptionsWrapper>
        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
          <DropdownToggle caret>Select Countries</DropdownToggle>
          <DropdownMenu>
            {Object.keys(countries).map((val, idx) => (
              <DropdownItem key={idx} onClick={() => onCheck(val)}>
                <Label check>
                  <Input
                    type="checkbox"
                    name={val}
                    checked={countries[val].checked}
                    onChange={() => {}}
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
          <option value="total_recoveries">
            Total Recoveries (Unrealiable)
          </option>
        </Input>
      </OptionsWrapper>
      <Chart countries={countryData} dataKey={dataKey}></Chart>
    </>
  );
};

export default Render;
