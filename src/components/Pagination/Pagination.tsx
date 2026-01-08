import { Pagination as ArkPagination } from "@ark-ui/react/pagination";
import {
  SerendieSymbolChevronLeft,
  SerendieSymbolChevronRight,
} from "@serendie/symbols";
import React, { ComponentProps, useState } from "react";
import { IconButton } from "../IconButton";
import { cx, RecipeVariantProps, sva } from "../../../styled-system/css";
import { useTranslations } from "../../i18n";

export const PaginationStyle = sva({
  slots: ["root", "item", "ellipsis", "prevTrigger", "nextTrigger"],
  base: {
    root: {
      display: "flex",
      alignItems: "center",
      gap: "sd.system.dimension.spacing.none",
    },
    item: {
      height: 32,
      minWidth: 32,
      margin: 0,
      color: "sd.system.color.impression.primary",

      "&[data-selected]": {
        color: "sd.system.color.interaction.disabledOnSurface",
        fontWeight: "bold",
      },
    },
    ellipsis: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: 32,
      width: 32,
      textStyle: "sd.system.typography.body.medium_compact",
      _expanded: {
        textStyle: "sd.system.typography.body.medium_expanded",
      },
    },
    prevTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _disabled: {
        "& svg": {
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
    },
    nextTrigger: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      _disabled: {
        "& svg": {
          color: "sd.system.color.interaction.disabledOnSurface",
        },
      },
    },
  },
  variants: {
    size: {
      medium: {
        root: {
          gap: "sd.system.dimension.spacing.none",
        },
        item: {
          height: 32,
          minWidth: 32,
        },
        ellipsis: {
          height: 32,
          width: 32,
        },
      },
    },
  },
  defaultVariants: {
    size: "medium",
  },
});

export type PaginationProps = ComponentProps<"div"> &
  RecipeVariantProps<typeof PaginationStyle> & {
    count: number;
    pageSize?: number;
    page?: number;
    onPageChange?: (details: { page: number }) => void;
    siblingCount?: number;
    className?: string;
  };

export const Pagination = React.forwardRef<HTMLDivElement, PaginationProps>(
  (
    {
      count,
      pageSize = 1,
      page,
      onPageChange,
      siblingCount = 2,
      className,
      size = "medium",
      ...props
    },
    ref
  ) => {
    const [currentPage, setCurrentPage] = useState(1);
    const styles = PaginationStyle({ size });

    const handlePageChange = (details: { page: number }) => {
      if (!page) {
        setCurrentPage(details.page);
      }
      onPageChange?.(details);
    };

    const t = useTranslations();

    const paginationProps = {
      count,
      pageSize,
      siblingCount,
      ...(page ? { page } : { page: currentPage }),
      onPageChange: handlePageChange,
    };

    return (
      <ArkPagination.Root
        ref={ref}
        className={cx(styles.root, className)}
        {...paginationProps}
        {...props}
      >
        <ArkPagination.Context>
          {(ctx) => {
            const isFirstPage = ctx.page <= 1;
            const lastPage = Math.ceil(count / pageSize);
            const isLastPage = ctx.page >= lastPage;

            return (
              <>
                <ArkPagination.PrevTrigger
                  className={styles.prevTrigger}
                  disabled={isFirstPage}
                  asChild
                >
                  <IconButton
                    icon={<SerendieSymbolChevronLeft />}
                    shape="rectangle"
                    styleType="ghost"
                    size="small"
                    aria-label={
                      isFirstPage
                        ? t("pagination.firstPage")
                        : t("pagination.previousPage")
                    }
                    disabled={isFirstPage}
                    title={
                      isFirstPage
                        ? t("pagination.firstPage")
                        : t("pagination.previousPage")
                    }
                  />
                </ArkPagination.PrevTrigger>

                {ctx.pages.map((page, index) =>
                  page.type === "page" ? (
                    <ArkPagination.Item
                      key={index}
                      {...page}
                      className={styles.item}
                      asChild
                    >
                      <IconButton
                        icon={<>{page.value}</>}
                        shape="rectangle"
                        styleType="ghost"
                        size="small"
                        aria-label={t("pagination.goToPage", {
                          page: page.value,
                        })}
                        title={t("pagination.goToPage", { page: page.value })}
                      />
                    </ArkPagination.Item>
                  ) : (
                    <ArkPagination.Ellipsis
                      key={index}
                      index={index}
                      className={styles.ellipsis}
                    >
                      &#8230;
                    </ArkPagination.Ellipsis>
                  )
                )}

                <ArkPagination.NextTrigger
                  className={styles.nextTrigger}
                  disabled={isLastPage}
                  asChild
                >
                  <IconButton
                    icon={<SerendieSymbolChevronRight />}
                    shape="rectangle"
                    styleType="ghost"
                    size="small"
                    aria-label={
                      isLastPage
                        ? t("pagination.lastPage")
                        : t("pagination.nextPage")
                    }
                    disabled={isLastPage}
                    title={
                      isLastPage
                        ? t("pagination.lastPage")
                        : t("pagination.nextPage")
                    }
                  />
                </ArkPagination.NextTrigger>
              </>
            );
          }}
        </ArkPagination.Context>
      </ArkPagination.Root>
    );
  }
);
