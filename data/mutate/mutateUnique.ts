import useToast from "@/hooks/toast";
import { UniqueExpense } from "@/types/uniqueExpense";
import axiosInstance from "@/utilities/axiosInstance";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { QUERY_UNIQUE_EXPENSES } from "../queryKeys";
import dayjs from "dayjs";

const add = async (expense: UniqueExpense) => {
  const newExpense = { ...expense };

  // saves the timestamp to the start of the day (00:00:00) in local timezone
  const timestamp = dayjs(newExpense.date).startOf("day").valueOf();

  newExpense.date = timestamp;

  return await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_URL}/uniqueExpenses`,
    newExpense
  );
};

const update = async (expense: UniqueExpense) => {
  return await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/uniqueExpenses/${expense.id}`,
    expense
  );
};

const expenseDelete = async (expenseId: number) => {
  return await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/uniqueExpenses/${expenseId}`
  );
};

export const useAddUniqueExpense = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const addUniqueExpense = useMutation({
    mutationFn: async (uniqueExpense: UniqueExpense) => add(uniqueExpense),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_UNIQUE_EXPENSES] }),
    onSuccess: () =>
      showToast({
        title: "Successfully Added Expense",
        message: `Your unique expenses have been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Adding Expense",
        message: "Please try again",
        color: "red",
      }),
  });

  return addUniqueExpense;
};

export const useUpdateUniqueExpense = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const updateUniqueExpense = useMutation({
    mutationFn: async (uniqueExpense: UniqueExpense) => update(uniqueExpense),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_UNIQUE_EXPENSES] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Updated Expense",
        message: `${res.data.uniqueExpense.name} has been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Updating Expense",
        message: "Please try again",
        color: "red",
      }),
  });

  return updateUniqueExpense;
};

export const useDeleteUniqueExpense = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const deleteUniqueExpense = useMutation({
    mutationFn: async (expenseId: number) => expenseDelete(expenseId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_UNIQUE_EXPENSES] }),
    onSuccess: () =>
      showToast({
        title: "Successfully Deleted Expense",
        message: "Expense has been removed successfully",
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Deleting Expense",
        message: "Please try again",
        color: "red",
      }),
  });

  return deleteUniqueExpense;
};
