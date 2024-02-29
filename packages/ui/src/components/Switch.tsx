import { Switch as ArkSwitch } from "@ark-ui/react";

export const Switch = () => (
  <ArkSwitch.Root>
    <ArkSwitch.Control>
      <ArkSwitch.Thumb />
    </ArkSwitch.Control>
    <ArkSwitch.Label>Label</ArkSwitch.Label>
  </ArkSwitch.Root>
);
