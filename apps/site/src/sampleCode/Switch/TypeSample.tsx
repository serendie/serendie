import { Switch } from "@serendie/ui";
import { useState } from "react";

export function TypeSample() {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <Switch
      checked={checked}
      onCheckedChange={handleClick}
      label={"スイッチラベル"}
    />
  );
}
