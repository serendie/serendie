async function convertSvg(node) {
  const colors = getColors(node);
  const svg = await node.exportAsync({ format: "SVG" });
  const svgString = String.fromCharCode.apply(null, new Uint8Array(svg));
  const regex = /[stroke|fill]="(#[0-9A-F]{6})"/g;
  const replacedSvgString = svgString.replace(regex, (match, color) => {
    const colorObj = colors.find((c) => c.color === color);
    return colorObj
      ? match.replace(
          color,
          `var(--${colorObj.name.replaceAll("/", "-")}, ${color})`
        )
      : match;
  });

  figma.ui.postMessage({
    type: "svg-data",
    svg: replacedSvgString,
    name: node.name,
  });
}

function rgb2hex(r, g, b) {
  const toHex = (c) =>
    Math.round(c * 255)
      .toString(16)
      .padStart(2, "0");
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

function getColors(n) {
  const ret = [];
  const collections = getCollections(n);
  Object.keys(collections).forEach((key) => {
    // コレクションから変数と値を取得
    const collection = collections[key];
    const defaultModeId = collection.defaultModeId;
    collection.variableIds.forEach((id) => {
      const variable = figma.variables.getVariableById(id);
      const value = variable.valuesByMode[defaultModeId];
      if (value.type === "VARIABLE_ALIAS") {
        const v = figma.variables.getVariableById(value.id);
        const color = Object.values(v.valuesByMode)[0];
        ret.push({
          collectionName: collection.name,
          name: variable.name,
          color: rgb2hex(color.r, color.g, color.b),
        });
      } else {
        ret.push({
          collectionName: collection.name,
          name: variable.name,
          color: rgb2hex(value.r, value.g, value.b),
        });
      }
    });
  });
  return ret;
}

function getCollections(n) {
  // ノードで使われているコレクションを取得
  const ret = {};
  const paints = [];
  if (Array.isArray(n.fills)) {
    paints.push(...n.fills);
  }
  if (Array.isArray(n.strokes)) {
    paints.push(...n.strokes);
  }
  paints.flat().forEach((paint) => {
    if (
      paint &&
      paint.boundVariables &&
      paint.boundVariables.color &&
      paint.boundVariables.color.type === "VARIABLE_ALIAS"
    ) {
      const variable = figma.variables.getVariableById(
        paint.boundVariables.color.id
      );
      const collection = figma.variables.getVariableCollectionById(
        variable.variableCollectionId
      );
      ret[collection.id] = collection;
    }
  });
  if (n.children) {
    n.children.forEach((child) => {
      Object.assign(ret, getCollections(child));
    });
  }
  return ret;
}

figma.on("run", async () => {
  const selectedNodes = figma.currentPage.selection;

  if (selectedNodes.length === 0) {
    figma.notify("ノードが選択されていません");
    figma.closePlugin();
    return;
  }

  try {
    await convertSvg(selectedNodes[0]);
  } catch (error) {
    console.error(error);
    figma.notify("SVGの生成中にエラーが発生しました");
  }
});

figma.ui.on("message", (message) => {
  if (message.type === "close-plugin") {
    figma.closePlugin();
  }
});

figma.showUI(__html__, { visible: false });
