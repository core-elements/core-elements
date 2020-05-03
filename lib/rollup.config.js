// rollup.config.js
const glob = require("glob");
import copy from "rollup-plugin-copy";
import babel from "rollup-plugin-babel";
import resolve from "rollup-plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import requireContext from "rollup-plugin-require-context";

// custom plugins
import cssLitPlugin from "./config/rollup-plugin-lit-css-import";
import svgLitPlugin from "./config/rollup-plugin-lit-svg-import";

const defaultPlugins = [
  requireContext(),
  svgLitPlugin(),
  cssLitPlugin(),
  resolve(),
  commonjs(),
  babel({
    exclude: "node_modules/**",
  }),
];

// Use code splitting to create a esm build where you can import
// each component seperately
const components = glob.sync(`src/components/**/index.js`).reduce(
  (acc, filePath) => {
    const split = filePath.split("/");
    const componentName = split[split.length - 2];
    return {
      ...acc,
      [`${componentName}`]: filePath,
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
        format: "esm",
      },
    ],
    plugins: defaultPlugins,
  },
  {
    input: ["src/main.js"],
    output: [
      {
        file: "dist/main.js",
        format: "umd",
        name: "core",
      },
      {
        file: "dist/main.es.js",
        format: "es",
      },
    ],
    plugins: [
      copy({
        targets: [{ src: "./src/themes/**/*", dest: "dist/themes" }],
      }),
      ...defaultPlugins,
    ],
  },
];
