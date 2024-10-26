import { Drawer, IconButton, List, ListItem } from "@serendie/ui";
import { useState } from "react";
import { css } from "styled-system/css";

export const GlobalHeaderMenu: React.FC<{
  menuItems: {
    href: string;
    text: string;
  }[];
}> = ({ menuItems }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <IconButton
        // color="web.system.color.component.background.onSurface"
        className={css({
          color: "var(--colors-web-system-color-impression-on-tertiary)",
        })}
        styleType="ghost"
        icon="menu"
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
        <List>
          {menuItems.map((item) => (
            <a key={item.href} href={item.href}>
              <ListItem title={item.text} />
            </a>
          ))}
        </List>
      </Drawer>
    </div>
  );
};
