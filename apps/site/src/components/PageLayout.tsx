import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

export const PageHeader = styled("header", {
  base: {
    gridColumn: "span 8",
    mdDown: {
      gridColumn: "span 1",
    },
  },
});

export const PageMain = styled("div", {
  base: {
    color: "web.system.color.component.background.onSurface",
    gridColumn: "span 6",
    overflow: "hidden",
    mdDown: {
      gridColumn: "span 1",
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
  },
});

export const PageSection = styled("section", {
  base: { mb: "sd.system.dimension.spacing.fiveExtraLarge" },
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
};

export const PageLinks = (props: PageFooterProps) => (
  <ul
    className={css({
      display: "grid",
      gap: "sd.system.dimension.spacing.extraLarge",
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
              alignItems: "center",
              justifyContent: "space-between",
              borderRadius: "sd.system.dimension.radius.extraLarge",
              py: "sd.system.dimension.spacing.extraLarge",
              px: "sd.system.dimension.spacing.twoExtraLarge",
              bg: "#EFEEEB", //TODO: use color token
              textStyle: "sd.system.typography.body.large_compact",
            })}
          >
            <span>
              <span
                className={css({
                  display: "block",
                  pb: "sd.system.dimension.spacing.large",
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
                  fill="#073165" //TODO: use color token
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

export const PageARef = styled("a", {
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
