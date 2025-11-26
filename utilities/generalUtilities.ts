export const getDaysInMonth = () => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return new Date(year, month, 0).getDate();
};

export const getFirstDayInMonth = (date: Date) => {
  const month = date.getMonth();
  const year = date.getFullYear();

  return new Date(year, month, 1);
};

export const getLastDayInMonth = (date: Date) => {
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return new Date(year, month, 0, 23, 59, 59);
};

export const getAllDaysInRange = (start: string, end: string) => {
  const days = new Map();

  const startDate = getFirstDayInMonth(new Date(start));
  const endDate = getLastDayInMonth(new Date(end));

  for (
    const d = new Date(startDate);
    d <= new Date(endDate);
    d.setDate(d.getDate() + 1)
  ) {
    days.set(d.toLocaleDateString(), null);
  }

  return days;
};

export const getCalendarDate = (day: number) => {
  const date = new Date();

  const daysInMonth = getDaysInMonth();
  const finalDay = daysInMonth >= day ? day : getLastDayInMonth(date);

  date.setDate(Number(finalDay));

  return date.toISOString().substring(0, 10);
};

export const getTimeGreeting = () => {
  const date = new Date();
  const hours = date.getHours();

  if (hours > 1 && hours < 12) {
    return `Good Morning`;
  } else if (hours >= 12 && hours < 18) {
    return `Good Afternoon`;
  }

  return `Good Evening`;
};

export const formatNumber = (number: number) => {
  return new Intl.NumberFormat("en-US").format(number);
};
