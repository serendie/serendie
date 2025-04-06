import tokens from "@serendie/design-token/panda";

/**
 * トークン情報の型定義
 */
export interface Token {
  name: string;
  value: string | number | object;
  category: string;
  description?: string;
}

/**
 * デザイントークンを管理するサービスクラス
 * プロジェクト内のデザイントークンを解析してMCPで利用できる形式で提供する
 */
export class TokenService {
  private tokenCache: Token[] = [];
  private categories: Set<string> = new Set();
  private initialized: boolean = false;

  /**
   * トークンサービスコンストラクタ
   * トークンをフラット化して保存します
   */
  constructor() {
    this.refreshTokens();
  }

  /**
   * トークン情報をリフレッシュする
   */
  public refreshTokens(): void {
    try {
      console.error("トークン情報を読み込んでいます...");
      this.tokenCache = [];
      this.categories = new Set();

      // @serendie/design-token/pandaからインポートされたtokensオブジェクトを処理
      if (!tokens || typeof tokens !== "object") {
        console.error("トークン情報が見つかりませんでした");
        return;
      }

      // 第一階層をカテゴリとして扱う
      for (const [rootCategory, rootValue] of Object.entries(tokens)) {
        // themesカテゴリは除外
        if (rootCategory === "themes") continue;

        if (rootValue && typeof rootValue === "object") {
          this.categories.add(rootCategory);
          this.parseTokensWithCategory(
            rootValue as Record<string, unknown>,
            rootCategory,
            "" // 空のパスから始める（ルートカテゴリは含めない）
          );
        }
      }

      this.initialized = true;
      console.error(
        `トークン情報のロードが完了しました: ${this.tokenCache.length}個のトークン、${this.categories.size}個のカテゴリ`
      );
    } catch (error) {
      console.error("トークン情報の読み込み中にエラーが発生しました:", error);
      this.initialized = false;
    }
  }

  /**
   * カテゴリを指定してトークンオブジェクトを解析してキャッシュに格納
   */
  private parseTokensWithCategory(
    tokenObj: Record<string, unknown>,
    category: string,
    path: string = ""
  ): void {
    for (const [key, value] of Object.entries(tokenObj)) {
      // themesから始まるパスは除外
      if (path.startsWith("themes") || key === "themes") continue;

      const currentPath = path ? `${path}.${key}` : key;

      if (
        value !== null &&
        typeof value === "object" &&
        !Array.isArray(value)
      ) {
        // valueプロパティがあるかチェック
        if ("value" in value) {
          // valueプロパティがある場合はトークンとして扱う
          const token: Token = {
            name: currentPath, // パス全体をnameとして使用
            value: this.safeValue((value as { value: unknown }).value),
            category,
          };

          this.tokenCache.push(token);
        } else {
          // valueがオブジェクトの場合は再帰処理
          this.parseTokensWithCategory(
            value as Record<string, unknown>,
            category,
            currentPath
          );
        }
      } else {
        // valueがプリミティブ値または配列の場合はトークンとして扱う
        const token: Token = {
          name: currentPath, // パス全体をnameとして使用
          value: this.safeValue(value),
          category,
        };

        this.tokenCache.push(token);
      }
    }
  }

  /**
   * 値を安全にToken.valueの型に変換する
   */
  private safeValue(value: unknown): string | number | object {
    if (value === null) return "null";
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "object"
    ) {
      return value;
    }
    return String(value);
  }

  /**
   * 全トークンカテゴリを取得
   */
  public getTokenCategories(): string[] {
    if (!this.initialized) {
      this.refreshTokens();
    }
    return [...this.categories].sort();
  }

  /**
   * 全トークンを取得
   */
  public getAllTokens(): Token[] {
    if (!this.initialized) {
      this.refreshTokens();
    }
    return this.tokenCache;
  }

  /**
   * カテゴリでフィルタリングしたトークンを取得
   */
  public getTokensByCategory(category: string): Token[] {
    if (!this.initialized) {
      this.refreshTokens();
    }
    return this.tokenCache.filter((token) => token.category === category);
  }

  /**
   * キーワードでトークンを検索
   */
  public searchTokens(keyword: string): Token[] {
    if (!this.initialized) {
      this.refreshTokens();
    }

    const lowercaseKeyword = keyword.toLowerCase();

    return this.tokenCache.filter((token) => {
      // 名前での検索
      const nameMatch = token.name.toLowerCase().includes(lowercaseKeyword);

      // 値での検索（文字列の場合のみ）
      let valueMatch = false;
      if (typeof token.value === "string") {
        valueMatch = token.value.toLowerCase().includes(lowercaseKeyword);
      } else if (typeof token.value === "number") {
        valueMatch = String(token.value).includes(keyword);
      }

      return nameMatch || valueMatch;
    });
  }
}
