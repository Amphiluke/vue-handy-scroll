// Wrapper code is taken (with small modifications) here:
// https://vuejs.org/v2/cookbook/packaging-sfc-for-npm.html#What-does-my-packaged-component-look-like

import HandyScroll from "./handy-scroll.vue";

export function install(Vue) {
  if (!install.installed) {
    Object.defineProperty(install, "installed", {value: true});
    Vue.component("HandyScroll", HandyScroll);
  }
}

let GlobalVue = null;
if (typeof window !== "undefined") {
  GlobalVue = window.Vue;
} else if (typeof global !== "undefined") {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use({install});
}

export default HandyScroll;
