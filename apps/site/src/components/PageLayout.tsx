import type { ComponentProps } from "react";
import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

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
    sm: {
      mb: "sd.system.dimension.spacing.sixExtraLarge",
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
    "& ul": {
      textStyle: "sd.system.typography.body.small_compact",
      marginInlineStart: "1em",
    },
    "& li": {
      listStyleType: "disc",
    },
    "& p": {
      my: "sd.system.dimension.spacing.extraLarge",
      textStyle: "sd.system.typography.body.small_compact",
      sm: {
        textStyle: "sd.system.typography.body.medium_compact",
      },
    },
    "& h2": {
      fontWeight: "sd.reference.typography.fontWeight.bold",
      my: "sd.system.dimension.spacing.extraLarge",
      fontSize: "20px",
      sm: {
        my: "sd.system.dimension.spacing.extraLarge",
        fontSize: "24px",
      },
    },
    "& h3": {
      my: "sd.system.dimension.spacing.medium",
      fontWeight: "sd.reference.typography.fontWeight.bold",
      fontSize: "sd.reference.typography.scale.expanded.medium",
      sm: {
        my: "sd.system.dimension.spacing.extraLarge",
        mt: "sd.system.dimension.spacing.twoExtraLarge",
        fontSize: "sd.reference.typography.scale.compact.extraLarge",
      },
    },
    "& ol": {
      pl: "sd.system.dimension.spacing.large",
      textStyle: "sd.system.typography.body.small_compact",
      sm: {
        textStyle: "sd.system.typography.body.medium_compact",
      },
      "& li": {
        listStyle: "decimal",
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
      backgroundColor: "web.system.color.component.textHighlight",
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
              height: props.column === "span2" ? "100%" : undefined,
              alignItems: "start",
              justifyContent: "space-between",
              borderRadius: "sd.system.dimension.radius.extraLarge",
              textStyle: "sd.system.typography.body.large_compact",
              bg: "sd.reference.color.scale.gray.100",
              transition: "background 0.3s",
              px: "sd.system.dimension.spacing.large",
              p: "sd.system.dimension.spacing.medium",
              smDown: {
                lineHeight: "1.4",
              },
              sm: {
                py: "sd.system.dimension.spacing.extraLarge",
                px: "sd.system.dimension.spacing.twoExtraLarge",
              },
              _hover: {
                bg: "sd.system.color.interaction.selectedSurface",
              },
            })}
          >
            <span>
              <span
                className={css({
                  display: "block",
                  sm: {
                    pb: "sd.system.dimension.spacing.large",
                  },
                  textStyle: "sd.system.typography.body.small_compact",
                })}
              >
                Read More
              </span>
              {sib.data.title}
            </span>
            <svg
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_11335_3329)">
                <path
                  d="M21.5 12.4989L14.827 19.1719L13.7827 18.1276L18.6462 13.2489L2.49048 13.2489L2.49048 11.7489L18.6365 11.7489L13.7577 6.87012L14.827 5.82587L21.5 12.4989Z"
                  fill="currentColor"
                />
              </g>
              <defs>
                <clipPath id="clip0_11335_3329">
                  <rect
                    width="24"
                    height="24"
                    fill="white"
                    transform="translate(0 24.5) rotate(-90)"
                  />
                </clipPath>
              </defs>
            </svg>
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
    textStyle: "sd.system.typography.body.small_compact",
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
