import { css, sva } from "@serendie/ui/css";
import { useMotionValueEvent, useScroll } from "framer-motion";
import { useRef, useState } from "react";

const linkContentStyle = sva({
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
    wrapper: {},
    container: {
      position: "relative",
      height: "300vh",
      display: "grid",
      gridTemplateColumns: "320px 1fr",
      gap: "10%",
      color: "sd.system.color.impression.onPrimaryContainer",
    },
    sidebar: {
      height: "100vh",
      position: "sticky",
      top: 0,
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
    },
    titleWrapper: { my: "auto" },
    title: {
      position: "relative",
      aspectRatio: "1 / 1",
    },
    titleDescription: {
      fontSize: "20px",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
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
      height: "100vh",
    },
    mainContainer: {
      position: "relative",
      height: "100vh",
    },
    main: {
      position: "absolute",
      height: "100vh",
      width: "100%",
      display: "flex",
      gap: "10%",
      justifyContent: "center",
      alignItems: "center",
      flexWrap: "wrap",
      alignContent: "center",
    },
  },
});

export const LinkContent: React.FC<{
  content: {
    titleEn: string;
    titleJa: string;
    description: string;
    links: { title: string; href: string }[];
  }[];
}> = ({ content }) => {
  const styles = linkContentStyle();
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    //content.lengthで割り、indexの値を0, 1, 2にする
    const index = Math.floor(latest * content.length);
    console.log(index);
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
                <h2>0{index + 1}</h2>
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
                  className={styles.main}
                  style={{
                    opacity: i === index ? 1 : 0,
                    transition: "opacity 0.3s",
                    pointerEvents: i === index ? "auto" : "none",
                  }}
                >
                  {c.links.map((link) => (
                    <ContentCard title={link.title} />
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

export const TitleShape: React.FC<
  | {
      className?: string;
    }
  | React.HTMLAttributes<SVGElement>
> = ({ className, ...props }) => {
  return (
    <svg
      width="302"
      height="302"
      viewBox="0 0 302 302"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      {...props}
    >
      <g
        style={
          {
            // mixBlendMode: "multiply",
          }
        }
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M44.2269 44.2269C72.5449 15.9089 110.952 -2.87138e-06 151 0C191.048 2.87139e-06 229.455 15.9089 257.773 44.2269C286.091 72.5449 302 110.952 302 151H285.942C285.942 115.211 271.725 80.8881 246.418 55.5816C221.112 30.275 186.789 16.058 151 16.0579C115.211 16.0579 80.8881 30.275 55.5816 55.5815C30.275 80.8881 16.058 115.211 16.0579 151L0 151C6.22133e-06 110.952 15.9089 72.5448 44.2269 44.2269Z"
          fill="#0050AF"
        />
      </g>
    </svg>
  );
};

const ContentCard: React.FC<{
  title: string;
}> = ({ title }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        color: "white",
        cursor: "pointer",
        height: "fit-content",
      })}
    >
      <h2
        className={css({
          textStyle: "sd.system.typography.title.medium_expanded",
          fontWeight: "bold",
        })}
      >
        {title}
      </h2>
      <div
        className={css({
          position: "relative",
          width: 172,
          height: 172,
        })}
      >
        <TitleShape
          className={css({
            position: "absolute",
            top: "-20%",
            left: "-20%",
            width: "140%",
            height: "140%",
            transition: "transform 0.3s",
            mixBlendMode: "multiply",
            rotate: "225deg",
            // zIndex: 10,
            _hover: {
              transform: "rotate(180deg)",
            },
          })}
        />
        <svg
          width="172"
          height="172"
          viewBox="0 0 172 172"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="86" cy="86" r="86" fill="#FFF7EE" />
          <path d="M73.88 59H12L69.12 153H131L73.88 59Z" fill="#0066DF" />
          <path
            d="M101 86C108.426 86 115.548 83.05 120.799 77.799C126.05 72.548 129 65.4261 129 58C129 50.5739 126.05 43.452 120.799 38.201C115.548 32.95 108.426 30 101 30"
            stroke="#FB514D"
            stroke-width="14"
          />
          <path
            d="M35.143 97.6595C31.3923 101.41 29.2852 106.497 29.2852 111.802C29.2852 117.106 31.3923 122.193 35.143 125.944C38.8937 129.695 43.9808 131.802 49.2852 131.802C54.5895 131.802 59.6766 129.695 63.4273 125.944"
            stroke="black"
          />
          <circle
            cx="49.2852"
            cy="112.506"
            r="14.5"
            transform="rotate(45 49.2852 112.506)"
            fill="#F4B72B"
          />
          <path d="M100 44V72" stroke="black" />
          <path d="M114 58L86 58" stroke="black" />
          <path d="M103.623 44.4766L96.3761 71.5225" stroke="black" />
          <path d="M113.523 61.625L86.4775 54.3781" stroke="black" />
          <path d="M109.898 48.0977L90.0994 67.8966" stroke="black" />
          <path d="M109.898 67.9023L90.0994 48.1034" stroke="black" />
          <path d="M112.125 50.9961L87.8763 64.9961" stroke="black" />
          <path d="M106.998 70.1289L92.998 45.8802" stroke="black" />
          <path d="M113.525 54.3711L86.4795 61.618" stroke="black" />
          <path d="M103.621 71.5273L96.3742 44.4814" stroke="black" />
          <path d="M107 45.875L93 70.1237" stroke="black" />
          <path d="M112.125 65L87.8763 51" stroke="black" />
          <g>
            <rect x="101" y="92" width="43" height="29" fill="#C7A8A8" />
          </g>
        </svg>
      </div>
    </div>
  );
};
