import { createFilter } from "rollup-pluginutils";
import postcss from "postcss";
import { processString } from "uglifycss";
const config = require("./postcss.config");

const importDeclaration = "import { css } from 'lit-element';";

export default function css({
  include = /\.css$/i,
  exclude,
  uglify = true
} = {}) {
  const filter = createFilter(include, exclude);
  return {
    name: "lit-css",

    async transform(css, id) {
      if (id.slice(-4) !== ".css") return null;
      if (!filter(id)) return null;

      const res = await postcss(config.plugins).process(css, {
        from: null
      });

      const cssContent = !uglify
        ? res.css
        : processString(
            res.css,
            typeof uglify === "object" ? uglify : undefined
          );
      const output = `css\`${cssContent}\`;`;
      const code = `${importDeclaration}\nexport default ${output}; `;
      const map = { mappings: "" };
      return { code, map };
    }
  };
}
