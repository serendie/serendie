import StyleDictionary from "style-dictionary";

const { fileHeader } = StyleDictionary.formatHelpers;

StyleDictionary.registerFormat({
  name: "css-with-theme",
  formatter: ({ dictionary, file }) => {
    const themes: Record<string, string[]> = {};
    dictionary.allProperties.forEach((p) => {
      const [theme, key] =
        p.path[0] === "themes"
          ? [p.path[1], p.path.slice(4).join("-")]
          : ["default", p.path.join("-")];

      (themes[theme] ??= []).push(`--${key}: ${p.value};`);
    });

    const output = Object.entries(themes)
      .map(([theme, values]) =>
        theme === "default"
          ? `:where(:root,:host) {\n${values.join("\n")}\n}`
          : `[data-panda-theme=${theme}] {\n${values.join("\n")}\n}`
      )
      .join("\n");

    return fileHeader({ file }) + output;
  },
});
