import "../assets/css/global.less";
import {createApp, resolveComponent, h} from "vue";
import DemoSection from "./DemoSection.vue";

createApp({
  components: {
    DemoSection
  },

  render() {
    return h(resolveComponent("DemoSection"));
  }
}).mount("#app");

document.body.classList.remove("loading");
