"use client";

import { Center, Tabs, Text } from "@mantine/core";
import Calendar from "./Calendar";
import RecurringDonutChart from "./charts/RecurringDonutChart";
import RecurringExpenses from "./recurring/RecurringExpenses";
import RecurringExpenseForm from "./recurring/RecurringInputs";
import ReminderForm from "./reminders/ReminderInputs";
import Reminders from "./reminders/Reminders";
import QuickAdd from "./summary/QuickAdd";
import UniqueExpenses from "./unique/UniqueExpenses";
import UniqueExpenseForm from "./unique/UniqueInputs";

import { upcomingRemindersAtom } from "@/atoms/dashboardAtoms";
import { useAtomValue } from "jotai";
import classes from "./TabsWrapper.module.css";
import SummaryOverview from "./summary/SummaryOverview";

const TAB_SUMMARY = "summary";
const TAB_RECURRING = "recurring";
const TAB_UNIQUE = "unique";
const TAB_REMINDERS = "reminders";

const TabsWrapper = () => {
  const upcomingReminderCount = useAtomValue(upcomingRemindersAtom);

  return (
    <Tabs
      variant="outline"
      color="blue.5"
      defaultValue={TAB_SUMMARY}
      classNames={classes}
    >
      <Tabs.List>
        <Tabs.Tab value={TAB_SUMMARY}>Summary</Tabs.Tab>
        <Tabs.Tab value={TAB_RECURRING}>Recurring</Tabs.Tab>
        <Tabs.Tab value={TAB_UNIQUE}>Unique</Tabs.Tab>
        <Tabs.Tab
          value={TAB_REMINDERS}
          leftSection={
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
      </Tabs.List>

      <Tabs.Panel value={TAB_SUMMARY}>
        <SummaryOverview />
        <QuickAdd />
        <Calendar />
      </Tabs.Panel>

      <Tabs.Panel value={TAB_RECURRING}>
        <RecurringExpenseForm />
        <RecurringExpenses />
        <RecurringDonutChart />
      </Tabs.Panel>

      <Tabs.Panel value={TAB_UNIQUE}>
        <UniqueExpenseForm />
        <UniqueExpenses />
      </Tabs.Panel>
      <Tabs.Panel value={TAB_REMINDERS}>
        <ReminderForm />
        <Reminders />
      </Tabs.Panel>
    </Tabs>
  );
};

export default TabsWrapper;
