"use client";

import { Button, Center, Stack, Tabs, Text } from "@mantine/core";
import Calendar from "./Calendar";
import RecurringExpenses from "./recurring/RecurringExpenses";
import Reminders from "./reminders/Reminders";
import UniqueExpenses from "./unique/UniqueExpenses";

import { upcomingRemindersAtom } from "@/atoms/dashboardAtoms";
import { STATUS_OK } from "@/enums/status-enums";
import { useAuth } from "@/hooks/auth";
import useToast from "@/hooks/toast";
import { useAtomValue } from "jotai";
import { useRouter } from "next/navigation";
import {
  TbDashboard,
  TbEye,
  TbLogout,
  TbRewindBackward10,
  TbSettings,
  TbUserDollar,
} from "react-icons/tb";
import SummaryOverview from "./summary/SummaryOverview";
import classes from "./TabsWrapper.module.css";
import Welcome from "./Welcome";

const TAB_SUMMARY = "summary";
const TAB_RECURRING = "recurring";
const TAB_UNIQUE = "unique";
const TAB_REMINDERS = "reminders";

const TabsWrapper = () => {
  const upcomingReminderCount = useAtomValue(upcomingRemindersAtom);

  const { logout } = useAuth();

  const router = useRouter();

  const { showToast } = useToast();

  const handleLogout = async () => {
    const response = await logout();

    if (response.status === STATUS_OK) {
      showToast({ message: "Logout successful", color: "green" });

      router.push("/");
    } else {
      showToast({ message: "Logout failed", color: "red" });
    }
  };

  return (
    <Tabs
      orientation="vertical"
      variant="none"
      color="blue.5"
      mt="1rem"
      defaultValue={TAB_SUMMARY}
      classNames={classes}
    >
      <Tabs.List>
        <Stack>
          <Tabs.Tab
            value={TAB_SUMMARY}
            leftSection={<TbDashboard size="1.25rem" />}
          >
            Summary
          </Tabs.Tab>
          <Tabs.Tab
            value={TAB_RECURRING}
            leftSection={<TbRewindBackward10 size="1.25rem" />}
          >
            Recurring
          </Tabs.Tab>
          <Tabs.Tab
            value={TAB_UNIQUE}
            leftSection={<TbUserDollar size="1.25rem" />}
          >
            Unique
          </Tabs.Tab>
          <Tabs.Tab
            value={TAB_REMINDERS}
            leftSection={<TbEye size="1.25rem" />}
            rightSection={
              upcomingReminderCount > 0 && (
                <Center
                  bg="orange.4"
                  w="1rem"
                  h="1rem"
                  style={{ borderRadius: "50%" }}
                >
                  <Text fz=".84rem">{upcomingReminderCount}</Text>
                </Center>
              )
            }
          >
            Reminders
          </Tabs.Tab>
        </Stack>
        <Stack gap="xs">
          <Button
            variant="white"
            c="black"
            fz=".935rem"
            fullWidth
            leftSection={<TbSettings size="1.25rem" />}
          >
            Settings
          </Button>
          <Button
            variant="white"
            c="black"
            fz=".935rem"
            fullWidth
            leftSection={<TbLogout size="1.25rem" />}
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Stack>
      </Tabs.List>
      <Tabs.Panel value={TAB_SUMMARY}>
        <Stack gap="2rem">
          <Welcome />
          <SummaryOverview />
          {/* <QuickAdd /> */}
          <Calendar />
        </Stack>
      </Tabs.Panel>
      <Tabs.Panel value={TAB_RECURRING}>
        <RecurringExpenses />
      </Tabs.Panel>
      <Tabs.Panel value={TAB_UNIQUE}>
        <UniqueExpenses />
      </Tabs.Panel>
      <Tabs.Panel value={TAB_REMINDERS}>
        <Reminders />
      </Tabs.Panel>
    </Tabs>
  );
};

export default TabsWrapper;
