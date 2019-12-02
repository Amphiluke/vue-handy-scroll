<template>
  <div id="app">
    <DemoHandscrolls :unobtrusive="unobtrusive"/>
    <DemoPopup :unobtrusive="unobtrusive"/>
    <DemoUnobtrusive :unobtrusive="unobtrusive" @change="unobtrusive = $event"/>
  </div>
</template>

<script>
import DemoHandscrolls from "./components/DemoHandscrolls.vue";
import DemoPopup from "./components/DemoPopup.vue";
import DemoUnobtrusive from "./components/DemoUnobtrusive.vue";

export default {
  name: "app",
  components: {
    DemoHandscrolls,
    DemoPopup,
    DemoUnobtrusive
  },
  props: {
    unobtrusive: {
      type: Boolean,
      default: false
    }
  }
}
</script>
