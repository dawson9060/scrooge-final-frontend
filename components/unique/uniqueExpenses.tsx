import { useFetchUniqueExpenses } from "@/data/fetch/client/fetchUniqueExpensesClient";
import { useDeleteUniqueExpense } from "@/data/mutate/mutateUnique";
import { UniqueExpense } from "@/types/uniqueExpense";
import { Button, SimpleGrid, Stack, Text } from "@mantine/core";

const Expense = ({ expense }: { expense: UniqueExpense }) => {
  const deleteExpense = useDeleteUniqueExpense();

  const handleDeleteExpense = async () => {
    deleteExpense.mutate(expense.id!!);
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
  const { uniqueExpenses: expenses } = useFetchUniqueExpenses();

  return (
    <Stack>
      {expenses?.length > 0 ? (
        expenses.map((expense: UniqueExpense) => (
          <Expense key={expense.id} expense={expense} />
        ))
      ) : (
        <Text ta="center">No unique expenses found.</Text>
      )}
    </Stack>
  );
};

export default UniqueExpenses;
