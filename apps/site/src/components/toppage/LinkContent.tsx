import { css, cx, sva } from "styled-system/css";
import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";
import { LinkContentCard } from "./LinkContentCard";
import useEmblaCarousel from "embla-carousel-react";
import { useDotButton, usePrevNextButtons } from "../utils/carouselUtils";
import { IconButton } from "@serendie/ui";
import { TitleShapeThin } from "./TitleShapeThin";
type LinkContentProps = {
  content: {
    titleEn: string;
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
    "scrollContainer",
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
      mt: "25%",
      expanded: {
        display: "block",
      },
      lgDown: {
        mt: "50%",
      },
    },
    scrollContainer: {
      height: "300vh",
      position: "sticky",
    },
    container: {
      position: "sticky",
      top: "50%",
      transform: "translateY(-50%)",
      display: "grid",
      gap: "100px 120px",
      color: "web.system.color.impression.onTertiary",
      height: "calc((224px + 28px) * 2 + 64px)",
      gridTemplateColumns: "285px 1fr",
      gridTemplateRows: "1fr",
      lgDown: {
        gap: "48px",
        // gridTemplateColumns: "200px 1fr",
        // height: "calc((224px + 28px) * 3 + 64px)",
      },
    },
    sidebar: {},
    titleWrapper: { my: "auto" },
    title: {
      position: "relative",
      aspectRatio: "1 / 1",
      maxWidth: "inherit",
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
      color: "web.system.color.impression.onTertiary",
      fontFamily: "SerendieOfficeVF",
      "& div": {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // mb: "16px",
        lineHeight: "1",
        textWrap: "nowrap",
        fontSize: "80px",
        fontWeight: 50,
        "& svg": {
          h: "64px",
          pointerEvents: "none",
        },
      },
      "& p": {
        whiteSpace: "nowrap",
        fontSize: "26px",
        fontWeight: 50,
        lineHeight: "1",
      },
    },
    titleShape: {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      "& svg": {
        width: "285px",
        height: "100%",
        lgDown: {
          // width: "200px",
          height: "100%",
        },
      },
    },
    description: {
      mt: "64px",
    },

    mainWrapper: {
      position: "sticky",
      top: 0,
      height: "100vh",
    },
    mainContainer: {
      position: "relative",
    },
    main: {
      position: "absolute",
      width: "100%",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(224px, 1fr))",
      gap: "48px 28px",
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

    "title",
    "titleDescription",
    "titleShape",
  ],
  base: {
    wrapper: {
      position: "relative",
      display: "grid",
      height: "fit-content",
      gap: "32px",
      // py: "7vw",
      mb: "160px",
      mt: "160px",
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
      mb: "calc(-80% + 32px)",
      transform: "translateY(32px)",
      pointerEvents: "none",
      width: "100%",
      maxHeight: "240px",
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
      overflow: "hidden",
      w: "100%",
      pt: "min(calc(240px + 32px), calc(80% + 32px))",
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

    title: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      width: "100%",
      gap: "16px",
      color: "web.system.color.impression.onTertiary",
    },
    titleDescription: {
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
      "& h2": {
        "& svg": {
          h: "50px",
        },
      },
    },
    titleShape: {
      position: "absolute",
      top: 0,
      left: "50%",
      transform: "translateX(-50%)",
      maxWidth: "240px",
      height: "100%",
      aspectRatio: "1 / 1",
      "& svg": {
        width: "min(240px, 100%)",
        height: "min(240px, 100%)",
      },
    },
  },
});

const LinkContentCompact: React.FC<LinkContentProps> = ({ content }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel();

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
        <div className={styles.title}>
          <div className={styles.titleDescription}>
            {/* <h2>
              <div
                dangerouslySetInnerHTML={{
                  __html: [Title01, Title02, Title03][selectedIndex],
                }}
              />
            </h2> */}

            <div
              className={css({
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "50px",
                width: "100%",
                overflow: "hidden",
                mb: "16px",
              })}
            >
              <motion.h2
                className={css({
                  display: "flex",
                  alignSelf: "baseline",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  textAlign: "center",
                  overflow: "hidden",
                  fontSize: "58px",
                  lineHeight: 1,
                  fontFamily: "SerendieOfficeVF",
                  mb: "0px",
                  "& span": {
                    height: "50px",
                  },
                })}
                animate={{
                  y: -selectedIndex * 50,
                }}
              >
                {content.map((c, i) => (
                  <span
                    key={i}
                    aria-hidden={i === selectedIndex ? "false" : "true"}
                  >
                    0{i + 1}
                  </span>
                ))}
              </motion.h2>
            </div>
            <div
              className={css({
                height: "18px",
                width: "100%",
                overflow: "hidden",
              })}
            >
              <motion.p
                className={css({
                  display: "flex",
                  alignSelf: "baseline",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  flexDirection: "column",
                  textAlign: "center",
                  overflow: "hidden",
                  lineHeight: 1,
                  fontFamily: "SerendieOfficeVF",
                  fontSize: "18px",
                  "& span": {
                    height: "18px",
                  },
                })}
                animate={{
                  y: -selectedIndex * 18,
                }}
              >
                {content.map((c, i) => (
                  <span
                    key={i}
                    aria-hidden={i === selectedIndex ? "false" : "true"}
                  >
                    {c.titleEn}
                  </span>
                ))}
              </motion.p>
            </div>
          </div>
          <div className={styles.titleShape}>
            <TitleShapeThin
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
                  href={link.href}
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
                  ? css({
                      bg: "web.system.color.impression.secondary !important",
                    })
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
      <div className={styles.scrollContainer} ref={ref}>
        <div className={styles.container}>
          <div className={styles.sidebar}>
            <div className={styles.titleWrapper}>
              <div className={styles.title}>
                <div className={styles.titleDescription}>
                  <div
                    className={css({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "flex-start",
                      height: "80px",
                      width: "100%",
                      overflow: "hidden",
                      mb: "16px",
                    })}
                  >
                    <motion.h2
                      className={css({
                        display: "flex",
                        alignSelf: "baseline",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        textAlign: "center",
                        overflow: "hidden",
                      })}
                      animate={{
                        y: -index * 80,
                      }}
                    >
                      {content.map((c, i) => (
                        <span
                          key={i}
                          aria-hidden={i === index ? "false" : "true"}
                        >
                          0{i + 1}
                        </span>
                      ))}
                    </motion.h2>
                  </div>
                  <div
                    className={css({
                      height: "26px",
                      width: "100%",
                      overflow: "hidden",
                    })}
                  >
                    <motion.p
                      className={css({
                        display: "flex",
                        alignSelf: "baseline",
                        alignItems: "center",
                        justifyContent: "flex-start",
                        flexDirection: "column",
                        textAlign: "center",
                        overflow: "hidden",
                      })}
                      animate={{
                        y: -index * 26,
                      }}
                    >
                      {content.map((c, i) => (
                        <span
                          key={i}
                          aria-hidden={i === index ? "false" : "true"}
                        >
                          {c.titleEn}
                        </span>
                      ))}
                    </motion.p>
                  </div>
                </div>
                <div className={styles.titleShape}>
                  <TitleShapeThin
                    style={{
                      transition: "rotate 0.3s",
                      rotate: `${index * 90 - 45}deg`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
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
                    aria-hidden={i === index ? "false" : "true"}
                  >
                    {c.links.map((link, i) => (
                      <LinkContentCard
                        key={i}
                        href={link.href}
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
    </div>
  );
};
