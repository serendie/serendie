import { css, cx } from "styled-system/css";
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
            mb: "10px",
            expanded: {
              mb: "0",
            },
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
            height: "auto",
            maxWidth: "200px",
            expanded: {
              height: "224px",
              width: "224px",
              maxWidth: "none",
              lgDown: {
                height: "auto",
                width: "100%",
              },
              _hover: {
                "& .shapecircle": {
                  // transitionDelay: "0.1s",
                  transform: "rotate(180deg)",
                },
              },
            },
          })}
        >
          <TitleShapeRenew
            strokeWidth="16"
            className={cx(
              "shapecircle",
              css({
                position: "absolute",
                transition: "transform 0.3s",
                mixBlendMode: "multiply",
                rotate: "225deg",
                width: "100%",
                height: "100%",
                display: "none",
                pointerEvents: "none",
                expanded: {
                  display: "block",
                  top: "0%",
                  left: "0%",
                  width: "100%",
                  height: "100%",
                },
              })
            )}
          />
          {illustration && (
            <span
              className={css({
                display: "block",
                width: "100%",
                expanded: {
                  aspectRatio: "1 / 1",
                  width: "160px",
                  height: "160px",
                  lgDown: {
                    width: "80%",
                    height: "auto",
                  },
                },
                "& > svg": {
                  margin: "auto",
                  width: "90%",
                  height: "90%",
                  borderRadius: "100%",
                  border: "3px solid",
                  borderColor:
                    "web.system.color.mvShape.foreground.arc.indexBorder",
                  expanded: {
                    borderWidth: "0",
                    width: "100%",
                    height: "100%",
                  },
                },
              })}
              dangerouslySetInnerHTML={{ __html: illustration }}
            />
          )}
        </div>
      </div>
    </a>
  );
};
