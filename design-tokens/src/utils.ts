import * as fs from "fs";

export const green = (msg: string) => {
  return `\x1b[32m${msg}\x1b[0m`;
};

export const areSetsEqual = <T>(a: Set<T>, b: Set<T>) => {
  return a.size === b.size && [...a].every((item) => b.has(item));
};

export const tokenFiles = (dirPath: string): string[] => {
  const ret = [];
  const paths = fs.readdirSync(dirPath);

  for (const _path of paths) {
    const path = `${dirPath}/${_path}`;

    if (fs.statSync(path).isFile()) {
      ret.push(path);
    } else if (fs.statSync(path).isDirectory()) {
      ret.push(...tokenFiles(path));
    }
  }

  return ret;
};
