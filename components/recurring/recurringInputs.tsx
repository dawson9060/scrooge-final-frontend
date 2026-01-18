import { useAddRecurringExpense } from "@/data/mutate/mutateRecurring";
import { RECURRING_EXPENSE_TYPES } from "@/enums/recurringTypes";
import {
  Box,
  Button,
  Grid,
  NumberInput,
  Select,
  TextInput,
} from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { TbPlus } from "react-icons/tb";

const FormInputs = ({ form }: any) => {
  return (
    <Grid columns={10} gutter="xs">
      <Grid.Col span={{ base: 10, xs: 5, md: 3 }}>
        <TextInput
          name="expense"
          key={form.key("name")}
          {...form.getInputProps("name")}
          placeholder="Expense Name&#42;"
          required
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 5, md: 2 }}>
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
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 5, md: 2 }}>
        <Select
          name="type"
          key={form.key("type")}
          {...form.getInputProps("type")}
          placeholder="Pick value"
          data={Object.values(RECURRING_EXPENSE_TYPES)}
          defaultValue={RECURRING_EXPENSE_TYPES.MISC}
          allowDeselect={false}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 5, md: 2 }}>
        <DateInput
          key={form.key("day_of_month")}
          {...form.getInputProps("day_of_month")}
          valueFormat="DD"
          placeholder="Optional Day"
          clearable
          defaultValue={null}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 10, md: 1 }}>
        <Box>
          <Button type="submit" color="gold" fullWidth>
            <TbPlus size="1.25rem" />
          </Button>
        </Box>
      </Grid.Col>
    </Grid>
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
    <form onSubmit={form.onSubmit(handleAddExpense)}>
      <FormInputs form={form} />
    </form>
  );
};

export default RecurringExpenseForm;
