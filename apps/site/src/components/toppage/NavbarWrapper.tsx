import { css } from "styled-system/css";

export const NavbarWrapper: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <div
      className={css({
        position: "fixed",
        animation: `fadein 0.6s forwards`,
        animationDelay: "3s",
        zIndex: "2",
        opacity: 0,
      })}
    >
      {children}
    </div>
  );
};
