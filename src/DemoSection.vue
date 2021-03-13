<template>
  <div>
    <DemoHandscrolls :unobtrusive="unobtrusive" />
    <DemoPopup :unobtrusive="unobtrusive" />
    <DemoUnobtrusive
      :unobtrusive="unobtrusive"
      @change="unobtrusive = $event"
    />
  </div>
</template>

<script>
import DemoHandscrolls from "./components/DemoHandscrolls.vue";
import DemoPopup from "./components/DemoPopup.vue";
import DemoUnobtrusive from "./components/DemoUnobtrusive.vue";

export default {
  name: "DemoSection",
  components: {
    DemoHandscrolls,
    DemoPopup,
    DemoUnobtrusive
  },
  data() {
    return {
      unobtrusive: false
    };
  }
};
</script>
