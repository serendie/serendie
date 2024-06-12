import { Accordion, AccordionRootProps } from "@ark-ui/react";
import { sva } from "../../styled-system/css";

const AccordionGroupStyle = sva({
  slots: ["root"],
  base: {
    root: {
      display: "flex",
      flexDirection: "column",
    },
  },
});

export const AccordionGroup: React.FC<AccordionRootProps> = ({
  children,
  ...props
}) => {
  const [cssProps, componentProps] =
    AccordionGroupStyle.splitVariantProps(props);
  const styles = AccordionGroupStyle(cssProps);

  return (
    <Accordion.Root multiple className={styles.root} {...componentProps}>
      {children}
    </Accordion.Root>
  );
};
