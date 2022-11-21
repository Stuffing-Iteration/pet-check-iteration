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
  { name: 'Jan 2022', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Feb 2022', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Mar 2022', uv: 400, pv: 2400, amt: 2400 },
  { name: 'Apr 2022', uv: 400, pv: 2400, amt: 2400 },
  { name: 'May 2022', uv: 400, pv: 2400, amt: 2400 },
  { name: 'June 2022', uv: 400, pv: 2400, amt: 2400 },
];

const WeightChart = () => {
  return (
    <LineChart
      width={600}
      height={300}
      data={data}
      margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
    >
      <Line type='monotone' dataKey='uv' stroke='#8884d8' />
      <CartesianGrid stroke='#ccc' strokeDasharray='5 5' />
      <XAxis dataKey='name' />
      <YAxis />
      <Tooltip />
    </LineChart>
  );
};
export default WeightChart;
