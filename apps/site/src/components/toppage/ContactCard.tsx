import { css, sva } from "@serendie/ui/css";
import { TitleShape } from "./LinkContent";

const contactCardStyle = sva({
  slots: ["container", "img", "title", "link", "grid"],
  base: {
    container: {
      position: "relative",
      bg: "sd.system.color.component.surface",
      borderRadius: "50%",
      aspectRatio: "1 / 1",
      maxWidth: "300px",
      width: "110px",

      height: "fit-content",
      textAlign: "center",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      zIndex: 1,
      cursor: "pointer",

      mx: "auto",

      expanded: {
        width: "100%",
        maxWidth: "160px",
      },

      "&:hover": {
        "& svg": {
          rotate: "405deg",
        },
      },
    },
    img: {
      width: "32px",
      height: "32px",
      m: "auto",
      expanded: {
        width: "64px",
        height: "64px",
      },
    },
    title: {
      textStyle: "sd.system.typography.body.extraSmall_expanded",
      fontWeight: "bold",
      whiteSpace: "pre-wrap",
      expanded: {
        textStyle: "sd.system.typography.body.small_expanded",
      },
    },
    link: {
      textStyle: "sd.system.typography.body.extraSmall_expanded",
    },
    grid: {
      display: "grid",
      gridTemplateRows: "32px auto",
      gap: "4px",
      expanded: {
        gridTemplateRows: "64px auto",
        gap: "8px",
      },
    },
  },
});

export const ContactCard: React.FC<{
  icon: string;
  title: string;
  link: string;
}> = ({
  icon,
  title,
  // link
}) => {
  const styles = contactCardStyle();
  return (
    <div className={styles.container}>
      <TitleShape
        className={css({
          position: "absolute",
          top: "-20%",
          left: "-20%",
          width: "140%",
          height: "140%",
          rotate: "225deg",
          zIndex: -1,
          aspectRatio: "1 / 1",
          transition: "rotate 0.3s",
        })}
      />
      <div className={styles.grid}>
        <img className={styles.img} src={icon} />
        <h2 className={styles.title}>{title}</h2>
      </div>
    </div>
  );
};
