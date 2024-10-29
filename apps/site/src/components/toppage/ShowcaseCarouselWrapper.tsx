import { styled } from "styled-system/jsx";
import { ShowcaseCarousel } from "./ShowcaseCarousel";

const ShowcaseImageWrapper = styled("div", {
  base: {
    position: "relative",
    flex: "0 0 calc(100% - 32px)",
    minWidth: "0",
    aspectRatio: "364 / 234",
    pl: "16px",

    expanded: {
      flex: "0 0 33.333%",
      pl: "24px",
    },
  },
});
const ShowcaseImageContainer = styled("div", {
  base: {
    position: "relative",
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      overflow: "hidden",
      border: "solid 1px",
      borderColor: "sd.system.color.component.surface",
      borderRadius: "16px",
    },
    _before: {
      transition: "all 0.3s",
      content: "''",
      position: "absolute",
      display: "block",
      width: "calc(100% - 2px)",
      height: "calc(100% - 2px)",
      bg: "rgba(0, 0, 0, 0.1)",
      top: 1,
      left: 1,
      opacity: 0,
      borderRadius: "15px",
    },
    _hover: {
      _before: {
        opacity: 1,
      },
    },
    expanded: {
      _before: {
        display: "none",
      },
    },
  },
});

export const ShowcaseCarouselWrapper: React.FC = () => {
  return (
    <ShowcaseCarousel>
      <ShowcaseImageWrapper key={1}>
        <ShowcaseImageContainer>
          <img src="/assets/pages/top/case1.png" alt="showcase" />
        </ShowcaseImageContainer>
      </ShowcaseImageWrapper>
      <ShowcaseImageWrapper key={2}>
        <ShowcaseImageContainer>
          <img src="/assets/pages/top/case2.png" alt="showcase" />
        </ShowcaseImageContainer>
      </ShowcaseImageWrapper>
      <ShowcaseImageWrapper key={3}>
        <ShowcaseImageContainer>
          <img src="/assets/pages/top/case3.png" alt="showcase" />
        </ShowcaseImageContainer>
      </ShowcaseImageWrapper>
    </ShowcaseCarousel>
  );
};
