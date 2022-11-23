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
  { name: 'June 2022', weight: 34, avg: 30, amt: 50 },
  { name: 'July 2022', weight: 32, avg: 30, amt: 50  },
  { name: 'Aug 2022', weight: 29, avg: 30, amt: 50  },
  { name: 'Sept 2022', weight: 27, avg: 30, amt: 50  },
  { name: 'Oct 2022', weight: 31, avg: 30, amt: 50  },
  { name: 'Nov 2022', weight: 30, avg: 30, amt: 50  },
];

const WeightChart = () => {
  return (
    <LineChart
      width={300}
      height={150}
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
