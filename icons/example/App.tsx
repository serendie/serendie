import React from "react";
import { Icon } from "../src";

export function App() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Icon Examples</h1>

      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <div>
          <h3>Outlined</h3>
          <Icon name="home" variant="outlined" />
        </div>

        <div>
          <h3>Filled</h3>
          <Icon name="home" variant="filled" />
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Different Sizes</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Icon name="home" size={16} />
          <Icon name="home" size={24} />
          <Icon name="home" size={32} />
        </div>
      </div>

      <div style={{ marginTop: "2rem" }}>
        <h3>Different Colors</h3>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Icon name="home" style={{ color: "red" }} />
          <Icon name="home" style={{ color: "blue" }} />
          <Icon name="home" style={{ color: "green" }} />
        </div>
      </div>
    </div>
  );
}
