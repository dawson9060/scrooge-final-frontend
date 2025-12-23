"use client";

import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import { useFetchReminders } from "@/data/fetch/client/fetchRemindersClient";
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
  Box,
  Button,
  Center,
  Group,
  Modal,
  NumberInput,
  SimpleGrid,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useEffect, useMemo, useState } from "react";
import {
  TbExclamationCircle,
  TbFlagUp,
  TbMoneybag,
  TbZoomMoney,
} from "react-icons/tb";

const Tile = ({
  color,
  text,
  icon,
}: {
  color: string;
  text: string;
  icon: React.ReactNode;
}) => {
  return (
    <Center
      bg={color}
      bdrs="md"
      h="5rem"
      style={{
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Group gap="0.25rem">
        {icon}
        {text}
      </Group>
    </Center>
  );
};

const RemindersTile = () => {
  const { reminders } = useFetchReminders();

  return (
    <Tile
      color="gold.1"
      icon={<TbExclamationCircle />}
      text={`Reminders: ${reminders?.length}`}
    />
  );
};

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
    <Tile
      color="green.1"
      icon={<TbFlagUp />}
      text={`Monthly Expenses: $${totalMonthlyExpenses}`}
    />
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
    <Tile
      color="orange.1"
      icon={<TbZoomMoney />}
      text={`Unique Expenses: $${totalUniqueExpenses}`}
    />
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
      <Box onClick={open} style={{ cursor: "pointer" }}>
        <Tile
          color="blue.1"
          icon={<TbMoneybag />}
          text={`Budget: $${user?.budget || 0}`}
        />
      </Box>
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
      {/* <RemindersTile /> */}
      <MonthlyExpensesTile />
      <UniqueExpensesTile />
    </SimpleGrid>
  );
};

export default SummaryOverview;
