import { css } from "@serendie/ui/css";
import { TitleShape } from "./TitleShape";

export const LinkContentCard: React.FC<{
  title: string;
  illustration?: string;
}> = ({ title, illustration }) => {
  return (
    <div
      className={css({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "sd.reference.color.scale.blue.900",
        cursor: "pointer",
        height: "fit-content",
        gap: "14px",
        expanded: {
          gap: "48px",
        },
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
          width: "70%",
          aspectRatio: "1 / 1",
          expanded: {
            width: 172,
            height: 172,
          },
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
            _hover: {
              transform: "rotate(180deg)",
            },
          })}
        />
        <img
          src={illustration}
          className={css({
            width: "100%",
            height: "100%",
            objectFit: "contain",
            borderRadius: "50%",
          })}
        />
      </div>
    </div>
  );
};
