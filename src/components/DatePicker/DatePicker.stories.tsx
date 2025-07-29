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

  const handleChange = (details: DatePickerValueChangeDetails) => {
    console.log(details);
    setValue(details.value);
  };

  return (
    <>
      <TextField
        placeholder="Date"
        type="date"
        value={value[0]?.toString()}
        readOnly
        rightContent={<SerendieSymbolCalendar />}
      />
      <br />
      <br />
      <DatePicker value={value} onValueChange={handleChange} />
    </>
  );
};
