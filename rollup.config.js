// rollup.config.js
const glob = require("glob");
const path = require("path");
import copy from "rollup-plugin-copy";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import requireContext from "rollup-plugin-require-context";

// custom plugins
import cssLitPlugin from "./config/rollup-plugin-lit-css-import";
import svgLitPlugin from "./config/rollup-plugin-lit-svg-import";

const defaultPlugins = [
  requireContext(),
  svgLitPlugin(),
  cssLitPlugin(),
  resolve(),
  babel({
    exclude: "node_modules/**"
  })
];

// Use code splitting to create a esm build where you can import
// each component seperately
const components = glob.sync(`src/components/**/base-*.js`).reduce(
  (acc, filePath) => {
    const split = filePath.split("/");
    const lastName = split[split.length - 1];
    const fileName = lastName.slice(0, -3);
    console.log(fileName);
    return {
      ...acc,
      [`${fileName}`]: filePath
    };
  },
  { index: "src/main.js" }
);

export default [
  {
    input: components,
    output: [
      {
        dir: "dist/components",
        format: "esm"
      }
    ],
    plugins: defaultPlugins
  },
  {
    input: ["src/main.js"],
    output: [
      {
        file: "dist/main.js",
        format: "umd",
        name: "aprilabank"
      }
    ],
    plugins: [
      copy({
        targets: [{ src: "./src/themes/**/*", dest: "dist/themes" }]
      }),
      ...defaultPlugins
    ]
  }
];
