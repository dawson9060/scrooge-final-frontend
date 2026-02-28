"use client";

import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import { useFetchUniqueExpenses } from "@/data/fetch/client/fetchUniqueExpensesClient";
import { useUpdateBudget } from "@/data/mutate/mutateUser";
import { useAuth } from "@/hooks/auth";
import { RecurringExpense } from "@/types/recurringExpense";
import { UniqueExpense } from "@/types/uniqueExpense";
import {
  getFirstDayInMonth,
  getLastDayInMonth,
} from "@/utilities/generalUtilities";
import {
  Button,
  Group,
  Modal,
  NumberInput,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import { TbMoneybag, TbReceipt, TbRepeat } from "react-icons/tb";

import classes from "./SummaryOverview.module.css";

import CountUp from "react-countup";

// const Tile = ({
//   color,
//   text,
//   icon,
// }: {
//   color: string;
//   text: string;
//   icon: React.ReactNode;
// }) => {
//   return (
//     <Center
//       bg={color}
//       bdrs="md"
//       h="5rem"
//       style={{
//         boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
//       }}
//     >
//       <Group gap="0.25rem">
//         {icon}
//         {text}
//       </Group>
//     </Center>
//   );
// };

const MonthlyExpensesTile = () => {
  const { recurringExpenses } = useFetchRecurringExpenses();

  const totalMonthlyExpenses = useMemo(() => {
    return recurringExpenses?.reduce(
      (total: number, expense: RecurringExpense) => {
        return total + expense.amount;
      },
      0
    );
  }, [recurringExpenses]);

  return (
    <Stack className={classes.tile}>
      <Group gap="5px">
        <TbRepeat size="1rem" />
        <Text fz="1rem">Monthly Expenses</Text>
      </Group>
      <CountUp
        start={0}
        end={totalMonthlyExpenses}
        duration={1.5}
        prefix="$"
        style={{ fontSize: "1.75rem", color: "red" }}
      />
    </Stack>
  );
};

const UniqueExpensesTile = () => {
  const { uniqueExpenses } = useFetchUniqueExpenses();

  const totalUniqueExpenses = useMemo(() => {
    let total = 0;

    const firstDayInMonth = getFirstDayInMonth(new Date());
    const lastDayInMonth = getLastDayInMonth(new Date());
    const firstDayMilli = firstDayInMonth.getTime();
    const lastDayMilli = lastDayInMonth.getTime();

    uniqueExpenses?.forEach((expense: UniqueExpense) => {
      if (expense.date >= firstDayMilli && expense.date <= lastDayMilli) {
        total += expense.amount;
      }
    });

    return total;
  }, [uniqueExpenses]);

  return (
    <Stack className={classes.tile}>
      <Group gap="5px">
        <TbReceipt size="1rem" />
        <Text fz="1rem">
          {new Date().toLocaleString("en-US", { month: "short" })} Expenses
        </Text>
      </Group>
      <CountUp
        start={0}
        end={totalUniqueExpenses}
        duration={2}
        prefix="$"
        style={{ fontSize: "1.75rem", color: "red" }}
      />
    </Stack>
  );
};

const BudgetTile = () => {
  const [budget, setBudget] = useState<string | number>(500);

  const { user } = useAuth();

  const [opened, { open, close }] = useDisclosure(false);

  const updateBudget = useUpdateBudget();

  useEffect(() => {
    setBudget(user?.budget || 0);
  }, [user]);

  const handleUpdateBudget = async () => {
    try {
      await updateBudget.mutateAsync(budget);

      close();
    } catch (err) {
      console.error("Error updating budget:", err);
    }
  };

  return (
    <>
      <Stack
        className={classes.tile}
        onClick={open}
        style={{ cursor: "pointer" }}
      >
        <Group gap="5px">
          <TbMoneybag size="1rem" />
          <Text fz="1rem">Budget</Text>
        </Group>
        <CountUp
          start={0}
          end={user?.budget || 0}
          duration={1}
          prefix="$"
          style={{ fontSize: "1.75rem", color: "green" }}
        />
      </Stack>
      <Modal opened={opened} onClose={close} title="Update Budget">
        <NumberInput
          value={budget}
          onChange={(val) => setBudget(val ?? 0)}
          label="Monthly Budget"
          prefix="$"
          min={0}
          hideControls
        />
        <Group mt="2rem" justify="flex-end">
          <Button onClick={close}>Cancel</Button>
          <Button disabled={!budget} onClick={() => handleUpdateBudget()}>
            Save
          </Button>
        </Group>
      </Modal>
    </>
  );
};

const SummaryOverview = () => {
  return (
    <SimpleGrid cols={{ base: 1, sm: 3 }}>
      <BudgetTile />
      <MonthlyExpensesTile />
      <UniqueExpensesTile />
    </SimpleGrid>
  );
};

export default SummaryOverview;
