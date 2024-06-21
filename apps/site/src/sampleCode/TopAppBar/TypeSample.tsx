import { Dd, Dl, Dt } from "@/components/LayoutUtils";
import { IconButton } from "@serendie/ui";
import { TopAppBar } from "@serendie/ui";

export function TypeSample() {
  return (
    <Dl>
      <Dt>Navbar</Dt>
      <Dd>
        <TopAppBar
          type="navbar"
          headingIconButton={
            <IconButton icon="menu" styleType="ghost" shape="rectangle" />
          }
          trailingIconButtons={
            <IconButton icon="search" styleType="ghost" shape="rectangle" />
          }
        />
      </Dd>

      <Dt>Title Bar</Dt>
      <Dd>
        <TopAppBar
          type="titleBar"
          title="Default"
          trailingIconButtons={
            <IconButton icon="add" styleType="ghost" shape="rectangle" />
          }
        />
      </Dd>

      <Dt>Navbar + Title Bar</Dt>
      <Dd>
        <TopAppBar
          type="navbar"
          headingIconButton={
            <IconButton icon="menu" styleType="ghost" shape="rectangle" />
          }
          trailingIconButtons={
            <IconButton icon="search" styleType="ghost" shape="rectangle" />
          }
        />
        <TopAppBar
          type="titleBar"
          title="Default"
          trailingIconButtons={
            <IconButton icon="add" styleType="ghost" shape="rectangle" />
          }
        />
      </Dd>

      <Dt>Navbar + Title Bar</Dt>
      <Dd>
        <TopAppBar
          type="navbar"
          headingIconButton={
            <IconButton icon="menu" styleType="ghost" shape="rectangle" />
          }
          trailingIconButtons={
            <IconButton icon="search" styleType="ghost" shape="rectangle" />
          }
        />
        <TopAppBar
          type="titleBar"
          title="Default"
          headingIconButton={
            <IconButton
              icon="chevron_left"
              styleType="ghost"
              shape="rectangle"
            />
          }
          trailingIconButtons={
            <IconButton icon="add" styleType="ghost" shape="rectangle" />
          }
        />
      </Dd>
    </Dl>
  );
}
