import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { TokenService } from "../utils/token-service.js";
import { z } from "zod";

// シングルトンとしてTokenServiceのインスタンスを作成
const tokenService = new TokenService();

/**
 * トークンリソースをMCPサーバーに登録する
 * @param server McpServer
 */
export function registerTokenResources(server: McpServer): void {
  // トークンカテゴリを取得するツール
  server.tool(
    "tokens:categories",
    "get serendie token categories",
    {},
    async () => {
      const categories = tokenService.getTokenCategories();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(categories, null, 2),
          },
        ],
      };
    }
  );

  // カテゴリ別にトークンを取得するツール
  server.tool(
    "tokens:list",
    "get serendie tokens by category",
    {
      category: z
        .string()
        .optional()
        .describe("取得するトークンのカテゴリ (省略可)"),
    },
    async ({ category }) => {
      let tokens;
      if (category) {
        tokens = tokenService.getTokensByCategory(category);
      } else {
        tokens = tokenService.getAllTokens();
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tokens, null, 2),
          },
        ],
      };
    }
  );

  // トークンを検索するツール
  server.tool(
    "tokens:search",
    "get serendie tokens by keyword",
    {
      keyword: z.string().describe("検索キーワード"),
    },
    async ({ keyword }) => {
      const tokens = tokenService.searchTokens(keyword);
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(tokens, null, 2),
          },
        ],
      };
    }
  );

  // トークンキャッシュをリフレッシュするツール
  server.tool(
    "tokens:refresh",
    "refresh serendie token cache",
    {},
    async () => {
      tokenService.refreshTokens();
      const categories = tokenService.getTokenCategories();
      const totalTokens = tokenService.getAllTokens().length;

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(
              {
                success: true,
                message: "トークンキャッシュをリフレッシュしました",
                categories: categories.length,
                tokens: totalTokens,
              },
              null,
              2
            ),
          },
        ],
      };
    }
  );
}
