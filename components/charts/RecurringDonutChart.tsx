import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import {
  EXPENSE_COLOR_MAP,
  RECURRING_EXPENSE_TYPES,
} from "@/enums/recurringTypes";
import { RecurringExpense } from "@/types/recurringExpense";
import { formatNumber } from "@/utilities/generalUtilities";
import { DonutChart } from "@mantine/charts";
import "@mantine/charts/styles.css";
import { Box, Group, Stack, Text } from "@mantine/core";
import { useViewportSize } from "@mantine/hooks";
import { useMemo } from "react";

const LegendItem = ({ color, name }: { color: string; name: string }) => {
  return (
    <Group key={name} wrap="nowrap" w="fit-content">
      <Box w="1rem" h="1rem" bdrs="md" bg={color} />
      <Text>{name}</Text>
    </Group>
  );
};

export const RecurringDonutChart = () => {
  const { width } = useViewportSize();

  const { recurringExpenses } = useFetchRecurringExpenses();

  const donutData = useMemo(() => {
    const donutData: {
      [key: string]: { name: string; value: number; color: string };
    } = {};

    recurringExpenses?.forEach((expense: RecurringExpense) => {
      if (!donutData[expense.type]) {
        donutData[expense.type] = {
          name: expense.type,
          value: expense.amount ?? 0,
          color: EXPENSE_COLOR_MAP[expense.type],
        };
      } else {
        donutData[expense.type].value =
          donutData[expense.type].value + (expense.amount ?? 0);
      }
    });

    return donutData;
  }, [recurringExpenses]);

  const visibleLegendItems = useMemo(() => {
    const items: string[] | null = [];
    const types = Object.values(RECURRING_EXPENSE_TYPES);

    types.forEach((type) => {
      if (
        recurringExpenses?.some(
          (expense: RecurringExpense) => expense.type === type
        )
      ) {
        items.push(type);
      }
    });

    return items;
  }, [recurringExpenses]);

  return (
    <Stack w="100%" align="center" justify="center">
      <DonutChart
        h={400}
        size={width > 380 ? 270 : 150}
        thickness={width > 380 ? 30 : 20}
        paddingAngle={5}
        valueFormatter={(value: number) => `$${formatNumber(value)}`}
        data={Object.values(donutData)}
        tooltipDataSource="segment"
        tooltipAnimationDuration={2000}
        pieProps={{
          isAnimationActive: true,
          animationDuration: 2000,
          dataKey: "value",
        }}
      />
      <Group align="flex-start" justify="center" w="100%" maw="400px">
        {visibleLegendItems.map((type) => (
          <LegendItem key={type} color={EXPENSE_COLOR_MAP[type]} name={type} />
        ))}
      </Group>
    </Stack>
  );

  return (
    <Group mih="400px" w="100%" wrap="nowrap">
      {/* <ResponsiveContainer height={"100%"} minHeight={400}> */}
      <DonutChart
        h={384}
        size={width > 380 ? 270 : 150}
        thickness={width > 380 ? 30 : 20}
        paddingAngle={5}
        valueFormatter={(value: number) => `$${formatNumber(value)}`}
        data={Object.values(donutData)}
        tooltipDataSource="segment"
        tooltipAnimationDuration={2000}
        pieProps={{
          isAnimationActive: true,
          animationDuration: 2000,
          dataKey: "value",
        }}
      />
      {/* </ResponsiveContainer> */}
      <Stack h="300px" align="flex-start" justify="center">
        {visibleLegendItems.map((type) => (
          <LegendItem key={type} color={EXPENSE_COLOR_MAP[type]} name={type} />
        ))}
      </Stack>
      {/* <Group justify="center">
        <SegmentedControl
          value={showStatus}
          color="gold"
          size="xs"
          data={[
            { label: "Show Legend", value: "show" },
            { label: "Hide Legend", value: "hide" },
          ]}
          onChange={setShowStatus}
        />
      </Group> */}
    </Group>
  );
};

export default RecurringDonutChart;
