<h1 align='center'><img src='https://github.com/user-attachments/assets/a6e4b78e-a50c-4c6b-b04a-bb159a826b65' width='400px' alt="Serendie Design System" title="Serendie Design System"/></h1>

<div align="center">

[![GitHub](https://img.shields.io/github/license/serendie/serendie)](https://github.com/serendie/serendie/blob/main/LICENSE)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.serendie.design/)
[![X](https://img.shields.io/twitter/follow/SerendieDesign)](https://x.com/SerendieDesign/)

</div>

[Serendie Design System](https://serendie.design/)は、多様な事業と人々をつなぎ、新たな価値を生み出すための三菱電機によるオープンなデザインシステムです。デザインと開発の共通言語となるデザイントークン、それをベースにしたUIコンポーネント集「Serendie UI」、アイコン集「Serendie Symbols」などを提供しています。

## About

このリポジトリは次の3つから構成されるモノレポです。それぞれのパッケージは独立して使用可能です。詳細はそれぞれのREADMEを参照してください。

| Package name  | Location | Description |
| --- | --- | --- |
| [@serendie/ui](https://github.com/serendie/serendie/pkgs/npm/ui) | [`/ui`](/ui/) | ReactベースのUIコンポーネント集。[Serendie UI Kit (Figma)](https://www.figma.com/community/file/1433690846108785966)と対になっておりFigma Code Connectに対応。 |
| [@serendie/design-tokens](https://github.com/serendie/serendie/pkgs/npm/design-token) | [`/design-tokens`](/design-tokens/) | Serendie UIのベースとなるデザイントークン。5つのカラーテーマに対応し、[W3C Design Token Format Module](https://serendie.design/foundations/design-tokens/#section-6)の仕様に沿って定義。|
| [@serendie/style-dictonary-formatter](https://github.com/serendie/serendie/pkgs/npm/style-dictionary-formatter) | [`/style-dictonary-formatter`](/style-dictonary-formatter/) | 上記仕様に基づくデザイントークンを各プラットフォームに展開するための [amzn/style-dictonary](https://github.com/amzn/style-dictionary)のフォーマッタ |

また以下の関連リポジトリがあります。

| Package name  | Location | Description |
| --- | --- | --- |
| [@serendie/symbols](https://github.com/serendie/serendie-symbols/pkgs/npm/symbols) | [serendie/symbols](https://github.com/serendie/serendie-symbols) | Serendieらしい300種類以上のSVGアイコン集 |
| [@serendie/figma-utils](https://github.com/serendie/figma-utils/pkgs/npm/figma-utils) | [serendie/figma-utils](https://github.com/serendie/figma-utils) | Figma REST APIを用いて、`@serendie/design-tokens` と Figma Variables の同期 (import/export) を行うためのユーティリティー集 |

## Examples

主要パッケージの導入サンプルとして、[serendie/bootcamp](https://github.com/serendie/bootcamp)を用意しています。また三菱電機内ではハンズオン形式で使い方を紹介するブートキャンプを開催しています。

## Adapting to Sub-Brands

Serendie Design Systemは[三菱電機の有する多様な事業に適応](https://serendie.design/about/)することがコンセプトの一つです。`@serendie/desigon-tokens`および`@serendie/ui`は、SerendieのVisual Identity (VI) を継承していますが、各事業のVIに合わせてテーミング (サブブランド対応) が可能です。社内向けにそのための仕組み (🔒️[serendie/subbrands-template](https://github.com/serendie/subbrands-template)) を整備しています。

詳しくはSerendie Design Systemチームまでお問い合わせください。

## License

各パッケージはMITライセンスの下で配布されています。 詳しくは[LICENSE](/LICENSE)を参照してください。
