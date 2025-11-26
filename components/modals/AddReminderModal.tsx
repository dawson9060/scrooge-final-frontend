import { useAddReminder } from "@/data/mutate/mutateReminders";
import {
  Button,
  Group,
  Modal,
  ModalBody,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import dayjs from "dayjs";

interface AddReminderProps {
  date: Date | undefined;
  opened: boolean;
  close: () => void;
}

const AddReminderModal = ({ date, opened, close }: AddReminderProps) => {
  const addReminder = useAddReminder();

  const handleSave = async (data: FormData) => {
    const name = String(data.get("name") || "");

    if (name && date) {
      try {
        await addReminder.mutateAsync({
          name,
          date: date?.toISOString() || "",
        });

        close();
      } catch (errror) {
        console.error("Error adding reminder:", errror);
      }
    }
  };

  return (
    <Modal opened={opened} onClose={close} title="Add Reminder">
      <form action={(data) => handleSave(data)}>
        <ModalBody p="0">
          <Stack gap="lg">
            <Stack gap="xs">
              <Text>Reminder Date: {dayjs(date).format("MM-DD-YYYY")}</Text>
              <TextInput placeholder="Reminder Name" name="name" />
            </Stack>
          </Stack>
        </ModalBody>
        <Group justify="flex-end" gap="xs">
          <Button onClick={close} bg="gray">
            Close
          </Button>
          <Button type="submit" bg="gold">
            Save
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default AddReminderModal;
