import { RECURRING_EXPENSE_TYPES } from "@/enums/recurringTypes";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  Text,
  TextInput,
} from "@mantine/core";
import { TbPlus } from "react-icons/tb";
import { DateInput } from "@mantine/dates";
import { useAddRecurringExpense } from "@/data/mutate/mutateRecurring";
import { useForm } from "@mantine/form";

const FormInputs = ({ form }: any) => {
  return (
    <Group gap={0}>
      <TextInput
        name="expense"
        key={form.key("name")}
        {...form.getInputProps("name")}
        placeholder="Expense Name&#42;"
        className="w-full md:w-[250px]"
        required
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
        className="w-[50%] mt-2 pr-2 md:mt-0 md:pl-2 md:w-[150px]"
        hideControls
      />
      <DateInput
        key={form.key("day_of_month")}
        {...form.getInputProps("day_of_month")}
        valueFormat="DD"
        placeholder="Optional Day"
        clearable
        defaultValue={null}
        className="w-[50%] mt-2 md:mt-0 md:mr-2 md:w-[135px]"
      />
      <Select
        name="type"
        key={form.key("type")}
        {...form.getInputProps("type")}
        placeholder="Pick value"
        data={Object.values(RECURRING_EXPENSE_TYPES)}
        defaultValue={RECURRING_EXPENSE_TYPES.MISC}
        allowDeselect={false}
        className="w-full mt-2 md:mt-0 md:w-[160px]"
      />
      <Box className="md:ml-2 w-full md:w-fit mt-2 md:mt-0">
        <Button type="submit" color="gold" fullWidth>
          <TbPlus />
        </Button>
      </Box>
    </Group>
  );
};

const RecurringExpenseForm = () => {
  const addRecurringExpense = useAddRecurringExpense();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      amount: null,
      day_of_month: "",
      type: RECURRING_EXPENSE_TYPES.MISC,
    },
  });

  const handleAddExpense = async (data: any) => {
    try {
      await addRecurringExpense.mutateAsync({ ...data });
      form.reset();
    } catch (errror) {
      console.error("Error adding recurring expense:", errror);
    }
  };

  return (
    <>
      <Text size="1.5rem">Monthly Expenses</Text>
      <form onSubmit={form.onSubmit(handleAddExpense)}>
        <FormInputs form={form} />
      </form>
    </>
  );
};

export default RecurringExpenseForm;
