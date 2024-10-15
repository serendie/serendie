import { Drawer, IconButton, List, ListItem } from "@serendie/ui";
import { useState } from "react";

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
