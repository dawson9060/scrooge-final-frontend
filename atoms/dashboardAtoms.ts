import { RecurringExpense } from "@/types/recurringExpense";
import { UniqueExpense } from "@/types/uniqueExpense";
import { atom } from "jotai";

export const showRemindersAtom = atom(false);
export const upcomingRemindersAtom = atom(0);
export const surplusAtom = atom(0);
export const selectedUniqueExpenseAtom = atom<UniqueExpense | null>();
export const selectedRecurringExpenseAtom = atom<RecurringExpense | null>();
