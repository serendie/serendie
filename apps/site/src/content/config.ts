import { z, defineCollection } from "astro:content";

const componentsCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    componentName: z.string(),
    description: z.string(),
    lastUpdated: z.string().optional(),
    illustSize: z.enum(["large", "small"]).optional(),
  }),
});

const pagesCollection = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // ページの更新日
    lastUpdated: z.string().optional(),
    // ヘッダの画像のタイプ
    illustType: z.enum(["A", "B", "C", "D"]).optional(),
    // ヘッダの画像のサイズ（これを指定するとヘッダー下部のボーダーが表示されなくなる
    illustSize: z.enum(["large", "small"]).optional(),
    // 右サイドバーを使わずに幅ギリギリまでつかう
    fullWidth: z.boolean().optional(),
    // ページ下部のread moreのリンク集を表示
    showSiblingLinks: z.boolean().optional(),
    // 親ページ(↓のsubLinksと併用する)
    parent: z.string().optional(),
    // ヘッダー下部のタブのリンク
    subLinks: z
      .array(
        z.object({
          name: z.string(),
          path: z.string(),
        })
      )
      .optional(),
  }),
});

export const collections = {
  components: componentsCollection,
  pages: pagesCollection,
};
