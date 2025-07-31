import { DatePicker as ArkDatePicker, Portal } from "@ark-ui/react";
import type { DatePickerRootProps } from "@ark-ui/react";
import {
  SerendieSymbolCalendar,
  SerendieSymbolChevronLeft,
  SerendieSymbolChevronRight,
} from "@serendie/symbols";
import { forwardRef } from "react";
import { textFieldRecipe } from "../../../styled-system/recipes";
import { datePickerStyles } from "./styles";
import { css, cx } from "../../../styled-system/css";

interface DatePickerProps extends DatePickerRootProps {
  placeholder?: string;
  label?: string;
  required?: boolean;
  invalid?: boolean;
  invalidMessage?: string;
  startPlaceholder?: string;
  endPlaceholder?: string;
}

export const DatePickerComponent = forwardRef<HTMLDivElement, DatePickerProps>(
  (
    {
      placeholder = "日付を選択",
      label,
      required,
      invalid,
      invalidMessage,
      selectionMode = "single",
      startPlaceholder = "開始日",
      endPlaceholder = "終了日",
      locale = "ja-JP",
      ...props
    },
    ref
  ) => {
    const styles = datePickerStyles();
    const textFieldStyles = textFieldRecipe();

    return (
      <ArkDatePicker.Root
        locale={locale}
        {...props}
        ref={ref}
        selectionMode={selectionMode}
        className={textFieldStyles.root}
      >
        {label && (
          <ArkDatePicker.Label className={textFieldStyles.label}>
            {label}
            {required && (
              <span className={textFieldStyles.labelRequired}>必須</span>
            )}
          </ArkDatePicker.Label>
        )}
        <ArkDatePicker.Control className={textFieldStyles.inputWrapper}>
          <div></div>
          {selectionMode === "range" ? (
            <div
              className={css({
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
              })}
            >
              <ArkDatePicker.Input
                index={0}
                placeholder={startPlaceholder}
                className={cx(textFieldStyles.input, css({ minWidth: "100%" }))}
              />
              <ArkDatePicker.Input
                index={1}
                placeholder={endPlaceholder}
                className={cx(textFieldStyles.input, css({ minWidth: "100%" }))}
              />
            </div>
          ) : (
            <ArkDatePicker.Input
              placeholder={placeholder}
              className={textFieldStyles.input}
            />
          )}
          <div className={textFieldStyles.rightContent}>
            <ArkDatePicker.Trigger className={css({ display: "flex" })}>
              <SerendieSymbolCalendar />
            </ArkDatePicker.Trigger>
          </div>
        </ArkDatePicker.Control>
        {invalid && invalidMessage && (
          <div className={textFieldStyles.messageField}>
            <p className={textFieldStyles.invalidMessage}>{invalidMessage}</p>
          </div>
        )}
        <Portal>
          <ArkDatePicker.Positioner className={styles.positioner}>
            <ArkDatePicker.Content className={styles.content}>
              <ArkDatePicker.View view="day" className={styles.view}>
                <ArkDatePicker.Context>
                  {(api) => (
                    <>
                      <ArkDatePicker.ViewControl className={styles.viewControl}>
                        <ArkDatePicker.PrevTrigger
                          className={styles.prevTrigger}
                        >
                          <SerendieSymbolChevronLeft />
                        </ArkDatePicker.PrevTrigger>
                        <ArkDatePicker.YearSelect />
                        <ArkDatePicker.MonthSelect />
                        <ArkDatePicker.NextTrigger
                          className={styles.nextTrigger}
                        >
                          <SerendieSymbolChevronRight />
                        </ArkDatePicker.NextTrigger>
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
          </ArkDatePicker.Positioner>
        </Portal>
      </ArkDatePicker.Root>
    );
  }
);

DatePickerComponent.displayName = "DatePicker";

export { DatePickerComponent as DatePicker };
