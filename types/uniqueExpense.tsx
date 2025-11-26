import { UNIQUE_TYPE_DEPOSIT, UNIQUE_TYPE_EXPENSE } from "./expense";

export type UniqueExpense = {
  id?: number;
  name: string;
  amount: number;
  type: typeof UNIQUE_TYPE_EXPENSE | typeof UNIQUE_TYPE_DEPOSIT;
  date: number;
};
