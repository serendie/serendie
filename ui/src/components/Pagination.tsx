import { Pagination as ArkPagination } from "@ark-ui/react/pagination";
import { cx, sva } from "../../styled-system/css";
import { IconButton } from "./IconButton";
import { SerendieSymbol } from "@serendie/symbols";
import React, { useState } from "react";

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
      "& button": {
        color: "sd.system.color.impression.primary",
      },
      "&[data-selected]": {
        "& button": {
          color: "sd.system.color.interaction.disabledOnSurface",
          fontWeight: "bold",
        },
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
  variants: {},
  defaultVariants: {
    size: "medium",
  },
});

export type PaginationProps = {
  /**
   * 合計項目数
   */
  count: number;
  /**
   * 1ページあたりの項目数
   */
  pageSize?: number;
  /**
   * 現在のページ（制御された状態で使用する場合）
   */
  page?: number;
  /**
   * ページ変更時のコールバック
   */
  onPageChange?: (details: { page: number }) => void;
  /**
   * 現在のページの両側に表示するページ数
   */
  siblingCount?: number;
  /**
   * 追加のクラス名
   */
  className?: string;
};

export const Pagination: React.FC<PaginationProps> = ({
  count,
  pageSize = 10,
  page,
  onPageChange,
  siblingCount = 1,
  className,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const styles = PaginationStyle();

  const handlePageChange = (details: { page: number }) => {
    if (!page) {
      setCurrentPage(details.page);
    }
    onPageChange?.(details);
  };

  const paginationProps = {
    count,
    pageSize,
    siblingCount,
    ...(page ? { page } : { page: currentPage }),
    onPageChange: handlePageChange,
  };

  return (
    <ArkPagination.Root
      className={cx(styles.root, className)}
      {...paginationProps}
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
                aria-label={isFirstPage ? "最初のページです" : "前のページへ"}
              >
                <IconButton
                  icon={<SerendieSymbol name="chevron-left" />}
                  shape="rectangle"
                  styleType="ghost"
                  size="small"
                  aria-label={isFirstPage ? "最初のページです" : "前のページへ"}
                  disabled={isFirstPage}
                  title={isFirstPage ? "最初のページです" : "前のページへ"}
                />
              </ArkPagination.PrevTrigger>

              {ctx.pages.map((page, index) =>
                page.type === "page" ? (
                  <ArkPagination.Item
                    key={index}
                    {...page}
                    className={styles.item}
                  >
                    <IconButton
                      icon={<>{page.value}</>}
                      shape="rectangle"
                      styleType="ghost"
                      size="small"
                      aria-label={`ページ${page.value}へ移動`}
                      title={`ページ${page.value}へ移動`}
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
                aria-label={isLastPage ? "最後のページです" : "次のページへ"}
              >
                <IconButton
                  icon={<SerendieSymbol name="chevron-right" />}
                  shape="rectangle"
                  styleType="ghost"
                  size="small"
                  aria-label={isLastPage ? "最後のページです" : "次のページへ"}
                  disabled={isLastPage}
                  title={isLastPage ? "最後のページです" : "次のページへ"}
                />
              </ArkPagination.NextTrigger>
            </>
          );
        }}
      </ArkPagination.Context>
    </ArkPagination.Root>
  );
};
