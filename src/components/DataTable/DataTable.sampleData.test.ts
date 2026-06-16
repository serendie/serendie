import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { createDataTableRows } from "./DataTable.sampleData";

describe("createDataTableRows", () => {
  it("generates stable sample rows from the default seed", () => {
    assert.deepEqual(createDataTableRows(), createDataTableRows());
  });

  it("does not depend on global Math.random", () => {
    const originalRandom = Math.random;
    Math.random = () => {
      throw new Error("Math.random must not be used for Storybook data");
    };

    try {
      assert.equal(createDataTableRows().length, 10);
    } finally {
      Math.random = originalRandom;
    }
  });

  it("generates rows that match the Storybook table format", () => {
    const rows = createDataTableRows();

    assert.equal(rows.length, 10);

    rows.forEach((row, index) => {
      assert.equal(row.id, index + 1);
      assert.match(row.time, /^2025-04-\d{2} \d{2}:\d{2}$/);
      assert.match(row.coverage, /^\d+%$/);
      assert.match(row.errorRate, /^\d+\.\d{2}%$/);
      assert.ok(row.connections >= 50 && row.connections <= 5000);
      assert.ok(row.households >= 30 && row.households <= 4000);
    });
  });
});
