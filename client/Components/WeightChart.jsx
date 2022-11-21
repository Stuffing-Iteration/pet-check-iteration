import React from 'react';

import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
const data = [
  { name: 'June 2022', weight: 34 },
  { name: 'July 2022', weight: 32 },
  { name: 'Aug 2022', weight: 29 },
  { name: 'Sept 2022', weight: 27 },
  { name: 'Oct 2022', weight: 31 },
  { name: 'Nov 2022', weight: 30 },
];

const WeightChart = () => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type='monotone' dataKey='weight' stroke='#f24c4e' />
      <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
export default WeightChart;
