import { css } from "styled-system/css";
import { TitleShapeRenew } from "./TitleShapeRenew";
import { TitleShape } from "./TitleShape";

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
          color: "web.system.color.impression.onTertiary",
          cursor: "pointer",
          _expanded: {
            gridTemplateRows: "16px 224px",
          },
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
            aspectRatio: "1 / 1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "auto",
            width: "100%",
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
              transition: "transform 0.3s",
              mixBlendMode: "multiply",
              rotate: "225deg",
              width: "100%",
              height: "100%",
              display: "none",
              expanded: {
                display: "block",
                top: "0%",
                left: "0%",
                width: "100%",
                height: "100%",
              },
              _hover: {
                transform: "rotate(180deg)",
              },
            })}
          />
          <TitleShape
            className={css({
              position: "absolute",
              transition: "transform 0.3s",
              mixBlendMode: "multiply",
              rotate: "225deg",
              width: "100%",
              height: "100%",
              display: "block",
              expanded: {
                display: "none",
              },
              _hover: {
                transform: "rotate(180deg)",
              },
            })}
          />
          <svg dangerouslySetInnerHTML={{ __html: illustration }} />
        </div>
      </div>
    </a>
  );
};
