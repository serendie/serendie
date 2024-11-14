import React from "react";
import { Symbol } from "../src";

export function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Symbol Examples</h1>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div>
          <h3>Outlined</h3>
          <Symbol name="home" variant="outlined" />
        </div>

        <div>
          <h3>Filled</h3>
          <Symbol name="home" variant="filled" />
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Symbol name="home" size={16} />
          <Symbol name="home" size={24} />
          <Symbol name="home" size={32} />
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Different Colors</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Symbol name="lock" style={{ color: "red" }} />
          <Symbol name="home" style={{ color: "blue" }} />
          <Symbol name="home" style={{ color: "green" }} />
        </div>
      </div>
    </div>
  );
}
