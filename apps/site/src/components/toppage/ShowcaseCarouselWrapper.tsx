import { styled } from "styled-system/jsx";
import { ShowcaseCarousel } from "./ShowcaseCarousel";

const ShowcaseImageWrapper = styled("div", {
  base: {
    flex: "0 0 calc(100% - 32px)",
    minWidth: "0",
    aspectRatio: "364 / 234",
    pl: "16px",
    "& > img": {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      overflow: "hidden",
      border: "solid 1px",
      borderColor: "sd.system.color.component.surface",
      borderRadius: "16px",
    },

    expanded: {
      flex: "0 0 33.333%",
      pl: "24px",
    },
  },
});

export const ShowcaseCarouselWrapper: React.FC = () => {
  return (
    <ShowcaseCarousel>
      {Array.from({ length: 3 }).map((_, index) => (
        <ShowcaseImageWrapper key={index}>
          <img src={`https://picsum.photos/seed/${index}/728/468`} />
        </ShowcaseImageWrapper>
      ))}
    </ShowcaseCarousel>
  );
};
