import useToast from "@/hooks/toast";
import { RecurringExpense } from "@/types/recurringExpense";
import axiosInstance from "@/utilities/axiosInstance";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { QUERY_RECURRING_EXPENSES } from "../queryKeys";

const add = async (expense: RecurringExpense) => {
  const newExpense = { ...expense };
  const date = expense.day_of_month;

  if (date) {
    const day = new Date(date).getDate();
    newExpense.day_of_month = day;
  }

  return await axiosInstance.post(
    `${process.env.NEXT_PUBLIC_API_URL}/recurringExpenses`,
    newExpense
  );
};

const update = async (expense: RecurringExpense) => {
  return await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/recurringExpenses/${expense.id}`,
    expense
  );
};

const expenseDelete = async (expenseId: number) => {
  return await axiosInstance.delete(
    `${process.env.NEXT_PUBLIC_API_URL}/recurringExpenses/${expenseId}`
  );
};

export const useAddRecurringExpense = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const addRecurringExpense = useMutation({
    mutationFn: async (recurringExpense: RecurringExpense) =>
      add(recurringExpense),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_RECURRING_EXPENSES] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Added Recurring Expense",
        message: `Your recurring expenses have been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Adding Recurring Expense",
        message: "Please try again",
        color: "red",
      }),
  });

  return addRecurringExpense;
};

export const useUpdateRecurringExpense = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const updateRecurringExpense = useMutation({
    mutationFn: async (recurringExpense: RecurringExpense) =>
      update(recurringExpense),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_RECURRING_EXPENSES] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Updated Recurring Expense",
        message: `${res.data.recurringExpense.name} has been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Updating Recurring Expense",
        message: "Please try again",
        color: "red",
      }),
  });

  return updateRecurringExpense;
};

export const useDeleteRecurringExpense = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const deleteRecurringExpense = useMutation({
    mutationFn: async (expenseId: number) => expenseDelete(expenseId),
    onSettled: () =>
      queryClient.invalidateQueries({ queryKey: [QUERY_RECURRING_EXPENSES] }),
    onSuccess: (res) =>
      showToast({
        title: "Successfully Deleted Recurring Expense",
        message: "Recurring expense has been removed successfully",
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Deleting Recurring Expense",
        message: "Please try again",
        color: "red",
      }),
  });

  return deleteRecurringExpense;
};
