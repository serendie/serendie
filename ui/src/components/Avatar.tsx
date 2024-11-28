import { Avatar as ArkAvatar, AvatarRootProps } from "@ark-ui/react";
import { SvgIcon } from "..";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";

export const AvatarStyle = sva({
  slots: ["root", "fallback", "image"],
  base: {
    root: {
      borderRadius: "50%",
    },
    fallback: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      color: "sd.system.color.component.onSurface",
      backgroundColor: "sd.reference.color.scale.blue.200",
      textStyle: "sd.system.typography.label.extraLarge_compact",
    },
    image: {
      width: "100%",
      height: "100%",
      borderRadius: "50%",
    },
  },
  variants: {
    size: {
      small: {
        root: {
          width: 24,
          height: 24,
        },
        fallback: {
          fontSize: 11,
        },
      },
      medium: {
        root: {
          width: 40,
          height: 40,
        },
        fallback: {
          fontSize: 19,
        },
      },
      large: {
        root: {
          width: 80,
          height: 80,
        },
        fallback: {
          fontSize: 37,
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type AvatarProps = {
  src?: string;
  alt?: string;
  text?: string;
  placeholder?: "filled" | "outlined";
} & RecipeVariantProps<typeof AvatarStyle> &
  AvatarRootProps;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  text,
  placeholder = "filled",
  className,
  ...props
}) => {
  const [variantProps, elementProps] = AvatarStyle.splitVariantProps(props);
  const { size } = variantProps;
  const styles = AvatarStyle({ size, ...variantProps });
  const iconSize =
    size === "small" ? "24px" : size === "large" ? "80px" : "40px";

  return (
    <ArkAvatar.Root className={cx(styles.root, className)} {...elementProps}>
      {src ? (
        <ArkAvatar.Image className={styles.image} src={src} alt={alt} />
      ) : text ? (
        <ArkAvatar.Fallback className={styles.fallback}>
          {text.slice(0, 2)}
        </ArkAvatar.Fallback>
      ) : placeholder === "outlined" ? (
        <SvgIcon icon="avatar" size={iconSize} />
      ) : (
        <FallbackIllustration />
      )}
    </ArkAvatar.Root>
  );
};

const FallbackIllustration: React.FC = () => (
  <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g clip-path="url(#clip0_3661_24550)">
      <rect width="80" height="80" rx="40" fill="#EFF2FC" />
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M42.783 26.208L13.5059 26.208L34.4075 63.9769L63.6846 63.9769L42.783 26.208Z"
          fill="#0A69CF"
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          d="M14.5894 51.3908C14.5894 52.5565 16.3965 53.3535 16.8169 54.369C17.2373 55.3845 16.5548 57.2598 17.3465 58.0515C18.1381 58.8431 19.978 58.147 21.0289 58.5811C22.0799 59.0151 22.8415 60.8085 24.0071 60.8085C25.1727 60.8085 25.9698 59.0014 26.9853 58.5811C28.0008 58.1607 29.8761 58.8431 30.6677 58.0515C31.4594 57.2598 30.7633 55.42 31.1973 54.369C31.6313 53.3181 33.4248 52.5565 33.4248 51.3908C33.4248 50.2252 31.6177 49.4281 31.1973 48.4127C30.7769 47.3972 31.4594 45.5218 30.6677 44.7302C29.8761 43.9386 28.0362 44.6347 26.9853 44.2006C25.9343 43.7666 25.1727 41.9731 24.0071 41.9731C22.8415 41.9731 22.0444 43.7803 21.0289 44.2006C20.0135 44.621 18.1381 43.9386 17.3465 44.7302C16.5548 45.5218 17.2509 47.3617 16.8169 48.4127C16.3829 49.4636 14.5894 50.2252 14.5894 51.3908Z"
          fill="#8FAEFE"
        />
      </g>
      <g
        style={{
          mixBlendMode: "multiply",
        }}
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M48.5175 28.506C51.5824 31.5709 56.5515 31.5709 59.6164 28.506L64.373 33.2627C58.6812 38.9546 49.4528 38.9546 43.7609 33.2627C38.069 27.5708 38.069 18.3424 43.7609 12.6505L48.5175 17.4072C45.4527 20.472 45.4527 25.4412 48.5175 28.506Z"
          fill="#F84258"
        />
      </g>
    </g>
    <defs>
      <clipPath id="clip0_3661_24550">
        <rect width="80" height="80" fill="white" />
      </clipPath>
    </defs>
  </svg>
);
