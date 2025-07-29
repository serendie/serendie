import { useState } from "react";
import { DatePicker } from "./DatePicker";
import {
  DatePickerValueChangeDetails,
  DateValue,
  parseDate,
} from "@ark-ui/react/date-picker";

export default {
  title: "components/DatePicker",
};

export const Default = () => {
  const [value, setValue] = useState<DateValue[]>([parseDate(new Date())]);

  const handleChange = (details: DatePickerValueChangeDetails) => {
    console.log(details);
    setValue(details.value);
  };

  return (
    <>
      <DatePicker value={value} onValueChange={handleChange} />
    </>
  );
};
