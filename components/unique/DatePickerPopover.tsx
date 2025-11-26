import { Button, Group, Popover } from "@mantine/core";
import { DatesRangeValue, MonthPicker } from "@mantine/dates";
import "@mantine/dates/styles.css";
import dayjs from "dayjs";

export const DatePickerPopover = ({
  selectedRange,
  setSelectedRange,
}: {
  selectedRange: [Date, Date | null];
  setSelectedRange: (range: [Date, Date | null]) => void;
}) => {
  let date = selectedRange[0].toLocaleString("default", { month: "long" });
  if (selectedRange[1])
    date +=
      " - " + selectedRange[1].toLocaleString("default", { month: "long" });

  const handleSelect = (range: DatesRangeValue) => {
    if (!range[0]) {
      setSelectedRange([new Date(), null]);
    } else {
      setSelectedRange([
        dayjs(range[0]).toDate(),
        range[1] ? dayjs(range[1]).toDate() : null,
      ]);
    }
  };

  return (
    <Popover width={200} position="bottom-end" withArrow shadow="md">
      <Popover.Target>
        <Button fw="normal" color="gold">
          {date}
        </Button>
      </Popover.Target>
      <Popover.Dropdown miw={300}>
        <Group justify="center" align="center">
          <MonthPicker
            maxDate={new Date()}
            type="range"
            value={selectedRange}
            onChange={(val: DatesRangeValue) => handleSelect(val)}
          />
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
};
