import { DatePicker as ArkDatePicker, Portal } from "@ark-ui/react";
import type { DatePickerRootProps } from "@ark-ui/react";
import {
  SerendieSymbolArrowRight,
  SerendieSymbolCalendar,
  SerendieSymbolChevronDown,
  SerendieSymbolChevronLeft,
  SerendieSymbolChevronRight,
} from "@serendie/symbols";
import { forwardRef, useState } from "react";
import { datePickerStyles } from "./styles";
import { css, cx, RecipeVariantProps } from "../../../styled-system/css";
import { textFieldRecipe } from "../../recipes/textFieldRecipe";
import { useAutoPortalContainer } from "../../hooks/useAutoPortalContainer";

type DatePickerProps = DatePickerRootProps &
  RecipeVariantProps<typeof textFieldRecipe> & {
    placeholder?: string;
    label?: string;
    required?: boolean;
    requiredLabel?: string;
    invalid?: boolean;
    invalidMessage?: string;
    startPlaceholder?: string;
    endPlaceholder?: string;
    isCalendarOnly?: boolean;
    /**
     * Portalを使用するかどうか
     * - `true` (デフォルト): body直下にポータルする。ModalDialog/Drawer内にある場合は自動的にそのコンテンツ内にポータルされる
     * - `false`: ポータルを使用せず、その場にレンダリングする
     * @default true
     */
    portalled?: boolean;
  };

export const DatePicker = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      placeholder = "日付を選択",
      label,
      required,
      requiredLabel,
      invalid,
      invalidMessage,
      selectionMode = "single",
      startPlaceholder = "開始日",
      endPlaceholder = "終了日",
      locale = "ja-JP",
      isCalendarOnly = false,
      portalled = true,
      ...props
    },
    ref
  ) => {
    const styles = datePickerStyles();
    const [variantProps, elementProps] = textFieldRecipe.splitVariantProps({
      ...props,
    });
    const textFieldStyles = textFieldRecipe(variantProps);
    const [isOpen, setIsOpen] = useState(false);
    const isRange = selectionMode === "range";
    const { triggerRef, portalContainerRef } =
      useAutoPortalContainer(portalled);

    return isCalendarOnly ? (
      <ArkDatePicker.Root
        locale={locale}
        {...elementProps}
        ref={ref}
        selectionMode={selectionMode}
        open={true}
        className={textFieldStyles.root}
      >
        <Calendar />
      </ArkDatePicker.Root>
    ) : (
      <ArkDatePicker.Root
        locale={locale}
        {...props}
        ref={ref}
        selectionMode={selectionMode}
        className={textFieldStyles.root}
        open={isOpen}
        onOpenChange={(details) => {
          setIsOpen(details.open);
          props.onOpenChange?.(details);
        }}
      >
        <>
          {label && (
            <ArkDatePicker.Label className={textFieldStyles.label}>
              {label}
              {required && (
                <span className={textFieldStyles.labelRequired}>
                  {requiredLabel ?? "必須"}
                </span>
              )}
            </ArkDatePicker.Label>
          )}

          <ArkDatePicker.Control
            className={cx(
              textFieldStyles.inputWrapper,
              css({
                _expanded: {
                  outlineWidth: "sd.system.dimension.border.thick",
                  outlineColor: "sd.system.color.impression.primary",
                },
              })
            )}
            data-expanded={isOpen ? true : undefined}
            data-Invalid={invalid}
          >
            <div className={textFieldStyles.leftContent}>
              <ArkDatePicker.Trigger
                className={css({ display: "flex" })}
                ref={triggerRef}
              >
                <SerendieSymbolCalendar />
              </ArkDatePicker.Trigger>
            </div>
            {isRange ? (
              <div
                className={css({
                  display: "grid",
                  gridTemplateColumns: "1fr auto 1fr",
                  alignItems: "center",
                })}
              >
                <ArkDatePicker.Input
                  index={0}
                  placeholder={startPlaceholder}
                  className={cx(
                    textFieldStyles.input,
                    css({
                      minWidth: "100%",
                      borderRadius: "sd.system.dimension.radius.medium",
                    })
                  )}
                  onFocus={() => setIsOpen(true)}
                />
                <SerendieSymbolArrowRight />
                <ArkDatePicker.Input
                  index={1}
                  placeholder={endPlaceholder}
                  className={cx(
                    textFieldStyles.input,
                    css({
                      minWidth: "100%",
                      borderRadius: "sd.system.dimension.radius.medium",
                    })
                  )}
                  onFocus={() => setIsOpen(true)}
                />
              </div>
            ) : (
              <ArkDatePicker.Input
                placeholder={placeholder}
                className={textFieldStyles.input}
                onFocus={() => setIsOpen(true)}
              />
            )}
            <div></div>
          </ArkDatePicker.Control>

          {invalid && invalidMessage && (
            <div className={textFieldStyles.messageField}>
              <p className={textFieldStyles.invalidMessage}>{invalidMessage}</p>
            </div>
          )}
        </>
        <Portal disabled={!portalled} container={portalContainerRef}>
          <ArkDatePicker.Positioner className={styles.positioner}>
            <Calendar />
          </ArkDatePicker.Positioner>
        </Portal>
      </ArkDatePicker.Root>
    );
  }
);

const Calendar = () => {
  const styles = datePickerStyles();

  return (
    <ArkDatePicker.Content className={styles.content}>
      <ArkDatePicker.View view="day" className={styles.view}>
        <ArkDatePicker.Context>
          {(api) => (
            <>
              <ArkDatePicker.ViewControl className={styles.viewControl}>
                <div className={styles.selectWrapper}>
                  <ArkDatePicker.YearSelect className={styles.select} />
                  <SerendieSymbolChevronDown className={styles.selectIcon} />
                </div>
                <div className={css({ display: "flex", alignItems: "center" })}>
                  <ArkDatePicker.PrevTrigger className={styles.prevTrigger}>
                    <SerendieSymbolChevronLeft />
                  </ArkDatePicker.PrevTrigger>
                  <ArkDatePicker.MonthSelect
                    className={css({
                      appearance: "none",
                      textAlign: "center",
                    })}
                  />
                  <ArkDatePicker.NextTrigger className={styles.nextTrigger}>
                    <SerendieSymbolChevronRight />
                  </ArkDatePicker.NextTrigger>
                </div>
              </ArkDatePicker.ViewControl>

              <ArkDatePicker.Table className={styles.table}>
                <ArkDatePicker.TableHead>
                  <ArkDatePicker.TableRow>
                    {api.weekDays.map((weekDay, id) => (
                      <ArkDatePicker.TableHeader
                        key={id}
                        className={styles.tableHeader}
                      >
                        {weekDay.narrow}
                      </ArkDatePicker.TableHeader>
                    ))}
                  </ArkDatePicker.TableRow>
                </ArkDatePicker.TableHead>
                <ArkDatePicker.TableBody>
                  {api.weeks.map((week, id) => (
                    <ArkDatePicker.TableRow key={id}>
                      {week.map((day, id) => (
                        <ArkDatePicker.TableCell
                          key={id}
                          value={day}
                          className={styles.tableCell}
                        >
                          <ArkDatePicker.TableCellTrigger
                            className={styles.tableCellTrigger}
                          >
                            {day.day}
                          </ArkDatePicker.TableCellTrigger>
                        </ArkDatePicker.TableCell>
                      ))}
                    </ArkDatePicker.TableRow>
                  ))}
                </ArkDatePicker.TableBody>
              </ArkDatePicker.Table>
            </>
          )}
        </ArkDatePicker.Context>
      </ArkDatePicker.View>
    </ArkDatePicker.Content>
  );
};
