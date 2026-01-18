"use client";

import {
  selectedRecurringExpenseAtom,
  selectedUniqueExpenseAtom,
} from "@/atoms/dashboardAtoms";
import { useUpdateRecurringExpense } from "@/data/mutate/mutateRecurring";
import { useUpdateUniqueExpense } from "@/data/mutate/mutateUnique";
import { RECURRING_EXPENSE_TYPES } from "@/enums/recurringTypes";
import { UNIQUE_TYPE_DEPOSIT, UNIQUE_TYPE_EXPENSE } from "@/types/expense";
import {
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { useAtom } from "jotai";
import { FormEvent, useEffect } from "react";

const EditUniqueModal = () => {
  const [expense, setSelectedExpense] = useAtom(selectedUniqueExpenseAtom);

  const updateExpense = useUpdateUniqueExpense();

  const form = useForm({
    mode: "uncontrolled",
  });

  useEffect(() => {
    form.setValues({
      name: expense?.name,
      amount: expense?.amount,
      date: expense?.date,
      type: expense?.type,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [expense]);

  const handleSave = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const data = form.getValues();

      await updateExpense.mutateAsync({ id: expense!.id, ...data });

      setSelectedExpense(null);
    } catch (err) {
      console.error("Error updating recurring expense:", err);
    }
  };

  return (
    <Modal
      opened={!!expense}
      onClose={() => setSelectedExpense(null)}
      title="Update Unique Expense"
    >
      <form onSubmit={(e: FormEvent) => handleSave(e)}>
        <Stack>
          <TextInput
            label="Expense Name"
            name="expense"
            key={form.key("name")}
            {...form.getInputProps("name")}
            placeholder="Expense Name&#42;"
            required
          />

          <NumberInput
            label="Amount"
            key={form.key("amount")}
            {...form.getInputProps("amount")}
            name="amount"
            min={1}
            clampBehavior="strict"
            prefix="$"
            placeholder="Amount&#42;"
            required
            hideControls
          />
          <DateInput
            label="Date"
            key={form.key("date")}
            {...form.getInputProps("date")}
            name="date"
            placeholder="Date"
          />
          <Select
            label="Expense Type"
            name="type"
            key={form.key("type")}
            {...form.getInputProps("type")}
            placeholder="Pick value"
            data={[UNIQUE_TYPE_EXPENSE, UNIQUE_TYPE_DEPOSIT]}
            defaultValue={UNIQUE_TYPE_EXPENSE}
            allowDeselect={false}
          />
        </Stack>

        <Group w="100%" justify="flex-end" mt="1.5rem" gap="xs">
          <Button onClick={() => setSelectedExpense(null)} color="gray">
            Close
          </Button>
          <Button type="submit" color="gold">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default EditUniqueModal;
