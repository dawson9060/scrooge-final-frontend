import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import { useDeleteRecurringExpense } from "@/data/mutate/mutateRecurring";
import { RecurringExpense } from "@/types/recurringExpense";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";

const Expense = ({ expense }: { expense: RecurringExpense }) => {
  const deleteExpense = useDeleteRecurringExpense();

  const handleDeleteExpense = async () => {
    deleteExpense.mutate(expense.id!!);
  };

  return (
    <SimpleGrid cols={5}>
      <Text>{expense.name}</Text>
      <Text>${expense.amount.toFixed(2)}</Text>
      <Text>{expense.type}</Text>
      <Text>Day of Month: {expense?.day_of_month ?? "N/A"}</Text>
      <Button color="red" onClick={handleDeleteExpense}>
        Delete
      </Button>
    </SimpleGrid>
  );
};

const RecurringExpenses = () => {
  const { recurringExpenses: expenses } = useFetchRecurringExpenses();
  console.log("EXPENSES", expenses);
  return (
    <Stack>
      {expenses?.length > 0 ? (
        expenses.map((expense: RecurringExpense) => (
          <Expense key={expense.id} expense={expense} />
        ))
      ) : (
        <Text ta="center">No recurring expenses found.</Text>
      )}
    </Stack>
  );
};

export default RecurringExpenses;
