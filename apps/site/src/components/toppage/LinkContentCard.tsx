import { css } from "styled-system/css";
import { TitleShapeRenew } from "./TitleShapeRenew";

export const LinkContentCard: React.FC<{
  href: string;
  title: string;
  illustration?: string;
}> = ({ href, title, illustration }) => {
  return (
    <a href={href}>
      <div
        className={css({
          display: "grid",
          gridTemplateRows: "16px 224px",
          color: "web.system.color.impression.onTertiary",
          cursor: "pointer",
        })}
      >
        <h2
          className={css({
            textStyle: "sd.system.typography.title.medium_expanded",
            fontWeight: "bold",
            lineHeight: 1,
            textAlign: "center",
          })}
        >
          {title}
        </h2>
        <div
          className={css({
            position: "relative",
            width: "70%",
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            expanded: {
              height: "224px",
              width: "224px",
            },
          })}
        >
          <TitleShapeRenew
            strokeWidth="16"
            className={css({
              position: "absolute",
              top: "0%",
              left: "0%",
              width: "100%",
              height: "100%",
              transition: "transform 0.3s",
              mixBlendMode: "multiply",
              rotate: "225deg",
              _hover: {
                transform: "rotate(180deg)",
              },
            })}
          />
          <img
            src={illustration}
            className={css({
              width: "160px",
              height: "160px",
              objectFit: "contain",
              borderRadius: "50%",
            })}
          />
        </div>
      </div>
    </a>
  );
};
