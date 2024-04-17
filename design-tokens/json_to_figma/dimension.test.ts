import { describe, expect, test } from "vitest";
import { parseDimension } from "./dimension";

describe("parseDimension", () => {
  test("parses dimension values", () => {
    expect(parseDimension("1px")).toBe(1);
    expect(parseDimension("1rem")).toBe(16);

    expect(() => parseDimension("1")).toThrowError("Invalid dimension format");
    expect(() => parseDimension("px")).toThrowError("Invalid dimension format");
  });
});
