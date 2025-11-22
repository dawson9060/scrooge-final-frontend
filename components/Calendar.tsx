"use client";

import { Stack } from "@mantine/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin, { DateClickArg } from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {
  getCalendarDate,
  getFirstDayInMonth,
} from "@/utilities/generalUtilities";
import { useFetchReminders } from "@/data/fetch/client/fetchRemindersClient";
import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import { useMemo, useState } from "react";
import { Reminder } from "@/types/reminder";
import { RecurringExpense } from "@/types/recurringExpense";
import "./Calendar.css";
import { useDisclosure } from "@mantine/hooks";
import { EventClickArg } from "@fullcalendar/core/index.js";
import AddReminderModal from "./modals/AddReminderModal";
import ViewEventModal from "./modals/ViewEventModal";
import ViewReminderModal from "./modals/ViewReminderModal";

const CalendarType = {
  REMINDER: "REMINDER",
  EXPENSE: "EXPENSE",
};

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const [selectedEvent, setSelectedEvent] = useState<EventClickArg | null>();

  const { reminders } = useFetchReminders();
  const { recurringExpenses } = useFetchRecurringExpenses();

  const [
    addReminderOpened,
    { open: addReminderOpen, close: addReminderClose },
  ] = useDisclosure(false);
  const [viewEventModalOpened, { open: viewEventOpen, close: viewEventClose }] =
    useDisclosure(false);
  const [
    viewReminderModalOpened,
    { open: viewReminderOpen, close: viewReminderClose },
  ] = useDisclosure(false);

  const activeData = useMemo(() => {
    const data: object[] = [];
    if (reminders?.length > 0 && recurringExpenses?.length > 0) {
      reminders.forEach((reminder: Reminder) => {
        data.push({
          title: reminder.name,
          date: new Date(reminder.date).toISOString().split("T")[0],
          reminderDate: reminder.date,
          backgroundColor: "#ad0000",
          reminderId: reminder.id,
          type: CalendarType.REMINDER,
        });
      });

      recurringExpenses.forEach((expense: RecurringExpense) => {
        if (expense.day_of_month) {
          data.push({
            title: expense.name,
            date: getCalendarDate(expense.day_of_month),
            // backgroundColor: "#ad0000",
            expenseId: expense.id,
            amount: expense.amount,
            type: CalendarType.EXPENSE,
          });
        }
      });
    }

    return data;
  }, [reminders, recurringExpenses]);

  const handleDateClick = (selectedDateObj: DateClickArg) => {
    setSelectedDate(selectedDateObj.date);
    addReminderOpen();
  };

  const handleEventClick = (selectedEvent: EventClickArg) => {
    setSelectedEvent(selectedEvent);

    if (selectedEvent.event.extendedProps.type === CalendarType.REMINDER) {
      viewReminderOpen();
    } else {
      viewEventOpen();
    }
  };

  return (
    <Stack w="100%" p="lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        validRange={() => {
          return {
            start: getFirstDayInMonth(new Date()),
            // end: dayjs(firstDayInMonth).add(1, 'month').format('YYYY-MM-DD'),
          };
        }}
        dateClick={handleDateClick}
        eventClick={handleEventClick}
        events={activeData}
        editable={true}
      />
      <AddReminderModal
        date={selectedDate}
        opened={addReminderOpened}
        close={addReminderClose}
      />
      <ViewEventModal
        event={selectedEvent}
        opened={viewEventModalOpened}
        close={viewEventClose}
      />
      <ViewReminderModal
        event={selectedEvent}
        opened={viewReminderModalOpened}
        close={viewReminderClose}
      />
    </Stack>
  );
};

export default Calendar;
