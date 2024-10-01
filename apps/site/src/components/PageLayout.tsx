import { css } from "styled-system/css";
import { styled } from "styled-system/jsx";

export const PageHeader = styled("header", {
  base: {
    gridColumn: "span 8",
  },
});

export const PageMain = styled("div", {
  base: {
    gridColumn: "span 6",
  },
});

export const PageSection = styled("section", {
  base: { mb: "sd.system.dimension.spacing.fiveExtraLarge" },
});

export const PageAside = styled("aside", {
  base: {
    gridColumn: "span 2",
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
