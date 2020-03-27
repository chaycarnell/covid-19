import React, { useRef, useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { prop, ifProp } from 'styled-tools';
import Moment from 'moment';

const pointright = css`
  border-radius: 18px 0px 18px 18px;
`;

const pointleft = css`
  border-radius: 0px 18px 18px 18px;
`;

const Wrapper = styled('div')`
  width: fit-content;
  background: lavender;
  padding: 15px;
  font-weight: bold;
  box-shadow: 0 7px 15px 0 rgba(218, 218, 218, 0.5);
  ${ifProp('flip', pointright, pointleft)}
`;

const Item = styled('div')`
  display: grid;
  grid-template-columns: max-content 1fr 1fr;
  grid-gap: 10px;
`;

const Key = styled('div')`
  width: 20px;
  height: 20px;
  border-radius: 10px;
  align-self: center;
  justify-self: center;
  background-color: ${prop('color')};
`;

const Value = styled('div')`
  font-size: 18px;
  align-self: center;
`;

const Label = styled('div')`
  color: ${prop('theme.colors.fonts.graphKey')};
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  text-align: center;
`;

const Name = styled('div')`
  display: grid;
  align-self: center;
  justify-self: center;
  color: ${prop('theme.colors.fonts.graphKey')};
  font-family: ${prop('theme.fonts.interstate')};
  font-size: 12px;
  color: #7e7e7e;
`;

const render = ({
  active,
  payload,
  label,
  coordinate,
  viewBox,
  showLabel,
  showName,
  formatNumber
}) => {
  const [flip, setFlip] = useState(false);
  const wrapperWidth = useRef();
  useEffect(() => {
    if (wrapperWidth.current) {
      setFlip(coordinate.x + wrapperWidth.current.offsetWidth < viewBox.width);
    }
  }, [label]);
  if (!active) return null;
  return (
    <Wrapper ref={wrapperWidth} flip={!flip} showName>
      {showLabel && <Label>{Moment(label).format('DD/MM/YY')}</Label>}
      {payload &&
        payload.map((p, idx) => (
          <Item key={idx} showName>
            <Key color={p.fill !== '#fff' ? p.fill : p.color} />
            {showName && <Name>{p.name}</Name>}
            <Value>{formatNumber ? formatCurrency(p.value) : p.value}</Value>
          </Item>
        ))}
    </Wrapper>
  );
};

export default render;
