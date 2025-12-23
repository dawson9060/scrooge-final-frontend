"use client";

import { upcomingRemindersAtom } from "@/atoms/dashboardAtoms";
import { useAuth } from "@/hooks/auth";
import { getTimeGreeting } from "@/utilities/generalUtilities";
import { Group, Stack, Text } from "@mantine/core";
import { useAtomValue } from "jotai";

export function Welcome() {
  const { user } = useAuth();

  const upcomingReminderCount = useAtomValue(upcomingRemindersAtom);

  return (
    <Stack my="2rem">
      <Stack>
        <Group gap="0.5rem">
          <Text fw="bold" fz="h2">
            {getTimeGreeting()},{" "}
          </Text>
          <Text fw="bold" fz="h2" c="gold.5">
            {user?.name ?? user?.email}
          </Text>
        </Group>

        <Group w="fit-content">
          <Text size="1rem">
            You have {upcomingReminderCount} upcoming reminders
          </Text>
        </Group>
      </Stack>
    </Stack>
  );
}

export default Welcome;
