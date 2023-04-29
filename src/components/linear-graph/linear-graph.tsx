import { FC } from 'react';
import {
  Area,
  Brush,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

type ArrayData = {
  day: number;
  during: number;
  ended: number;
  title: string;
};

export const LinearGraph: FC<{ monthProgress: ArrayData[] }> = ({ monthProgress }) => {
  return (
    <>
      <h2 style={{ textAlign: 'center' }}>Progress in this month</h2>
      <ResponsiveContainer width='100%' height='100%'>
        <ComposedChart
          width={0}
          height={0}
          data={monthProgress}
          margin={{
            top: 5,
            right: 20,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid vertical={false} strokeDasharray='10 10' fill='transparent' />
          <XAxis dataKey='day' />
          <YAxis dataKey='during' domain={[0, 'dataMax + 2']} tickCount={6} />
          <Tooltip />
          <Legend />
          <Brush dataKey='day' height={30} stroke='#8884d8' />
          <Area type='monotone' dataKey='during' fill='#8884d8' stroke='#8884d8' />
          <Line type='basis' dataKey='ended' stroke='#ff7300' />
          {/* <Bar dataKey='during' fill='#F1F6F9' />
            <Bar dataKey='ended' fill='#9BA4B5' /> */}
        </ComposedChart>
      </ResponsiveContainer>
    </>
  );
};
