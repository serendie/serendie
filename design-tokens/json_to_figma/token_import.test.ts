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
                  $description: "Primary font family",
                },
              },
              fontWeight: {
                regular: {
                  $value: 400,
                  $type: "fontWeight",
                  $description: "Regular font weight",
                },
              },
              lineHeight: {
                none: {
                  $value: 1,
                  $type: "number",
                  $description: "None line height",
                },
              },
              scale: {
                expanded: {
                  fourExtraSmall: {
                    $value: "10px",
                    $type: "dimension",
                    $description: "Four extra small",
                  },
                },
                compact: {
                  twoExtraSmall: {
                    $value: "10px",
                    $type: "dimension",
                    $description: "Two extra small",
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
                      "{dic.reference.typography.scale.compact.twoExtraSmall}",
                    fontWeight: "{dic.reference.typography.fontWeight.regular}",
                    fontFamily: "{dic.reference.typography.fontFamily.primary}",
                    lineHeight: "{dic.reference.typography.lineHeight.none}",
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
                      "{dic.reference.typography.scale.expanded.fourExtraSmall}",
                    fontWeight: "{dic.reference.typography.fontWeight.regular}",
                    fontFamily: "{dic.reference.typography.fontFamily.primary}",
                    lineHeight: "{dic.reference.typography.lineHeight.none}",
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
      "tokens/reference/color.default.json": {
        "dic/reference/color/scale/blue/100": {
          $value: "#DBF3FF",
          $type: "color",
          $description: "Blue 100 color",
        },
      },
      "tokens/system/color.default.json": {
        "dic/system/color/primary": {
          $value: "{dic.reference.color.scale.blue.100}",
          $type: "color",
          $description: "Primary color",
        },
      },
      "tokens/reference/dimension.default.json": {
        "dic/reference/dimension/scale/1": {
          $value: "1px",
          $type: "dimension",
          $description: "1px",
        },
      },
      "tokens/system/dimension.default.json": {
        "dic/system/dimension/border/medium": {
          $value: "{dic.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
      },
      "tokens/reference/typography.default.json": {
        "dic/reference/typography/fontFamily/primary": {
          $value: "Noto Sans JP",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "dic/reference/typography/fontWeight/regular": {
          $value: 400,
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "dic/reference/typography/lineHeight/none": {
          $value: 1,
          $type: "number",
          $description: "None line height",
        },
        "dic/reference/typography/scale/compact/twoExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Two extra small",
        },
        "dic/reference/typography/scale/expanded/fourExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Four extra small",
        },
      },
      "tokens/system/typography.compact.json": {
        "dic/system/typography/display/small/fontFamily": {
          $value: "{dic.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "dic/system/typography/display/small/fontSize": {
          $value: "{dic.reference.typography.scale.compact.twoExtraSmall}",
          $type: "dimension",
          $description: "Two extra small",
        },
        "dic/system/typography/display/small/fontWeight": {
          $value: "{dic.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "dic/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "dic/system/typography/display/small/lineHeight": {
          $value: "{dic.reference.typography.lineHeight.none}",
          $type: "number",
          $description: "None line height",
        },
      },
      "tokens/system/typography.expanded.json": {
        "dic/system/typography/display/small/fontFamily": {
          $value: "{dic.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "dic/system/typography/display/small/fontSize": {
          $value: "{dic.reference.typography.scale.expanded.fourExtraSmall}",
          $type: "dimension",
          $description: "Four extra small",
        },
        "dic/system/typography/display/small/fontWeight": {
          $value: "{dic.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "dic/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "dic/system/typography/display/small/lineHeight": {
          $value: "{dic.reference.typography.lineHeight.none}",
          $type: "number",
          $description: "None line height",
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
      "tokens/reference/color.default.json": {
        "dic/reference/color/scale/blue/100": {
          $value: "#DBF3FF",
          $type: "color",
          $description: "Blue 100 color",
        },
      },
      "tokens/system/color.default.json": {
        "dic/system/color/primary": {
          $value: "{dic.reference.color.scale.blue.100}",
          $type: "color",
          $description: "Primary color",
        },
      },
      "tokens/reference/dimension.default.json": {
        "dic/reference/dimension/scale/1": {
          $value: "1px",
          $type: "dimension",
          $description: "1px",
        },
      },
      "tokens/system/dimension.default.json": {
        "dic/system/dimension/border/medium": {
          $value: "{dic.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
      },
      "tokens/reference/typography.default.json": {
        "dic/reference/typography/fontFamily/primary": {
          $value: "Noto Sans JP",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "dic/reference/typography/fontWeight/regular": {
          $value: 400,
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "dic/reference/typography/lineHeight/none": {
          $value: 1,
          $type: "number",
          $description: "None line height",
        },
        "dic/reference/typography/scale/compact/twoExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Two extra small",
        },
        "dic/reference/typography/scale/expanded/fourExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Four extra small",
        },
      },
      "tokens/system/typography.compact.json": {
        "dic/system/typography/display/small/fontFamily": {
          $value: "{dic.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "dic/system/typography/display/small/fontSize": {
          $value: "{dic.reference.typography.scale.compact.twoExtraSmall}",
          $type: "dimension",
          $description: "Two extra small",
        },
        "dic/system/typography/display/small/fontWeight": {
          $value: "{dic.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "dic/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "dic/system/typography/display/small/lineHeight": {
          $value: "{dic.reference.typography.lineHeight.none}",
          $type: "number",
          $description: "None line height",
        },
      },
      "tokens/system/typography.expanded.json": {
        "dic/system/typography/display/small/fontFamily": {
          $value: "{dic.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "dic/system/typography/display/small/fontSize": {
          $value: "{dic.reference.typography.scale.expanded.fourExtraSmall}",
          $type: "dimension",
          $description: "Four extra small",
        },
        "dic/system/typography/display/small/fontWeight": {
          $value: "{dic.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "dic/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "dic/system/typography/display/small/lineHeight": {
          $value: "{dic.reference.typography.lineHeight.none}",
          $type: "number",
          $description: "None line height",
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
        id: "color-reference",
        name: "color-reference",
        initialModeId: "color-reference.default",
      },
      {
        action: "CREATE",
        id: "color-system",
        name: "color-system",
        initialModeId: "color-system.default",
      },
      {
        action: "CREATE",
        id: "dimension-reference",
        name: "dimension-reference",
        initialModeId: "dimension-reference.default",
      },
      {
        action: "CREATE",
        id: "dimension-system",
        name: "dimension-system",
        initialModeId: "dimension-system.default",
      },
      {
        action: "CREATE",
        id: "typography-reference",
        name: "typography-reference",
        initialModeId: "typography-reference.default",
      },
      {
        action: "CREATE",
        id: "typography-system",
        name: "typography-system",
        initialModeId: "typography-system.compact",
      },
    ]);

    expect(result.variableModes).toEqual([
      {
        action: "UPDATE",
        id: "color-reference.default",
        name: "default",
        variableCollectionId: "color-reference",
      },
      {
        action: "UPDATE",
        id: "color-system.default",
        name: "default",
        variableCollectionId: "color-system",
      },
      {
        action: "UPDATE",
        id: "dimension-reference.default",
        name: "default",
        variableCollectionId: "dimension-reference",
      },
      {
        action: "UPDATE",
        id: "dimension-system.default",
        name: "default",
        variableCollectionId: "dimension-system",
      },
      {
        action: "UPDATE",
        id: "typography-reference.default",
        name: "default",
        variableCollectionId: "typography-reference",
      },
      {
        action: "UPDATE",
        id: "typography-system.compact",
        name: "compact",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        id: "typography-system.expanded",
        name: "expanded",
        variableCollectionId: "typography-system",
      },
    ]);

    expect(result.variables).toEqual([
      {
        action: "CREATE",
        id: "dic/reference/color/scale/blue/100",
        name: "dic/reference/color/scale/blue/100",
        variableCollectionId: "color-reference",
        resolvedType: "COLOR",
        description: "Blue 100 color",
      },
      {
        action: "CREATE",
        id: "dic/system/color/primary",
        name: "dic/system/color/primary",
        variableCollectionId: "color-system",
        resolvedType: "COLOR",
        description: "Primary color",
      },
      {
        action: "CREATE",
        id: "dic/reference/dimension/scale/1",
        name: "dic/reference/dimension/scale/1",
        variableCollectionId: "dimension-reference",
        resolvedType: "FLOAT",
        description: "1px",
      },
      {
        action: "CREATE",
        id: "dic/system/dimension/border/medium",
        name: "dic/system/dimension/border/medium",
        variableCollectionId: "dimension-system",
        resolvedType: "FLOAT",
        description: "Medium border",
      },
      {
        action: "CREATE",
        description: "Primary font family",
        id: "dic/reference/typography/fontFamily/primary",
        name: "dic/reference/typography/fontFamily/primary",
        resolvedType: "STRING",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Regular font weight",
        id: "dic/reference/typography/fontWeight/regular",
        name: "dic/reference/typography/fontWeight/regular",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "None line height",
        id: "dic/reference/typography/lineHeight/none",
        name: "dic/reference/typography/lineHeight/none",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Two extra small",
        id: "dic/reference/typography/scale/compact/twoExtraSmall",
        name: "dic/reference/typography/scale/compact/twoExtraSmall",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Four extra small",
        id: "dic/reference/typography/scale/expanded/fourExtraSmall",
        name: "dic/reference/typography/scale/expanded/fourExtraSmall",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Primary font family",
        id: "dic/system/typography/display/small/fontFamily",
        name: "dic/system/typography/display/small/fontFamily",
        resolvedType: "STRING",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        description: "Two extra small",
        id: "dic/system/typography/display/small/fontSize",
        name: "dic/system/typography/display/small/fontSize",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        description: "Regular font weight",
        id: "dic/system/typography/display/small/fontWeight",
        name: "dic/system/typography/display/small/fontWeight",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        id: "dic/system/typography/display/small/letterSpacing",
        name: "dic/system/typography/display/small/letterSpacing",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        description: "None line height",
        id: "dic/system/typography/display/small/lineHeight",
        name: "dic/system/typography/display/small/lineHeight",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
    ]);

    expect(result.variableModeValues).toEqual([
      {
        variableId: "dic/reference/color/scale/blue/100",
        modeId: "color-reference.default",
        value: { r: 0.8588235294117647, g: 0.9529411764705882, b: 1 },
      },
      {
        variableId: "dic/system/color/primary",
        modeId: "color-system.default",
        value: {
          type: "VARIABLE_ALIAS",
          id: "dic/reference/color/scale/blue/100",
        },
      },
      {
        variableId: "dic/reference/dimension/scale/1",
        modeId: "dimension-reference.default",
        value: 1,
      },
      {
        variableId: "dic/system/dimension/border/medium",
        modeId: "dimension-system.default",
        value: {
          type: "VARIABLE_ALIAS",
          id: "dic/reference/dimension/scale/1",
        },
      },
      {
        modeId: "typography-reference.default",
        value: "Noto Sans JP",
        variableId: "dic/reference/typography/fontFamily/primary",
      },
      {
        modeId: "typography-reference.default",
        value: 400,
        variableId: "dic/reference/typography/fontWeight/regular",
      },
      {
        modeId: "typography-reference.default",
        value: 1,
        variableId: "dic/reference/typography/lineHeight/none",
      },
      {
        modeId: "typography-reference.default",
        value: 10,
        variableId: "dic/reference/typography/scale/compact/twoExtraSmall",
      },
      {
        modeId: "typography-reference.default",
        value: 10,
        variableId: "dic/reference/typography/scale/expanded/fourExtraSmall",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "dic/reference/typography/fontFamily/primary",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/fontFamily",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "dic/reference/typography/scale/compact/twoExtraSmall",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/fontSize",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "dic/reference/typography/fontWeight/regular",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/fontWeight",
      },
      {
        modeId: "typography-system.compact",
        value: 0,
        variableId: "dic/system/typography/display/small/letterSpacing",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "dic/reference/typography/lineHeight/none",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/lineHeight",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "dic/reference/typography/fontFamily/primary",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/fontFamily",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "dic/reference/typography/scale/expanded/fourExtraSmall",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/fontSize",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "dic/reference/typography/fontWeight/regular",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/fontWeight",
      },
      {
        modeId: "typography-system.expanded",
        value: 0,
        variableId: "dic/system/typography/display/small/letterSpacing",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "dic/reference/typography/lineHeight/none",
          type: "VARIABLE_ALIAS",
        },
        variableId: "dic/system/typography/display/small/lineHeight",
      },
    ]);
  });
});
