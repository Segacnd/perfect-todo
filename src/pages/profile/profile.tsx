import { FC, useEffect } from 'react';
import {
  Bar,
  BarChart,
  Brush,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ComposedChart,
  Area,
  Line,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarRadiusAxis,
  PolarAngleAxis,
  Radar,
  RadialBarChart,
  RadialBar,
  Cell,
} from 'recharts';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { todosSelector, userSelector } from '../../redux/selectors';
import { fetchTodos } from '../../redux/slices/fetch-todos-slice';
import styles from './account.module.css';

export const Profile: FC = () => {
  const { id } = useAppSelector(userSelector);
  const { todos } = useAppSelector(todosSelector);
  const dispatch = useAppDispatch();
  const nonCompleted = todos.filter((el) => el.dateEnded === null);
  const completedTodos = todos.filter((el) => el.dateEnded !== null);
  useEffect(() => {
    if (id) {
      dispatch(fetchTodos(id));
    }
  }, [dispatch, id]);

  const today = new Date();
  const getNumberOfDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const daycount = getNumberOfDaysInMonth(today);
  const array = [...Array(daycount).keys()].map((x) => {
    const normalizeDays = x + 2;
    const date = new Date(today.getFullYear(), today.getMonth(), normalizeDays).toISOString().slice(0, 10);
    const counting = todos.filter((el) => el.dateStarted.slice(0, 10) === date);
    const ended = todos.filter((el) => el.dateEnded?.slice(0, 10) === date);
    const formattedDay = new Date(date).getDate();
    return { day: formattedDay, during: counting.length, ended: ended.length, title: 'completed' };
  });

  type ObjecType = {
    [key: string]: number;
  };

  const obj: ObjecType = {};
  todos.forEach((el) => {
    if (Object.keys(obj).includes(el.category.toLowerCase())) {
      obj[el.category.toLowerCase()] += 1;
    } else {
      obj[el.category.toLowerCase()] = 1;
    }
  });

  const readyToShow = Object.entries(obj).map((el, index) => {
    return {
      id: index,
      name: el[0],
      count: el[1],
    };
  });

  const COLORS = ['#8884d8', '#ff7300', '#FFBB28', '#FF8042'];

  const RADIAN = Math.PI / 180;

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
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
    <div className={styles.root}>
      <div>
        <div>Count of completed todos: {completedTodos.length}</div>
        <div>Count of non completed todos: {nonCompleted.length}</div>
        <div>Todos createdd for the last 7 days: </div>
      </div>
      <div className={styles.container}>
        <div className={styles.graphWrapper}>
          <h2 style={{ textAlign: 'center' }}>Progress in this month</h2>
          <ResponsiveContainer width='100%' height='100%'>
            <ComposedChart
              width={0}
              height={0}
              data={array}
              margin={{
                top: 5,
                right: 40,
                left: 0,
                bottom: 5,
              }}
            >
              <CartesianGrid vertical={false} strokeDasharray='10 10' fill='#212A3E' />
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
        </div>
        <div className={styles.pieWrapper}>
          <ResponsiveContainer width='100%' height='100%'>
            <PieChart>
              <Pie
                data={readyToShow}
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill='#212A3E'
                dataKey='count'
              >
                {readyToShow.map((entry, index) => (
                  <Cell key={`cell-${entry}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};
