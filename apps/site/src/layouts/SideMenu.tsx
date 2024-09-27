import { styled } from "styled-system/jsx";

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
    bg: "sd.reference.color.scale.blue.600",
    _before: {
      content: '""',
      position: "absolute",
      top: 0,
      left: "min(0px, calc(((100vw - 1440px) / 2 )* -1))",
      w: "calc((100vw - 1440px) / 2)",
      minW: "80px",
      h: "100%",
      bg: "sd.reference.color.scale.blue.600",
      zIndex: -1,
    },
    mdDown: {
      w: "100%",
    },
  },
});

const List = styled("ul", {
  base: {
    listStyle: "none",
    p: 0,
    m: 0,
  },
});

const ListItemLink = styled("a", {
  base: {
    color: "sd.system.color.impression.onNotice",
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
        background: "sd.reference.color.scale.blue.700",
        _hover: {
          background:
            "color-mix(in srgb, {colors.sd.reference.color.scale.blue.700}, {colors.sd.system.color.interaction.hoveredVariant});",
        },
      },
    },
  },
});

export const SideMenu = ({ links }: { links: Links[] }) => {
  return (
    <Sidebar>
      <List>
        {links.map((link, i) => (
          <li key={i}>
            <ListItemLink href={link.href} active={link.isActive}>
              {link.title}
            </ListItemLink>
          </li>
        ))}
      </List>
    </Sidebar>
  );
};
