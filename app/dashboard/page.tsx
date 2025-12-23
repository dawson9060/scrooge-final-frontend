import { ScrollingText } from "@/components/ScrollingText";
import TabsWrapper from "@/components/TabsWrapper";
import Welcome from "@/components/Welcome";
import { fetchRecurringExpensesServer } from "@/data/fetch/server/fetchRecurringExpensesServer";
import { fetchRemindersServer } from "@/data/fetch/server/fetchRemindersServer";
import { fetchUniqueExpensesServer } from "@/data/fetch/server/fetchUniqueExpensesServer";
import {
  QUERY_RECURRING_EXPENSES,
  QUERY_REMINDERS,
  QUERY_UNIQUE_EXPENSES,
} from "@/data/queryKeys";
import { fetchUserServer } from "@/utilities/fetchUserServer";
import { getQueryClient } from "@/utilities/ReactQuery/getQueryClient";
import { Stack } from "@mantine/core";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const Dashboard = async () => {
  const isAuthenticated = await fetchUserServer();

  if (!isAuthenticated) {
    redirect("/auth");
  }

  // this is a server component, prefetch data here to load into nested client components
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: [QUERY_UNIQUE_EXPENSES],
      queryFn: fetchUniqueExpensesServer,
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_RECURRING_EXPENSES],
      queryFn: fetchRecurringExpensesServer,
    }),
    queryClient.prefetchQuery({
      queryKey: [QUERY_REMINDERS],
      queryFn: fetchRemindersServer,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Stack>
        <ScrollingText />
        <Welcome />
        <TabsWrapper />
      </Stack>
    </HydrationBoundary>
  );
};

export default Dashboard;
