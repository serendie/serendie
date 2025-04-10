import * as fs from "fs";
import * as path from "path";
import * as ts from "typescript";

export interface PropInfo {
  name: string;
  type: string;
  required: boolean;
  description?: string;
  defaultValue?: string;
  isEnum?: boolean;
  enumValues?: string[];
  isUnion?: boolean;
  unionTypes?: string[];
  isGeneric?: boolean;
  genericParams?: string[];
  inherited?: boolean;
  inheritedFrom?: string;
  isFromNodeModules: boolean;
}

export interface ComponentInfo {
  name: string;
  props: PropInfo[];
  description?: string;
  exportType?: "default" | "named";
}

/**
 * TypeScriptコンパイラの型チェッカーを作成する
 */
function createTypeChecker(
  filePath: string,
  compilerOptions?: ts.CompilerOptions
): {
  checker: ts.TypeChecker;
  sourceFile: ts.SourceFile;
} {
  // デフォルトのコンパイラオプション
  const defaultOptions: ts.CompilerOptions = {
    target: ts.ScriptTarget.Latest,
    module: ts.ModuleKind.ESNext,
    moduleResolution: ts.ModuleResolutionKind.NodeJs,
    jsx: ts.JsxEmit.React,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    strict: true,
  };

  const options = { ...defaultOptions, ...compilerOptions };

  // ファイルの内容を読み込む
  const fileContent = fs.readFileSync(filePath, "utf-8");

  // ホストを作成
  const host = ts.createCompilerHost(options);
  const getSourceFile = host.getSourceFile;
  host.getSourceFile = (fileName, languageVersion) => {
    if (fileName === filePath) {
      return ts.createSourceFile(fileName, fileContent, languageVersion);
    }
    return getSourceFile(fileName, languageVersion);
  };

  // プログラムの作成
  const program = ts.createProgram([filePath], options, host);
  const checker = program.getTypeChecker();
  const sourceFile = program.getSourceFile(filePath);

  if (!sourceFile) {
    throw new Error(`ソースファイルを取得できませんでした: ${filePath}`);
  }

  return { checker, sourceFile };
}

/**
 * 宣言が外部モジュール（node_modules）から来たものかどうかを判定する
 */
function isExternalType(declaration: ts.Declaration | undefined): boolean {
  if (!declaration) return false;

  // 宣言のソースファイルパスを取得
  const sourceFile = declaration.getSourceFile();
  if (!sourceFile) return false;

  // ファイルパスが node_modules を含むかチェック
  return sourceFile.fileName.includes("node_modules");
}

/**
 * 型情報から詳細なプロパティ情報を抽出する
 */
function getDetailedPropInfo(
  checker: ts.TypeChecker,
  prop: ts.Symbol,
  sourceFile: ts.SourceFile
): PropInfo {
  const declarations = prop.getDeclarations();
  const declaration = declarations && declarations[0];

  // 外部モジュールからの型かチェック
  const isExternal =
    declarations && declarations.length > 0
      ? isExternalType(declarations[0])
      : false;

  const propName = prop.getName();
  let propType = "unknown";
  let required = true;
  let description: string | undefined;
  let defaultValue: string | undefined;
  let isEnum = false;
  let enumValues: string[] | undefined;
  let isUnion = false;
  let unionTypes: string[] | undefined;
  let isGeneric = false;
  let genericParams: string[] | undefined;
  let inherited = false;
  let inheritedFrom: string | undefined;
  const isFromNodeModules = isExternal;

  // 継承されたプロパティかどうかを判断（後方互換性のために残す）
  if (prop.flags & ts.SymbolFlags.Prototype) {
    inherited = true;
  }

  // 継承元を取得（後方互換性のために残す）
  if (declarations && declarations.length > 0) {
    const parent = declarations[0].parent;
    if (parent && ts.isInterfaceDeclaration(parent)) {
      // インターフェース宣言の親がインターフェースの場合
      inheritedFrom = parent.name.text;
    } else if (parent && ts.isTypeLiteralNode(parent) && parent.parent) {
      // 型リテラルの親が型エイリアスの場合
      const grandParent = parent.parent;
      if (ts.isTypeAliasDeclaration(grandParent)) {
        inheritedFrom = grandParent.name.text;
      }
    }
  }

  // プロパティが必須かどうかを判定
  if (declaration && ts.isPropertySignature(declaration)) {
    required = !declaration.questionToken;
  }

  // JSDocコメントからプロパティの説明を取得
  if (declaration) {
    const propJsDocs = ts.getJSDocCommentsAndTags(declaration) as ts.JSDoc[];
    if (propJsDocs && propJsDocs.length > 0) {
      if (propJsDocs[0].comment) {
        description = propJsDocs[0].comment.toString();
      }

      // JSDocタグを処理
      propJsDocs.forEach((jsDoc) => {
        if (jsDoc.tags) {
          jsDoc.tags.forEach((tag) => {
            // @defaultタグを探して処理
            if (tag.tagName && tag.tagName.text === "default" && tag.comment) {
              defaultValue = tag.comment.toString();
            }
          });
        }
      });
    }
  }

  // 型情報を取得
  if (declaration && ts.isPropertySignature(declaration) && declaration.type) {
    // 型チェッカーを使用して実際の型を取得
    const type = checker.getTypeAtLocation(declaration.type);

    // 型文字列を取得
    propType = checker.typeToString(type);

    // ジェネリック型の場合
    if (
      declaration.type.kind === ts.SyntaxKind.TypeReference &&
      (declaration.type as ts.TypeReferenceNode).typeArguments
    ) {
      isGeneric = true;
      const typeRef = declaration.type as ts.TypeReferenceNode;
      genericParams = typeRef.typeArguments?.map((arg) =>
        arg.getText(sourceFile)
      );
    }

    // 列挙型の場合
    if (
      type.isUnion() &&
      type.types.every(
        (t) =>
          t.flags & (ts.TypeFlags.StringLiteral | ts.TypeFlags.NumberLiteral)
      )
    ) {
      isEnum = true;
      enumValues = type.types.map((t) => {
        // リテラル型からの値の抽出
        if (t.isLiteral() && t.value !== undefined) {
          if (typeof t.value === "string") {
            return `'${t.value}'`;
          }
          return String(t.value);
        }
        return checker.typeToString(t);
      });
    }

    // ユニオン型の場合
    if (type.isUnion() && !isEnum) {
      isUnion = true;
      unionTypes = type.types.map((t) => checker.typeToString(t));
    }
  }

  return {
    name: propName,
    type: propType,
    required,
    description,
    defaultValue,
    isEnum,
    enumValues,
    isUnion,
    unionTypes,
    isGeneric,
    genericParams,
    inherited,
    inheritedFrom,
    isFromNodeModules,
  };
}

/**
 * 型メンバーを処理して詳細なプロパティ情報を取得
 * @param includeExternal node_modulesからのプロパティも含めるかどうか（デフォルトはfalse）
 */
function processTypeWithChecker(
  checker: ts.TypeChecker,
  type: ts.Type,
  sourceFile: ts.SourceFile,
  includeExternal: boolean = false
): PropInfo[] {
  const props: PropInfo[] = [];

  // 型のプロパティを取得
  type.getProperties().forEach((prop) => {
    const propInfo = getDetailedPropInfo(checker, prop, sourceFile);

    // node_modulesからの型はスキップする（オプションでincludeする場合を除く）
    if (!propInfo.isFromNodeModules || includeExternal) {
      props.push(propInfo);
      console.log(
        `  プロパティを見つけました: ${propInfo.name}: ${propInfo.type}${propInfo.isFromNodeModules ? " (外部モジュール)" : ""}`
      );
    }
  });

  return props;
}

/**
 * 直接定義されたプロパティのみを持つコンポーネント情報を取得する
 * node_modulesからのプロパティは含めない
 */
export function parseComponentPropsBasic(filePath: string): ComponentInfo {
  return parseComponentProps(filePath, false);
}

/**
 * 全てのプロパティ（node_modulesを含む）を持つコンポーネント情報を取得する
 */
export function parseComponentPropsDetail(filePath: string): ComponentInfo {
  return parseComponentProps(filePath, true);
}

/**
 * TypeScriptファイルからコンポーネントの型情報を抽出する
 * @param includeExternal node_modulesからのプロパティも含めるかどうか
 */
export function parseComponentProps(
  filePath: string,
  includeExternal: boolean = false
): ComponentInfo {
  // 詳細なログを削除
  // console.log(`ファイルを解析中: ${filePath}`);
  const fileName = path.basename(filePath);
  const componentName = path.basename(fileName, path.extname(fileName));
  // console.log(`コンポーネント名: ${componentName}`);

  // 型チェッカーを作成
  const { checker, sourceFile } = createTypeChecker(filePath);

  // コンポーネントのプロパティ情報を格納する配列
  const props: PropInfo[] = [];
  let componentDescription: string | undefined;
  let exportType: "default" | "named" | undefined;

  // インターフェース定義を検索するデバッグ情報
  const interfaces: string[] = [];
  const types: string[] = [];

  // ファイル内のインターフェースまたは型エイリアスを検索し、Propsの型を見つける
  ts.forEachChild(sourceFile, (node) => {
    // エクスポート情報の確認
    if (ts.isExportAssignment(node) && node.isExportEquals === false) {
      // export default の場合
      exportType = "default";
    } else if (ts.isExportDeclaration(node)) {
      // 名前付きエクスポートの場合
      exportType = "named";
    }

    // インターフェース宣言を処理
    if (ts.isInterfaceDeclaration(node)) {
      const interfaceName = node.name.text;
      interfaces.push(interfaceName);

      // 名前でPropsインターフェースを検索
      if (
        interfaceName === `${componentName}Props` ||
        interfaceName === `${componentName}PropTypes` ||
        interfaceName.endsWith("Props") ||
        interfaceName.endsWith("PropTypes")
      ) {
        // console.log(`インターフェースを見つけました: ${interfaceName}`);

        // JSDocコメントからコンポーネントの説明を取得
        const jsDoc = ts.getJSDocCommentsAndTags(node) as ts.JSDoc[];
        if (jsDoc && jsDoc.length > 0 && jsDoc[0].comment) {
          componentDescription = jsDoc[0].comment.toString();
        }

        // インターフェースシンボルから型情報を取得
        const interfaceType = checker.getTypeAtLocation(node.name);
        const propsFromChecker = processTypeWithChecker(
          checker,
          interfaceType,
          sourceFile,
          includeExternal
        );
        props.push(...propsFromChecker);
      }
    }

    // 型エイリアス宣言を処理（type宣言）
    else if (ts.isTypeAliasDeclaration(node)) {
      const typeName = node.name.text;
      types.push(typeName);

      // 名前でPropsタイプを検索
      if (
        typeName === `${componentName}Props` ||
        typeName === `${componentName}PropTypes` ||
        typeName === `${componentName}Prop` ||
        typeName.endsWith("Props") ||
        typeName.endsWith("PropTypes") ||
        typeName === `${componentName}` ||
        typeName === "Props" ||
        typeName === "ButtonProps" || // UIコンポーネントに多い命名
        typeName === "InputProps" ||
        typeName === "CardProps" ||
        typeName === "MenuProps"
      ) {
        // console.log(`型エイリアスを見つけました: ${typeName}`);

        // JSDocコメントからコンポーネントの説明を取得
        const jsDoc = ts.getJSDocCommentsAndTags(node) as ts.JSDoc[];
        if (jsDoc && jsDoc.length > 0 && jsDoc[0].comment) {
          componentDescription = jsDoc[0].comment.toString();
        }

        // 型チェッカーを使用して実際の型を取得
        const type = checker.getTypeAtLocation(node.name);
        const propsFromChecker = processTypeWithChecker(
          checker,
          type,
          sourceFile,
          includeExternal
        );
        props.push(...propsFromChecker);
      }
    }

    // 関数コンポーネントの宣言を検索
    else if (
      ts.isFunctionDeclaration(node) &&
      node.name &&
      node.name.text === componentName
    ) {
      // console.log(`関数コンポーネントを見つけました: ${componentName}`);

      // JSDocコメントからコンポーネントの説明を取得
      const jsDoc = ts.getJSDocCommentsAndTags(node) as ts.JSDoc[];
      if (jsDoc && jsDoc.length > 0 && jsDoc[0].comment) {
        componentDescription = jsDoc[0].comment.toString();
      }

      // 関数の最初のパラメータを取得（これがpropsになる）
      if (node.parameters.length > 0) {
        const propsParam = node.parameters[0];
        if (propsParam.type) {
          const type = checker.getTypeAtLocation(propsParam);
          const propsFromChecker = processTypeWithChecker(
            checker,
            type,
            sourceFile,
            includeExternal
          );
          props.push(...propsFromChecker);
        }
      }
    }

    // 変数宣言（アロー関数のコンポーネントなど）を処理
    else if (ts.isVariableStatement(node)) {
      for (const declaration of node.declarationList.declarations) {
        if (declaration.name && ts.isIdentifier(declaration.name)) {
          const varName = declaration.name.text;

          // コンポーネント名に一致する変数を見つけたら、その型を解析
          if (varName === componentName) {
            // console.log(`コンポーネント変数定義を見つけました: ${varName}`);

            // 変数のJSDocコメントを取得
            const jsDoc = ts.getJSDocCommentsAndTags(node) as ts.JSDoc[];
            if (jsDoc && jsDoc.length > 0 && jsDoc[0].comment) {
              componentDescription = jsDoc[0].comment.toString();
            }

            // 変数が関数式や矢印関数の場合
            if (declaration.initializer) {
              if (
                ts.isFunctionExpression(declaration.initializer) ||
                ts.isArrowFunction(declaration.initializer)
              ) {
                const funcExpr = declaration.initializer;
                if (funcExpr.parameters.length > 0) {
                  const propsParam = funcExpr.parameters[0];
                  if (propsParam.type) {
                    const type = checker.getTypeAtLocation(propsParam);
                    const propsFromChecker = processTypeWithChecker(
                      checker,
                      type,
                      sourceFile,
                      includeExternal
                    );
                    props.push(...propsFromChecker);
                  }
                }
              }
              // React.memoやforwardRefのような高階コンポーネントの場合
              else if (ts.isCallExpression(declaration.initializer)) {
                const call = declaration.initializer;
                // 引数が関数の場合
                for (const arg of call.arguments) {
                  if (ts.isFunctionExpression(arg) || ts.isArrowFunction(arg)) {
                    if (arg.parameters.length > 0) {
                      const propsParam = arg.parameters[0];
                      if (propsParam.type) {
                        const type = checker.getTypeAtLocation(propsParam);
                        const propsFromChecker = processTypeWithChecker(
                          checker,
                          type,
                          sourceFile,
                          includeExternal
                        );
                        props.push(...propsFromChecker);
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  });

  // まだPropsが見つかっていなければ、他の可能性を探す
  if (props.length === 0) {
    // console.log(
    //   "通常の方法でプロパティが見つかりませんでした。ファイル全体でPropsを検索します..."
    // );

    // ファイル全体から型定義の可能性のあるものを探す
    ts.forEachChild(sourceFile, (node) => {
      // 型エイリアス宣言で特定のパターンにマッチするものを検索
      if (ts.isTypeAliasDeclaration(node)) {
        const typeName = node.name.text;

        // 汎用的なコンポーネントProps命名パターン
        if (
          typeName.includes(componentName) || // コンポーネント名を含む
          typeName.includes("Props") || // Propsという単語を含む
          typeName.includes("properties") // propertiesという単語を含む
        ) {
          // console.log(`潜在的なProps型を見つけました: ${typeName}`);

          // 型チェッカーを使用して型を解決
          const type = checker.getTypeAtLocation(node.name);
          const propsFromChecker = processTypeWithChecker(
            checker,
            type,
            sourceFile,
            includeExternal
          );
          props.push(...propsFromChecker);
        }
      }
    });

    // コード内のインポートされたすべてのタイプについても検索する
    sourceFile.forEachChild((node) => {
      if (ts.isImportDeclaration(node)) {
        if (node.importClause && node.importClause.namedBindings) {
          if (ts.isNamedImports(node.importClause.namedBindings)) {
            node.importClause.namedBindings.elements.forEach((element) => {
              const importName = element.name.text;
              // Propsを含む名前のインポートを検索
              if (
                importName.includes("Props") ||
                importName.includes(componentName)
              ) {
                // console.log(
                //   `インポートされた潜在的なProps型を見つけました: ${importName}`
                // );
                try {
                  // インポートされたシンボルを探す
                  const symbol = checker.getSymbolAtLocation(element.name);
                  if (symbol) {
                    const type = checker.getDeclaredTypeOfSymbol(symbol);
                    const propsFromChecker = processTypeWithChecker(
                      checker,
                      type,
                      sourceFile,
                      includeExternal
                    );
                    props.push(...propsFromChecker);
                  }
                } catch (_error) {
                  // console.error(
                  //   `インポートされた型の解析中にエラーが発生しました: ${error}`
                  // );
                }
              }
            });
          }
        }
      }
    });
  }

  if (interfaces.length === 0 && types.length === 0) {
    // console.log(`${fileName} に型定義が見つかりませんでした`);
  } else {
    if (interfaces.length > 0) {
      // console.log(`見つかったインターフェース: ${interfaces.join(", ")}`);
    }
    if (types.length > 0) {
      // console.log(`見つかった型エイリアス: ${types.join(", ")}`);
    }
  }

  if (props.length === 0) {
    // console.log(`${fileName} にプロパティが見つかりませんでした`);
  }

  return {
    name: componentName,
    props,
    description: componentDescription,
    exportType,
  };
}

/**
 * TypeScriptファイルから型定義を抽出する
 * @param includeExternal node_modulesからのプロパティも含めるかどうか
 */
export function parseTypeDefinition(
  filePath: string,
  includeExternal: boolean = true
): PropInfo[] {
  // console.log(`型定義ファイルを解析中: ${filePath}`);
  const { checker, sourceFile } = createTypeChecker(filePath);

  const props: PropInfo[] = [];

  // ファイル内のインターフェースと型エイリアスを処理
  sourceFile.forEachChild((node) => {
    if (ts.isTypeAliasDeclaration(node) || ts.isInterfaceDeclaration(node)) {
      const _typeName = node.name.text;
      // console.log(`型/インターフェイスを見つけました: ${typeName}`);

      // 型シンボルを取得
      const symbol = checker.getSymbolAtLocation(node.name);
      if (symbol) {
        const type = checker.getDeclaredTypeOfSymbol(symbol);
        const propsFromChecker = processTypeWithChecker(
          checker,
          type,
          sourceFile,
          includeExternal
        );
        props.push(...propsFromChecker);
      }
    }
  });

  // console.log(`${props.length}個のプロパティを見つけました`);
  return props;
}

/**
 * 直接定義されたプロパティのみを持つ型定義を取得する
 */
export function parseTypeDefinitionBasic(filePath: string): PropInfo[] {
  return parseTypeDefinition(filePath, false);
}

/**
 * 全てのプロパティ（node_modulesを含む）を持つ型定義を取得する
 */
export function parseTypeDefinitionDetail(filePath: string): PropInfo[] {
  return parseTypeDefinition(filePath, true);
}

/**
 * 指定したディレクトリ内のすべてのTypeScriptファイルからコンポーネント情報を取得する
 */
export function parseComponentsFromDirectory(
  directoryPath: string,
  options: { excludePatterns?: RegExp[] } = {}
): ComponentInfo[] {
  const {
    excludePatterns = [/\.stories\.tsx?$/, /\.test\.tsx?$/, /\.spec\.tsx?$/],
  } = options;
  const components: ComponentInfo[] = [];

  console.error(`ディレクトリを解析中: ${directoryPath}`);
  const startTime = Date.now();

  // ファイルリストを取得する関数（非同期処理のための準備）
  function getTypeScriptFiles(dirPath: string): string[] {
    const files: string[] = [];

    function scanDir(currentPath: string) {
      const entries = fs.readdirSync(currentPath);

      for (const entry of entries) {
        const fullPath = path.join(currentPath, entry);
        const stat = fs.statSync(fullPath);

        if (stat.isDirectory()) {
          scanDir(fullPath);
        } else if (
          (entry.endsWith(".tsx") || entry.endsWith(".ts")) &&
          !excludePatterns.some((pattern) => pattern.test(entry))
        ) {
          files.push(fullPath);
        }
      }
    }

    scanDir(dirPath);
    return files;
  }

  // すべてのTypeScriptファイルを収集
  const tsFiles = getTypeScriptFiles(directoryPath);
  console.error(`解析対象のファイル数: ${tsFiles.length}`);

  // ファイルごとに解析を実行
  for (const filePath of tsFiles) {
    try {
      const componentInfo = parseComponentProps(filePath);

      // プロパティが存在する場合のみ追加
      if (componentInfo.props.length > 0) {
        components.push(componentInfo);
      }
    } catch (error) {
      console.error(`Error parsing ${filePath}:`, error);
    }
  }

  const endTime = Date.now();
  console.error(
    `解析されたコンポーネント: ${components.length}個（処理時間: ${endTime - startTime}ms）`
  );
  return components;
}

/**
 * 指定したディレクトリ内のTypeScriptの型定義ファイルからプロパティ情報を取得する
 */
export function parseTypesFromDirectory(
  directoryPath: string,
  options: { filePattern?: RegExp; excludePatterns?: RegExp[] } = {}
): Record<string, PropInfo[]> {
  const {
    filePattern = /\.d\.ts$/,
    excludePatterns = [/\.stories\.d\.ts$/, /\.test\.d\.ts$/, /\.spec\.d\.ts$/],
  } = options;

  const typeDefinitions: Record<string, PropInfo[]> = {};

  console.log(`型定義ディレクトリを解析中: ${directoryPath}`);

  // ディレクトリ内のファイルを再帰的に処理する
  function processDirectory(dirPath: string) {
    const files = fs.readdirSync(dirPath);
    console.log(`${dirPath} 内のファイル数: ${files.length}`);

    for (const file of files) {
      const fullPath = path.join(dirPath, file);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        // サブディレクトリを再帰的に処理
        processDirectory(fullPath);
      } else if (
        filePattern.test(file) &&
        !excludePatterns.some((pattern) => pattern.test(file))
      ) {
        try {
          console.log(`ファイルを処理中: ${file}`);
          const props = parseTypeDefinition(fullPath, false);
          if (props.length > 0) {
            // ファイル名から拡張子を除いた名前をキーとして使用
            const typeName = path.basename(file, ".d.ts");
            typeDefinitions[typeName] = props;
            console.log(
              `型定義を追加: ${typeName} (${props.length}個のプロパティ)`
            );
          } else {
            console.log(`プロパティがないためスキップ: ${file}`);
          }
        } catch (error) {
          console.error(`Error parsing ${fullPath}:`, error);
        }
      }
    }
  }

  processDirectory(directoryPath);
  console.log(`解析された型定義: ${Object.keys(typeDefinitions).length}個`);
  return typeDefinitions;
}
