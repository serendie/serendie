import { Avatar as ArkAvatar } from "@ark-ui/react";
import { SvgIcon } from "..";
import { RecipeVariantProps, sva } from "../../styled-system/css";
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

type AvatarBaseProps = {
  src?: string;
  alt?: string;
  text?: string;
  icon?: boolean;
};

export type AvatarProps = RecipeVariantProps<typeof AvatarStyle> &
  AvatarBaseProps;

export const Avatar: React.FC<AvatarProps> = ({
  src,
  alt,
  text,
  icon,
  size,
  ...props
}) => {
  const [cssProps, componentProps] = AvatarStyle.splitVariantProps(props);
  const styles = AvatarStyle({ size, ...cssProps });
  const iconSize =
    size === "small" ? "24px" : size === "medium" ? "40px" : "80px";

  return (
    <ArkAvatar.Root className={styles.root} {...componentProps}>
      {src ? (
        <ArkAvatar.Image className={styles.image} src={src} alt={alt} />
      ) : icon ? (
        <SvgIcon icon="avatar" size={iconSize} />
      ) : text ? (
        <ArkAvatar.Fallback className={styles.fallback}>
          {text.slice(0, 2)}
        </ArkAvatar.Fallback>
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
