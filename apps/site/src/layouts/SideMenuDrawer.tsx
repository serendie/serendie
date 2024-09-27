import { Drawer, IconButton } from "@serendie/ui";
import { useState } from "react";
import { SideMenuList, SideMenuListItemLink, type Links } from "./SideMenu";
import { css } from "styled-system/css";

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
      <IconButton
        styleType="ghost"
        size="small"
        icon="menu"
        className={css({
          color: "white",
          sm: {
            display: "none",
          },
        })}
        onClick={() => {
          setIsOpen(true);
        }}
      />

      <Drawer
        type="full"
        isOpen={isOpen}
        onOpenChange={(newIsOpen) => {
          setIsOpen(newIsOpen.open);
        }}
      >
        <SideMenuList>
          {links.map((link) => (
            <li key={link.href}>
              <SideMenuListItemLink href={link.href} active={link.isActive}>
                {link.title}
              </SideMenuListItemLink>
            </li>
          ))}
        </SideMenuList>
      </Drawer>
    </div>
  );
};
