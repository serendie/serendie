import { describe, expect, test } from "vitest";
import { pathToObject } from "./pathToObject";

describe("pathToObject", () => {
  test("関数が存在する", () => {
    expect(pathToObject).toBeDefined();
  });

  test("パスをオブジェクトに変換する", () => {
    expect(
      pathToObject("sd.system.color.impression.primary", { value: 1 }, {})
    ).toStrictEqual({
      sd: {
        system: {
          color: {
            impression: {
              primary: { value: 1 },
            },
          },
        },
      },
    });
  });

  test("第三引数にすでにあるオブジェクトがある場合はそれとマージする", () => {
    expect(
      pathToObject(
        "sd.system.color.impression.primary",
        { value: 1 },
        {
          sd: {
            system: {
              color: {
                impression: {
                  secondary: { value: 2 },
                },
              },
              margin: {
                primary: { value: 3 },
              },
            },
            reference: {
              color: {},
            },
          },
        }
      )
    ).toStrictEqual({
      sd: {
        system: {
          color: {
            impression: {
              primary: { value: 1 },
              secondary: { value: 2 },
            },
          },
          margin: {
            primary: { value: 3 },
          },
        },
        reference: {
          color: {},
        },
      },
    });
  });

  test("ノードが衝突する場合は例外を返す", () => {
    expect(() =>
      pathToObject(
        "sd.system.color.impression.primary",
        { value: 1 },
        {
          sd: {
            system: {
              color: {
                impression: {
                  primary: { value: 2 },
                },
              },
            },
          },
        }
      )
    ).toThrowError("Node already exists");
  });
});
