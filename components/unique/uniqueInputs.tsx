import { useAddUniqueExpense } from "@/data/mutate/mutateUnique";
import { UNIQUE_TYPE_DEPOSIT, UNIQUE_TYPE_EXPENSE } from "@/types/expense";
import { Button, Grid, NumberInput, Select, TextInput } from "@mantine/core";
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
        <DateInput
          key={form.key("date")}
          {...form.getInputProps("date")}
          name="date"
          placeholder="Date"
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 5, md: 2 }}>
        <Select
          name="type"
          key={form.key("type")}
          {...form.getInputProps("type")}
          placeholder="Pick value"
          data={[UNIQUE_TYPE_EXPENSE, UNIQUE_TYPE_DEPOSIT]}
          defaultValue={UNIQUE_TYPE_EXPENSE}
          allowDeselect={false}
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 10, md: 1 }}>
        <Button type="submit" color="gold" fullWidth>
          <TbPlus size="1.25rem" />
        </Button>
      </Grid.Col>
    </Grid>
  );
};

const UniqueExpenseForm = () => {
  const addUniqueExpense = useAddUniqueExpense();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      amount: null,
      date: new Date().getTime(),
      type: UNIQUE_TYPE_EXPENSE,
    },
  });

  const handleAddExpense = async (data: any) => {
    try {
      await addUniqueExpense.mutateAsync({ ...data });
      form.reset();
    } catch (errror) {
      console.error("Error adding unique expense:", errror);
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleAddExpense)}>
      <FormInputs form={form} />
    </form>
  );
};

export default UniqueExpenseForm;
