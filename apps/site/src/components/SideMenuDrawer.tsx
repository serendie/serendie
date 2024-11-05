import { Drawer } from "@serendie/ui";
import { useState } from "react";
import { SideMenuList, SideMenuListItemLink, type Links } from "./SideMenu";
import { css } from "styled-system/css";
import IconLayoutSidebar from "../assets/icon/outline/layout-sidebar.svg?react";

export const SideMenuDrawer: React.FC<{
  links: Links[];
}> = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div
      className={css({
        // center vertically
        display: "flex",
        alignItems: "center",
      })}
    >
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className={css({
          color: "sd.reference.color.scale.white.1000",
          sm: {
            display: "none",
          },
          "& svg > path": {
            fill: "currentColor",
          },
        })}
      >
        <IconLayoutSidebar width={24} height={24} />
      </button>

      <Drawer
        type="full"
        isOpen={isOpen}
        onOpenChange={(newIsOpen) => {
          setIsOpen(newIsOpen.open);
        }}
        backdropClassName={css({
          bg: "transparent",
        })}
        contentClassName={css({
          _open: {
            animation: "menuSlideInReverse 0.2s ease-in-out",
          },
          _closed: {
            animation: "menuSlideOutReverse 0.2s ease-in-out",
          },
        })}
      >
        <div
          className={css({
            pt: "sd.system.dimension.spacing.extraLarge",
            h: "calc(100% - 56px)",
            w: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            bg: "web.system.color.impression.primary",
            overflow: "auto",
          })}
        >
          <SideMenuList
            w="100%"
            mb="sd.system.dimension.spacing.fiveExtraLarge"
          >
            {links.map((link) => (
              <li key={link.href}>
                <SideMenuListItemLink href={link.href} active={link.isActive}>
                  {link.title}
                </SideMenuListItemLink>
              </li>
            ))}
          </SideMenuList>
        </div>
      </Drawer>
    </div>
  );
};
