import { Drawer, IconButton, ListItem, List } from "@serendie/ui";
import { Dd, Dl, Dt } from "src/components/LayoutUtils";
import { useState } from "react";

export function TypeSample() {
  const [leftOpen, setLeftOpen] = useState(false);
  const [rightOpen, setRightOpen] = useState(false);
  const [fullOpen, setFullOpen] = useState(false);

  return (
    <Dl>
      <Dt>Right</Dt>
      <Dd>
        <IconButton
          icon="menu"
          shape="rectangle"
          styleType="outlined"
          onClick={() => {
            setRightOpen(true);
          }}
        />
        <Drawer isOpen={rightOpen} onOpenChange={(e) => setRightOpen(e.open)}>
          <List>
            <ListItem title="Navigation 1" />
            <ListItem title="Navigation 2" />
            <ListItem title="Navigation 3" />
          </List>
        </Drawer>
      </Dd>
      <Dt>Left</Dt>
      <Dd>
        <IconButton
          icon="menu"
          shape="rectangle"
          styleType="outlined"
          onClick={() => {
            setLeftOpen(true);
          }}
        />
        <Drawer
          isOpen={leftOpen}
          onOpenChange={(e) => setLeftOpen(e.open)}
          type="left"
        >
          <List>
            <ListItem title="Navigation 1" />
            <ListItem title="Navigation 2" />
            <ListItem title="Navigation 3" />
          </List>
        </Drawer>
      </Dd>
      <Dt>Full</Dt>
      <Dd>
        <IconButton
          icon="menu"
          shape="rectangle"
          styleType="outlined"
          onClick={() => {
            setFullOpen(true);
          }}
        />
        <Drawer
          isOpen={fullOpen}
          onOpenChange={(e) => setFullOpen(e.open)}
          type="full"
        >
          <List>
            <ListItem title="Navigation 1" />
            <ListItem title="Navigation 2" />
            <ListItem title="Navigation 3" />
          </List>
        </Drawer>
      </Dd>
    </Dl>
  );
}
