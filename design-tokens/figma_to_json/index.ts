import "dotenv/config";
import { FigmaClient } from "./lib/FigmaClient";
import { resolveValue } from "./lib/resolveValue";
import { resolveVariableAlias } from "./lib/resolveVariableAlias";
import fs from "fs";
import { slashToDot } from "./lib/utils";
import path from "path";
const OUTPUT_DIR = "figma_to_json/generated";

const main = async () => {
  const client = new FigmaClient(
    process.env.PERSONAL_ACCESS_TOKEN as string,
    process.env.FILE_KEY as string
  );

  const { variableCollections, variables } = await client.getLocalVariables();

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
              return {
                name: slashToDot(variable.name),
                description: variable.description || undefined,
                type: variable.resolvedType,
                value: resolveValue(
                  resolveVariableAlias(variable, mode.modeId, variables)
                ),
                scopes: variable.scopes,
                codeSyntax: variable.codeSyntax,
              };
            }),
          };
        }),
      };
    });

  values.forEach((collection) => {
    const { name, modes } = collection;
    modes.forEach((mode) => {
      const outputPath = path.resolve(
        OUTPUT_DIR,
        `${name}.${mode.modeName}.json`
      );
      fs.writeFileSync(outputPath, JSON.stringify(mode.values, null, 2));
    });
  });
};

main();
