import pkg from "./package.json";
import vue from "rollup-plugin-vue";
import buble from "@rollup/plugin-buble";
import {terser} from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";

let plugins = {
  vue: vue({
    template: {
      isProduction: true,
      compilerOptions: {
        preserveWhitespace: false
      }
    }
  }),
  terser: terser({
    output: {comments: /^!/}
  }),
  buble: buble(),
  resolve: resolve()
};

let config = {
  input: "src/wrapper.js",
  output: {
    name: "HandyScroll",
    exports: "named",
    banner: `/*!\n${pkg.name} v${pkg.version}\n${pkg.homepage}\n*/`,
    globals: {vue: "Vue"}
  },
  external: ["vue"],
  plugins: [
    plugins.resolve,
    plugins.vue
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
