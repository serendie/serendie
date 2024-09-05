import { css, sva } from "@serendie/ui/css";
import { TitleShape } from "./LinkContent";

const contactCardStyle = sva({
  slots: ["container", "img", "title", "link"],
  base: {
    container: {
      position: "relative",
      bg: "sd.system.color.component.surface",
      borderRadius: "50%",
      aspectRatio: "1 / 1",
      maxWidth: "200px",

      display: "grid",
      gridTemplateRows: "64px auto auto",
      gap: "4px",
      height: "fit-content",
      px: "24px",
      py: "24px",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",

      "&:hover": {
        "& svg": {
          rotate: "405deg",
        },
      },
    },
    img: {
      width: "64px",
      height: "64px",
      p: "10px",
      m: "auto",
    },
    title: {
      textStyle: "sd.system.typography.title.small_expanded",
      fontWeight: "bold",
    },
    link: {
      textStyle: "sd.system.typography.body.extraSmall_expanded",
    },
  },
});

export const ContactCard: React.FC = () => {
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
      <img
        className={styles.img}
        src="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
      />
      <h2 className={styles.title}>お問い合わせ</h2>
      <p className={styles.link}>お問い合わせフォーム</p>
    </div>
  );
};
