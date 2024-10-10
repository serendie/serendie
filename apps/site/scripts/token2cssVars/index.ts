import vars from "./export.json";

const modes = vars[0]["_illust-color-system"]["modes"];

console.log(`@layer tokens {`);
Object.entries(modes).forEach(([modeName, mode]) => {
  if (modeName === "KONJO") {
    console.log(`:where(:root, :host) {`);
  } else {
    console.log(` [data-panda-theme='${modeName.toLowerCase()}'] {`);
  }
  createCssVars(mode);
  console.log(`}`);
});
console.log(`}`);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function createCssVars(obj: any, prefix: string = "") {
  Object.entries(obj).forEach(([key, value]) => {
    if (typeof value === "object") {
      if (value["$value"]) {
        console.log(
          `--illust-${prefix}${key}: ${tokenValue2CssVar(value["$value"])};`
        );
      } else {
        createCssVars(value, `${prefix}${key}-`);
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
