"use client";

import { useAddUniqueExpense } from "@/data/mutate/mutateUnique";
import { UNIQUE_TYPE_EXPENSE } from "@/types/expense";
import { Button, Group, Stack, Text } from "@mantine/core";

const QuickAdd = () => {
  const addUniqueExpense = useAddUniqueExpense();

  const handleAdd = (amount: number) => () => {
    addUniqueExpense.mutate({
      name: "Quick Add",
      amount,
      type: UNIQUE_TYPE_EXPENSE,
      date: new Date().getTime(),
    });
  };

  return (
    <Stack mt="2rem">
      <Text>Quick Expense</Text>
      <Group>
        <Button variant="outline" onClick={handleAdd(1)}>
          $1
        </Button>
        <Button variant="outline" onClick={handleAdd(2)}>
          $2
        </Button>
        <Button variant="outline" onClick={handleAdd(5)}>
          $5
        </Button>
        <Button variant="outline" onClick={handleAdd(10)}>
          $10
        </Button>
        <Button variant="outline" onClick={handleAdd(20)}>
          $20
        </Button>
      </Group>
    </Stack>
  );
};

export default QuickAdd;
