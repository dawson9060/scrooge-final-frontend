import { AreaChart } from "@mantine/charts";

import "@mantine/charts/styles.css";
import { Box, useMantineColorScheme } from "@mantine/core";
import { useMemo } from "react";

import { UniqueExpense } from "@/types/uniqueExpense";
import {
  formatNumber,
  getAllDaysInRange,
  getLastDayInMonth,
} from "@/utilities/generalUtilities";

interface ExpenseProp {
  expenses: UniqueExpense[];
}

const createChartData = (expenses: UniqueExpense[]) => {
  if (!expenses[0]) return [];

  const rangeMap = getAllDaysInRange(
    expenses[0].date,
    expenses[expenses.length - 1].date
  );

  const lastDayInRange = getLastDayInMonth(
    new Date(expenses[expenses.length - 1].date)
  ).toLocaleDateString();

  let runningTotal = 0;
  expenses.forEach((expense) => {
    const formattedDate = new Date(expense.date).toLocaleDateString();

    if (expense.type === "expense") {
      runningTotal += expense.amount;
    } else {
      runningTotal -= expense.amount;
    }

    rangeMap.set(formattedDate, runningTotal);
  });

  if (rangeMap.get(lastDayInRange) === null) {
    rangeMap.set(lastDayInRange, runningTotal);
  }

  const chartData: object[] = [];
  rangeMap.forEach((value, key) => {
    chartData.push({ date: key, expenses: value });
  });

  return chartData;
};

const UniqueExpenseChart = ({ expenses }: ExpenseProp) => {
  const { colorScheme } = useMantineColorScheme();

  const chartData = useMemo(() => {
    return createChartData(expenses);
  }, [expenses]);

  if (!expenses || expenses.length === 0) return null;

  return (
    <Box w="100%" h="400px" bg="orange">
      {chartData.length > 0 && (
        <AreaChart
          h="400px"
          bg={colorScheme === "light" ? "white" : "dark.0"}
          p="md"
          data={chartData ?? []}
          dataKey="date"
          areaProps={{ isAnimationActive: true, animationDuration: 4000 }}
          series={[{ name: "expenses", color: "gold" }]}
          valueFormatter={(value) => `$${formatNumber(value)}`}
          curveType="linear"
          c="gold"
        />
      )}
    </Box>
  );
};

export default UniqueExpenseChart;
