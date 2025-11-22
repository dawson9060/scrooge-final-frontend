import { useDeleteRecurringExpense } from "@/data/mutate/mutateRecurring";
import { formatNumber } from "@/utilities/generalUtilities";
import { EventClickArg } from "@fullcalendar/core/index.js";
import { Button, Group, Modal, ModalBody, Stack, Text } from "@mantine/core";

type ViewEventModalProps = {
  event: EventClickArg | null | undefined;
  opened: boolean;
  close: () => void;
};

const ViewEventModal = ({ event, opened, close }: ViewEventModalProps) => {
  const deleteRecurringExpense = useDeleteRecurringExpense();

  const handleExpenseDelete = async () => {
    try {
      await deleteRecurringExpense.mutateAsync(
        event?.event.extendedProps.expenseId
      );
      close();
    } catch (err) {
      console.error("Error deleting expense:", err);
    }
  };

  return (
    <Modal opened={opened} onClose={close} title={"Recurring Expense"}>
      <ModalBody p="0">
        <Stack gap="sm">
          <Text>Expense Name: {event?.event.title}</Text>
          <Text>
            Expense Amount: ${formatNumber(event?.event.extendedProps?.amount)}
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

export default ViewEventModal;
