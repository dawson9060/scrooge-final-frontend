import { useFetchReminders } from "@/data/fetch/client/fetchRemindersClient";
import { useDeleteReminder } from "@/data/mutate/mutateReminders";
import { Reminder } from "@/types/reminder";
import { Text, SimpleGrid, Button, Stack } from "@mantine/core";

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
  const deleteReminder = useDeleteReminder();

  const handleDeleteReminder = async () => {
    deleteReminder.mutate(reminder.id!!);
  };

  return (
    <SimpleGrid cols={3}>
      <Text>{reminder.name}</Text>
      <Text>{new Date(reminder.date).toLocaleDateString()}</Text>
      <Button color="red" onClick={handleDeleteReminder}>
        Delete
      </Button>
    </SimpleGrid>
  );
};

const Reminders = () => {
  const { reminders } = useFetchReminders();

  return (
    <Stack>
      {reminders?.length > 0 ? (
        reminders.map((reminder: Reminder) => (
          <ReminderItem key={reminder.id} reminder={reminder} />
        ))
      ) : (
        <Text ta="center">No reminders found.</Text>
      )}
    </Stack>
  );
};

export default Reminders;
