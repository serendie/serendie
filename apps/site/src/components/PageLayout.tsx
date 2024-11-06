import type { ComponentProps } from "react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";
import IconRight from "../assets/icon/outline/arrow-right.svg?react";

export const PageMain = styled("div", {
  base: {
    gridColumn: "span 6",
    mdDown: {
      gridColumn: "span 2",
    },
  },
  variants: {
    gridColumn: {
      span8: {
        gridColumn: "span 8",
      },
    },
  },
});

export const PageSection = styled("section", {
  base: {
    mb: "sd.system.dimension.spacing.fiveExtraLarge",
    textStyle: "sd.system.typography.body.small_compact",
    sm: {
      mb: "sd.system.dimension.spacing.sixExtraLarge",
      textStyle: "sd.system.typography.body.medium_compact",
    },
    /*
      中面のmarkdown向けのスタイルはここに記述
    */
    "& img, svg, figure": {
      borderRadius: "sd.system.dimension.radius.large",
    },
    "& a": {
      color: "sd.system.color.impression.primary",
      textDecoration: "underline",
    },
    "& a:hover": {
      opacity: 0.7,
    },
    "& p": {
      lineHeight: "1.7",
      mt: "sd.system.dimension.spacing.extraLarge",
    },
    "& p + p:has(img), & p + img, & p + svg, & p + figure, & p + pre, & .codeBox":
      {
        mt: "sd.system.dimension.spacing.medium",
        expanded: {
          mt: "sd.system.dimension.spacing.extraLarge",
        },
      },
    "& h2 + p, & h3 + p": {
      mt: 0,
    },
    "& h2, & h3": {
      mt: "sd.system.dimension.spacing.twoExtraLarge",
      mb: "sd.system.dimension.spacing.medium",
      expanded: {
        mt: "sd.system.dimension.spacing.twoExtraLarge",
        mb: "sd.system.dimension.spacing.extraLarge",
      },
    },
    "& h2": {
      fontWeight: "sd.reference.typography.fontWeight.bold",
      fontSize: "20px",
      sm: {
        my: "sd.system.dimension.spacing.extraLarge",
        fontSize: "24px",
      },
    },
    "& h3": {
      fontWeight: "sd.reference.typography.fontWeight.bold",
      fontSize: "sd.reference.typography.scale.expanded.medium",
      sm: {
        fontSize: "sd.reference.typography.scale.compact.extraLarge",
      },
    },
    "& ol li": {
      listStyle: "decimal",
    },
    "& ul li": {
      listStyle: "disc",
    },
    "& ol, & ul": {
      marginInlineStart: "0.5em",
      pl: "sd.system.dimension.spacing.large",
      my: "24px",
      "& li": {
        my: "sd.system.dimension.spacing.twoExtraSmall",
        expanded: {
          my: "sd.system.dimension.spacing.extraSmall",
        },
      },
    },
    "& svg": {
      maxWidth: "100%",
      height: "auto",
    },
    "& strong": {
      fontWeight: "sd.reference.typography.fontWeight.regular",
      color: "web.system.color.component.onSurface",
      px: "2px",
      pb: "1px",
      pt: "2.5px",
      backgroundColor: "web.system.color.impression.subtle",
    },
  },
});

export const PageAside = styled("aside", {
  base: {
    gridColumn: "span 2",
    mdDown: {
      display: "none",
    },
  },
});

type PageFooterProps = {
  siblings: {
    slug: string;
    data: {
      title: string;
    };
  }[];
  currentSlug: string;
  column?: "span1" | "span2";
};

export const PageLinks = (props: PageFooterProps) => (
  <ul
    className={css({
      ml: "0 !important",
      display: "grid",
      gap: "sd.system.dimension.spacing.small",
      sm: {
        gap: "sd.system.dimension.spacing.extraLarge",
      },
      gridTemplateColumns:
        props.column === "span2" ? "repeat(2, 1fr)" : undefined,
      marginInlineStart: "0",
      "& li": {
        listStyleType: "none",
      },
      "& a": {
        textDecoration: "none",
        color: "inherit",
      },
    })}
  >
    {props.siblings
      .filter((s) => s.slug != props.currentSlug)
      .map((sib, i) => (
        <li key={i}>
          <a
            href={`/${sib.slug}`}
            className={css({
              display: "flex",
              alignItems: props.column === "span2" ? "flex-start" : "center",
              height: props.column === "span2" ? "100%" : undefined,
              justifyContent: "space-between",
              borderRadius: "sd.system.dimension.radius.extraLarge",
              textStyle: "sd.system.typography.body.large_compact",
              fontSize: "16px",
              bg: "sd.reference.color.scale.gray.100",
              transition: "background 0.3s",
              lineHeight: "1.6",
              py: "24px",
              px: props.column === "span2" ? "24px" : "32px",
              "& svg": {
                display: props.column === "span2" ? "none" : "block", // SPかつ2カラムの場合はアイコンを非表示
              },
              expanded: {
                alignItems: "center",
                fontSize: "18px",
                px: "32px",
                "& svg": {
                  display: "block",
                },
              },
              _hover: {
                bg: "web.system.color.impression.subtle",
              },
              "& path": {
                fill: "web.system.color.component.onSurface",
              },
            })}
          >
            <span>
              <span
                className={css({
                  display: "block",
                  textStyle: "sd.system.typography.body.small_compact",
                  fontSize: "14px",
                  mb: "10px",
                  expanded: {
                    fontSize: "14px",
                    mb: "8px",
                  },
                })}
              >
                Read More
              </span>
              {sib.data.title}
            </span>
            <IconRight width="24px" />
          </a>
        </li>
      ))}
  </ul>
);

export const PageA = styled("a", {
  base: {
    color: "sd.system.color.impression.primary",
    textDecoration: "underline",
  },
});

const Aref = ({ children, ...props }: ComponentProps<"a">) => (
  <a target="_blank" rel="noopener noreferrer" {...props}>
    {children}
  </a>
);

export const PageARef = styled(Aref, {
  base: {
    color: "sd.system.color.impression.primary",
    textDecoration: "underline",
    display: "inline-flex",
    width: "100%",
    alignItems: "center",
    gap: "sd.system.dimension.spacing.twoExtraSmall",
    "& + &": {
      mt: "sd.system.dimension.spacing.large",
    },
    _after: {
      content: '""',
      display: "block",
      color: "sd.system.color.impression.primary",
      maskImage: `url("data:image/svg+xml;charset=utf8,%3Csvg%20width%3D%2216%22%20height%3D%2216%22%20viewBox%3D%220%200%2016%2016%22%20fill%3D%22none%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20clip-path%3D%22url(%23clip0_11991_19177)%22%3E%3Cpath%20d%3D%22M4.19617%2011.7628L3.5%2011.0667L10.0603%204.5H4.09617V3.5H11.7628V11.1667H10.7628V5.2025L4.19617%2011.7628Z%22%20fill%3D%22currentColor%22%2F%3E%3C%2Fg%3E%3Cdefs%3E%3CclipPath%20id%3D%22clip0_11991_19177%22%3E%3Crect%20width%3D%2216%22%20height%3D%2216%22%20fill%3D%22white%22%2F%3E%3C%2FclipPath%3E%3C%2Fdefs%3E%3C%2Fsvg%3E")`,
      maskSize: "contain",
      height: "16px",
      width: "16px",
      bg: "sd.system.color.impression.primary",
    },
  },
});
