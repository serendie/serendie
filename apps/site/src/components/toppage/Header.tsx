import { Button } from "@serendie/ui";
import { css } from "@serendie/ui/css";
import { styled } from "@serendie/ui/jsx";
import { BackgroundShape1 } from "./BackgroundShape1";
import { Shapes } from "./Shapes";
import { AnimationFadeIn } from "./AnimationFadeIn";
import { motion } from "framer-motion";

export const Header: React.FC = () => {
  const Header = styled("header", {
    base: {
      color: "sd.system.color.impression.onPrimary",
      position: "relative",
      width: "100%",
      height: "150vh",
      zIndex: "0",
    },
  });

  const HeaderWrapper = styled("div", {
    base: {
      position: "sticky",
      top: 0,
      width: "100vw",
      zIndex: "1",
      height: "100vh",
    },
  });

  const HeaderContainer = styled(motion.div, {
    base: {
      pt: "12.5%",
      mx: "12.22%",
      width: "calc(100vw - 24.44%)",
    },
  });

  const HeaderTitle = styled("h1", {
    base: {
      display: "flex",
      flexDirection: "column",
      gap: "16px",
      textStyle: "sd.system.typography.title.large_expanded",
      fontSize: "48px",
      fontWeight: "400",
    },
  });

  const HeaderDescription = styled("p", {
    base: {
      textStyle: "sd.system.typography.title.large_expanded",
      mt: "24px",
      mb: "48px",
    },
  });

  return (
    <Header>
      <HeaderWrapper>
        <AnimationFadeIn />
        <BackgroundShape1 />
        <Shapes />

        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 2.6,
            duration: 0.6,
          }}
        >
          <HeaderContainer>
            <HeaderTitle>
              <svg
                width="418"
                height="80"
                viewBox="0 0 418 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clip-path="url(#clip0_8420_48518)">
                  <path
                    d="M53.5514 65.6576C50.9826 70.0647 47.4979 73.5605 43.1122 76.1375C38.7191 78.7146 33.9164 79.9994 28.7042 79.9994C23.492 79.9994 18.6894 78.7071 14.2963 76.1375C9.90315 73.5605 6.41843 70.0647 3.84957 65.6576C1.28071 61.2505 0 56.4326 0 51.2038H6.92476C6.92476 55.1628 7.90762 58.8229 9.88825 62.1842C11.8614 65.5456 14.5196 68.1973 17.8703 70.1394C21.221 72.0815 24.8323 73.0526 28.7042 73.0526C32.5761 73.0526 36.2991 72.0591 39.6498 70.0797C43.0005 68.1002 45.6438 65.4485 47.5798 62.1245C49.5157 58.8005 50.4837 55.1628 50.4837 51.2038H57.4085C57.4085 56.4326 56.1278 61.2505 53.5589 65.6576H53.5514ZM20.4988 47.23C19.4191 44.6529 18.8755 41.8742 18.8755 38.8864C18.8755 34.9275 19.8435 31.3047 21.7795 28.018C23.7154 24.7314 26.3215 22.117 29.5977 20.1749C32.874 18.2328 36.4853 17.2617 40.4316 17.2617C43.41 17.2617 46.1874 17.807 48.7488 18.8826C51.3177 19.9657 53.611 21.5194 55.6214 23.5362L50.7071 28.4662C49.2923 27.047 47.751 25.9863 46.0757 25.2767C44.4003 24.567 42.5612 24.2085 40.5508 24.2085C37.8702 24.2085 35.3907 24.8658 33.1197 26.1655C30.8487 27.4727 29.0616 29.2655 27.7586 31.5437C26.4555 33.8219 25.8077 36.272 25.8077 38.8864C25.8077 42.8453 27.2225 46.2813 30.052 49.1945L25.1376 54.1245C23.1272 52.1077 21.5784 49.8145 20.5062 47.2374L20.4988 47.23Z"
                    fill="white"
                  />
                  <path
                    d="M107.944 26.0532C105.003 24.8207 101.854 24.2007 98.5028 24.2007C94.482 24.2007 90.6994 25.1568 87.1701 27.0616C83.6332 28.9663 80.7293 31.5658 78.4583 34.8449C76.1872 38.1316 74.8246 41.7917 74.3853 45.8253H67.3489C67.7956 40.5219 69.471 35.704 72.3749 31.3716C75.2788 27.0392 79.0167 23.6031 83.6034 21.0634C88.1827 18.5237 93.1566 17.2539 98.5103 17.2539C102.754 17.2539 106.79 18.0606 110.632 19.6666C114.467 21.2726 117.833 23.5284 120.744 26.4416L115.83 31.3716C113.521 29.056 110.9 27.2782 107.959 26.0532H107.944ZM78.4583 62.408C80.7293 65.6946 83.6332 68.2941 87.1701 70.1914C90.7069 72.0961 94.4894 73.0522 98.5028 73.0522C101.854 73.0522 104.996 72.4322 107.944 71.1998C110.885 69.9673 113.506 68.1895 115.815 65.8814L120.729 70.8113C117.825 73.7245 114.452 75.9803 110.617 77.5863C106.783 79.1923 102.74 79.999 98.4954 79.999C93.1343 79.999 88.1604 78.7292 83.5885 76.1895C79.0093 73.6498 75.2714 70.2138 72.36 65.8814C69.4561 61.549 67.7807 56.731 67.334 51.4276H74.3704C74.8172 55.4612 76.1724 59.1213 78.4434 62.408H78.4583ZM112.025 52.0998H83.6556V45.1531H112.025V52.0998Z"
                    fill="white"
                  />
                  <path
                    d="M134.526 29.5191C136.723 25.7469 139.701 22.759 143.462 20.5555C147.222 18.3519 151.339 17.2539 155.807 17.2539V24.2007C152.605 24.2007 149.664 24.985 146.984 26.5536C144.303 28.1223 142.159 30.2511 140.565 32.9402C138.964 35.6293 138.16 38.6171 138.16 41.9038H131.235C131.235 37.422 132.33 33.2987 134.526 29.5191ZM131.235 78.8786V47.506H138.16V78.8786H131.235Z"
                    fill="white"
                  />
                  <path
                    d="M203.893 26.0532C200.952 24.8207 197.802 24.2007 194.452 24.2007C190.431 24.2007 186.648 25.1568 183.119 27.0616C179.582 28.9663 176.678 31.5658 174.407 34.8449C172.136 38.1316 170.773 41.7917 170.334 45.8253H163.298C163.744 40.5219 165.42 35.704 168.324 31.3716C171.228 27.0392 174.966 23.6031 179.552 21.0634C184.132 18.5237 189.105 17.2539 194.459 17.2539C198.703 17.2539 202.739 18.0606 206.581 19.6666C210.416 21.2726 213.781 23.5284 216.693 26.4416L211.778 31.3716C209.47 29.056 206.849 27.2782 203.908 26.0532H203.893ZM174.4 62.408C176.671 65.6946 179.575 68.2941 183.111 70.1914C186.648 72.0961 190.431 73.0522 194.444 73.0522C197.795 73.0522 200.937 72.4322 203.886 71.1998C206.827 69.9673 209.448 68.1895 211.756 65.8814L216.67 70.8113C213.767 73.7245 210.394 75.9803 206.559 77.5863C202.724 79.1923 198.681 79.999 194.437 79.999C189.076 79.999 184.102 78.7292 179.53 76.1895C174.951 73.6498 171.213 70.2138 168.301 65.8814C165.397 61.549 163.722 56.731 163.275 51.4276H170.312C170.759 55.4612 172.114 59.1213 174.385 62.408H174.4ZM207.966 52.0998H179.597V45.1531H207.966V52.0998Z"
                    fill="white"
                  />
                  <path
                    d="M228.457 29.5191C230.654 25.7469 233.632 22.759 237.392 20.5555C241.153 18.3519 245.27 17.2539 249.738 17.2539C254.205 17.2539 258.316 18.3594 262.083 20.5555C265.843 22.759 268.822 25.7469 271.018 29.5191C273.215 33.2913 274.309 37.422 274.309 41.9038H267.385C267.385 38.6918 266.603 35.7264 265.039 32.9999C263.476 30.2735 261.353 28.1223 258.673 26.5611C255.992 24.9925 253.051 24.2082 249.849 24.2082C246.648 24.2082 243.595 24.9925 240.914 26.5611C238.234 28.1297 236.089 30.2586 234.496 32.9477C232.895 35.6367 232.091 38.6246 232.091 41.9112H225.166C225.166 37.4294 226.261 33.3062 228.457 29.5265V29.5191ZM225.166 78.8786V47.506H232.091V78.8786H225.166ZM274.309 47.506V78.8786H267.385V47.506H274.309Z"
                    fill="white"
                  />
                  <path
                    d="M303.513 28.4007C299.976 30.4548 297.161 33.2783 295.076 36.8638C292.992 40.4492 291.949 44.3708 291.949 48.6285C291.949 52.8862 292.992 56.8078 295.076 60.3932C297.161 63.9786 299.991 66.8022 303.565 68.8563C307.139 70.9105 311.011 71.9338 315.181 71.9338V78.8806C309.671 78.8806 304.607 77.536 299.991 74.847C295.374 72.1579 291.726 68.4978 289.045 63.8666C286.365 59.2354 285.024 54.156 285.024 48.6285C285.024 43.1009 286.365 38.0216 289.045 33.3904C291.726 28.7592 295.374 25.0991 299.991 22.41C304.607 19.7209 309.671 18.3764 315.181 18.3764V25.3232C310.936 25.3232 307.042 26.354 303.513 28.4007ZM327.697 78.8806H320.773V0.449219H327.697V78.8806Z"
                    fill="white"
                  />
                  <path
                    d="M344.562 8.46312C343.594 7.45471 343.11 6.27451 343.11 4.92997C343.11 3.58543 343.594 2.42764 344.562 1.45658C345.53 0.485528 346.684 0 348.025 0C349.439 0 350.608 0.485528 351.547 1.45658C352.477 2.42764 352.947 3.58543 352.947 4.92997C352.947 6.27451 352.477 7.45471 351.547 8.46312C350.616 9.47152 349.439 9.97199 348.025 9.97199C346.684 9.97199 345.53 9.47152 344.562 8.46312ZM344.562 78.8795V19.944H351.487V78.8795H344.562Z"
                    fill="white"
                  />
                  <path
                    d="M404.815 26.0532C401.874 24.8207 398.725 24.2007 395.374 24.2007C391.353 24.2007 387.571 25.1568 384.041 27.0616C380.504 28.9663 377.6 31.5658 375.329 34.8449C373.058 38.1316 371.696 41.7917 371.256 45.8253H364.22C364.667 40.5219 366.342 35.704 369.246 31.3716C372.15 27.0392 375.888 23.6031 380.475 21.0634C385.054 18.5237 390.028 17.2539 395.381 17.2539C399.626 17.2539 403.661 18.0606 407.503 19.6666C411.338 21.2726 414.704 23.5284 417.615 26.4416L412.701 31.3716C410.392 29.056 407.771 27.2782 404.83 26.0532H404.815ZM375.329 62.408C377.6 65.6946 380.504 68.2941 384.041 70.1914C387.578 72.0961 391.361 73.0522 395.374 73.0522C398.725 73.0522 401.867 72.4322 404.815 71.1998C407.757 69.9673 410.378 68.1895 412.686 65.8814L417.6 70.8113C414.696 73.7245 411.323 75.9803 407.489 77.5863C403.654 79.1923 399.611 79.999 395.366 79.999C390.005 79.999 385.031 78.7292 380.46 76.1895C375.88 73.6498 372.142 70.2138 369.231 65.8814C366.327 61.549 364.652 56.731 364.205 51.4276H371.242C371.688 55.4612 373.043 59.1213 375.314 62.408H375.329ZM408.888 52.0998H380.519V45.1531H408.888V52.0998Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_8420_48518">
                    <rect width="417.6" height="80" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              Design System
            </HeaderTitle>

            <HeaderDescription>
              誰も想像しなかった “巡り合い” から世界を変える
            </HeaderDescription>

            <Button
              className={css({
                bg: "white",
                color: "sd.system.color.component.onSurface !important",
              })}
            >
              スターターガイド
            </Button>
          </HeaderContainer>
        </motion.div>
      </HeaderWrapper>
    </Header>
  );
};
