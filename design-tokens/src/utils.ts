export const green = (msg: string) => {
  return `\x1b[32m${msg}\x1b[0m`;
};

export const areSetsEqual = <T>(a: Set<T>, b: Set<T>) => {
  return a.size === b.size && [...a].every((item) => b.has(item));
};
