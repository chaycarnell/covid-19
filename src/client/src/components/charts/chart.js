import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Moment from 'moment';
import styled from 'styled-components';
import CustomTooltip from './tooltip';

const AxisText = styled('text')`
  font-size: 10px;
  font-weight: bold;
  fill: #8c9296;
`;

const ChartWrapper = styled('div')`
  user-select: none;
  width: 100vw;
  height: 70vh;
`;

const CustomXaxis = props => {
  const { x, y, payload } = props;
  return (
    <g>
      <AxisText x={x} y={y} textAnchor="middle" dy={20}>
        {Moment(payload.value).format('DD/MM/YY')}
      </AxisText>
    </g>
  );
};

const CustomYaxis = props => {
  const { x, y, payload } = props;
  return (
    <g>
      <AxisText x={x + 12} y={y} textAnchor="middle" dy={-5}>
        {payload.value}
      </AxisText>
    </g>
  );
};

const chartColours = [
  '#d45087',
  '#ffa600',
  '#003f5c',
  '#f95d6a',
  '#665191',
  '#ff7c43',
  '#2f4b7c',
  '#a05195'
];
const Render = ({ countries = [], dataKey = 'total_cases' }) => {
  return (
    <ChartWrapper>
      <ResponsiveContainer>
        <LineChart
          width={500}
          height={300}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray="1 0" />
          <XAxis
            padding={{ left: 60, right: 20 }}
            domain={['dataMin', 'dataMax']}
            axisLine={false}
            tickLine={false}
            allowDecimals={false}
            dataKey="date"
            type="number"
            tickCount={3}
            tick={<CustomXaxis />}
            allowDuplicatedCategory={false}
          />
          <YAxis
            mirror
            domain={[0, 'auto']}
            type="number"
            allowDecimals={false}
            dataKey={dataKey}
            axisLine={false}
            tickLine={false}
            tick={<CustomYaxis />}
          />
          <Tooltip
            cursor={false}
            content={<CustomTooltip showLabel showName />}
          />
          {countries.map((country, i) => (
            <Line
              dataKey={dataKey}
              data={country.values}
              name={country.title}
              key={country.title}
              strokeWidth={2}
              activeDot={true}
              dot={false}
              isAnimationActive={true}
              stroke={chartColours[i]}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
};

export default Render;
