import { Avatar as ArkAvatar, AvatarRootProps } from "@ark-ui/react";
import { SvgIcon } from "..";
import { RecipeVariantProps, cx, sva } from "../../styled-system/css";
import PlaceholderImage from "../assets/avatarPlaceholder.png";

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
    size === "small" ? "24px" : size === "medium" ? "40px" : "80px";

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
        <ArkAvatar.Image
          className={styles.image}
          src={PlaceholderImage}
          alt="avatar"
        />
      )}
    </ArkAvatar.Root>
  );
};
