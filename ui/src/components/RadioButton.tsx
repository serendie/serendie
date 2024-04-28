import { RadioGroup } from '@ark-ui/react'

import { styled } from "../../styled-system/jsx";

const RadioGroupItemControl = styled(RadioGroup.ItemControl, {
  base: {
    background: "transparent",
    borderColor: "dic.system.color.component.outline",
    borderRadius: "dic.system.dimension.radius.full",
    borderWidth: "dic.system.dimension.border.medium",
    height: "16px",
    width: "16px",
    margin: "4px",
    _checked: {
      background: "dic.system.color.impression.primary",
      outlineColor: "dic.system.color.component.inverseOnSurface",
      outlineStyle: "solid",
      outlineWidth: "2px",
      outlineOffset: "-3px",
      borderColor: "dic.system.color.impression.primary"
    }
  }
})

const RadioGroupItem = styled(RadioGroup.Item, {
  base: {
    alignItems: "center",
    display: "flex",
    cursor: "pointer",
    gap: "dic.system.dimension.spacing.small",
    paddingY: "dic.system.dimension.spacing.small",
    paddingX: "dic.system.dimension.spacing.medium"
  }
})

export const RadioButton = () => {
  const frameworks = ['React', 'Solid', 'Vue']

  return (
    <RadioGroup.Root>
      <RadioGroup.Label>Framework</RadioGroup.Label>
      <RadioGroup.Indicator />
      {frameworks.map((framework) => (
        <RadioGroupItem key={framework} value={framework}>
          <RadioGroupItemControl />
          <RadioGroup.ItemText>{framework}</RadioGroup.ItemText>
        </RadioGroupItem>
      ))}
    </RadioGroup.Root>
  )
}
