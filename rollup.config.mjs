import pkg from "./package.json" with {type: "json"};
import vue from "rollup-plugin-vue";
import buble from "@rollup/plugin-buble";
import terser from "@rollup/plugin-terser";
import nodeResolve from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";

let plugins = {
  vue: vue({
    preprocessStyles: true
  }),
  postcss: postcss({minimize: true}),
  terser: terser({
    output: {comments: /^!/}
  }),
  buble: buble(),
  resolve: nodeResolve()
};

let config = {
  input: "src/handy-scroll.vue",
  output: {
    name: "HandyScroll",
    exports: "default",
    banner: `/*!\n${pkg.name} v${pkg.version}\n${pkg.homepage}\n*/`,
    globals: {vue: "Vue"}
  },
  external: ["vue"],
  plugins: [
    plugins.resolve,
    plugins.vue,
    plugins.postcss
  ]
};

export default [
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.module,
      format: "esm"
    }
  },
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.module.replace(/\.js$/, ".min.js"),
      format: "esm"
    },
    plugins: [...config.plugins, plugins.terser]
  },
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.main,
      format: "umd"
    },
    plugins: [...config.plugins, plugins.buble]
  },
  {
    ...config,
    output: {
      ...config.output,
      file: pkg.main.replace(/\.js$/, ".min.js"),
      format: "umd"
    },
    plugins: [...config.plugins, plugins.buble, plugins.terser]
  }
];
