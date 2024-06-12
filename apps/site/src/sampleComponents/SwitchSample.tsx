import { Switch } from "@spread/ui";
import { useState } from "react";

export function SwitchSample() {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <Switch checked={checked} onClick={handleClick} label={"Switch Me!"} />
  );
}
