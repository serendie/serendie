import { describe, expect, test, vi } from "vitest";
import { readJsonFiles } from "./token_import";

describe("readJsonFiles", () => {
  vi.mock("fs", () => {
    const MOCK_FILE_INFO: { [fileName: string]: string } = {
      "tokens/color.default.json": JSON.stringify({
        dic: {
          reference: {
            color: {
              scale: {
                blue: {
                  100: {
                    $value: "#DBF3FF",
                    $type: "color",
                    $description: "Blue 100 color",
                  },
                },
              },
            },
          },
          system: {
            color: {
              primary: {
                $value: "{dic.reference.color.scale.blue.100}",
                $type: "color",
                $description: "Primary color",
              },
            },
          },
        },
      }),
      "tokens/dimension.default.json": JSON.stringify({
        dic: {
          reference: {
            dimension: {
              scale: {
                1: {
                  $value: "1px",
                  $type: "dimension",
                  $description: "1px",
                },
              },
              fontSize: {
                small: {
                  $value: "14px",
                  $type: "dimension",
                  $description: "Small font size",
                },
                medium: {
                  $value: "16px",
                  $type: "dimension",
                  $description: "Medium font size",
                },
              },
              letterSpacing: {
                normal: {
                  $value: "0px",
                  $type: "dimension",
                  $description: "Normal letter spacing",
                },
              },
            },
          },
          system: {
            dimension: {
              border: {
                medium: {
                  $value: "{dic.reference.dimension.scale.1}",
                  $type: "dimension",
                  $description: "Medium border",
                },
              },
            },
          },
        },
      }),
      "tokens/shadow.default.json": JSON.stringify({
        dic: {
          reference: {
            shadow: {
              scale: {
                1: {
                  $value: {
                    color: "#0000004D",
                    offsetX: "0px",
                    offsetY: "1px",
                    blur: "2px",
                    spread: "0px",
                  },
                  $type: "shadow",
                  $description: "Shadow 1",
                },
              },
            },
          },
          system: {
            elevation: {
              1: {
                $value: "{dic.reference.shadow.scale.1}",
                $type: "shadow",
                $description: "Elevation 1",
              },
            },
          },
        },
      }),
      "tokens/number.default.json": JSON.stringify({
        dic: {
          reference: {
            number: {
              opacity: {
                scale: {
                  4: {
                    $value: "0.4",
                    $type: "number",
                    $description: "10%",
                  },
                },
              },
              lineHeight: {
                normal: {
                  $value: "1.5",
                  $type: "number",
                  $description: "Normal line height",
                },
              },
            },
          },
          system: {
            number: {
              opacity: {
                disabled: {
                  $value: "{dic.reference.number.opacity.scale.4}",
                  $type: "number",
                  $description: "Disabled opacity",
                },
              },
            },
          },
        },
      }),
      "tokens/fontFamily.default.json": JSON.stringify({
        dic: {
          reference: {
            fontFamily: {
              primary: {
                $value: "Noto Sans JP",
                $type: "fontFamily",
                $description: "Primary font",
              },
              monospace: {
                $value: "Noto Sans Mono",
                $type: "fontFamily",
                $description: "Monospace font",
              },
            },
          },
        },
      }),
      "tokens/fontWeight.default.json": JSON.stringify({
        dic: {
          reference: {
            fontWeight: {
              regular: {
                $value: 400,
                $type: "fontWeight",
                $description: "Regular weight",
              },
              bold: {
                $value: 700,
                $type: "fontWeight",
                $description: "Bold weight",
              },
            },
          },
        },
      }),
      "tokens/typography.sp.json": JSON.stringify({
        dic: {
          system: {
            typography: {
              title: {
                medium: {
                  $value: {
                    fontFamily: "{dic.reference.fontFamily.primary}",
                    fontSize: "{dic.reference.dimension.fontSize.small}",
                    fontWeight: "{dic.reference.fontWeight.bold}",
                    letterSpacing:
                      "{dic.reference.dimension.letterSpacing.normal}",
                    lineHeight: "{dic.reference.number.lineHeight.normal}",
                  },
                  $type: "typography",
                  $description: "Title medium on sp",
                },
              },
            },
          },
        },
      }),
      "tokens/typography.pc.json": JSON.stringify({
        dic: {
          system: {
            typography: {
              title: {
                medium: {
                  $value: {
                    fontFamily: "{dic.reference.fontFamily.primary}",
                    fontSize: "{dic.reference.dimension.fontSize.medium}",
                    fontWeight: "{dic.reference.fontWeight.bold}",
                    letterSpacing:
                      "{dic.reference.dimension.letterSpacing.normal}",
                    lineHeight: "{dic.reference.number.lineHeight.normal}",
                  },
                  $type: "typography",
                  $description: "Title medium on pc",
                },
              },
            },
          },
        },
      }),
      "no_tokens.mode1.json": JSON.stringify({
        foo: "bar",
      }),
      "empty_file.mode1.json": "",
      "file_with_$_keys.mode1.json": JSON.stringify({
        $foo: "bar",
        token1: { $type: "string", $value: "value1" },
      }),
    };

    return {
      readFileSync: (fpath: string) => {
        if (fpath in MOCK_FILE_INFO) {
          return MOCK_FILE_INFO[fpath];
        }

        return "{}";
      },
    };
  });

  test("reads all files and flattens tokens inside", () => {
    const result = readJsonFiles([
      "tokens/color.default.json",
      "tokens/dimension.default.json",
      "tokens/shadow.default.json",
      "tokens/number.default.json",
      "tokens/fontFamily.default.json",
      "tokens/fontWeight.default.json",
      "tokens/typography.sp.json",
      "tokens/typography.pc.json",
    ]);

    expect(result).toEqual({
      "color.default.json": {
        "dic/reference/color/scale/blue/100": {
          $value: "#DBF3FF",
          $type: "color",
          $description: "Blue 100 color",
        },
        "dic/system/color/primary": {
          $value: "{dic.reference.color.scale.blue.100}",
          $type: "color",
          $description: "Primary color",
        },
      },
      "dimension.default.json": {
        "dic/reference/dimension/scale/1": {
          $value: "1px",
          $type: "dimension",
          $description: "1px",
        },
        "dic/reference/dimension/fontSize/small": {
          $value: "14px",
          $type: "dimension",
          $description: "Small font size",
        },
        "dic/reference/dimension/fontSize/medium": {
          $value: "16px",
          $type: "dimension",
          $description: "Medium font size",
        },
        "dic/reference/dimension/letterSpacing/normal": {
          $value: "0px",
          $type: "dimension",
          $description: "Normal letter spacing",
        },
        "dic/system/dimension/border/medium": {
          $value: "{dic.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
      },
      "shadow.default.json": {
        "dic/reference/shadow/scale/1": {
          $value: {
            color: "#0000004D",
            offsetX: "0px",
            offsetY: "1px",
            blur: "2px",
            spread: "0px",
          },
          $type: "shadow",
          $description: "Shadow 1",
        },
        "dic/system/elevation/1": {
          $value: "{dic.reference.shadow.scale.1}",
          $type: "shadow",
          $description: "Elevation 1",
        },
      },
      "number.default.json": {
        "dic/reference/number/opacity/scale/4": {
          $value: "0.4",
          $type: "number",
          $description: "10%",
        },
        "dic/reference/number/lineHeight/normal": {
          $value: "1.5",
          $type: "number",
          $description: "Normal line height",
        },
        "dic/system/number/opacity/disabled": {
          $value: "{dic.reference.number.opacity.scale.4}",
          $type: "number",
          $description: "Disabled opacity",
        },
      },
      "fontFamily.default.json": {
        "dic/reference/fontFamily/primary": {
          $value: "Noto Sans JP",
          $type: "fontFamily",
          $description: "Primary font",
        },
        "dic/reference/fontFamily/monospace": {
          $value: "Noto Sans Mono",
          $type: "fontFamily",
          $description: "Monospace font",
        },
      },
      "fontWeight.default.json": {
        "dic/reference/fontWeight/regular": {
          $value: 400,
          $type: "fontWeight",
          $description: "Regular weight",
        },
        "dic/reference/fontWeight/bold": {
          $value: 700,
          $type: "fontWeight",
          $description: "Bold weight",
        },
      },
      "typography.sp.json": {
        "dic/system/typography/title/medium": {
          $value: {
            fontFamily: "{dic.reference.fontFamily.primary}",
            fontSize: "{dic.reference.dimension.fontSize.small}",
            fontWeight: "{dic.reference.fontWeight.bold}",
            letterSpacing: "{dic.reference.dimension.letterSpacing.normal}",
            lineHeight: "{dic.reference.number.lineHeight.normal}",
          },
          $type: "typography",
          $description: "Title medium on sp",
        },
      },
      "typography.pc.json": {
        "dic/system/typography/title/medium": {
          $value: {
            fontFamily: "{dic.reference.fontFamily.primary}",
            fontSize: "{dic.reference.dimension.fontSize.medium}",
            fontWeight: "{dic.reference.fontWeight.bold}",
            letterSpacing: "{dic.reference.dimension.letterSpacing.normal}",
            lineHeight: "{dic.reference.number.lineHeight.normal}",
          },
          $type: "typography",
          $description: "Title medium on pc",
        },
      },
    });
  });

  test("handles files that do not have any tokens", () => {
    const result = readJsonFiles(["no_tokens.mode1.json"]);
    expect(result).toEqual({ "no_tokens.mode1.json": {} });
  });

  test("handles duplicate collections and modes", () => {
    expect(() => {
      readJsonFiles([
        "tokens/collection1.mode1.1.json",
        "tokens/collection1.mode1.2.json",
        "tokens/collection1.mode1.3.json",
      ]);
    }).toThrowError(
      "Duplicate collection and mode in file: tokens/collection1.mode1.2.json"
    );
  });

  test("handles file names that do not match the expected format", () => {
    expect(() => {
      readJsonFiles([
        "tokens/collection1.mode1.json",
        "tokens/collection2.mode1.json",
        "foo.json",
      ]);
    }).toThrowError(
      "Invalid tokens file name: foo.json. File names must be in the format: {collectionName}.{modeName}.json"
    );
  });

  test("ignores keys that start with $", () => {
    const result = readJsonFiles(["file_with_$_keys.mode1.json"]);
    expect(result).toEqual({
      "file_with_$_keys.mode1.json": {
        token1: { $type: "string", $value: "value1" },
      },
    });
  });

  test("handles empty files", () => {
    expect(() => {
      readJsonFiles(["empty_file.mode1.json"]);
    }).toThrowError(
      "Invalid tokens file: empty_file.mode1.json. File is empty."
    );
  });
});
