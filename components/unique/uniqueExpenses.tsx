import { useFetchUniqueExpenses } from "@/data/fetch/client/fetchUniqueExpensesClient";
import { useDeleteUniqueExpense } from "@/data/mutate/mutateUnique";
import { UniqueExpense } from "@/types/uniqueExpense";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";
import UniqueExpenseChart from "../charts/UniqueExpensesChart";
import { useMemo, useState } from "react";
import {
  getFirstDayInMonth,
  getLastDayInMonth,
} from "@/utilities/generalUtilities";
import { DatePickerPopover } from "./DatePickerPopover";
import { jsonToCSV } from "react-papaparse";

const Expense = ({ expense }: { expense: UniqueExpense }) => {
  const deleteExpense = useDeleteUniqueExpense();

  const handleDeleteExpense = async () => {
    deleteExpense.mutate(expense.id!);
  };

  return (
    <SimpleGrid cols={5}>
      <Text>{expense.name}</Text>
      <Text>${expense.amount.toFixed(2)}</Text>
      <Text>{expense.type}</Text>
      <Text>Date: {new Date(expense.date).toLocaleDateString() ?? "N/A"}</Text>
      <Button c="red" onClick={handleDeleteExpense}>
        Delete
      </Button>
    </SimpleGrid>
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
      <Stack>
        <DatePickerPopover
          selectedRange={selectedRange}
          setSelectedRange={setSelectedRange}
        />
        <Button color="gold" onClick={handleDownload}>
          Download
        </Button>
        {expensesInRange?.length > 0 ? (
          expensesInRange.map((expense: UniqueExpense) => (
            <Expense key={expense.id} expense={expense} />
          ))
        ) : (
          <Text ta="center">No unique expenses found.</Text>
        )}
      </Stack>
      <UniqueExpenseChart
        expenses={expensesInRange || []}
        selectedRange={selectedRange}
      />
    </>
  );
};

export default UniqueExpenses;
