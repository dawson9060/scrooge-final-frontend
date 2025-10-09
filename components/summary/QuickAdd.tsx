"use client";

import { useAddUniqueExpense } from "@/data/mutate/mutateUnique";
import { UNIQUE_TYPE_EXPENSE } from "@/types/expense";
import { Button, Group } from "@mantine/core";

const QuickAdd = () => {
  const addUniqueExpense = useAddUniqueExpense();

  const handleAdd = (amount: number) => () => {
    addUniqueExpense.mutate({
      name: "Quick Add",
      amount,
      type: UNIQUE_TYPE_EXPENSE,
      date: new Date().toLocaleDateString(),
    });
  };

  return (
    <Group>
      <Button onClick={handleAdd(1)}>$1</Button>
      <Button onClick={handleAdd(2)}>$2</Button>
      <Button onClick={handleAdd(5)}>$5</Button>
      <Button onClick={handleAdd(10)}>$10</Button>
      <Button onClick={handleAdd(20)}>$20</Button>
    </Group>
  );
};

export default QuickAdd;
