import vars from "./export.json";

vars.forEach((v) => {
  Object.entries(v).forEach(([key, value]) => {
    const modes = value["modes"];
    convert(key, modes);
  });
});

function convert(key, modes) {
  console.log(`@layer tokens {`);
  Object.entries(modes).forEach(([modeName, mode]) => {
    if (modeName === "KONJO") {
      console.log(`:where(:root, :host) {`);
    } else {
      console.log(` [data-panda-theme='${modeName.toLowerCase()}'] {`);
    }
    createCssVars(key, mode);
    console.log(`}`);
  });
  console.log(`}`);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createCssVars(rootKey: string, obj: any, prefix: string = "") {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object") {
      if (value["$value"]) {
        console.log(
          `--${rootKey}-${prefix}${key}: ${tokenValue2CssVar(value["$value"])};`
        );
      } else {
        createCssVars(rootKey, value, `${prefix}${key}-`);
      }
    }
  });
}

function tokenValue2CssVar(value: string) {
  const keys = value
    .replaceAll("{", "")
    .replaceAll("}", "")
    .replaceAll("skyBlue", "sky-blue")
    .split(".");
  return "var(--colors-" + keys.join("-") + ")";
}
