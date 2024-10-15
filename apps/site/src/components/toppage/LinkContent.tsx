import { css, cx, sva } from "styled-system/css";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { LinkContentCard } from "./LinkContentCard";
import { TitleShape } from "./TitleShape";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton, usePrevNextButtons } from "../utils/carouselUtils";
import { IconButton } from "@serendie/ui";

type LinkContentProps = {
  content: {
    titleEn: string;
    titleJa: string;
    description: string;
    links: { title: string; href: string; illustration: string }[];
  }[];
};

export const LinkContent: React.FC<LinkContentProps> = ({ content }) => {
  return (
    <>
      <LinkContentExpanded content={content} />
      <LinkContentCompact content={content} />
    </>
  );
};

const linkContentExpandedStyle = sva({
  slots: [
    "wrapper",
    "container",
    "sidebar",
    "titleWrapper",
    "title",
    "titleShape",
    "titleDescription",
    "description",

    "mainWrapper",
    "mainContainer",
    "main",
  ],
  base: {
    wrapper: {
      display: "none",
      mt: "-25vh",
      expanded: {
        display: "block",
      },
    },
    container: {
      position: "relative",
      display: "grid",
      gap: "10%",
      color: "web.system.color.component.background.onSurface",
      height: "300vh",
      gridTemplateColumns: "320px 1fr",
      gridTemplateRows: "1fr",
    },
    sidebar: {
      position: "sticky",
      top: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      height: "50vh",
      expanded: {
        height: "100vh",
      },
    },
    titleWrapper: { my: "auto" },
    title: {
      position: "relative",
      aspectRatio: "1 / 1",
      maxWidth: "240px",
      expanded: {
        maxWidth: "inherit",
      },
    },
    titleDescription: {
      fontSize: "20px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontWeight: "bold",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      textAlign: "center",
      color: "web.system.color.component.background.onSurface",
      "& h2": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        mb: "20px",
        "& svg": {
          h: "46px",
          expanded: {
            h: "64px",
          },
        },
      },
    },
    titleShape: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      "& svg": {
        width: "100%",
        height: "100%",
      },
    },
    description: {
      mt: "64px",
    },

    mainWrapper: {
      position: "sticky",
      top: 0,
      height: "50vh",
      expanded: {
        height: "100vh",
      },
    },
    mainContainer: {
      position: "relative",
      height: "50vh",
      expanded: {
        height: "100vh",
      },
    },
    main: {
      position: "absolute",
      width: "100%",
      display: "flex",
      gap: "10%",
      justifyContent: "flex-start",
      alignItems: "center",
      flexWrap: "wrap",
      alignContent: "center",
      height: "50vh",
      expanded: {
        height: "100vh",
      },
    },
  },
});

const linkContentCompactStyle = sva({
  slots: [
    "wrapper",
    "container",
    "titleWrapper",
    "titleWrapperButton",
    "titleWrapperButtonLeft",
    "titleWrapperButtonRight",
    "carouselWrapper",
    "carouselContainer",
    "carouselDotsContainer",
    "carouselDots",
  ],
  base: {
    wrapper: {
      position: "relative",
      display: "grid",
      height: "fit-content",
      gap: "32px",
      py: "7vw",
      mb: "160px",
      expanded: {
        display: "none",
      },
    },
    container: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "54px 16px",
      height: "fit-content",
      flex: "0 0 100%",
      pl: "24px",
    },
    titleWrapper: {
      position: "relative",
      alignItems: "center",
      "& > div": {
        margin: "auto",
      },
    },
    titleWrapperButton: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
    },
    titleWrapperButtonLeft: {
      left: "-12px",
    },
    titleWrapperButtonRight: {
      right: "-12px",
    },
    carouselWrapper: {
      // overflow: "hidden",
    },
    carouselContainer: {
      display: "flex",
      ml: "-24px",
    },
    carouselDotsContainer: {
      position: "sticky",
      bottom: "24px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "20px",
      mt: "60px",
    },
    carouselDots: {
      w: "8px",
      h: "8px",
      borderRadius: "50%",
      bg: "sd.reference.color.scale.gray.300",
    },
  },
});

const LinkContentCompact: React.FC<LinkContentProps> = ({ content }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

  const stylesExpanded = linkContentExpandedStyle();
  const styles = linkContentCompactStyle();

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <div className={stylesExpanded.title}>
          <div className={stylesExpanded.titleDescription}>
            <h2>
              <svg
                viewBox="0 0 104 66"
                xmlns="http://www.w3.org/2000/svg"
                className={css({
                  fill: "currentcolor",
                })}
              >
                <path d="M99.7786 12.2555C97.562 8.4863 94.5566 5.50079 90.7622 3.29898C86.9678 1.09717 82.8127 0 78.3045 0V6.9413C81.5354 6.9413 84.5033 7.72499 87.2082 9.29238C89.9131 10.8598 92.077 12.9869 93.685 15.6739C95.3004 18.3608 96.1119 21.3464 96.1119 24.6304H103.1C103.1 20.1522 101.995 16.0322 99.7786 12.2555ZM103.1 65.8125V30.2282H96.1119V65.8125H103.1Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M29.3359 59.1947C16.541 57.4719 6.69484 46.5599 6.69484 33.3789C6.69484 20.198 16.541 9.28596 29.3359 7.56321L29.3359 1.72664C13.3521 3.48339 0.901365 16.9735 0.901366 33.3789C0.901367 49.7844 13.3521 63.2745 29.3359 65.0312L29.3359 59.1947ZM36.4298 59.1947L36.4298 65.0312C52.4135 63.2744 64.8642 49.7843 64.8642 33.3789C64.8642 16.9736 52.4135 3.48345 36.4298 1.72665L36.4298 7.56323C49.2247 9.28602 59.0708 20.198 59.0708 33.3789C59.0708 46.5598 49.2247 57.4719 36.4298 59.1947Z"
                />
              </svg>
            </h2>
            <p>{content[selectedIndex].titleEn}</p>
          </div>
          <div className={stylesExpanded.titleShape}>
            <TitleShape
              style={{
                transition: "rotate 0.3s",
                rotate: `${selectedIndex * 90 - 45}deg`,
              }}
            />
          </div>
        </div>

        <IconButton
          styleType="ghost"
          icon={"chevron_left"}
          className={cx(
            styles.titleWrapperButton,
            styles.titleWrapperButtonLeft
          )}
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <IconButton
          styleType="ghost"
          icon={"chevron_right"}
          className={cx(
            styles.titleWrapperButton,
            styles.titleWrapperButtonRight
          )}
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
        />
      </div>

      <div ref={emblaRef} className={styles.carouselWrapper}>
        <div className={styles.carouselContainer}>
          {content.map((c, index) => (
            <div className={styles.container} key={index}>
              {c.links.map((link, i) => (
                <LinkContentCard
                  key={i}
                  title={link.title}
                  illustration={link.illustration}
                />
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className={styles.carouselDotsContainer}>
        {scrollSnaps.map((_, index) => {
          return (
            <button
              key={index}
              className={cx(
                styles.carouselDots,
                index === selectedIndex
                  ? css({ bg: "sd.reference.color.scale.blue.900" })
                  : css({ bg: "sd.reference.color.scale.gray.300" })
              )}
              onClick={() => onDotButtonClick(index)}
            ></button>
          );
        })}
      </div>
    </div>
  );
};

const LinkContentExpanded: React.FC<LinkContentProps> = ({ content }) => {
  const styles = linkContentExpandedStyle();
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //content.lengthで割り、indexの値を0, 1, 2にする
    const index = Math.floor(latest * content.length);
    if (index < 0 || index >= content.length) return;
    setIndex(index);
  });

  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <div className={styles.sidebar}>
          <div className={styles.titleWrapper}>
            <div className={styles.title}>
              <div className={styles.titleDescription}>
                <h2>
                  <svg
                    width="104"
                    height="66"
                    viewBox="0 0 104 66"
                    xmlns="http://www.w3.org/2000/svg"
                    className={css({
                      fill: "currentcolor",
                    })}
                  >
                    <path d="M99.7786 12.2555C97.562 8.4863 94.5566 5.50079 90.7622 3.29898C86.9678 1.09717 82.8127 0 78.3045 0V6.9413C81.5354 6.9413 84.5033 7.72499 87.2082 9.29238C89.9131 10.8598 92.077 12.9869 93.685 15.6739C95.3004 18.3608 96.1119 21.3464 96.1119 24.6304H103.1C103.1 20.1522 101.995 16.0322 99.7786 12.2555ZM103.1 65.8125V30.2282H96.1119V65.8125H103.1Z" />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M29.3359 59.1947C16.541 57.4719 6.69484 46.5599 6.69484 33.3789C6.69484 20.198 16.541 9.28596 29.3359 7.56321L29.3359 1.72664C13.3521 3.48339 0.901365 16.9735 0.901366 33.3789C0.901367 49.7844 13.3521 63.2745 29.3359 65.0312L29.3359 59.1947ZM36.4298 59.1947L36.4298 65.0312C52.4135 63.2744 64.8642 49.7843 64.8642 33.3789C64.8642 16.9736 52.4135 3.48345 36.4298 1.72665L36.4298 7.56323C49.2247 9.28602 59.0708 20.198 59.0708 33.3789C59.0708 46.5598 49.2247 57.4719 36.4298 59.1947Z"
                    />
                  </svg>
                  {/* 0{index + 1} */}
                </h2>
                <p>{content[index].titleEn}</p>
              </div>
              <div className={styles.titleShape}>
                <TitleShape
                  style={{
                    transition: "rotate 0.3s",
                    rotate: `${index * 90 - 45}deg`,
                  }}
                />
              </div>
            </div>
            <div className={styles.description}>
              <h2
                className={css({
                  textStyle: "sd.system.typography.headline.small_expanded",
                  fontWeight: "bold",
                  mb: "10px",
                })}
              >
                {content[index].titleJa}
              </h2>
              <p
                className={css({
                  textStyle: "sd.system.typography.title.medium_expanded",
                  fontWeight: "bold",
                })}
              >
                {content[index].description}
              </p>
            </div>
          </div>
        </div>
        <div ref={ref}>
          <div className={styles.mainWrapper}>
            <div className={styles.mainContainer}>
              {content.map((c, i) => (
                <div
                  key={i}
                  className={styles.main}
                  style={{
                    opacity: i === index ? 1 : 0,
                    transition: "opacity 0.3s",
                    pointerEvents: i === index ? "auto" : "none",
                  }}
                >
                  {c.links.map((link, i) => (
                    <LinkContentCard
                      key={i}
                      title={link.title}
                      illustration={link.illustration}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
