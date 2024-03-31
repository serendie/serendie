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
      "tokens/system/color.default.json",
      "tokens/system/dimension.default.json",
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

  test("handles files that do not have any tokens", () => {
    const result = readJsonFiles(["no_tokens.mode1.json"]);
    expect(result).toEqual({ "no_tokens.mode1.json": {} });
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
