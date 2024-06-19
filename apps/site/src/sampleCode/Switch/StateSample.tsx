import { Switch } from "@serendie/ui";
import { useState } from "react";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";

export function StateSample() {
  const [checked, setChecked] = useState(false);
  const handleClick = () => {
    setChecked(!checked);
  };

  return (
    <Dl>
      <Dt>Enabled</Dt>
      <Dd>
        <Switch
          checked={checked}
          onClick={handleClick}
          label={"スイッチラベル"}
        />
      </Dd>
      <Dt>Checked</Dt>
      <Dd>
        <Switch checked={true} label={"スイッチラベル"} />
      </Dd>
      <Dt>Disabled</Dt>
      <Dd>
        <Switch checked={false} disabled label={"スイッチラベル"} />
      </Dd>
      <Dt>Selected - Disabled</Dt>
      <Dd>
        <Switch checked={true} disabled label={"スイッチラベル"} />
      </Dd>
      <Dt>Focused</Dt>
      <Dd>
        <Switch
          checked={false}
          data-focus
          onClick={handleClick}
          label={"スイッチラベル"}
        />
      </Dd>
    </Dl>
  );
}
