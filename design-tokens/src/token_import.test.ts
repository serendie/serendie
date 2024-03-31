import { describe, expect, test, vi } from "vitest";
import {
  FlattenedTokensByFile,
  generatePostVariablesPayload,
  readJsonFiles,
} from "./token_import";
import { GetLocalVariablesResponse } from "@figma/rest-api-spec";

describe("readJsonFiles", () => {
  vi.mock("fs", () => {
    const MOCK_FILE_INFO: { [fileName: string]: string } = {
      "tokens/reference/color.default.json": JSON.stringify({
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
        },
      }),
      "tokens/reference/dimension.default.json": JSON.stringify({
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
            },
          },
        },
      }),
      "tokens/reference/elevation.default.json": JSON.stringify({
        dic: {
          reference: {
            elevation: {
              opacity: {
                scale: {
                  "0": {
                    $value: 0,
                    $type: "number",
                  },
                },
              },
            },
          },
        },
      }),
      "tokens/reference/typography.default.json": JSON.stringify({
        dic: {
          reference: {
            typography: {
              fontFamily: {
                primary: {
                  $value: "Noto Sans JP",
                  $type: "fontFamily",
                },
              },
              fontWeight: {
                regular: {
                  $value: 400,
                  $type: "fontWeight",
                },
              },
              lineHeight: {
                none: {
                  $value: 1,
                  $type: "number",
                },
              },
              scale: {
                expanded: {
                  fourExtraSmall: {
                    $value: "10px",
                    $type: "dimension",
                  },
                },
                compact: {
                  twoExtraSmall: {
                    $value: "10px",
                    $type: "dimension",
                  },
                },
              },
            },
          },
        },
      }),
      "tokens/system/color.default.json": JSON.stringify({
        dic: {
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
      "tokens/system/dimension.default.json": JSON.stringify({
        dic: {
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
      "tokens/system/elevation.default.json": JSON.stringify({
        dic: {
          system: {
            elevation: {
              shadow: {
                level1: {
                  $type: "shadow",
                  $value: {
                    color: "#0000004D",
                    offsetX: "0px",
                    offsetY: "1px",
                    blur: "2px",
                    spread: "0px",
                  },
                },
              },
              zIndex: {
                deepDive: {
                  $type: "number",
                  $value: -1000,
                },
              },
            },
          },
        },
      }),
      "tokens/system/typography.compact.json": JSON.stringify({
        dic: {
          system: {
            typography: {
              display: {
                small: {
                  $type: "typography",
                  $value: {
                    fontSize:
                      "{dic.reference.typography.scale.compact.fourExtraLarge}",
                    fontWeight: "{dic.reference.typography.fontWeight.regular}",
                    fontFamily: "{dic.reference.typography.fontFamily.primary}",
                    lineHeight: "{dic.reference.typography.lineHeight.normal}",
                    letterSpacing: "0px",
                  },
                },
              },
            },
          },
        },
      }),
      "tokens/system/typography.expanded.json": JSON.stringify({
        dic: {
          system: {
            typography: {
              display: {
                small: {
                  $type: "typography",
                  $value: {
                    fontSize:
                      "{dic.reference.typography.scale.expanded.fourExtraLarge}",
                    fontWeight: "{dic.reference.typography.fontWeight.regular}",
                    fontFamily: "{dic.reference.typography.fontFamily.primary}",
                    lineHeight: "{dic.reference.typography.lineHeight.normal}",
                    letterSpacing: "0px",
                  },
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
      "tokens/reference/color.default.json",
      "tokens/reference/dimension.default.json",
      "tokens/reference/elevation.default.json",
      "tokens/reference/typography.default.json",
      "tokens/system/color.default.json",
      "tokens/system/dimension.default.json",
      "tokens/system/elevation.default.json",
      "tokens/system/typography.compact.json",
      "tokens/system/typography.expanded.json",
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
        "dic/system/dimension/border/medium": {
          $value: "{dic.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
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

describe("generatePostVariablesPayload", () => {
  test("does an initial sync", async () => {
    const localVariablesResponse: GetLocalVariablesResponse = {
      status: 200,
      error: false,
      meta: {
        variableCollections: {},
        variables: {},
      },
    };

    const tokensByFile: FlattenedTokensByFile = {
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
        "dic/system/dimension/border/medium": {
          $value: "{dic.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
      },
    };

    const result = generatePostVariablesPayload(
      tokensByFile,
      localVariablesResponse
    );

    expect(result.variableCollections).toEqual([
      {
        action: "CREATE",
        id: "color",
        name: "color",
        initialModeId: "default",
      },
      {
        action: "CREATE",
        id: "dimension",
        name: "dimension",
        initialModeId: "default",
      },
    ]);

    expect(result.variableModes).toEqual([
      {
        action: "UPDATE",
        id: "default",
        name: "default",
        variableCollectionId: "color",
      },
      {
        action: "UPDATE",
        id: "default",
        name: "default",
        variableCollectionId: "dimension",
      },
    ]);

    expect(result.variables).toEqual([
      {
        action: "CREATE",
        id: "dic/reference/color/scale/blue/100",
        name: "dic/reference/color/scale/blue/100",
        variableCollectionId: "color",
        resolvedType: "COLOR",
        description: "Blue 100 color",
      },
      {
        action: "CREATE",
        id: "dic/system/color/primary",
        name: "dic/system/color/primary",
        variableCollectionId: "color",
        resolvedType: "COLOR",
        description: "Primary color",
      },
      {
        action: "CREATE",
        id: "dic/reference/dimension/scale/1",
        name: "dic/reference/dimension/scale/1",
        variableCollectionId: "dimension",
        resolvedType: "FLOAT",
        description: "1px",
      },
      {
        action: "CREATE",
        id: "dic/system/dimension/border/medium",
        name: "dic/system/dimension/border/medium",
        variableCollectionId: "dimension",
        resolvedType: "FLOAT",
        description: "Medium border",
      },
    ]);

    expect(result.variableModeValues).toEqual([
      {
        variableId: "dic/reference/color/scale/blue/100",
        modeId: "default",
        value: { r: 0.8588235294117647, g: 0.9529411764705882, b: 1 },
      },
      {
        variableId: "dic/system/color/primary",
        modeId: "default",
        value: {
          type: "VARIABLE_ALIAS",
          id: "dic/reference/color/scale/blue/100",
        },
      },
      {
        variableId: "dic/reference/dimension/scale/1",
        modeId: "default",
        value: 1,
      },
      {
        variableId: "dic/system/dimension/border/medium",
        modeId: "default",
        value: {
          type: "VARIABLE_ALIAS",
          id: "dic/reference/dimension/scale/1",
        },
      },
    ]);
  });
});
