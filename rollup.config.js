import path from "path";
import vue from "rollup-plugin-vue";
import {terser} from "rollup-plugin-terser";
import resolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

export default {
  external: ["vue"],
  input: "src/main.js",
  output: {
    name: "VueHandyScrollDemo",
    globals: {vue: "Vue"},
    file: "dist/main.js",
    format: "iife"
  },
  plugins: [
    resolve(),
    vue({
      preprocessStyles: true
    }),
    postcss({
      minimize: true,
      extract: path.resolve("dist/main.css")
    }),
    terser()
  ]
};
