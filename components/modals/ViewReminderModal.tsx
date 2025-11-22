import { useDeleteReminder } from "@/data/mutate/mutateReminders";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Button, Group, Modal, ModalBody, Stack, Text } from "@mantine/core";

type ViewReminderModalProps = {
  event: EventClickArg | null | undefined;
  opened: boolean;
  close: () => void;
};

const ViewReminderModal = ({
  event,
  opened,
  close,
}: ViewReminderModalProps) => {
  const deleteReminder = useDeleteReminder();

  const handleExpenseDelete = async () => {
    try {
      await deleteReminder.mutateAsync(event?.event.extendedProps.reminderId);
      close();
    } catch (err) {
      console.error("Error deleting reminder:", err);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Reminder">
      <ModalBody p="0">
        <Stack gap="sm">
          <Text>Reminder Name: {event?.event.title}</Text>
          <Text>
            Date:{" "}
            {new Date(
              event?.event.extendedProps?.reminderDate
            ).toLocaleDateString()}
          </Text>
        </Stack>
      </ModalBody>
      <Group justify="flex-end" gap="xs" mt="2rem">
        <Button onClick={close} bg="gray">
          Close
        </Button>
        <Button onClick={handleExpenseDelete} bg="gold">
          Delete
        </Button>
      </Group>
    </Modal>
  );
};

export default ViewReminderModal;
