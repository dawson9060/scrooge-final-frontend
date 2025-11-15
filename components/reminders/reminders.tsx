import { upcomingRemindersAtom } from "@/atoms/dashboardAtoms";
import { useFetchReminders } from "@/data/fetch/client/fetchRemindersClient";
import { useDeleteReminder } from "@/data/mutate/mutateReminders";
import { Reminder } from "@/types/reminder";
import { Text, SimpleGrid, Button, Stack } from "@mantine/core";
import { useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
  const deleteReminder = useDeleteReminder();

  const handleDeleteReminder = async () => {
    deleteReminder.mutate(reminder.id!);
  };
  console.log("IS UPCOMING", reminder.isUpcoming);
  return (
    <SimpleGrid cols={3}>
      <Text>
        {reminder.isUpcoming ? "(Upcoming!) " : ""}
        {reminder.name}
      </Text>
      <Text>{new Date(reminder.date).toLocaleDateString()}</Text>
      <Button color="red" onClick={handleDeleteReminder}>
        Delete
      </Button>
    </SimpleGrid>
  );
};

const Reminders = () => {
  const setUpcomingReminders = useSetAtom(upcomingRemindersAtom);

  const { reminders } = useFetchReminders();

  const { formattedReminders, upcomingCount } = useMemo(() => {
    const today = new Date().getTime();
    const weekInMilli = 604800000;
    let upcomingCount = 0;

    const formattedReminders = [...reminders];
    formattedReminders?.forEach((reminder: Reminder) => {
      if (reminder.date >= today && reminder.date - today <= weekInMilli) {
        reminder.isUpcoming = true;

        upcomingCount += 1;
      }
    });

    return { formattedReminders, upcomingCount };
  }, [reminders]);

  useEffect(
    () => setUpcomingReminders(upcomingCount),
    [upcomingCount, setUpcomingReminders]
  );

  return (
    <Stack>
      {formattedReminders?.length > 0 ? (
        formattedReminders.map((reminder: Reminder) => (
          <ReminderItem key={reminder.id} reminder={reminder} />
        ))
      ) : (
        <Text ta="center">No reminders found.</Text>
      )}
    </Stack>
  );
};

export default Reminders;
