import { DatePicker as ArkDatePicker, Portal } from "@ark-ui/react";
import type { DatePickerRootProps } from "@ark-ui/react";
import {
  SerendieSymbolCalendar,
  SerendieSymbolChevronLeft,
  SerendieSymbolChevronRight,
} from "@serendie/symbols";
import { RecipeVariantProps, css, cx, sva } from "../../../styled-system/css";

export const DatePickerStyle = sva({
  slots: [
    "root",
    "label",
    "control",
    "input",
    "trigger",
    "content",
    "calendar",
    "viewControl",
    "yearSelect",
    "monthSelect",
    "table",
    "dayCell",
  ],
  base: {
    root: {
      display: "inline-grid",
      "@layer components": {
        width: "min(100%, 300px)",
      },
      rowGap: "sd.system.dimension.spacing.extraSmall",
    },
    label: {
      textStyle: {
        base: "sd.system.typography.label.medium_compact",
        expanded: "sd.system.typography.label.medium_expanded",
      },
    },
    control: {
      display: "grid",
      gridTemplateColumns: "1fr auto",
      alignItems: "center",
    },
    input: {
      width: "100%",
      textAlign: "left",
      paddingTop: "sd.system.dimension.spacing.small",
      paddingRight: "sd.system.dimension.spacing.extraSmall",
      paddingBottom: "sd.system.dimension.spacing.small",
      paddingLeft: "sd.system.dimension.spacing.medium",
      borderRadius: "sd.system.dimension.radius.medium",
      outlineStyle: "solid",
      outlineWidth: "sd.system.dimension.border.medium",
      outlineColor: "sd.system.color.component.outline",
      bg: "sd.system.color.component.surface",
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
      _enabled: {
        _focusVisible: {
          outlineWidth: "sd.system.dimension.border.thick",
          outlineColor: "sd.system.color.impression.primary",
        },
        _hover: {
          outlineColor: "sd.system.color.interaction.hovered",
          bg: "color-mix(in srgb, {colors.sd.system.color.component.surface}, {colors.sd.system.color.interaction.hoveredVariant})",
        },
      },
      _disabled: {
        bgColor: "sd.system.color.interaction.disabled",
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
      },
      "[data-invalid] &": {
        outlineColor: "sd.system.color.impression.negative",
      },
      _placeholder: {
        color: "sd.system.color.component.onSurfaceVariant",
      },
    },
    trigger: {
      position: "absolute",
      right: "sd.system.dimension.spacing.extraSmall",
      w: "40px",
      h: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      cursor: "pointer",
      color: "sd.system.color.component.onSurface",
      "[data-disabled] &": {
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
      },
    },
    content: {
      bgColor: "sd.system.color.component.surface",
      borderRadius: "sd.system.dimension.radius.medium",
      boxShadow: "sd.system.elevation.shadow.level1",
      zIndex: "sd.system.elevation.zIndex.dropdown",
      padding: "sd.system.dimension.spacing.medium",
    },
    calendar: {
      display: "grid",
      gap: "sd.system.dimension.spacing.small",
    },
    viewControl: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "sd.system.dimension.spacing.small",
    },
    yearSelect: {
      appearance: "none",
      border: "none",
      bg: "transparent",
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
      cursor: "pointer",
      padding: "sd.system.dimension.spacing.extraSmall",
      borderRadius: "sd.system.dimension.radius.small",
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
    },
    monthSelect: {
      appearance: "none",
      border: "none",
      bg: "transparent",
      textStyle: {
        base: "sd.system.typography.body.medium_compact",
        expanded: "sd.system.typography.body.medium_expanded",
      },
      cursor: "pointer",
      padding: "sd.system.dimension.spacing.extraSmall",
      borderRadius: "sd.system.dimension.radius.small",
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
    },
    table: {
      width: "100%",
      borderSpacing: "sd.system.dimension.spacing.extraSmall",
    },
    dayCell: {
      width: "40px",
      height: "40px",
      textAlign: "center",
      cursor: "pointer",
      borderRadius: "sd.system.dimension.radius.small",
      textStyle: {
        base: "sd.system.typography.body.small_compact",
      },
      _hover: {
        bg: "sd.system.color.interaction.hoveredVariant",
      },
      _selected: {
        bg: "sd.system.color.impression.primary",
        color: "sd.system.color.component.onPrimary",
      },
      _today: {
        fontWeight: "bold",
        textDecoration: "underline",
      },
      _unavailable: {
        color: "sd.system.color.interaction.disabledOnSurface",
        cursor: "not-allowed",
      },
    },
  },
  variants: {
    size: {
      medium: {
        input: {
          height: 48,
        },
      },
      small: {
        root: {
          "@layer components": {
            width: "min(100%, 200px)",
          },
        },
        label: {
          textStyle: {
            base: "sd.system.typography.label.small_compact",
          },
        },
        input: {
          height: 32,
          paddingTop: "sd.system.dimension.spacing.twoExtraSmall",
          paddingBottom: "sd.system.dimension.spacing.twoExtraSmall",
          paddingLeft: "sd.system.dimension.spacing.extraSmall",
          borderRadius: "sd.system.dimension.radius.small",
          textStyle: {
            base: "sd.system.typography.body.small_compact",
          },
        },
        content: {
          borderRadius: "sd.system.dimension.radius.small",
          padding: "sd.system.dimension.spacing.small",
        },
        yearSelect: {
          textStyle: {
            base: "sd.system.typography.body.small_compact",
          },
        },
        monthSelect: {
          textStyle: {
            base: "sd.system.typography.body.small_compact",
          },
        },
        dayCell: {
          width: "32px",
          height: "32px",
          textStyle: {
            base: "sd.system.typography.body.extraSmall_compact",
          },
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

type Props = {
  placeholder?: string;
  label?: string;
  required?: boolean;
  invalid?: boolean;
  invalidMessage?: string;
  format?: string;
};

type DatePickerStyleProps = Props &
  DatePickerRootProps &
  RecipeVariantProps<typeof DatePickerStyle>;

export const DatePicker: React.FC<DatePickerStyleProps> = ({
  placeholder = "日付を選択",
  label,
  required,
  invalid,
  invalidMessage,
  //format = "yyyy/MM/dd",
  className,
  ...props
}) => {
  const [variantProps, datePickerProps] =
    DatePickerStyle.splitVariantProps(props);
  const styles = DatePickerStyle(variantProps);

  const monthNames = [
    "1月",
    "2月",
    "3月",
    "4月",
    "5月",
    "6月",
    "7月",
    "8月",
    "9月",
    "10月",
    "11月",
    "12月",
  ];

  const weekDayNames = ["日", "月", "火", "水", "木", "金", "土"];

  return (
    <ArkDatePicker.Root
      {...datePickerProps}
      className={cx(styles.root, className)}
      positioning={{
        placement: "bottom-start",
        offset: {
          mainAxis: 1,
          crossAxis: 0,
        },
      }}
    >
      {label && variantProps.size !== "small" && (
        <ArkDatePicker.Label className={styles.label}>
          {label}
          {required && (
            <span
              className={css({
                pl: "sd.system.dimension.spacing.extraSmall",
                color: "sd.system.color.impression.negative",
              })}
            >
              必須
            </span>
          )}
        </ArkDatePicker.Label>
      )}
      <ArkDatePicker.Control className={styles.control}>
        <ArkDatePicker.Input
          placeholder={placeholder}
          className={styles.input}
          data-invalid={invalid || undefined}
        />
        <ArkDatePicker.Trigger className={styles.trigger}>
          <SerendieSymbolCalendar />
        </ArkDatePicker.Trigger>
      </ArkDatePicker.Control>
      {invalid && invalidMessage && (
        <div
          className={css({
            textStyle: {
              base: "sd.system.typography.body.extraSmall_compact",
              expanded: "sd.system.typography.body.extraSmall_expanded",
            },
            color: "sd.system.color.impression.negative",
          })}
        >
          {invalidMessage}
        </div>
      )}
      <Portal>
        <ArkDatePicker.Positioner>
          <ArkDatePicker.Content className={styles.content}>
            <ArkDatePicker.View view="day">
              <ArkDatePicker.Context>
                {(context) => (
                  <div className={styles.calendar}>
                    <div className={styles.viewControl}>
                      <ArkDatePicker.PrevTrigger
                        className={css({
                          appearance: "none",
                          border: "none",
                          bg: "transparent",
                          cursor: "pointer",
                          padding: "sd.system.dimension.spacing.extraSmall",
                          borderRadius: "sd.system.dimension.radius.small",
                          _hover: {
                            bg: "sd.system.color.interaction.hoveredVariant",
                          },
                        })}
                      >
                        <SerendieSymbolChevronLeft />
                      </ArkDatePicker.PrevTrigger>
                      <div
                        className={css({
                          display: "flex",
                          gap: "sd.system.dimension.spacing.small",
                        })}
                      >
                        <ArkDatePicker.ViewTrigger>
                          <ArkDatePicker.RangeText
                            className={styles.yearSelect}
                          />
                        </ArkDatePicker.ViewTrigger>
                        <select
                          value={context.focusedValue.month}
                          onChange={(e) => {
                            context.focusMonth(parseInt(e.target.value));
                          }}
                          className={styles.monthSelect}
                        >
                          {monthNames.map((month, index) => (
                            <option key={index} value={index + 1}>
                              {month}
                            </option>
                          ))}
                        </select>
                      </div>
                      <ArkDatePicker.NextTrigger
                        className={css({
                          appearance: "none",
                          border: "none",
                          bg: "transparent",
                          cursor: "pointer",
                          padding: "sd.system.dimension.spacing.extraSmall",
                          borderRadius: "sd.system.dimension.radius.small",
                          _hover: {
                            bg: "sd.system.color.interaction.hoveredVariant",
                          },
                        })}
                      >
                        <SerendieSymbolChevronRight />
                      </ArkDatePicker.NextTrigger>
                    </div>
                    <ArkDatePicker.Table className={styles.table}>
                      <ArkDatePicker.TableHead>
                        <ArkDatePicker.TableRow>
                          {weekDayNames.map((day, index) => (
                            <ArkDatePicker.TableHeader key={index}>
                              <div
                                className={css({
                                  textAlign: "center",
                                  textStyle: {
                                    base: "sd.system.typography.body.extraSmall_compact",
                                  },
                                  color:
                                    index === 0
                                      ? "sd.system.color.impression.negative"
                                      : index === 6
                                        ? "sd.system.color.impression.primary"
                                        : undefined,
                                })}
                              >
                                {day}
                              </div>
                            </ArkDatePicker.TableHeader>
                          ))}
                        </ArkDatePicker.TableRow>
                      </ArkDatePicker.TableHead>
                      <ArkDatePicker.TableBody>
                        {context.weeks.map((week, weekIndex) => (
                          <ArkDatePicker.TableRow key={weekIndex}>
                            {week.map((day, dayIndex) => (
                              <ArkDatePicker.TableCell
                                key={dayIndex}
                                value={day}
                              >
                                <ArkDatePicker.TableCellTrigger
                                  className={styles.dayCell}
                                >
                                  {day.day}
                                </ArkDatePicker.TableCellTrigger>
                              </ArkDatePicker.TableCell>
                            ))}
                          </ArkDatePicker.TableRow>
                        ))}
                      </ArkDatePicker.TableBody>
                    </ArkDatePicker.Table>
                  </div>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
            <ArkDatePicker.View view="month">
              <ArkDatePicker.Context>
                {(context) => (
                  <div className={styles.calendar}>
                    <div className={styles.viewControl}>
                      <ArkDatePicker.PrevTrigger
                        className={css({
                          appearance: "none",
                          border: "none",
                          bg: "transparent",
                          cursor: "pointer",
                          padding: "sd.system.dimension.spacing.extraSmall",
                          borderRadius: "sd.system.dimension.radius.small",
                          _hover: {
                            bg: "sd.system.color.interaction.hoveredVariant",
                          },
                        })}
                      >
                        <SerendieSymbolChevronLeft />
                      </ArkDatePicker.PrevTrigger>
                      <ArkDatePicker.ViewTrigger>
                        <ArkDatePicker.RangeText
                          className={styles.yearSelect}
                        />
                      </ArkDatePicker.ViewTrigger>
                      <ArkDatePicker.NextTrigger
                        className={css({
                          appearance: "none",
                          border: "none",
                          bg: "transparent",
                          cursor: "pointer",
                          padding: "sd.system.dimension.spacing.extraSmall",
                          borderRadius: "sd.system.dimension.radius.small",
                          _hover: {
                            bg: "sd.system.color.interaction.hoveredVariant",
                          },
                        })}
                      >
                        <SerendieSymbolChevronRight />
                      </ArkDatePicker.NextTrigger>
                    </div>
                    <div
                      className={css({
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "sd.system.dimension.spacing.small",
                      })}
                    >
                      {monthNames.map((month, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            context.focusMonth(index + 1);
                            context.setView("day");
                          }}
                          className={css({
                            padding: "sd.system.dimension.spacing.small",
                            borderRadius: "sd.system.dimension.radius.small",
                            textAlign: "center",
                            cursor: "pointer",
                            border: "none",
                            background: "transparent",
                            _hover: {
                              bg: "sd.system.color.interaction.hoveredVariant",
                            },
                            _selected: {
                              bg: "sd.system.color.impression.primary",
                              color: "sd.system.color.component.onSurface",
                            },
                          })}
                        >
                          {month}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
            <ArkDatePicker.View view="year">
              <ArkDatePicker.Context>
                {(context) => (
                  <div className={styles.calendar}>
                    <div className={styles.viewControl}>
                      <ArkDatePicker.PrevTrigger
                        className={css({
                          appearance: "none",
                          border: "none",
                          bg: "transparent",
                          cursor: "pointer",
                          padding: "sd.system.dimension.spacing.extraSmall",
                          borderRadius: "sd.system.dimension.radius.small",
                          _hover: {
                            bg: "sd.system.color.interaction.hoveredVariant",
                          },
                        })}
                      >
                        <SerendieSymbolChevronLeft />
                      </ArkDatePicker.PrevTrigger>
                      <ArkDatePicker.RangeText className={styles.yearSelect} />
                      <ArkDatePicker.NextTrigger
                        className={css({
                          appearance: "none",
                          border: "none",
                          bg: "transparent",
                          cursor: "pointer",
                          padding: "sd.system.dimension.spacing.extraSmall",
                          borderRadius: "sd.system.dimension.radius.small",
                          _hover: {
                            bg: "sd.system.color.interaction.hoveredVariant",
                          },
                        })}
                      >
                        <SerendieSymbolChevronRight />
                      </ArkDatePicker.NextTrigger>
                    </div>
                    <div
                      className={css({
                        display: "grid",
                        gridTemplateColumns: "repeat(3, 1fr)",
                        gap: "sd.system.dimension.spacing.small",
                      })}
                    >
                      {Array.from({ length: 12 }, (_, i) => {
                        const decade =
                          Math.floor(context.focusedValue.year / 10) * 10;
                        const year = decade + i;
                        return (
                          <button
                            key={year}
                            onClick={() => {
                              context.focusYear(year);
                              context.setView("month");
                            }}
                            className={css({
                              padding: "sd.system.dimension.spacing.small",
                              borderRadius: "sd.system.dimension.radius.small",
                              textAlign: "center",
                              cursor: "pointer",
                              border: "none",
                              background: "transparent",
                              _hover: {
                                bg: "sd.system.color.interaction.hoveredVariant",
                              },
                              "[data-selected] &": {
                                bg: "sd.system.color.impression.primary",
                                color: "sd.system.color.component.onPrimary",
                              },
                            })}
                          >
                            {year}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </ArkDatePicker.Context>
            </ArkDatePicker.View>
          </ArkDatePicker.Content>
        </ArkDatePicker.Positioner>
      </Portal>
    </ArkDatePicker.Root>
  );
};
