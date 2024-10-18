import { styled } from "styled-system/jsx";
import { SideMenuDrawer } from "./SideMenuDrawer";
import { css } from "styled-system/css";

export type Links = {
  title: string;
  href: string;
  isActive?: boolean;
};

const Sidebar = styled("aside", {
  base: {
    position: "relative",
    w: "240px",
    h: "100%",
    py: "sd.system.dimension.spacing.extraLarge",
    display: "flex",
    flexDirection: "column",
    borderRight: "solid",
    borderColor: "sd.system.color.component.outline",
    borderRightWidth: "sd.system.dimension.border.medium",
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: "min(0px, calc(((100vw - 1440px) / 2 )* -1))",
      w: "calc((100vw - 1440px) / 2)",
      minW: "80px",
      h: "100%",
      bg: "web.system.color.impression.primary",
      zIndex: -1,
    },
    smDown: {
      w: "100%",
      height: "40px",
      py: "0",
      px: "24px",
      justifyContent: "center",
    },
    bg: "web.system.color.impression.primary",
  },
});

export const SideMenuList = styled("ul", {
  base: {
    listStyle: "none",
    p: 0,
    m: 0,
  },
});

export const SideMenuListItemLink = styled("a", {
  base: {
    color: "white",
    display: "block",
    textStyle: "sd.system.typography.label.extraLarge_compact",
    lineHeight: 1.5,
    py: "sd.system.dimension.spacing.extraSmall",
    px: "sd.system.dimension.spacing.extraLarge",
    _hover: {
      background: "sd.system.color.interaction.hoveredVariant",
    },
  },
  variants: {
    active: {
      true: {
        color: "sd.reference.color.scale.blue.100",
        background: "web.system.color.impression.secondary",
        _hover: {
          background:
            "color-mix(in srgb, {colors.web.system.color.impression.secondary}, {colors.sd.system.color.interaction.hoveredVariant});",
        },
      },
    },
  },
});

export const SideMenu = ({ links }: { links: Links[] }) => {
  return (
    <Sidebar>
      <SideMenuList
        className={css({
          smDown: {
            display: "none",
          },
        })}
      >
        {links.map((link, i) => (
          <li key={i}>
            <SideMenuListItemLink href={link.href} active={link.isActive}>
              {link.title}
            </SideMenuListItemLink>
          </li>
        ))}
      </SideMenuList>
      <SideMenuDrawer links={links} />
    </Sidebar>
  );
};
