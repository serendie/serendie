import {
  RadioGroup as ArkRadioGroup,
  RadioGroupRootProps,
} from "@ark-ui/react";

export const RadioGroup: React.FC<RadioGroupRootProps> = ({
  children,
  ...props
}) => {
  return <ArkRadioGroup.Root {...props}>{children}</ArkRadioGroup.Root>;
};
