var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[__getOwnPropNames(fn)[0]])(fn = 0)), res;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// node_modules/@create-figma-plugin/utilities/lib/events.js
function on(name, handler) {
  const id = `${currentId}`;
  currentId += 1;
  eventHandlers[id] = { handler, name };
  return function() {
    delete eventHandlers[id];
  };
}
function once(name, handler) {
  let done = false;
  return on(name, function(...args) {
    if (done === true) {
      return;
    }
    done = true;
    handler(...args);
  });
}
function invokeEventHandler(name, args) {
  let invoked = false;
  for (const id in eventHandlers) {
    if (eventHandlers[id].name === name) {
      eventHandlers[id].handler.apply(null, args);
      invoked = true;
    }
  }
  if (invoked === false) {
    throw new Error(`No event handler with name \`${name}\``);
  }
}
var eventHandlers, currentId;
var init_events = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/events.js"() {
    eventHandlers = {};
    currentId = 0;
    if (typeof window === "undefined") {
      figma.ui.onmessage = function(args) {
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = args;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    } else {
      window.onmessage = function(event) {
        if (typeof event.data.pluginMessage === "undefined") {
          return;
        }
        const args = event.data.pluginMessage;
        if (!Array.isArray(args)) {
          return;
        }
        const [name, ...rest] = event.data.pluginMessage;
        if (typeof name !== "string") {
          return;
        }
        invokeEventHandler(name, rest);
      };
    }
  }
});

// node_modules/@create-figma-plugin/utilities/lib/ui.js
function showUI(options, data) {
  if (typeof __html__ === "undefined") {
    throw new Error("No UI defined");
  }
  const html = `<div id="create-figma-plugin"></div><script>document.body.classList.add('theme-${figma.editorType}');const __FIGMA_COMMAND__='${typeof figma.command === "undefined" ? "" : figma.command}';const __SHOW_UI_DATA__=${JSON.stringify(typeof data === "undefined" ? {} : data)};${__html__}</script>`;
  figma.showUI(html, __spreadProps(__spreadValues({}, options), {
    themeColors: typeof options.themeColors === "undefined" ? true : options.themeColors
  }));
}
var init_ui = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/ui.js"() {
  }
});

// node_modules/@create-figma-plugin/utilities/lib/index.js
var init_lib = __esm({
  "node_modules/@create-figma-plugin/utilities/lib/index.js"() {
    init_events();
    init_ui();
  }
});

// src/main.ts
var main_exports = {};
__export(main_exports, {
  default: () => main_default
});
async function main_default() {
  const selection = figma.currentPage.selection;
  if (selection.length === 0 || selection[0].type !== "FRAME") {
    figma.notify("Frame\u3092\u9078\u629E\u3057\u3066\u304F\u3060\u3055\u3044");
    const settingsPrefix = await figma.clientStorage.getAsync(
      "settings_prefix"
    );
    await showUI(
      { width: 240 },
      {
        window: "settings",
        settings: {
          prefix: settingsPrefix || ""
        }
      }
    );
    once("SAVE_SETTINGS", (data) => {
      figma.clientStorage.setAsync("settings_prefix", data.prefix);
      figma.closePlugin();
    });
    return;
  }
  const selectedFrame = selection[0];
  const designTokens = [];
  for (const node of selectedFrame.children) {
    printLayerInfo(node, 0, designTokens);
  }
  const svgData = await exportAndUpdateSVG(selectedFrame, designTokens);
  await showUI(
    { width: 240, height: 120 },
    {
      url: svgData == null ? void 0 : svgData.updatedSvgUrl,
      svgString: svgData == null ? void 0 : svgData.updatedSvgString,
      window: "export"
    }
  );
  once("CLOSE_PLUGIN", () => {
    figma.closePlugin();
  });
}
function printLayerInfo(node, depth = 0, designTokens) {
  const indent = "  ".repeat(depth);
  if ("fills" in node) {
    printPaintInfo(
      node,
      node.fills,
      "fills",
      indent,
      designTokens
    );
  }
  if ("strokes" in node) {
    printPaintInfo(node, node.strokes, "strokes", indent, designTokens);
  }
  if ("children" in node) {
    for (const child of node.children) {
      printLayerInfo(child, depth + 1, designTokens);
    }
  }
}
function printPaintInfo(node, paints, propertyName, indent, designTokens) {
  if (paints.length === 0) {
  } else {
    paints.forEach((paint, index) => {
      printPaintVariableInfo(
        node,
        paint,
        propertyName,
        indent + "      ",
        designTokens
      );
    });
  }
}
function printPaintVariableInfo(node, paint, propertyName, indent, designTokens) {
  if ("boundVariables" in paint) {
    const boundVars = paint.boundVariables;
    for (const key in boundVars) {
      const variableAlias = boundVars[key];
      if (variableAlias && variableAlias.type === "VARIABLE_ALIAS") {
        const variable = figma.variables.getVariableById(variableAlias.id);
        if (variable) {
          console.log(variable.codeSyntax);
          const collection = figma.variables.getVariableCollectionById(
            variable.variableCollectionId
          );
          console.log(
            `${indent}Variable (${key}): ${collection == null ? void 0 : collection.name}.${variable.name}`
          );
          console.log(
            `${indent}Value: ${JSON.stringify(variable.valuesByMode)}`
          );
          designTokens.push({
            layerName: node.name,
            type: propertyName === "fills" ? "fill" : "stroke",
            collection: (collection == null ? void 0 : collection.name) || "",
            name: variable.name,
            values: variable.valuesByMode
          });
        }
      }
    }
  }
}
async function updateSvgFillStroke(svgString, designTokens) {
  const fillTokens = designTokens.filter((token) => token.type === "fill");
  const strokeTokens = designTokens.filter((token) => token.type === "stroke");
  let fillIndex = 0;
  let strokeIndex = 0;
  const svgMatch = svgString.match(/^(<svg[^>]*>)[\s\S]*?(<rect[^>]*>)/);
  const svgHeader = svgMatch ? svgMatch[0] : "";
  const restOfSvg = svgString.slice(svgHeader.length);
  const prefix = await figma.clientStorage.getAsync("settings_prefix") || "";
  const updatedFill = restOfSvg.replace(/fill="([^"]*)"/g, (match, p1) => {
    if (fillIndex < fillTokens.length) {
      const token = fillTokens[fillIndex];
      const cssVar = `var(--${prefix}-${token.name.replaceAll(
        "/",
        "-"
      )}, ${p1})`;
      fillIndex++;
      return `fill="${cssVar}"`;
    }
    return match;
  });
  const updatedStroke = updatedFill.replace(
    /stroke="([^"]*)"/g,
    (match, p1) => {
      if (strokeIndex < strokeTokens.length) {
        const token = strokeTokens[strokeIndex];
        const cssVar = `var(--${prefix}-${token.name.replaceAll(
          "/",
          "-"
        )}, ${p1})`;
        strokeIndex++;
        return `stroke="${cssVar}"`;
      }
      return match;
    }
  );
  return svgHeader + updatedStroke;
}
async function exportAndUpdateSVG(node, designTokens) {
  try {
    const svg = await node.exportAsync({ format: "SVG" });
    const svgString = String.fromCharCode.apply(null, Array.from(svg));
    const updatedSvgString = await updateSvgFillStroke(svgString, designTokens);
    const updatedSvgUrl = `data:image/svg+xml,${encodeURIComponent(
      updatedSvgString
    )}`;
    return { updatedSvgUrl, updatedSvgString };
  } catch (error) {
    console.error("SVG\u51FA\u529B\u30A8\u30E9\u30FC:", error);
    if (error instanceof Error) {
      console.error("\u30A8\u30E9\u30FC\u30E1\u30C3\u30BB\u30FC\u30B8:", error.message);
      console.error("\u30B9\u30BF\u30C3\u30AF\u30C8\u30EC\u30FC\u30B9:", error.stack);
    }
    return null;
  }
}
var init_main = __esm({
  "src/main.ts"() {
    "use strict";
    init_lib();
  }
});

// <stdin>
var modules = { "src/main.ts--default": (init_main(), __toCommonJS(main_exports))["default"] };
var commandId = true ? "src/main.ts--default" : figma.command;
modules[commandId]();
