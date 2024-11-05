import { List, ListItem } from "@serendie/ui";
import { useRef } from "react";
import IconClose from "../assets/icon/outline/close.svg?react";
import IconMenu from "../assets/icon/outline/menu.svg?react";
import { css } from "styled-system/css";
import { ThemeSelector } from "./ThemeSelector";

export const GlobalHeaderMenu: React.FC<{
  menuItems: {
    href: string;
    text: string;
  }[];
}> = ({ menuItems }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  return (
    <div>
      <button
        aria-label="メニューを開く"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <IconMenu />
      </button>
      <dialog
        ref={dialogRef}
        className={css({
          bg: "web.system.color.impression.tertiary",
          width: "100%",
          height: "100%",
          maxWidth: "100%",
          maxHeight: "100%",
          zIndex: "99999",
          pointerEvents: "none",
          willChange: "transform",
          animation: "menuSlideOut 0.2s ease-in-out",
          _open: {
            animation: "menuSlideIn 0.2s ease-in-out",
            pointerEvents: "auto",
          },
          "&::backdrop": {
            bg: "transparent",
          },
        })}
      >
        <button
          aria-label="メニューを閉じる"
          onClick={() => {
            dialogRef.current?.close();
          }}
        >
          <IconClose aria-label="Close" />
        </button>
        <List>
          {menuItems.map((item) => (
            <a key={item.href} href={item.href}>
              <ListItem title={item.text} />
            </a>
          ))}
        </List>
        <ThemeSelector />
      </dialog>
    </div>
  );
};
