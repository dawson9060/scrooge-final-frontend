"use client";

import { selectedRecurringExpenseAtom } from "@/atoms/dashboardAtoms";
import { useUpdateRecurringExpense } from "@/data/mutate/mutateRecurring";
import { RECURRING_EXPENSE_TYPES } from "@/enums/recurringTypes";
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

const EditRecurringModal = () => {
  const [expense, setSelectedExpense] = useAtom(selectedRecurringExpenseAtom);

  const updateExpense = useUpdateRecurringExpense();

  const form = useForm({
    mode: "uncontrolled",
  });

  useEffect(() => {
    const date = new Date();
    if (expense?.day_of_month) {
      date.setDate(expense.day_of_month);
    }

    form.setValues({
      name: expense?.name || "",
      amount: expense?.amount,
      day_of_month: expense?.day_of_month ? date : null,
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
      title="Update Recurring Expense"
    >
      <form onSubmit={(e: FormEvent) => handleSave(e)}>
        <Stack>
          <TextInput
            name="expense"
            key={form.key("name")}
            {...form.getInputProps("name")}
            placeholder="Expense Name&#42;"
            required
            label="Expense Name"
          />
          <NumberInput
            key={form.key("amount")}
            {...form.getInputProps("amount")}
            name="amount"
            min={1}
            clampBehavior="strict"
            prefix="$"
            placeholder="Amount&#42;"
            required
            hideControls
            label="Amount"
          />
          <Select
            name="type"
            key={form.key("type")}
            {...form.getInputProps("type")}
            placeholder="Pick value"
            data={Object.values(RECURRING_EXPENSE_TYPES)}
            allowDeselect={false}
            label="Expense Type"
          />
          <DateInput
            key={form.key("day_of_month")}
            {...form.getInputProps("day_of_month")}
            valueFormat="DD"
            placeholder="Optional Day"
            clearable
            label="Day of Month"
            minDate={
              new Date(new Date().getFullYear(), new Date().getMonth(), 1)
            }
            maxDate={
              new Date(new Date().getFullYear(), new Date().getMonth(), 28)
            }
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

export default EditRecurringModal;
