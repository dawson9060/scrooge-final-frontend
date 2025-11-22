import { useAddReminder } from "@/data/mutate/mutateReminders";
import { Button, Group, Text, TextInput } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useForm } from "@mantine/form";
import { TbPlus } from "react-icons/tb";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormInputs = ({ form }: any) => {
  return (
    <Group gap={0}>
      <TextInput
        name="name"
        key={form.key("name")}
        {...form.getInputProps("name")}
        placeholder="Reminder Name&#42;"
        required
      />
      <DateInput
        key={form.key("date")}
        {...form.getInputProps("date")}
        required
        clearable
        defaultValue={null}
        placeholder="Select Date&#42;"
        valueFormat="MM/DD/YYYY"
      />
      <Button type="submit" color="gold">
        <TbPlus />
      </Button>
    </Group>
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
      <Text size="1.5rem">Reminders</Text>
      <form onSubmit={form.onSubmit(handleAddReminder)}>
        <FormInputs form={form} />
      </form>
    </>
  );
};

export default ReminderForm;
