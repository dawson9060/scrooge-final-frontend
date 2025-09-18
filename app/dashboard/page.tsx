import { fetchUserServer } from "@/utilities/fetchUserServer";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { Button, Stack } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const isAuthenticated = await fetchUserServer();

  if (!isAuthenticated) {
    redirect("/auth");
  }

  // this is a server component, prefetch data here to load into nested client components
  const queryClient = getQueryClient();

  // await Promise.all([
  //   queryClient.prefetchQuery({
  //     queryKey: [QUERY_PETS],
  //     queryFn: fetchPetsServer,
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QUERY_ALL_EVENTS],
  //     queryFn: async () => fetchAllEventsServer(),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QUERY_EVENTS],
  //     queryFn: async () => fetchMyEventsServer(),
  //   }),
  //   queryClient.prefetchQuery({
  //     queryKey: [QUERY_USER],
  //     queryFn: fetchUserServer,
  //   }),
  // ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack>
        <Button w="fit-content">Testing Dashboard</Button>
      </Stack>
    </HydrationBoundary>
  );
};

export default Dashboard;
