import "dotenv/config";
import { FigmaClient } from "./lib/FigmaClient";
import { resolveValue } from "./lib/resolveValue";
import { resolveVariableAlias } from "./lib/resolveVariableAlias";
import fs from "fs";
import { slashToDot } from "./lib/utils";
import path from "path";
import { resolveType } from "./lib/resolveType";
import { pathToObject } from "./lib/pathToObject";
import { resolveTypographyValue } from "./lib/resolveTypographyValue";
import { W3CToken } from "./types";
const OUTPUT_DIR = "figma_to_json/generated";

const main = async () => {
  const client = new FigmaClient(
    process.env.PERSONAL_ACCESS_TOKEN as string,
    process.env.FILE_KEY as string
  );

  const { variableCollections, variables } = await client.getLocalVariables();

  /*
   * Figmaから取得したデータを、W3C Token like な JSONに変換
   */
  const values = Object.values(variableCollections)
    .filter((v) => !v.remote)
    .map((collection) => {
      const { name, modes, variableIds } = collection;
      return {
        name,
        modes: modes.map((mode) => {
          return {
            modeName: mode.name,
            values: Object.values(variableIds).map((variableId) => {
              const variable = variables[variableId];
              const type = resolveType(variable);
              return {
                name: slashToDot(variable.name),
                description: variable.description || undefined,
                type,
                value: resolveValue(
                  resolveVariableAlias(variable, mode.modeId, variables),
                  type
                ),
                extensions: {
                  "com.figma": {
                    scopes: variable.scopes || undefined,
                    codeSyntax: variable.codeSyntax || undefined,
                  },
                },
              } as W3CToken;
            }),
          };
        }),
      };
    });

  /*
   * 各モードごとにファイルを出力
   */
  values.forEach((collection) => {
    const { name, modes } = collection;
    modes.forEach((mode) => {
      const outputPath = path.resolve(
        OUTPUT_DIR,
        `${name}.${mode.modeName}.json`
      );

      // タイポグラフィ関連のトークンを統合
      const typographyValues = resolveTypographyValue(mode.values);

      const mergedValues = typographyValues.reduce((acc, value) => {
        return pathToObject(
          value.name,
          {
            $value: value.value,
            $type: value.type,
            $description: value.description,
          },
          acc
        );
      }, {});

      fs.writeFileSync(outputPath, JSON.stringify(mergedValues, null, 2));
    });
  });
};

main();
