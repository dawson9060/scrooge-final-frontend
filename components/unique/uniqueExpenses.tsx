import { useFetchUniqueExpenses } from "@/data/fetch/client/fetchUniqueExpensesClient";
import { useDeleteUniqueExpense } from "@/data/mutate/mutateUnique";
import { UniqueExpense } from "@/types/uniqueExpense";
import {
  getFirstDayInMonth,
  getLastDayInMonth,
} from "@/utilities/generalUtilities";
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Group,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useMemo, useState } from "react";
import { jsonToCSV } from "react-papaparse";
import UniqueExpenseChart from "../charts/UniqueExpensesChart";
import { DatePickerPopover } from "./DatePickerPopover";
import UniqueExpenseForm from "./UniqueInputs";

import { selectedUniqueExpenseAtom } from "@/atoms/dashboardAtoms";
import { useSetAtom } from "jotai";
import { TbDownload, TbTrash } from "react-icons/tb";
import classes from "./UniqueExpenses.module.css";

const Expense = ({ expense }: { expense: UniqueExpense }) => {
  const setSelectedUniqueExpense = useSetAtom(selectedUniqueExpenseAtom);

  const deleteExpense = useDeleteUniqueExpense();

  const handleDeleteExpense = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    deleteExpense.mutate(expense.id!);
  };

  return (
    <Group
      className={classes.expenseItem}
      align="center"
      onClick={() => setSelectedUniqueExpense(expense)}
    >
      <Group wrap="nowrap" className={classes.expenseName}>
        <Box
          w="1rem"
          h="1rem"
          bg={expense.type === "expense" ? "red" : "green"}
          style={{ borderRadius: "50%" }}
        />
        <Text>{expense.name}</Text>
      </Group>
      <Box className={classes.expenseAmount}>
        <Text>${expense.amount.toFixed(2)}</Text>
      </Box>
      <Box className={classes.expenseType}>
        <Text>{expense.type}</Text>
      </Box>
      <Box className={classes.expenseDate}>
        <Text>{new Date(expense.date).toLocaleDateString() ?? "N/A"}</Text>
      </Box>
      <Group justify="flex-end" className={classes.expenseActions}>
        <ActionIcon
          variant="subtle"
          size="lg"
          color="red"
          onClick={(e) => handleDeleteExpense(e)}
        >
          <TbTrash size="1.25rem" />
        </ActionIcon>
      </Group>
    </Group>
  );
};

const ExpensesDisplay = ({ expenses }: { expenses: UniqueExpense[] }) => {
  if (expenses && expenses.length === 0) {
    return (
      <Center w="100%" h="300px">
        <Text>No unique expenses found.</Text>
      </Center>
    );
  }

  return (
    <Stack gap="0" mt="1rem">
      <Group w="100%" wrap="nowrap" p="0.5rem 0.75rem">
        <Box className={classes.expenseName}>
          <Text fw="bold">Name</Text>
        </Box>
        <Box className={classes.expenseAmount}>
          <Text fw="bold">Amount</Text>
        </Box>
        <Box className={classes.expenseType}>
          <Text fw="bold">Type</Text>
        </Box>
        <Box className={classes.expenseDate}>
          <Text fw="bold">Date</Text>
        </Box>
        <Group className={classes.expenseActions} />
      </Group>
      <Stack gap="0.5rem">
        {expenses?.length > 0 ? (
          expenses.map((expense: UniqueExpense) => (
            <Expense key={expense.id} expense={expense} />
          ))
        ) : (
          <Text ta="center">No unique expenses found.</Text>
        )}
      </Stack>
    </Stack>
  );
};

const UniqueExpenses = () => {
  const [selectedRange, setSelectedRange] = useState<[Date, Date | null]>([
    new Date(),
    null,
  ]);

  const { uniqueExpenses: expenses } = useFetchUniqueExpenses();

  const expensesInRange = useMemo(() => {
    const start = getFirstDayInMonth(selectedRange[0]);
    const end = getLastDayInMonth(selectedRange[1] ?? selectedRange[0]);

    const startMilli = start.getTime();
    const endMilli = end.getTime();

    return expenses?.filter((expense: UniqueExpense) => {
      return expense.date >= startMilli && expense.date <= endMilli;
    });
  }, [expenses, selectedRange]);

  const handleDownload = () => {
    const formattedExpenses = expensesInRange?.map((expense: UniqueExpense) => {
      return {
        Amount: expense.amount,
        Type: expense.type,
        Name: expense.name,
        Date: new Date(expense.date).toLocaleDateString(),
      };
    });

    if (formattedExpenses) {
      const csvString = jsonToCSV(formattedExpenses);

      const file = new Blob([csvString], { type: "text/csv" });
      const a = document.createElement("a");

      a.download = "expenses";
      a.href = URL.createObjectURL(file);
      a.addEventListener("click", () => {
        setTimeout(() => URL.revokeObjectURL(a.href), 30 * 1000);
      });

      a.click();
    }
  };

  return (
    <>
      <Stack gap="1rem">
        <Group justify="space-between" align="center" mb="1rem">
          <Title order={3}>Unique Expenses</Title>
          <Group>
            <DatePickerPopover
              selectedRange={selectedRange}
              setSelectedRange={setSelectedRange}
            />
            <Button
              color="gold"
              onClick={handleDownload}
              rightSection={<TbDownload size="1.25rem" />}
            >
              Download
            </Button>
          </Group>
        </Group>
        <UniqueExpenseForm />
        <ExpensesDisplay expenses={expensesInRange} />
        <UniqueExpenseChart expenses={expensesInRange || []} />
      </Stack>
    </>
  );
};

export default UniqueExpenses;
