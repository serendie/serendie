import { SvgIcon } from "..";
import { sva } from "../../styled-system/css";
import { Accordion as ArkAccordion } from "@ark-ui/react";
import { RecipeVariantProps } from "../../styled-system/types";

const AccordionStyle = sva({
  slots: ["item", "title", "itemIndicator", "icon", "description"],
  base: {
    item: {
      display: "flex",
      width: "100%",
      gap: "sd.system.dimension.spacing.extraSmall",
      paddingX: "sd.system.dimension.spacing.medium",
      paddingY: "sd.system.dimension.spacing.small",
      _hover: {
        bg: "color-mix(in srgb, {colors.sd.system.color.component.surface}, {colors.sd.system.color.interaction.hoveredVariant})",
      },
      cursor: "pointer",
    },
    title: {
      flex: 1,
      textAlign: "left",
      color: "sd.system.color.component.onSurface",
      textStyle: "sd.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
    },
    itemIndicator: {
      flex: "0 0 24px",
      transition: "transform 0.2s",
      _open: {
        transform: "rotate(180deg)",
      },
    },
    icon: {
      width: 24,
      height: 24,
      color: "sd.system.color.component.onSurface",
    },
    description: {
      paddingX: "sd.system.dimension.spacing.medium",
      paddingTop: "sd.system.dimension.spacing.small",
      paddingBottom: "sd.system.dimension.spacing.medium",
      textStyle: "sd.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
    },
  },
  variants: {
    isLeftIcon: {
      true: {
        item: {
          flexDirection: "row-reverse",
        },
        itemIndicator: {
          transform: "rotate(-90deg)",
          _open: {
            transform: "rotate(0deg)",
          },
        },
      },
    },
  },
});

export type AccordionBaseProps = {
  title: string;
  description: string;
};

export type AccordionProps = AccordionBaseProps &
  RecipeVariantProps<typeof AccordionStyle>;

export const Accordion: React.FC<AccordionProps> = ({
  title,
  description,
  ...props
}) => {
  const [cssProps, componentProps] = AccordionStyle.splitVariantProps(props);
  const styles = AccordionStyle(cssProps);

  return (
    <ArkAccordion.Item key={title} value={title} {...componentProps}>
      <ArkAccordion.ItemTrigger className={styles.item}>
        <span className={styles.title}>{title}</span>
        <ArkAccordion.ItemIndicator className={styles.itemIndicator}>
          <SvgIcon icon="expandMore" className={styles.icon} />
        </ArkAccordion.ItemIndicator>
      </ArkAccordion.ItemTrigger>
      <ArkAccordion.ItemContent className={styles.description}>
        {description}
      </ArkAccordion.ItemContent>
    </ArkAccordion.Item>
  );
};
