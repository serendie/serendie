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
  [...(n.fills || []), ...(n.strokes || [])].forEach((paint) => {
    if (
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
      ret.push({
        collectionName: collection.name,
        name: variable.name,
        color: rgb2hex(paint.color.r, paint.color.g, paint.color.b),
      });
    }
  });

  if (n.children) {
    n.children.forEach((child) => {
      ret.push(...getColors(child));
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
