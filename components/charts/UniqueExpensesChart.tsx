import { AreaChart } from "@mantine/charts";

import "@mantine/charts/styles.css";
import { Box, Stack, Text, useMantineColorScheme } from "@mantine/core";
import { useMemo } from "react";
import { ResponsiveContainer } from "recharts";

import { UniqueExpense } from "@/types/uniqueExpense";
import { formatNumber, getAllDaysInRange } from "@/utilities/generalUtilities";

interface ExpenseProp {
  expenses: UniqueExpense[];
  selectedRange: [Date, Date | null];
}

const createChartData = (expenses: UniqueExpense[]) => {
  if (!expenses[0]) return [];

  const rangeMap = getAllDaysInRange(
    expenses[0].date,
    expenses[expenses.length - 1].date
  );

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

  const chartData: object[] = [];
  rangeMap.forEach((value, key) => {
    chartData.push({ date: key, expenses: value });
  });

  return chartData;
};

const UniqueExpenseChart = ({ expenses, selectedRange }: ExpenseProp) => {
  //   const suprlus = useAtomValue(surplusAtom);

  const { colorScheme } = useMantineColorScheme();

  const chartData = useMemo(() => {
    return createChartData(expenses);
  }, [expenses]);

  const isSingleMonth = selectedRange[1] === null;
  // console.log("SELECTED RANGE", selectedRange);
  // console.log("isSIngleMonth", isSingleMonth);
  // console.log('chart data', chartData);

  return (
    <Box w="100%" h="500px">
      <ResponsiveContainer width={"100%"} height={"100%"} minHeight={"384px"}>
        {chartData.length > 0 ? (
          <AreaChart
            h={"384px"}
            bg={colorScheme === "light" ? "white" : "dark.0"}
            p="md"
            style={{ borderRadius: "12px" }}
            data={chartData ?? []}
            dataKey="date"
            areaProps={{ isAnimationActive: true, animationDuration: 6000 }}
            // referenceLines={
            //   isSingleMonth
            //     ? [{ y: suprlus, label: "Surplus", color: "red.6" }]
            //     : []
            // }
            series={[{ name: "expenses", color: "gold" }]}
            valueFormatter={(value) => `$${formatNumber(value)}`}
            curveType="linear"
            c="gold"
          />
        ) : (
          <Stack
            className="min-h-96 w-full h-full"
            justify="center"
            align="center"
          >
            <Text fw="bold">No Data Available</Text>
          </Stack>
        )}
      </ResponsiveContainer>
    </Box>
  );
};

export default UniqueExpenseChart;
