import { describe, expect, test, vi } from "vitest";
import { readJsonFiles } from "./token_import";

describe("readJsonFiles", () => {
  vi.mock("fs", () => {
    const MOCK_FILE_INFO: { [fileName: string]: string } = {
      "tokens/color.tokens.json": JSON.stringify({
        color: {
          primary: {
            $value: "{color.scale.purple.1}",
            $type: "color",
            $description: "Primary color",
          },
          scale: {
            purple: {
              1: {
                $value: "#b79ed9",
                $type: "color",
                $descrption: "Purple 1 color",
              },
            },
          },
        },
      }),
      "tokens/dimension.tokens.json": JSON.stringify({
        dimension: {
          spacing: {
            medium: {
              $value: "{dimension.scale.1}",
              $type: "dimension",
              $description: "Medium spacing",
            },
          },
          scale: {
            1: {
              $value: "1px",
              $type: "dimension",
              $description: "1px spacing",
            },
          },
        },
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
      "tokens/color.tokens.json",
      "tokens/dimension.tokens.json",
    ]);

    expect(result).toEqual({
      "color.tokens.json": {
        "color/primary": {
          $value: "{color.scale.purple.1}",
          $type: "color",
          $description: "Primary color",
        },
        "color/scale/purple/1": {
          $value: "#b79ed9",
          $type: "color",
          $descrption: "Purple 1 color",
        },
      },
      "dimension.tokens.json": {
        "dimension/spacing/medium": {
          $value: "{dimension.scale.1}",
          $type: "dimension",
          $description: "Medium spacing",
        },
        "dimension/scale/1": {
          $value: "1px",
          $type: "dimension",
          $description: "1px spacing",
        },
      },
    });
  });
});
