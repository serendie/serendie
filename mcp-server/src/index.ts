import express from "express";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { SSEServerTransport } from "@modelcontextprotocol/sdk/server/sse.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";

import { registerComponentResources } from "./resources/components.js";
import { registerTokenResources } from "./resources/tokens.js";
import { preloadComponents } from "./utils/component-service.js";

console.error("Serendie Component Props Server を起動しています...");

// MCPサーバーの作成
const server = new McpServer({
  name: "Serendie Component Props Server",
  version: "1.0.0",
});

// リソースの登録
console.error("統合コンポーネントツールを登録します...");
registerComponentResources(server);
console.error("デザイントークンツールを登録します...");
registerTokenResources(server);

async function startServer() {
  const args = process.argv.slice(2);
  const mode = args[0] || "stdio";

  console.error(`Starting MCP server in ${mode} mode`);

  // サーバーの起動準備中にコンポーネントを事前ロード
  console.error("コンポーネントを事前ロードしています...");
  try {
    const startTime = Date.now();
    await Promise.resolve(preloadComponents());
    const endTime = Date.now();
    console.error(
      `コンポーネントの事前ロードが完了しました（${endTime - startTime}ms）`
    );
  } catch (error) {
    console.error("コンポーネントの事前ロード中にエラーが発生しました:", error);
    // エラーが発生しても起動は続行
  }

  if (mode === "stdio") {
    // stdioトランスポートを使用
    console.error("Starting MCP server with stdio transport");
    const transport = new StdioServerTransport();
    console.error("Connecting to stdio transport...");
    await server.connect(transport);
    console.error("Connected to stdio transport");
  } else if (mode === "sse") {
    // HTTP/SSEトランスポートを使用
    const app = express();
    const port = parseInt(args[1] || "3001", 10);

    console.error(`Setting up SSE server on port ${port}`);

    // 複数の同時接続をサポートするためのトランスポートの管理
    const transports: { [sessionId: string]: SSEServerTransport } = {};

    app.get("/sse", async (_req, res) => {
      console.error("New SSE connection");
      const transport = new SSEServerTransport("/messages", res);
      transports[transport.sessionId] = transport;
      console.error(`SSE session created: ${transport.sessionId}`);

      res.on("close", () => {
        console.error(`SSE session closed: ${transport.sessionId}`);
        delete transports[transport.sessionId];
      });

      await server.connect(transport);
    });

    app.post("/messages", async (req, res) => {
      const sessionId = req.query.sessionId as string;
      console.error(`Received message for session: ${sessionId}`);
      const transport = transports[sessionId];

      if (transport) {
        await transport.handlePostMessage(req, res);
      } else {
        console.error(`No transport found for sessionId: ${sessionId}`);
        res.status(400).send("No transport found for sessionId");
      }
    });

    app.listen(port, () => {
      console.error(`MCP server listening on port ${port}`);
      // サーバー情報の表示
      console.error("Server started successfully");
    });
  } else {
    console.error('Unknown transport mode. Use "stdio" or "sse"');
    process.exit(1);
  }
}

startServer().catch((err) => {
  console.error("サーバー起動エラー:", err);
  process.exit(1);
});
