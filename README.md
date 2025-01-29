<h1 align='center'><img src='https://github.com/user-attachments/assets/a6e4b78e-a50c-4c6b-b04a-bb159a826b65' width='400px' alt="Serendie Design System" title="Serendie Design System"/></h1>

<div align="center">

[![GitHub](https://img.shields.io/github/license/serendie/serendie?style=flat)](https://github.com/serendie/serendie/blob/main/LICENSE)
[![Storybook](https://cdn.jsdelivr.net/gh/storybookjs/brand@main/badge/badge-storybook.svg)](https://storybook.serendie.design/)
[![X](https://img.shields.io/twitter/follow/SerendieDesign)](https://x.com/SerendieDesign/)

</div>

[Serendie Design System](https://serendie.design/)は、多様な事業と人々をつなぎ、新たな価値を生み出すための三菱電機によるオープンなデザインシステムです。デザインと開発の共通言語となるデザイントークン、それをベースにしたUIコンポーネント集「Serendie UI」、アイコン集「Serendie Symbols」などを提供しています。

## About

このリポジトリは次の3つから構成されるモノレポです。それぞれのパッケージは独立して使用可能です。詳細はそれぞれのREADMEを参照してください。

| Package name  | Location | Description |
| --- | --- | --- |
| `@serendie/ui` | [/ui](/ui/) | [Serendie UI Kit (Figma)](https://www.figma.com/community/file/1433690846108785966)と対となるReactベースのUIコンポーネント集(Figma Code Connectに対応) |
| `@serendie/design-tokens` | [/design-tokens](/design-tokens/) | [W3C Design Token Format Module](https://serendie.design/foundations/design-tokens/#section-6)の仕様で定義されたSerendie UIのベースとなるデザイントークン |
| `@serendie/style-dictonary-formatter` | [/style-dictonary-formatter](/style-dictionary-formatter) | デザイントークンを各プラットフォームに展開するための[amzn/style-dictonary](https://github.com/amzn/style-dictionary)のフォーマッタ |

また以下の関連リポジトリがあります。

| Package name  | Location | Description |
| --- | --- | --- |
| `@serendie/symbols` | [serendie/symbols](https://github.com/serendie/serendie-symbols) | Serendieらしい300種類以上のSVGアイコン集 |
| `@serendie/figma-utils` | [serendie/figma-utils](https://github.com/serendie/figma-utils) | Figma REST APIを用いて、`@serendie/design-tokens`とFigma Variablesの同期を行うためのユーティリティー集 |

## Examples

主要パッケージの導入サンプルとして、[serendie/bootcamp](https://github.com/serendie/bootcamp)を用意しています。また三菱電機内ではハンズオン形式で使い方を紹介するブートキャンプを開催しています。

## Adapting to sub-brands

Serendie Design Systemは[三菱電機の有する多様な事業に適応](https://serendie.design/about/#section-3)することがコンセプトの一つです。

`@serendie/desigon-tokens`および`@serendie/ui`は、デフォルトでSerendieのVisual Identity (VI)を継承しますが、各事業ブランドのVIに合わせてテーミング(サブブランド対応)できるよう社内向けに[🔒️serendie/subbrands-template](https://github.com/serendie/subbrands-template)を整備しています。

詳しくはSerendie Design Systemチームまでお問い合わせください。

## License

各パッケージはMITライセンスの下で配布されています。 詳しくは[LICENSE](/LICENSE)を参照してください。
