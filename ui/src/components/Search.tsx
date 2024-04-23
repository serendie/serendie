import { Combobox, ComboboxRootProps, Portal } from "@ark-ui/react";
import { sva } from "../../styled-system/css";
/*
 * 検索候補を出すことができるサーチコンボボックス
 * https://ark-ui.com/docs/components/combobox
 * 候補のリストを受け取っていない時には通常の検索窓として使える
 * items: 検索候補のリスト、Easyさを優先しているので型はstringのみ
 */

export const SearchStyle = sva({
  slots: ["root"],
  base: {},
  variants: {},
});

export const Search: React.FC<ComboboxRootProps<string>> = ({
  items = [],
  ...props
}) => {
  const styles = SearchStyle(props);

  return (
    <Combobox.Root
      items={items}
      lazyMount
      unmountOnExit
      {...props}
      className={styles.root}>
      <Combobox.Label>Framework</Combobox.Label>
      <Combobox.Control>
        <Combobox.Input />
        <Combobox.Trigger>Open</Combobox.Trigger>
        <Combobox.ClearTrigger>Clear</Combobox.ClearTrigger>
      </Combobox.Control>
      {items.length > 0 && (
        <Portal>
          <Combobox.Positioner>
            <Combobox.Content>
              <Combobox.ItemGroup id="framework">
                <Combobox.ItemGroupLabel htmlFor="framework">
                  Frameworks
                </Combobox.ItemGroupLabel>
                {items.map((item, i) => (
                  <Combobox.Item key={i} item={item}>
                    <Combobox.ItemText>{item}</Combobox.ItemText>
                    <Combobox.ItemIndicator>✓</Combobox.ItemIndicator>
                  </Combobox.Item>
                ))}
              </Combobox.ItemGroup>
            </Combobox.Content>
          </Combobox.Positioner>
        </Portal>
      )}
    </Combobox.Root>
  );
};
