import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getGloablUpdate, onSomeUpdate } from '../queries/queries.graphql';
import { useQuery, useSubscription } from '@apollo/react-hooks';

const Container = styled('div')`
  height: 100%;
  width: 100%;
  padding-top: 10px;
  display: grid;
  justify-content: center;
  align-content: center;
`;

const PairContainer = styled('div')`
  height: 100%;
  width: 100%;
  display: grid;
  grid-template-columns: max-content max-content;
  grid-gap: 8px;
  align-content: center;
`;

const Content = styled('div')`
  height: fit-content;
  width: fit-content;
  font-size: 24px;
  font-size: 6vw;
  padding: 5px 0px 5px 0px;
  color: #444;
  text-align: center;
`;

const Render = () => {
  const query = useQuery(getGloablUpdate);
  const subscription = useSubscription(onSomeUpdate);
  console.log('query', query.data);
  console.log('subscription', subscription.data);
  return (
    <>
      <Container>
        <Content>Covid-19 Report</Content>
        <PairContainer>
          <Content>Day:</Content>
          <Content></Content>
        </PairContainer>
        <PairContainer>
          <Content>Total:</Content>
          <Content></Content>
        </PairContainer>
      </Container>
    </>
  );
};

export default Render;
