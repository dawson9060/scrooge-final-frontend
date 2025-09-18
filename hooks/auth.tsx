import { QUERY_USER } from "@/data/queryKeys";
import { STATUS_OK } from "@/Enums/status-enums";
import axiosInstance from "@/utilities/axiosInstance";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useAuth = () => {
  const {
    data: user = null,
    refetch,
    isError,
    isLoading,
  } = useSuspenseQuery({
    queryKey: [QUERY_USER],
    queryFn: () =>
      axiosInstance
        .get(`${process.env.NEXT_PUBLIC_API_URL}/user`)
        .then((res) => res.data.user)
        .catch((err) => {
          console.error("ERROR FETCHING USER IN HOOK", err);
          return null;
        }),
    retry: false,
  });

  const login = async (values: LoginFormValues) => {
    await axiosInstance.get(`${process.env.NEXT_PUBLIC_SANCTUM_URL}`);

    const res = await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      values
    );

    refetch();

    return res.data;
  };

  // TODO - replace URL with env variable
  const logout = async () => {
    const response = await axiosInstance.post(`http://localhost:8000/logout`);

    if (response.status === STATUS_OK) {
      refetch();
    }

    return response;
  };

  const register = async (values: RegistrationFormValues) => {
    await axiosInstance.get(`${process.env.NEXT_PUBLIC_SANCTUM_URL}`);

    return await axiosInstance.post(
      `${process.env.NEXT_PUBLIC_API_URL}/register`,
      values
    );
  };

  return { user, isError, isLoading, refetch, login, logout, register };
};
