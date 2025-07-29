import { useState } from "react";
import { DatePicker } from "./DatePicker";
import {
  DatePickerValueChangeDetails,
  DateValue,
  parseDate,
} from "@ark-ui/react/date-picker";
import { TextField } from "../TextField";
import { SerendieSymbolCalendar } from "@serendie/symbols";

export default {
  title: "components/DatePicker",
};

export const Default = () => {
  const [value, setValue] = useState<DateValue[]>([parseDate("2022-01-01")]);
  const [open, setOpen] = useState(false);

  const handleChange = (details: DatePickerValueChangeDetails) => {
    console.log(details);
    setValue(details.value);
  };

  return (
    <>
      <TextField
        placeholder="Date"
        value={value[0]?.toString()}
        readOnly
        rightContent={<SerendieSymbolCalendar />}
        onFocus={() => setOpen(true)}
      />
      <DatePicker
        value={value}
        onValueChange={handleChange}
        open={open}
        onOpenChange={(details) => setOpen(details.open)}
      />
    </>
  );
};
