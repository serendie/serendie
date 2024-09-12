import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { sva } from "@serendie/ui/css";
import { IconButton } from "@serendie/ui";
import type { EmblaCarouselType } from "embla-carousel";

const showcaseCarouselStyles = sva({
  slots: [
    "buttonWrapper",
    "wrapper",
    "container",
    "slide",
    "buttonLeft",
    "buttonRight",
  ],
  base: {
    buttonWrapper: {
      position: "relative",
    },
    wrapper: {
      overflow: "visible",
      expanded: {
        overflow: "hidden",
      },
    },
    container: {
      display: "flex",
      ml: "-16px",
      expanded: {
        ml: "-24px",
      },
    },
    buttonLeft: {
      position: "absolute",
      left: "-72px",
      top: "50%",
      transform: "translateY(calc(-50% + 12px))",
      zIndex: 1,
    },
    buttonRight: {
      position: "absolute",
      right: "-72px",
      top: "50%",
      transform: "translateY(calc(-50% + 12px))",
      zIndex: 1,
    },
  },
});

export const ShowcaseCarousel: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const styles = showcaseCarouselStyles();

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.buttonWrapper}>
      <div className={styles.wrapper} ref={emblaRef}>
        <div className={styles.container}>{children}</div>
      </div>

      <IconButton
        icon={"chevron_left"}
        className={styles.buttonLeft}
        onClick={onPrevButtonClick}
        disabled={prevBtnDisabled}
      />
      <IconButton
        icon={"chevron_right"}
        className={styles.buttonRight}
        onClick={onNextButtonClick}
        disabled={nextBtnDisabled}
      />
    </div>
  );
};

type UsePrevNextButtonsType = {
  prevBtnDisabled: boolean;
  nextBtnDisabled: boolean;
  onPrevButtonClick: () => void;
  onNextButtonClick: () => void;
};

export const usePrevNextButtons = (
  emblaApi: EmblaCarouselType | undefined
): UsePrevNextButtonsType => {
  const [prevBtnDisabled, setPrevBtnDisabled] = useState(true);
  const [nextBtnDisabled, setNextBtnDisabled] = useState(true);

  const onPrevButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollPrev();
  }, [emblaApi]);

  const onNextButtonClick = useCallback(() => {
    if (!emblaApi) return;
    emblaApi.scrollNext();
  }, [emblaApi]);

  const onSelect = useCallback((emblaApi: EmblaCarouselType) => {
    setPrevBtnDisabled(!emblaApi.canScrollPrev());
    setNextBtnDisabled(!emblaApi.canScrollNext());
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    onSelect(emblaApi);
    emblaApi.on("reInit", onSelect).on("select", onSelect);
  }, [emblaApi, onSelect]);

  return {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  };
};
