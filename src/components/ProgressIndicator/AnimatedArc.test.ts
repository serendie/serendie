import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { getAnimatedArcProps } from "./animatedArcProps";

describe("getAnimatedArcProps", () => {
  it("returns stable SVG props for the same animation progress", () => {
    assert.deepEqual(
      getAnimatedArcProps({ progress: 0.25, radius: 8, width: 6 }),
      getAnimatedArcProps({ progress: 0.25, radius: 8, width: 6 })
    );
  });

  it("normalizes progress into a single animation loop", () => {
    assert.deepEqual(
      getAnimatedArcProps({ progress: 0.25, radius: 8, width: 6 }),
      getAnimatedArcProps({ progress: 1.25, radius: 8, width: 6 })
    );
  });
});
