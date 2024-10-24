import { Search, Switch } from "@serendie/ui";
import { styled } from "styled-system/jsx";

import { useState } from "react";
import { css } from "styled-system/css";
import { iconsData } from "@/content/icons";

const Container = styled("div", {
  base: {
    gridColumn: "1 / -1",
    mb: "128px",
  },
});

const SearchBar = styled("nav", {
  base: {
    display: "flex",
    justifyContent: "space-between",
    mb: "32px",
  },
});

const IconContainer = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
    gap: "24px",
  },
});

const IconBox = styled("div", {
  base: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "12px",
    height: "110px",
    alignContent: "center",
    justifyContent: "center",
    textAlign: "center",
    borderBottom: "1px solid",
    borderColor: "sd.system.color.component.outline",
  },
});

const IconBoxSvg = styled("div", {
  base: {
    width: "24px",
    margin: "auto",
  },
});

const IconTitle = styled("h2", {
  base: {
    margin: 0,
    fontFamily: "Noto Sans Mono",
    textStyle: "sd.system.typography.body.medium_compact",
    expanded: {
      textStyle: "sd.system.typography.body.medium_expanded",
    },
  },
});

export const IconPage: React.FC = () => {
  const [icons, setIcons] = useState(iconsData);
  const [iconStyle, setIconStyle] = useState<"outline" | "fill">("outline");
  const [searchText, setSearchText] = useState<string>("");

  return (
    <Container>
      <SearchBar>
        <Search
          items={icons.map((icon) => icon.name)}
          value={searchText as unknown as string[]}
          onChange={(e) => {
            setSearchText((e.target as HTMLInputElement).value as string);
            setIcons(
              iconsData.filter((icon) =>
                icon.name
                  .toLowerCase()
                  .includes((e.target as HTMLInputElement).value.toLowerCase())
              )
            );
          }}
        />
        <Switch
          label={"塗りつぶし"}
          className={css({
            "&>div": {
              width: "fit-content",
            },
          })}
          checked={iconStyle === "fill"}
          onCheckedChange={() => {
            setIconStyle(iconStyle === "outline" ? "fill" : "outline");
          }}
        />
      </SearchBar>

      <IconContainer>
        {icons.map((icon) => (
          <IconBox key={icon.name}>
            <IconBoxSvg
              dangerouslySetInnerHTML={{ __html: icon[iconStyle] }}
            ></IconBoxSvg>
            <IconTitle>{icon.name}</IconTitle>
          </IconBox>
        ))}
      </IconContainer>
    </Container>
  );
};
