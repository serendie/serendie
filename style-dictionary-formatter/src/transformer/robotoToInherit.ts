import StyleDictionary from "style-dictionary";

export const robotoToInherit: StyleDictionary.Named<StyleDictionary.Transform> =
  {
    name: "serendie/robotoToInherit",
    type: "value",
    matcher: (token) =>
      token.$type === "fontFamily" && token.value === "Roboto",
    transformer: () => {
      return "inherit";
    },
  };
