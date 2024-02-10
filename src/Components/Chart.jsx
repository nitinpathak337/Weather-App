import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

//Since openweathermap historical api is not free, I am using a constant data here
const data = [
  { day: "M", temperature: 20 },
  { day: "T", temperature: 18 },
  { day: "W", temperature: 13 },
  { day: "Th", temperature: 25 },
  { day: "F", temperature: 17 },
  { day: "S", temperature: 15 },
  { day: "Su", temperature: 23 },
];

const Chart = () => {
  return (
    <>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="temperature"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
      <p>
        Note: Chart's data is not real, I am using a constant data just to
        display a chart
      </p>
    </>
  );
};

export default Chart;
