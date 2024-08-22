import { styled } from "@serendie/ui/jsx";

export const Navbar: React.FC = () => {
  const Navbar = styled("nav", {
    base: {
      position: "fixed",
      top: 0,
      width: "100%",
      zIndex: 100,
      paddingTop: "24px",
      paddingBottom: "24px",
      paddingLeft: "40px",
      paddingRight: "40px",
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      color: "sd.system.color.impression.onPrimary",
    },
  });

  const NavbarLogo = styled("div", {
    base: {
      display: "flex",
      listStyle: "none",
      padding: 0,
      gap: "24px",
      margin: 0,
    },
  });

  const NavbarTitle = styled("h1", {
    base: {
      textStyle: "sd.system.typography.title.large_expanded",
    },
  });

  const NavbarLinkContainer = styled("ul", {
    base: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      listStyle: "none",
      padding: 0,
      gap: "24px",
      margin: 0,
    },
  });

  const NavbarLink = styled("li", {
    base: {
      textStyle: "sd.system.typography.title.small_expanded",
    },
  });

  return (
    <Navbar>
      <NavbarLogo>
        <svg
          width="22"
          height="24"
          viewBox="0 0 22 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M20.4516 18.5136C19.4705 20.1995 18.1397 21.5368 16.4648 22.5227C14.787 23.5085 12.9529 24 10.9623 24C8.97174 24 7.13758 23.5057 5.45983 22.5227C3.78207 21.5368 2.45123 20.1995 1.47017 18.5136C0.489109 16.8277 0 14.9846 0 12.9844H2.6446C2.6446 14.4989 3.01997 15.899 3.77638 17.1849C4.52995 18.4708 5.54514 19.4852 6.82478 20.2281C8.10443 20.9711 9.4836 21.3425 10.9623 21.3425C12.441 21.3425 13.8628 20.9625 15.1425 20.2053C16.4221 19.448 17.4316 18.4336 18.171 17.162C18.9103 15.8905 19.28 14.4989 19.28 12.9844H21.9246C21.9246 14.9846 21.4355 16.8277 20.4544 18.5136H20.4516ZM7.82859 11.4642C7.41626 10.4784 7.20868 9.41541 7.20868 8.27241C7.20868 6.75795 7.57835 5.37207 8.3177 4.11477C9.05705 2.85748 10.0523 1.85736 11.3035 1.11442C12.5548 0.371473 13.9339 0 15.4411 0C16.5785 0 17.6392 0.208596 18.6174 0.620074C19.5985 1.03441 20.4743 1.62877 21.2421 2.40029L19.3653 4.28622C18.825 3.7433 18.2364 3.33754 17.5966 3.06608C16.9567 2.79462 16.2544 2.65746 15.4866 2.65746C14.4628 2.65746 13.5159 2.90892 12.6486 3.40612C11.7813 3.90618 11.0988 4.59197 10.6012 5.46351C10.1035 6.33504 9.85612 7.27229 9.85612 8.27241C9.85612 9.78688 10.3964 11.1013 11.477 12.2157L9.60019 14.1017C8.8324 13.3302 8.24092 12.4529 7.83144 11.4671L7.82859 11.4642Z"
            fill="white"
          />
        </svg>

        <NavbarTitle>Serendie Design System</NavbarTitle>
      </NavbarLogo>

      <NavbarLinkContainer>
        <NavbarLink>
          <a href="/">基本の情報</a>
        </NavbarLink>
        <NavbarLink>
          <a href="/">スタイル</a>
        </NavbarLink>
        <NavbarLink>
          <a href="/">デザインシステム</a>
        </NavbarLink>
      </NavbarLinkContainer>
    </Navbar>
  );
};
