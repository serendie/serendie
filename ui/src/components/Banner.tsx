import { RecipeVariantProps, css, cx, sva } from "../../styled-system/css";
import { SvgIcon, SvgIconName } from "./SvgIcon";

const BannerStyle = sva({
  slots: ["container", "icon", "title", "text"],
  base: {
    container: {
      display: "grid",
      gridTemplateColumns: "24px 1fr",
      columnGap: "dic.system.dimension.spacing.twoExtraSmall",
      rowGap: "dic.system.dimension.spacing.extraSmall",
      p: "dic.system.dimension.spacing.small",
      borderRadius: "dic.system.dimension.radius.medium",
    },
    title: {
      textStyle: "dic.system.typography.body.medium_compact",
      expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
    },
    text: {
      gridArea: "2 / 2 / 3 / 3",
      textStyle: "dic.system.typography.body.medium_compact",
      expanded: {
        textStyle: "dic.system.typography.body.medium_expanded",
      },
    },
  },
  variants: {
    type: {
      information: {
        container: {
          bg: "dic.system.color.component.surface",
          color: "dic.system.color.component.onSurface",
          borderWidth: "dic.system.dimension.border.medium",
          borderStyle: "solid",
          borderColor: "dic.system.color.component.outline",
        },
      },
      error: {
        container: {
          bg: "dic.system.color.impression.negativeContainer",
          color: "dic.system.color.impression.onNegativeContainer",
          borderWidth: "dic.system.dimension.border.medium",
          borderStyle: "solid",
          borderColor: "dic.system.color.impression.negativeContainer",
        },
        icon: {
          color: "dic.system.color.impression.negative",
        },
      },
      warning: {
        container: {
          bg: "dic.system.color.impression.noticeContainer",
          color: "dic.system.color.impression.onNoticeContainer",
          borderWidth: "dic.system.dimension.border.medium",
          borderStyle: "solid",
          borderColor: "dic.system.color.impression.noticeContainer",
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

  return (
    <div className={cx(classes.container, css(cssProps))} {...props}>
      <div className={classes.icon}>
        <SvgIcon icon={icon} size={"24px"} />
      </div>
      <h2 className={classes.title}>{title}</h2>
      <p className={classes.text}>{text}</p>
    </div>
  );
};
