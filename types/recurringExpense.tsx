import { RECURRING_EXPENSE_TYPES } from "@/enums/recurringTypes";

const RECURRING_EXPENSE_COPY = { ...RECURRING_EXPENSE_TYPES } as const;
type RecurringExpenseType =
  (typeof RECURRING_EXPENSE_COPY)[keyof typeof RECURRING_EXPENSE_COPY];

export type RecurringExpense = {
  id?: number;
  name: string;
  amount: number;
  type: RecurringExpenseType;
  day_of_month?: number;
};
