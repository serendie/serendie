import { RecipeVariantProps, css, cx, sva } from "../../styled-system/css";
import { SvgIcon, SvgIconName } from "./SvgIcon";

const BannerStyle = sva({
  slots: ["container", "icon", "title", "text"],
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
    text: {
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
  icon: SvgIconName;
  title: string;
  text: string;
};

export const Banner: React.FC<
  BannerProps & RecipeVariantProps<typeof BannerStyle>
> = ({ icon, title, text, ...props }) => {
  const [bannerProps, cssProps] = BannerStyle.splitVariantProps(props);
  const classes = BannerStyle(bannerProps);

  const variantType = bannerProps.type || "information";
  const defaultIcon: SvgIconName =
    variantType === "error"
      ? "error_fill"
      : variantType === "warning"
      ? "error"
      : "info";

  return (
    <div className={cx(classes.container, css(cssProps))} {...props}>
      <div className={classes.icon}>
        <SvgIcon icon={icon || defaultIcon} size={"24px"} />
      </div>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.text}>{text}</p>
    </div>
  );
};
