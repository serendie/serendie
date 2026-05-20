# Figma Node ID リファレンス

## コンポーネント一覧と Figma Node ID

| コンポーネント | Node ID | 実装ファイル |
|--------------|---------|-------------|
| Accordion | 4728-44779 | src/components/Accordion/Accordion.tsx |
| Avatar | 3661-24552 | src/components/Avatar/Avatar.tsx |
| Badge | 3285-27625 | src/components/Badge/Badge.tsx |
| Banner | 4546-10391 | src/components/Banner/Banner.tsx |
| BottomNavigation | 1001-20737 | src/components/BottomNavigation/BottomNavigationItem.tsx |
| Button | 3066-14086 | src/components/Button/Button.tsx |
| Chart | 17792-14082 | src/components/Chart/SerendieChartTheme.tsx |
| CheckBox | 5129-40889 | src/components/CheckBox/CheckBox.tsx |
| ChoiceBox | 6816-45671 | src/components/ChoiceBox/ChoiceBox.tsx |
| DashboardWidget | 3359-9200 | src/components/DashboardWidget/DashboardWidget.tsx |
| DataTable | 17879-8713 | src/components/DataTable/table/*.tsx |
| DatePicker | 17871-5058 | src/components/DatePicker/styles.ts |
| Divider | 3122-30116 | src/components/Divider/Divider.tsx |
| Drawer | 3223-28928 | src/components/Drawer/Drawer.tsx |
| DropdownMenu | 6375-6010 | src/components/DropdownMenu/DropdownMenu.tsx |
| IconButton | 3107-13402 | src/components/IconButton/IconButton.tsx |
| List | 3442-9387 | src/components/List/ListItem.tsx |
| ModalDialog | 3311-28000 | src/components/ModalDialog/ModalDialog.tsx |
| NotificationBadge | 1262-28909 | src/components/NotificationBadge/NotificationBadge.tsx |
| Pagination | 17965-15475 | src/components/Pagination/Pagination.tsx |
| PasswordField | 17427-3758 | src/components/PasswordField/PasswordField.tsx |
| ProgressIndicator | - | src/components/ProgressIndicator/*.tsx |
| RadioButton | 3354-7943 | src/components/RadioButton/RadioButton.tsx |
| Search | 3311-28188 | src/components/Search/Search.tsx |
| Select | 3154-26212 | src/components/Select/Select.tsx |
| Switch | 3311-28493 | src/components/Switch/Switch.tsx |
| Tabs | 3430-26917 | src/components/Tabs/TabItem.tsx |
| TextArea | 1406-17592 | src/components/TextArea/TextArea.tsx |
| TextField | 5113-4273 | src/components/TextField/TextField.tsx, src/recipes/textFieldRecipe.ts |
| Toast | 3256-16094 | src/components/Toast/Toast.tsx |
| Tooltip | 20276-13553 | src/components/Tooltip/Tooltip.tsx |
| TopAppBar | 1353-14085 | src/components/TopAppBar/TopAppBar.tsx |

## Node ID の取得方法

Stories ファイルから Figma URL を grep で検索：

```bash
grep -r "figma.*node-id" src/components/
```

URL 例: `https://www.figma.com/design/.../Serendie-UI-Kit?node-id=3066-14086`

Node ID は `node-id=` の後の値。ハイフンをコロンに変換して使用（`3066-14086` → `3066:14086`）

## 注意事項

- ProgressIndicator は Stories に Figma URL がないため、手動確認が必要
- 複合コンポーネント（DataTable, Tabs など）は複数ファイルを確認
- PasswordField は TextField のラッパーなので TextField の修正が適用される
