"use client";

import { Stack } from "@mantine/core";

import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import FullCalendar from "@fullcalendar/react";
import {
  getCalendarDate,
  getFirstDayInMonth,
} from "@/utilities/generalUtilities";
import { useFetchReminders } from "@/data/fetch/client/fetchRemindersClient";
import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import { useMemo } from "react";
import { Reminder } from "@/types/reminder";
import { RecurringExpense } from "@/types/recurringExpense";
import "./Calendar.css";

const CalendarType = {
  REMINDER: "REMINDER",
  EXPENSE: "EXPENSE",
};

const Calendar = () => {
  const { reminders } = useFetchReminders();
  const { recurringExpenses } = useFetchRecurringExpenses();

  const activeData = useMemo(() => {
    const data: object[] = [];
    if (reminders?.length > 0 && recurringExpenses?.length > 0) {
      reminders.forEach((reminder: Reminder) => {
        data.push({
          title: reminder.name,
          date: new Date(reminder.date).toISOString().split("T")[0],
          backgroundColor: "#ad0000",
          id: reminder.id,
          type: CalendarType.REMINDER,
        });
      });

      recurringExpenses.forEach((expense: RecurringExpense) => {
        if (expense.day_of_month) {
          data.push({
            title: expense.name,
            date: getCalendarDate(expense.day_of_month),
            // backgroundColor: "#ad0000",
            id: expense.id,
            type: CalendarType.EXPENSE,
          });
        }
      });
    }

    return data;
  }, [reminders, recurringExpenses]);

  const handleDateClick = (selected: any) => {
    console.log("DATE CLICKED", selected);
  };

  const handleEventClick = (selected: any) => {
    console.log("EVENT CLICKED", selected);
  };

  return (
    <Stack w="100%" p="lg">
      <FullCalendar
        plugins={[dayGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        validRange={(nowDate) => {
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
      {/* <AddReminderModal
        date={selectedDate}
        opened={addReminderOpened}
        open={addOpen}
        close={addClose}
      />
      <ViewEventModal
        event={selectedEvent}
        opened={viewModalOpened}
        open={viewOpen}
        close={viewClose}
      /> */}
    </Stack>
  );
};

export default Calendar;
