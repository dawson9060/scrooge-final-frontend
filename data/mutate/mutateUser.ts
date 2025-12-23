import useToast from "@/hooks/toast";
import axiosInstance from "@/utilities/axiosInstance";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { useMutation } from "@tanstack/react-query";
import { QUERY_USER } from "../queryKeys";

const updateUserBudget = async (budget: number | string) => {
  return await axiosInstance.put(
    `${process.env.NEXT_PUBLIC_API_URL}/user/budget`,
    { budget: budget }
  );
};

export const useUpdateBudget = () => {
  const { showToast } = useToast();

  const queryClient = getQueryClient();

  const updateBudget = useMutation({
    mutationFn: async (budget: string | number) => updateUserBudget(budget),
    onSettled: () => queryClient.invalidateQueries({ queryKey: [QUERY_USER] }),
    onSuccess: () =>
      showToast({
        title: "Successfully Updated Budget",
        message: `Your monthly budget has been updated`,
        color: "green",
      }),
    onError: () =>
      showToast({
        title: "Error Updating Budget",
        message: "Please try again",
        color: "red",
      }),
  });

  return updateBudget;
};
