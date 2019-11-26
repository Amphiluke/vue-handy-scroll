import pkg from "./package.json";
import vue from "rollup-plugin-vue";
import babel from "rollup-plugin-babel";
import {terser} from "rollup-plugin-terser";
import resolve from "rollup-plugin-node-resolve";

let plugins = {
  vue: vue({
    template: {isProduction: true}
  }),
  terser: terser({
    output: {comments: /^!/}
  }),
  babel: babel(),
  resolve: resolve()
};

let config = {
  input: "src/wrapper.js",
  output: {
    name: "HandyScroll",
    exports: "named",
    banner: `/*!\n${pkg.name} v${pkg.version}\n${pkg.homepage}\n*/`
  },
  plugins: [
    plugins.resolve,
    plugins.vue
  ]
};

export default [
  {
    input: config.input,
    output: {
      file: pkg.module,
      format: "esm",
      ...config.output
    },
    plugins: config.plugins
  },
  {
    input: config.input,
    output: {
      file: pkg.module.replace(/\.js$/, ".min.js"),
      format: "esm",
      ...config.output
    },
    plugins: [...config.plugins, plugins.terser]
  },
  {
    input: config.input,
    output: {
      file: pkg.main,
      format: "umd",
      ...config.output
    },
    plugins: [...config.plugins, plugins.babel]
  },
  {
    input: config.input,
    output: {
      file: pkg.main.replace(/\.js$/, ".min.js"),
      format: "umd",
      ...config.output
    },
    plugins: [...config.plugins, plugins.babel, plugins.terser]
  }
];
