import { useRef } from "react";
import IconClose from "../assets/icon/outline/close.svg?react";
import IconMenu from "../assets/icon/outline/menu.svg?react";
import IconFigma from "../assets/logo/figma-bw.svg?react";
import IconGitHub from "../assets/logo/github.svg?react";
import IconX from "../assets/logo/x.svg?react";
import { css } from "styled-system/css";
import { ThemeSelector } from "./ThemeSelector";
import { HeaderTitleContent } from "./toppage/Header";

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
        className={css({
          display: "flex",
          p: "3px",
          "& svg > path": {
            fill: "currentColor",
          },
        })}
        aria-label="メニューを開く"
        onClick={() => {
          dialogRef.current?.showModal();
        }}
      >
        <IconMenu width={18} height={18} />
      </button>
      <dialog
        ref={dialogRef}
        className={css({
          bg: "web.system.color.impression.tertiary",
          color: "web.system.color.impression.onTertiary",
          padding: "sd.system.dimension.spacing.extraLarge",
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
        <div className={css({ display: "flex", justifyContent: "flex-end" })}>
          <button
            className={css({
              display: "flex",
              p: "4px",
              "& svg > path": {
                fill: "currentColor",
              },
            })}
            aria-label="メニューを閉じる"
            onClick={() => {
              dialogRef.current?.close();
            }}
          >
            <IconClose width={18} height={18} />
          </button>
        </div>
        <div className={css({ maxWidth: "768px", mx: "auto" })}>
          <div
            className={css({
              display: "flex",
              gap: "6px",
              flexDirection: "column",
              maxWidth: "180px",
              fontSize: "18px",
              mb: "40px",
              mt: "56px",
            })}
          >
            <a href="/">
              <HeaderTitleContent />
            </a>
          </div>
          <div
            className={css({
              display: "flex",
              flexDirection: "column",
              gap: "28px",
              mb: "28px",
              fontSize: "18px",
              fontWeight: "sd.reference.typography.fontWeight.bold",
            })}
          >
            {menuItems.map((item) => (
              <a key={item.href} href={item.href}>
                {item.text}
              </a>
            ))}
          </div>
          <ThemeSelector
            buttonClassName={css({
              width: "327px",
              maxWidth: "calc(100vw - 48px)",
            })}
          />
          <div
            className={css({
              my: "64px",
              display: "flex",
              justifyContent: "space-between",
              width: "200px",
              mx: "auto",
              "& svg path[fill='#000000']": {
                fill: "currentColor",
              },
            })}
          >
            <IconFigma width="40px" height="40px" />
            <IconX width="40px" height="40px" />
            <IconGitHub width="40px" height="40px" />
          </div>
          <div>© Mitsubishi Electric Corporation</div>
        </div>
      </dialog>
    </div>
  );
};
