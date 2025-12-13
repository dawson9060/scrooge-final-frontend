"use client";

import { Stack, Tabs } from "@mantine/core";
import Calendar from "./Calendar";
import RecurringExpenses from "./recurring/RecurringExpenses";
import RecurringExpenseForm from "./recurring/RecurringInputs";
import ReminderForm from "./reminders/ReminderInputs";
import Reminders from "./reminders/Reminders";
import QuickAdd from "./summary/QuickAdd";
import UniqueExpenses from "./unique/UniqueExpenses";
import UniqueExpenseForm from "./unique/UniqueInputs";
import RecurringDonutChart from "./charts/RecurringDonutChart";

import classes from "./TabsWrapper.module.css";

const TAB_SUMMARY = "summary";
const TAB_RECURRING = "recurring";
const TAB_UNIQUE = "unique";
const TAB_REMINDERS = "reminders";

const TabsWrapper = () => {
  return (
    <Tabs variant="outline" color="blue.5" defaultValue={TAB_SUMMARY}>
      <Tabs.List>
        <Tabs.Tab value={TAB_SUMMARY}>Summary</Tabs.Tab>
        <Tabs.Tab value={TAB_RECURRING}>Recurring</Tabs.Tab>
        <Tabs.Tab value={TAB_UNIQUE}>Unique</Tabs.Tab>
        <Tabs.Tab value={TAB_REMINDERS}>Reminders</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value={TAB_SUMMARY} pt="1rem">
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
