import { selectedRecurringExpenseAtom } from "@/atoms/dashboardAtoms";
import { useFetchRecurringExpenses } from "@/data/fetch/client/fetchRecurringExpensesClient";
import { useDeleteRecurringExpense } from "@/data/mutate/mutateRecurring";
import { EXPENSE_COLOR_MAP } from "@/enums/recurringTypes";
import { RecurringExpense } from "@/types/recurringExpense";
import {
  ActionIcon,
  Box,
  Button,
  ComboboxItem,
  Group,
  Menu,
  Select,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { useSetAtom } from "jotai";
import { TbTrash } from "react-icons/tb";
import RecurringDonutChart from "../charts/RecurringDonutChart";
import classes from "./RecurringExpenses.module.css";
import RecurringExpenseForm from "./RecurringInputs";
import { useEffect, useState } from "react";

const SORT_TYPE_AMOUNT = "Amount";
const SORT_TYPE_NAME = "Name";
const SORT_TYPE_TYPE = "Type";

const ExpenseItem = ({ expense }: { expense: RecurringExpense }) => {
  const setSelectedRecurringExpense = useSetAtom(selectedRecurringExpenseAtom);

  const deleteExpense = useDeleteRecurringExpense();

  const handleDeleteExpense = async (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    e.stopPropagation();

    deleteExpense.mutate(expense.id!);
  };

  return (
    <Group
      className={classes.expenseItem}
      align="center"
      onClick={() => setSelectedRecurringExpense(expense)}
    >
      <Group wrap="nowrap" className={classes.expenseName}>
        <Box
          w="1rem"
          h="1rem"
          bg={EXPENSE_COLOR_MAP[expense.type]}
          style={{ borderRadius: "50%" }}
        />
        <Text>{expense.name}</Text>
      </Group>
      <Box className={classes.expenseAmount}>
        <Text>${expense.amount.toFixed(2)}</Text>
      </Box>
      <Box className={classes.expenseType}>
        <Text>{expense.type}</Text>
      </Box>
      <Box className={classes.expenseDay}>
        <Text>{expense?.day_of_month ?? "N/A"}</Text>
      </Box>
      <Group justify="flex-end" className={classes.expenseActions}>
        <ActionIcon
          variant="subtle"
          size="lg"
          color="red"
          onClick={(e) => handleDeleteExpense(e)}
        >
          <TbTrash size="1.25rem" />
        </ActionIcon>
      </Group>
    </Group>
  );
};

const RecurringExpenses = () => {
  const [sortType, setSortType] = useState<string>(SORT_TYPE_AMOUNT);
  const [displayExpenses, setDisplayExpenses] = useState<RecurringExpense[]>(
    []
  );

  const { recurringExpenses: expenses } = useFetchRecurringExpenses();

  useEffect(() => {
    const sorted = expenses.sort((a: RecurringExpense, b: RecurringExpense) => {
      if (sortType === SORT_TYPE_AMOUNT) {
        return b.amount - a.amount;
      } else if (sortType === SORT_TYPE_NAME) {
        return a.name.localeCompare(b.name);
      } else if (sortType === SORT_TYPE_TYPE) {
        return a.type.localeCompare(b.type);
      }
      return 0;
    });

    setDisplayExpenses([...sorted]);
  }, [expenses, sortType]);

  return (
    <Stack gap="1rem">
      <Group justify="space-between" align="center">
        <Title order={3}>Recurring Expenses</Title>
        <Select
          w="175px"
          value={sortType}
          onChange={(val) => setSortType(val!)}
          data={[SORT_TYPE_AMOUNT, SORT_TYPE_NAME, SORT_TYPE_TYPE]}
        />
      </Group>
      <RecurringExpenseForm />

      <Stack gap="0" mt="1rem">
        <Group w="100%" wrap="nowrap" p="0.5rem 0.75rem">
          <Box className={classes.expenseName}>
            <Text fw="bold">Name</Text>
          </Box>
          <Box className={classes.expenseAmount}>
            <Text fw="bold">Amount</Text>
          </Box>
          <Box className={classes.expenseType}>
            <Text fw="bold">Type</Text>
          </Box>
          <Box className={classes.expenseDay}>
            <Text fw="bold">Day</Text>
          </Box>
          <Group className={classes.expenseActions} />
        </Group>

        <Stack gap="0.5rem">
          {displayExpenses?.length > 0 ? (
            displayExpenses.map((expense: RecurringExpense) => (
              <ExpenseItem key={expense.id} expense={expense} />
            ))
          ) : (
            <Text ta="center">No recurring expenses found.</Text>
          )}
        </Stack>
      </Stack>
      <RecurringDonutChart />
    </Stack>
  );
};

export default RecurringExpenses;
