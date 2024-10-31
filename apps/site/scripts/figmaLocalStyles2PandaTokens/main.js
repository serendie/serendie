figma.on("run", async () => {
  const textStyles = {};

  figma.getLocalTextStyles().forEach((style) => {
    const variables = {};

    Object.keys(style.boundVariables).forEach((name) => {
      const variable = style.boundVariables[name];
      if (variable.type === "VARIABLE_ALIAS") {
        const value = figma.variables.getVariableById(variable.id);
        if (value) {
          variables[name] = value.name.replace(/\//g, ".");
        }
      }
    });

    const value = {
      fontFamily:
        style.fontName.family === "Roboto" // デフォルトフォントは除外
          ? undefined
          : variables.fontFamily || style.fontName.family,
      fontWeight:
        variables.fontWeight ||
        (style.fontName.style.toLowerCase() === "bold" ? "bold" : "normal"), // variablesの指定がなく、bold以外はnormal
      fontSize: style.fontSize + "px",
      lineHeight:
        variables.lineHeight || Math.round(style.lineHeight.value) + "%",
      letterSpacing:
        style.letterSpacing.value != 0
          ? style.letterSpacing.value +
            (style.letterSpacing.unit === "PERCENT" ? "em" : "px")
          : undefined,
      //textTransform: style.textTransform,
      //textDecoration: style.textDecoration,
    };

    const name = style.name.replace(/\//g, ".");

    textStyles[name] = { value };
  });

  console.log({ textStyles });
  figma.closePlugin();
});
