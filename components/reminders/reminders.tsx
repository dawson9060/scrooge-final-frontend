import { upcomingRemindersAtom } from "@/atoms/dashboardAtoms";
import { useFetchReminders } from "@/data/fetch/client/fetchRemindersClient";
import { useDeleteReminder } from "@/data/mutate/mutateReminders";
import { Reminder } from "@/types/reminder";
import { ActionIcon, Box, Group, Stack, Text, Title } from "@mantine/core";
import { useSetAtom } from "jotai";
import { useEffect, useMemo } from "react";
import ReminderForm from "./ReminderInputs";

import { TbExclamationCircle, TbTrash } from "react-icons/tb";
import classes from "./Reminders.module.css";

const ReminderItem = ({ reminder }: { reminder: Reminder }) => {
  const deleteReminder = useDeleteReminder();

  const handleDeleteReminder = async () => {
    deleteReminder.mutate(reminder.id!);
  };

  return (
    <Group className={classes.reminderItem} align="center">
      <Group wrap="nowrap" className={classes.reminderName}>
        {reminder.isUpcoming && (
          <TbExclamationCircle color="orange" size="1.25rem" />
        )}
        <Text>{reminder.name}</Text>
      </Group>
      <Box className={classes.reminderDate}>
        <Text>{new Date(reminder.date).toLocaleDateString()}</Text>
      </Box>
      <Group className={classes.reminderActions} justify="flex-end">
        <ActionIcon
          variant="subtle"
          size="lg"
          color="red"
          onClick={handleDeleteReminder}
        >
          <TbTrash size="1.25rem" />
        </ActionIcon>
      </Group>
    </Group>
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
    <Stack gap="1rem">
      <Title order={3}>Reminders</Title>
      <ReminderForm />
      <Stack gap="0.5rem" mt="1rem">
        <Group w="100%" wrap="nowrap" p="0.5rem 0.75rem">
          <Box className={classes.reminderName}>
            <Text fw="bold">Name</Text>
          </Box>
          <Box className={classes.reminderDate}>
            <Text fw="bold">Date</Text>
          </Box>
          <Box className={classes.reminderActions} />
        </Group>
        <Stack gap="0.5rem">
          {formattedReminders?.length > 0 ? (
            formattedReminders.map((reminder: Reminder) => (
              <ReminderItem key={reminder.id} reminder={reminder} />
            ))
          ) : (
            <Text ta="center">No reminders found.</Text>
          )}
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Reminders;
