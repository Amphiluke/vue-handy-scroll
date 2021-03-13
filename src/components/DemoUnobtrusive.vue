<template>
  <section id="demo-unobtrusive">
    <!-- eslint-disable vue/max-attributes-per-line -->
    <h2>#3 “Unobtrusive” mode</h2>

    <h3>Description</h3>
    <p>This feature makes handy-scroll widgets appear only when the mouse pointer hovers over the scrollable container. Refer the <a href="https://github.com/Amphiluke/vue-handy-scroll#unobtrusive-mode">module’s docs</a> for more details.</p>

    <h3>Live demo</h3>
    <form action="#" autocomplete="off">
      <label>
        <input
          id="is-unobtrusive"
          type="checkbox"
          :checked="unobtrusive"
          @change="$emit('change', $event.target.checked)"
        >
        Unobtrusive mode: <b>{{ unobtrusive ? "on" : "off" }}</b>
      </label><br>
      <span class="small">Check/uncheck this checkbox to toggle the “unobtrusive” mode for all component instances on this page</span>
    </form>
    <!-- eslint-enable vue/max-attributes-per-line -->
  </section>
</template>

<script>
export default {
  name: "DemoUnobtrusive",
  props: {
    unobtrusive: {
      type: Boolean,
      default: false
    }
  },
  emits: ["change"]
};
</script>
