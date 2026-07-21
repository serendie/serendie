import { ComponentProps } from "react";
import { RecipeVariantProps, cx, sva } from "../../../styled-system/css";

const footerStyle = sva({
  slots: ["root", "copyright", "row", "link", "logo"],
  base: {
    root: {
      width: "100%",
      display: "flex",
      alignItems: "center",
      paddingBlock: "sd.system.dimension.spacing.small",
      borderTopWidth: "sd.system.dimension.border.medium",
      borderTopStyle: "solid",
      borderTopColor: "sd.system.color.component.outline",
    },
    copyright: {
      textStyle: "sd.system.typography.label.large_compact",
      color: "sd.system.color.component.onSurface",
      wordBreak: "break-word",
    },
    row: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.extraLarge",
    },
    link: {
      textStyle: "sd.system.typography.label.large_compact",
      color: "sd.system.color.component.onSurface",
      textDecoration: "none",
      cursor: "pointer",
      whiteSpace: "nowrap",
      _hover: {
        textDecoration: "underline",
      },
    },
    logo: {
      display: "flex",
      alignItems: "center",
      flexShrink: 0,
      height: "24px",
      "& > *": {
        maxHeight: "100%",
        width: "auto",
      },
    },
  },
  variants: {
    type: {
      app: {
        root: {
          justifyContent: "space-between",
        },
      },
      website: {
        root: {
          justifyContent: "center",
        },
      },
    },
  },
  defaultVariants: {
    type: "app",
  },
});

type VariantProps = RecipeVariantProps<typeof footerStyle>;

export type FooterLink = {
  label: string;
  href?: string;
  onClick?: React.MouseEventHandler<HTMLAnchorElement>;
};

export type FooterProps = {
  /** Copyright text or node shown at the start (app) / center (website). */
  copyright: React.ReactNode;
  /** Link items rendered on the trailing side. Only rendered for `type="app"`. */
  links?: FooterLink[];
  /** Logo slot rendered after the links; any image/SVG is capped at 24px height. Only rendered for `type="app"`. */
  logo?: React.ReactNode;
} & VariantProps &
  Omit<ComponentProps<"footer">, "children">;

export const Footer: React.FC<FooterProps> = ({
  copyright,
  links,
  logo,
  ...props
}) => {
  const [variantProps, { className, ...elementProps }] =
    footerStyle.splitVariantProps(props);
  const styles = footerStyle(variantProps);
  const isWebsite = variantProps.type === "website";

  return (
    <footer className={cx(styles.root, className)} {...elementProps}>
      <p className={styles.copyright}>{copyright}</p>
      {!isWebsite && (links?.length || logo) && (
        <div className={styles.row}>
          {links?.map((link, index) => (
            <a
              key={`${link.label}-${index}`}
              className={styles.link}
              href={link.href}
              onClick={link.onClick}
            >
              {link.label}
            </a>
          ))}
          {logo && <span className={styles.logo}>{logo}</span>}
        </div>
      )}
    </footer>
  );
};
