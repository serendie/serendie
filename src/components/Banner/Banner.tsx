import {
  SerendieSymbolAlertCircleFilled,
  SerendieSymbolAlertCircle,
} from "@serendie/symbols";
import { ComponentProps } from "react";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";

const BannerStyle = sva({
  slots: ["container", "icon", "title", "description"],
  base: {
    container: {
      display: "grid",
      gridTemplateColumns: "24px 1fr",
      columnGap: "sd.system.dimension.spacing.twoExtraSmall",
      rowGap: "sd.system.dimension.spacing.extraSmall",
      p: "sd.system.dimension.spacing.small",
      borderRadius: "sd.system.dimension.radius.medium",
    },
    title: {
      textStyle: "sd.system.typography.body.medium_compact",
      expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
    },
    description: {
      gridArea: "2 / 2 / 3 / 3",
      textStyle: "sd.system.typography.body.medium_compact",
      expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
    },
  },
  variants: {
    type: {
      information: {
        container: {
          bg: "sd.system.color.component.surface",
          color: "sd.system.color.component.onSurface",
          borderWidth: "sd.system.dimension.border.medium",
          borderStyle: "solid",
          borderColor: "sd.system.color.component.outline",
        },
      },
      error: {
        container: {
          bg: "sd.system.color.impression.negativeContainer",
          color: "sd.system.color.impression.onNegativeContainer",
          borderWidth: "sd.system.dimension.border.medium",
          borderStyle: "solid",
          borderColor: "sd.system.color.impression.negativeContainer",
        },
        icon: {
          color: "sd.system.color.impression.negative",
        },
      },
      warning: {
        container: {
          bg: "sd.system.color.impression.noticeContainer",
          color: "sd.system.color.impression.onNoticeContainer",
          borderWidth: "sd.system.dimension.border.medium",
          borderStyle: "solid",
          borderColor: "sd.system.color.impression.noticeContainer",
        },
      },
    },
  },
  defaultVariants: {
    type: "information",
  },
});

type BannerProps = {
  title: string;
  description: string;
  icon?: React.ReactElement;
} & ComponentProps<"div">;

export const Banner: React.FC<
  BannerProps & RecipeVariantProps<typeof BannerStyle>
> = (props) => {
  const [variantProps, { title, icon, description, className, ...restProps }] =
    BannerStyle.splitVariantProps(props);
  const styles = BannerStyle(variantProps);

  const variantType = variantProps.type || "alert-circle";

  return (
    <div className={cx(styles.container, className)} {...restProps}>
      <div className={styles.icon}>
        {icon ? (
          icon
        ) : variantType === "error" || variantType === "warning" ? (
          <SerendieSymbolAlertCircleFilled />
        ) : (
          <SerendieSymbolAlertCircle />
        )}
      </div>
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </div>
  );
};
