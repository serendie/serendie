import { css, sva } from "@serendie/ui/css";
import { motion } from "framer-motion";

const indexContentStyle = sva({
  slots: [
    "wrapper",
    "container",
    "titleWrapper",
    "title",
    "titleShape",
    "description",
  ],
  base: {
    wrapper: {
      position: "sticky",
      height: "100vh",
      alignItems: "center",
      justifyContent: "center",
      display: "flex",
      zIndex: 100,
    },
    container: {
      display: "grid",
      gridTemplateColumns: "repeat(6, 1fr)",
      gap: "64px",
      width: "100%",
      maxWidth: "calc(100vw - 24.44%)",

      margin: "0 auto",
    },
    titleWrapper: {
      gridColumn: "1",
      color: "white",
    },
    title: {
      position: "relative",
      aspectRatio: "1/1",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "16px",
    },
    titleShape: {
      position: "absolute",
      top: "-10%",
      left: "-10%",
      width: "120%",
      height: "120%",
    },
    description: {
      gridColumn: "5",
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
      gap: "86px 64px",
      pl: "64px",
    },
  },
});

export const IndexContent: React.FC = () => {
  const styles = indexContentStyle();
  return (
    <motion.div
      className={styles.wrapper}
      whileInView={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      viewport={{
        amount: 0.5,
      }}
    >
      <div className={styles.container}>
        <div className={styles.titleWrapper}>
          <div className={styles.title}>
            <svg
              width="103"
              height="66"
              viewBox="0 0 103 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M98.8767 12.2555C96.6602 8.4863 93.6547 5.50079 89.8603 3.29898C86.0659 1.09717 81.9108 0 77.4026 0V6.9413C80.6335 6.9413 83.6014 7.72499 86.3063 9.29238C89.0113 10.8598 91.1752 12.9869 92.7831 15.6739C94.3986 18.3608 95.21 21.3464 95.21 24.6304H102.198C102.198 20.1522 101.093 16.0322 98.8767 12.2555ZM102.198 65.8125V30.2282H95.21V65.8125H102.198Z"
                fill="white"
              />
              <path
                d="M28.4346 59.1947C15.6396 57.4719 5.79348 46.5599 5.79348 33.3789C5.79348 20.198 15.6396 9.28594 28.4346 7.5632L28.4346 1.72663C12.4508 3.48338 -2.1105e-06 16.9735 -1.39004e-06 33.3789C-6.6958e-07 49.7844 12.4508 63.2745 28.4346 65.0312L28.4346 59.1947ZM35.5284 59.1947L35.5284 65.0312C51.5122 63.2744 63.9629 49.7843 63.9629 33.3789C63.9629 16.9736 51.5122 3.48346 35.5284 1.72665L35.5284 7.56323C48.3233 9.28603 58.1694 20.198 58.1694 33.3789C58.1694 46.5598 48.3233 57.4719 35.5284 59.1947Z"
                fill="white"
              />
            </svg>
            <h1>Style Guide</h1>
            <TitleShape className={styles.titleShape} />
          </div>

          <div
            className={css({
              mt: "64px",
            })}
          >
            <h2
              className={css({
                textStyle: "sd.system.typography.headline.small_expanded",
                fontWeight: "bold",
                mb: "10px",
              })}
            >
              スタイルガイド
            </h2>
            <p
              className={css({
                textStyle: "sd.system.typography.title.medium_expanded",
                fontWeight: "bold",
              })}
            >
              Serendieブランドを反映したデザイン要素と、アセットのページです。
            </p>
          </div>
        </div>

        <div className={styles.description}>
          {Array.from({ length: Math.floor(Math.random() * 10) }).map(
            (_, i) => (
              <ContentCard key={i} />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
};

export const IndexContentWrapper: React.FC = () => {
  return <></>;
};

const TitleShape: React.FC<{
  className?: string;
}> = ({ className, ...props }) => {
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
        style={{
          mixBlendMode: "multiply",
        }}
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

const ContentCard: React.FC = () => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "48px",
        width: "100%",
        color: "white",
        cursor: "pointer",
      })}
    >
      <h2
        className={css({
          textStyle: "sd.system.typography.title.medium_expanded",
          fontWeight: "bold",
        })}
      >
        カラー
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
