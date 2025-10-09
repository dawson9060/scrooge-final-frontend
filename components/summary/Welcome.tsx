"use client";

import { useFetchUniqueExpenses } from "@/data/fetch/client/fetchUniqueExpensesClient";
import { useAuth } from "@/hooks/auth";
import { getTimeGreeting } from "@/utilities/generalUtilities";
import { Group, Stack, Text, Title } from "@mantine/core";

export function Welcome() {
  //   const { reminders } = useFetchReminders();
  const { user } = useAuth();

  const { uniqueExpenses } = useFetchUniqueExpenses();
  console.log("Unique Expenses in Welcome:", uniqueExpenses);

  //   const setOpen = useSetAtom(showRemindersAtom);

  //   const upcomingCount = useMemo(() => {
  //     let count = 0;

  //     const today = new Date().getTime();
  //     const weekInMilli = 604800000;

  //     reminders?.forEach((reminder) => {
  //       if (
  //         reminder.date_timestamp >= today &&
  //         reminder.date_timestamp - today <= weekInMilli
  //       ) {
  //         count++;
  //       }
  //     });

  //     return count;
  //   }, [reminders]);
  const upcomingCount = 2;
  return (
    <Stack my="2rem">
      <Stack bg="gold.5" p="1rem" bdrs="md">
        <Title order={2}>
          {getTimeGreeting(user && (user.name ? user.name : user.email))}
        </Title>
        <Group
          w="fit-content"
          //   className="hover:pl-3 transition-all py-2 hover:cursor-pointer"
          //   onClick={() => setOpen(true)}
        >
          <Text
            size="1rem"
            className={`${upcomingCount > 0 && "animate-bounce"}`}
          >
            You have {upcomingCount} upcoming reminders
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}

export default Welcome;
