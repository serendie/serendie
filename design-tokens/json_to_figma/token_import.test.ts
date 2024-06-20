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
        sd: {
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
        sd: {
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
        sd: {
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
        sd: {
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
        sd: {
          system: {
            color: {
              primary: {
                $value: "{sd.reference.color.scale.blue.100}",
                $type: "color",
                $description: "Primary color",
              },
            },
          },
        },
      }),
      "tokens/system/dimension.default.json": JSON.stringify({
        sd: {
          system: {
            dimension: {
              border: {
                medium: {
                  $value: "{sd.reference.dimension.scale.1}",
                  $type: "dimension",
                  $description: "Medium border",
                },
              },
            },
          },
        },
      }),
      "tokens/system/elevation.default.json": JSON.stringify({
        sd: {
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
        sd: {
          system: {
            typography: {
              display: {
                small: {
                  $type: "typography",
                  $value: {
                    fontSize:
                      "{sd.reference.typography.scale.compact.twoExtraSmall}",
                    fontWeight: "{sd.reference.typography.fontWeight.regular}",
                    fontFamily: "{sd.reference.typography.fontFamily.primary}",
                    lineHeight: "{sd.reference.typography.lineHeight.none}",
                    letterSpacing: "0px",
                  },
                },
              },
            },
          },
        },
      }),
      "tokens/system/typography.expanded.json": JSON.stringify({
        sd: {
          system: {
            typography: {
              display: {
                small: {
                  $type: "typography",
                  $value: {
                    fontSize:
                      "{sd.reference.typography.scale.expanded.fourExtraSmall}",
                    fontWeight: "{sd.reference.typography.fontWeight.regular}",
                    fontFamily: "{sd.reference.typography.fontFamily.primary}",
                    lineHeight: "{sd.reference.typography.lineHeight.none}",
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
        "sd/reference/color/scale/blue/100": {
          $value: "#DBF3FF",
          $type: "color",
          $description: "Blue 100 color",
        },
      },
      "tokens/system/color.default.json": {
        "sd/system/color/primary": {
          $value: "{sd.reference.color.scale.blue.100}",
          $type: "color",
          $description: "Primary color",
        },
      },
      "tokens/reference/dimension.default.json": {
        "sd/reference/dimension/scale/1": {
          $value: "1px",
          $type: "dimension",
          $description: "1px",
        },
      },
      "tokens/system/dimension.default.json": {
        "sd/system/dimension/border/medium": {
          $value: "{sd.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
      },
      "tokens/reference/typography.default.json": {
        "sd/reference/typography/fontFamily/primary": {
          $value: "Noto Sans JP",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "sd/reference/typography/fontWeight/regular": {
          $value: 400,
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "sd/reference/typography/lineHeight/none": {
          $value: 1,
          $type: "number",
          $description: "None line height",
        },
        "sd/reference/typography/scale/compact/twoExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Two extra small",
        },
        "sd/reference/typography/scale/expanded/fourExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Four extra small",
        },
      },
      "tokens/system/typography.compact.json": {
        "sd/system/typography/display/small/fontFamily": {
          $value: "{sd.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "sd/system/typography/display/small/fontSize": {
          $value: "{sd.reference.typography.scale.compact.twoExtraSmall}",
          $type: "dimension",
          $description: "Two extra small",
        },
        "sd/system/typography/display/small/fontWeight": {
          $value: "{sd.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "sd/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "sd/system/typography/display/small/lineHeight": {
          $value: "{sd.reference.typography.lineHeight.none}",
          $type: "number",
          $description: "None line height",
        },
      },
      "tokens/system/typography.expanded.json": {
        "sd/system/typography/display/small/fontFamily": {
          $value: "{sd.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "sd/system/typography/display/small/fontSize": {
          $value: "{sd.reference.typography.scale.expanded.fourExtraSmall}",
          $type: "dimension",
          $description: "Four extra small",
        },
        "sd/system/typography/display/small/fontWeight": {
          $value: "{sd.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "sd/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "sd/system/typography/display/small/lineHeight": {
          $value: "{sd.reference.typography.lineHeight.none}",
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
        "sd/reference/color/scale/blue/100": {
          $value: "#DBF3FF",
          $type: "color",
          $description: "Blue 100 color",
        },
      },
      "tokens/system/color.default.json": {
        "sd/system/color/primary": {
          $value: "{sd.reference.color.scale.blue.100}",
          $type: "color",
          $description: "Primary color",
        },
      },
      "tokens/reference/dimension.default.json": {
        "sd/reference/dimension/scale/1": {
          $value: "1px",
          $type: "dimension",
          $description: "1px",
        },
      },
      "tokens/system/dimension.default.json": {
        "sd/system/dimension/border/medium": {
          $value: "{sd.reference.dimension.scale.1}",
          $type: "dimension",
          $description: "Medium border",
        },
      },
      "tokens/reference/typography.default.json": {
        "sd/reference/typography/fontFamily/primary": {
          $value: "Noto Sans JP",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "sd/reference/typography/fontWeight/regular": {
          $value: 400,
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "sd/reference/typography/lineHeight/none": {
          $value: 1,
          $type: "number",
          $description: "None line height",
        },
        "sd/reference/typography/scale/compact/twoExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Two extra small",
        },
        "sd/reference/typography/scale/expanded/fourExtraSmall": {
          $value: "10px",
          $type: "dimension",
          $description: "Four extra small",
        },
      },
      "tokens/system/typography.compact.json": {
        "sd/system/typography/display/small/fontFamily": {
          $value: "{sd.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "sd/system/typography/display/small/fontSize": {
          $value: "{sd.reference.typography.scale.compact.twoExtraSmall}",
          $type: "dimension",
          $description: "Two extra small",
        },
        "sd/system/typography/display/small/fontWeight": {
          $value: "{sd.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "sd/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "sd/system/typography/display/small/lineHeight": {
          $value: "{sd.reference.typography.lineHeight.none}",
          $type: "number",
          $description: "None line height",
        },
      },
      "tokens/system/typography.expanded.json": {
        "sd/system/typography/display/small/fontFamily": {
          $value: "{sd.reference.typography.fontFamily.primary}",
          $type: "fontFamily",
          $description: "Primary font family",
        },
        "sd/system/typography/display/small/fontSize": {
          $value: "{sd.reference.typography.scale.expanded.fourExtraSmall}",
          $type: "dimension",
          $description: "Four extra small",
        },
        "sd/system/typography/display/small/fontWeight": {
          $value: "{sd.reference.typography.fontWeight.regular}",
          $type: "fontWeight",
          $description: "Regular font weight",
        },
        "sd/system/typography/display/small/letterSpacing": {
          $value: "0px",
          $type: "dimension",
        },
        "sd/system/typography/display/small/lineHeight": {
          $value: "{sd.reference.typography.lineHeight.none}",
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
        id: "sd/reference/color/scale/blue/100",
        name: "sd/reference/color/scale/blue/100",
        variableCollectionId: "color-reference",
        resolvedType: "COLOR",
        description: "Blue 100 color",
      },
      {
        action: "CREATE",
        id: "sd/system/color/primary",
        name: "sd/system/color/primary",
        variableCollectionId: "color-system",
        resolvedType: "COLOR",
        description: "Primary color",
      },
      {
        action: "CREATE",
        id: "sd/reference/dimension/scale/1",
        name: "sd/reference/dimension/scale/1",
        variableCollectionId: "dimension-reference",
        resolvedType: "FLOAT",
        description: "1px",
      },
      {
        action: "CREATE",
        id: "sd/system/dimension/border/medium",
        name: "sd/system/dimension/border/medium",
        variableCollectionId: "dimension-system",
        resolvedType: "FLOAT",
        description: "Medium border",
      },
      {
        action: "CREATE",
        description: "Primary font family",
        id: "sd/reference/typography/fontFamily/primary",
        name: "sd/reference/typography/fontFamily/primary",
        resolvedType: "STRING",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Regular font weight",
        id: "sd/reference/typography/fontWeight/regular",
        name: "sd/reference/typography/fontWeight/regular",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "None line height",
        id: "sd/reference/typography/lineHeight/none",
        name: "sd/reference/typography/lineHeight/none",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Two extra small",
        id: "sd/reference/typography/scale/compact/twoExtraSmall",
        name: "sd/reference/typography/scale/compact/twoExtraSmall",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Four extra small",
        id: "sd/reference/typography/scale/expanded/fourExtraSmall",
        name: "sd/reference/typography/scale/expanded/fourExtraSmall",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-reference",
      },
      {
        action: "CREATE",
        description: "Primary font family",
        id: "sd/system/typography/display/small/fontFamily",
        name: "sd/system/typography/display/small/fontFamily",
        resolvedType: "STRING",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        description: "Two extra small",
        id: "sd/system/typography/display/small/fontSize",
        name: "sd/system/typography/display/small/fontSize",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        description: "Regular font weight",
        id: "sd/system/typography/display/small/fontWeight",
        name: "sd/system/typography/display/small/fontWeight",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        id: "sd/system/typography/display/small/letterSpacing",
        name: "sd/system/typography/display/small/letterSpacing",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
      {
        action: "CREATE",
        description: "None line height",
        id: "sd/system/typography/display/small/lineHeight",
        name: "sd/system/typography/display/small/lineHeight",
        resolvedType: "FLOAT",
        variableCollectionId: "typography-system",
      },
    ]);

    expect(result.variableModeValues).toEqual([
      {
        variableId: "sd/reference/color/scale/blue/100",
        modeId: "color-reference.default",
        value: { r: 0.8588235294117647, g: 0.9529411764705882, b: 1 },
      },
      {
        variableId: "sd/system/color/primary",
        modeId: "color-system.default",
        value: {
          type: "VARIABLE_ALIAS",
          id: "sd/reference/color/scale/blue/100",
        },
      },
      {
        variableId: "sd/reference/dimension/scale/1",
        modeId: "dimension-reference.default",
        value: 1,
      },
      {
        variableId: "sd/system/dimension/border/medium",
        modeId: "dimension-system.default",
        value: {
          type: "VARIABLE_ALIAS",
          id: "sd/reference/dimension/scale/1",
        },
      },
      {
        modeId: "typography-reference.default",
        value: "Noto Sans JP",
        variableId: "sd/reference/typography/fontFamily/primary",
      },
      {
        modeId: "typography-reference.default",
        value: 400,
        variableId: "sd/reference/typography/fontWeight/regular",
      },
      {
        modeId: "typography-reference.default",
        value: 1,
        variableId: "sd/reference/typography/lineHeight/none",
      },
      {
        modeId: "typography-reference.default",
        value: 10,
        variableId: "sd/reference/typography/scale/compact/twoExtraSmall",
      },
      {
        modeId: "typography-reference.default",
        value: 10,
        variableId: "sd/reference/typography/scale/expanded/fourExtraSmall",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "sd/reference/typography/fontFamily/primary",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/fontFamily",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "sd/reference/typography/scale/compact/twoExtraSmall",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/fontSize",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "sd/reference/typography/fontWeight/regular",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/fontWeight",
      },
      {
        modeId: "typography-system.compact",
        value: 0,
        variableId: "sd/system/typography/display/small/letterSpacing",
      },
      {
        modeId: "typography-system.compact",
        value: {
          id: "sd/reference/typography/lineHeight/none",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/lineHeight",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "sd/reference/typography/fontFamily/primary",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/fontFamily",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "sd/reference/typography/scale/expanded/fourExtraSmall",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/fontSize",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "sd/reference/typography/fontWeight/regular",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/fontWeight",
      },
      {
        modeId: "typography-system.expanded",
        value: 0,
        variableId: "sd/system/typography/display/small/letterSpacing",
      },
      {
        modeId: "typography-system.expanded",
        value: {
          id: "sd/reference/typography/lineHeight/none",
          type: "VARIABLE_ALIAS",
        },
        variableId: "sd/system/typography/display/small/lineHeight",
      },
    ]);
  });
});
