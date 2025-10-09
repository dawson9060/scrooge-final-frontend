import useToast from "@/hooks/toast";
import { Reminder } from "@/types/reminder";
import axiosInstance from "@/utilities/axiosInstance";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { QUERY_REMINDERS } from "../queryKeys";
import dayjs from "dayjs";

const add = async (reminder: Reminder) => {
  const newReminder = { ...reminder };

  // saves the timestamp to the start of the day (00:00:00) in local timezone
  const timestamp = dayjs(reminder.date).startOf("day").valueOf();

  newReminder.date = String(timestamp);

  return await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_URL}/reminders`,
    newReminder
  );
};

const update = async (reminder: Reminder) => {
  return await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/reminders/${reminder.id}`,
    reminder
  );
};

const reminderDelete = async (reminderId: number) => {
  return await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/reminders/${reminderId}`
  );
};

export const useAddReminder = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const addReminder = useMutation({
    mutationFn: async (reminder: Reminder) => add(reminder),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_REMINDERS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Added Reminder",
        message: `Your reminders have been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Adding Reminder",
        message: "Please try again",
        color: "red",
      }),
  });

  return addReminder;
};

export const useUpdateReminder = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const updateReminder = useMutation({
    mutationFn: async (reminder: Reminder) => update(reminder),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_REMINDERS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Updated Reminder",
        message: `${res.data.reminder.name} has been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Updating Reminder",
        message: "Please try again",
        color: "red",
      }),
  });

  return updateReminder;
};

export const useDeleteReminder = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const deleteUniqueExpense = useMutation({
    mutationFn: async (reminderId: number) => reminderDelete(reminderId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_REMINDERS] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Deleted Reminder",
        message: "Reminder has been removed successfully",
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Deleting Reminder",
        message: "Please try again",
        color: "red",
      }),
  });

  return deleteUniqueExpense;
};
