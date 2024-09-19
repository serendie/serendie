import { css } from "@serendie/ui/css";

export const AnimationFadeIn: React.FC = () => {
  return (
    <div
      className={css({
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100%",
        scale: "1.2",
        zIndex: "1",
        transformOrigin: "center center",
        pointerEvents: "none",
        backgroundColor: "#000",
        animation: `fadeout 1s forwards`,
      })}
    />
  );
};
