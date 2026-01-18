import { useAddReminder } from "@/data/mutate/mutateReminders";
import { Button, Grid, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { TbPlus } from "react-icons/tb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInputs = ({ form }: any) => {
  return (
    <Grid columns={10} gutter="xs">
      <Grid.Col span={{ base: 10, xs: 5, md: 3 }}>
        <TextInput
          name="name"
          key={form.key("name")}
          {...form.getInputProps("name")}
          placeholder="Reminder Name&#42;"
          required
        />
      </Grid.Col>
      <Grid.Col span={{ base: 10, xs: 5, md: 3 }}>
        <DateInput
          key={form.key("date")}
          {...form.getInputProps("date")}
          required
          clearable
          defaultValue={null}
          placeholder="Select Date&#42;"
          valueFormat="MM/DD/YYYY"
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

const ReminderForm = () => {
  const addReminder = useAddReminder();

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: "",
      date: null,
    },
  });

  const handleAddReminder = async (data: {
    name: string;
    date: string | null;
  }) => {
    if (data.name && data.date) {
      try {
        await addReminder.mutateAsync({ name: data.name, date: data.date });
        form.reset();
      } catch (errror) {
        console.error("Error adding reminder:", errror);
      }
    }
  };

  return (
    <>
      <form onSubmit={form.onSubmit(handleAddReminder)}>
        <FormInputs form={form} />
      </form>
    </>
  );
};

export default ReminderForm;
