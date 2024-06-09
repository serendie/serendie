import { SvgIcon } from "..";
import { sva } from "../../styled-system/css";
import { Accordion as ArkAccordion } from "@ark-ui/react";

const AccordionStyle = sva({
  slots: ["item", "title", "itemIndicator", "icon", "description"],
  base: {
    item: {
      display: "grid",
      gridTemplateColumns: "1fr 24px",
      width: "100%",
      gap: "dic.system.dimension.spacing.extraSmall",
      paddingX: "dic.system.dimension.spacing.medium",
      paddingY: "dic.system.dimension.spacing.small",
      _hover: {
        bg: "color-mix(in srgb, {colors.dic.system.color.component.surface}, {colors.dic.system.color.interaction.hoveredVariant})",
      },
      cursor: "pointer",
    },
    title: {
      textAlign: "left",
      gap: "8px",
      textStyle: "dic.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
    },
    itemIndicator: {
      transition: "transform 0.2s",
      _open: {
        transform: "rotate(180deg)",
      }
    },
    icon: {
      width: 24,
      height: 24,
    },
    description: {
      paddingX: "dic.system.dimension.spacing.medium",
      paddingTop: "dic.system.dimension.spacing.small",
      paddingBottom: "dic.system.dimension.spacing.medium",
      textStyle: "dic.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
    },
  },
});

export type AccordionProps = {
  title: string;
  description: string;
  headingIcon?: boolean;
};

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
