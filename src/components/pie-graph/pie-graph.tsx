import { FC } from 'react';
import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

type DataArray = {
  id: number;
  name: string;
  count: number;
};

export const PieGrap: FC<{ array: DataArray[] }> = ({ array }) => {
  const COLORS = ['#8884d8', '#ff7300', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: {
    cx: number;
    cy: number;
    midAngle: number;
    innerRadius: number;
    outerRadius: number;
    percent: number;
    index: number;
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill='white' textAnchor={x > cx ? 'start' : 'end'} dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <h2>Сategory usage rating</h2>
      <ResponsiveContainer width='100%' height='100%'>
        <PieChart>
          <Pie
            data={array}
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={120}
            fill='#212A3E'
            dataKey='count'
          >
            {array.map((entry, index) => (
              <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Legend />
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </>
  );
};
