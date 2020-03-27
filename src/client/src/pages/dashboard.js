import React, { useState, useEffect } from 'react';
import { Input } from 'reactstrap';
import styled from 'styled-components';
import {
  getGloablUpdate,
  getCountryTimeline,
  onSomeUpdate
} from '../queries/queries.graphql';
import { useQuery, useSubscription } from '@apollo/react-hooks';
import Chart from '../components/charts/chart';

const Render = () => {
  // const query = useQuery(getGloablUpdate);
  // const subscription = useSubscription(onSomeUpdate);
  const [countryData, setCountryData] = useState([]);
  const [countryCode, setCountryCode] = useState('GB');
  const [dataKey, setDataKey] = useState('total_cases');

  const { data, loading } = useQuery(getCountryTimeline, {
    variables: { countryCode: countryCode }
  });

  useEffect(() => {
    data &&
      data.countryTimeline &&
      setCountryData([...countryData, data.countryTimeline]);
  }, [data]);

  const onCountryChange = countryCode => {
    setCountryCode(countryCode);
  };

  const onDataKeyChange = dataKey => {
    setDataKey(dataKey);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Input
        type="select"
        name="countryCode"
        id="countryCode"
        value={countryCode}
        placeholder="Select country code..."
        onChange={e => onCountryChange(e.target.value)}
      >
        <option value="AU">AU</option>
        <option value="CN">CN</option>
        <option value="GB">GB</option>
        <option value="IT">IT</option>
        <option value="US">US</option>
      </Input>
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
        <option value="total_recoveries">Total Recoveries</option>
      </Input>
      <Chart countries={countryData} dataKey={dataKey}></Chart>
    </>
  );
};

export default Render;
