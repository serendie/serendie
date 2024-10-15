import { Drawer } from "@serendie/ui";
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
      <button
        onClick={() => {
          setIsOpen(true);
        }}
        className={css({
          color: "sd.reference.color.scale.white.1000",
          sm: {
            display: "none",
          },
        })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={24}
          height={24}
          fill="none"
        >
          <g
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.4}
          >
            <path d="M21.048 4H2.952C2.426 4 2 4.341 2 4.762v14.476c0 .42.426.762.952.762h18.096c.526 0 .952-.341.952-.762V4.762c0-.42-.426-.762-.952-.762ZM9 4v15M4 7.805h2.828M4 10.805h2.828" />
          </g>
        </svg>
      </button>

      <Drawer
        type="full"
        isOpen={isOpen}
        onOpenChange={(newIsOpen) => {
          setIsOpen(newIsOpen.open);
        }}
      >
        <div
          className={css({
            pt: "sd.system.dimension.spacing.extraLarge",
            h: "100%",
            w: "100%",
            display: "flex",
            alignItems: "start",
            justifyContent: "start",
            bg: "web.system.color.impression.primary",
          })}
        >
          <SideMenuList w="100%">
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
