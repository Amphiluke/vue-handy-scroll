<template>
  <div
    v-if="customViewport"
    class="handy-scroll-viewport"
  >
    <slot name="viewport-before" />
    <div
      ref="scrollBody"
      class="handy-scroll-body"
      @scroll="checkVisibility"
    >
      <slot name="body-before" />
      <div
        ref="container"
        class="handy-scroll-area"
        :class="{'handy-scroll-unobtrusive': unobtrusive}"
        @scroll="handleContainerScroll"
        @focusin="handleContainerFocus"
      >
        <slot />
        <div
          ref="widget"
          class="handy-scroll"
          :class="{'handy-scroll-hidden': !visible}"
          @scroll="handleWidgetScroll"
        >
          <div ref="strut" />
        </div>
      </div>
      <slot name="body-after" />
    </div>
    <slot name="viewport-after" />
  </div>
  <div
    v-else
    ref="container"
    class="handy-scroll-area"
    :class="{'handy-scroll-unobtrusive': unobtrusive}"
    @scroll="handleContainerScroll"
    @focusin="handleContainerFocus"
  >
    <slot />
    <div
      ref="widget"
      class="handy-scroll"
      :class="{'handy-scroll-hidden': !visible}"
      @scroll="handleWidgetScroll"
    >
      <div ref="strut" />
    </div>
  </div>
</template>


<script>
import EventBus from "./event-bus.js";

export default {
  EventBus,

  props: {
    customViewport: {
      type: Boolean,
      default: false
    },
    unobtrusive: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      visible: true
    };
  },

  created() {
    // These two flags below need no reactivity
    this.skipSyncContainer = this.skipSyncWidget = false;
  },

  mounted() {
    this.queueUpdate().then(() => {
      this.addEventHandlers();
    });
  },

  unmounted() {
    this.removeEventHandlers();
  },

  methods: {
    queueUpdate() {
      let instance = this;
      return instance.$nextTick().then(() => {
        // Recalculate scrollbar parameters and set its visibility
        instance.update();
        // Set skipSync flags to their initial values (because update() above calls syncWidget())
        instance.skipSyncContainer = instance.skipSyncWidget = false;
      });
    },

    addEventHandlers() {
      let instance = this;
      if (!instance.$refs.scrollBody) {
        let onScroll = instance.windowScrollHandler = () => instance.checkVisibility();
        let onResize = instance.windowResizeHandler = () => instance.update();
        window.addEventListener("scroll", onScroll, false);
        window.addEventListener("resize", onResize, false);
      }
      let onUpdate = instance.updateHandler = ({sourceElement} = {}) => {
        if (!sourceElement || instance.$el.contains(sourceElement)) {
          instance.queueUpdate();
        }
      };
      EventBus.on("update", onUpdate);
    },

    removeEventHandlers() {
      let instance = this;
      window.removeEventListener("scroll", instance.windowScrollHandler, false);
      window.removeEventListener("resize", instance.windowResizeHandler, false);
      EventBus.off("update", instance.updateHandler);
    },

    handleWidgetScroll() {
      let instance = this;
      if (instance.visible && !instance.skipSyncContainer) {
        instance.syncContainer();
      }
      // Resume widget->container syncing after the widget scrolling has finished
      // (it might be temporally disabled by the container while syncing the widget)
      instance.skipSyncContainer = false;
    },

    handleContainerScroll() {
      let instance = this;
      if (!instance.skipSyncWidget) {
        instance.syncWidget();
      }
      // Resume container->widget syncing after the container scrolling has finished
      // (it might be temporally disabled by the widget while syncing the container)
      instance.skipSyncWidget = false;
    },

    handleContainerFocus() {
      setTimeout(() => {
        // The widget might be unmounted before the timer is triggered (issue Amphiluke/handy-scroll#14)
        if (this.$refs && this.$refs.widget) {
          this.syncWidget();
        }
      }, 0);
    },

    checkVisibility() {
      let instance = this;
      let {widget, container, scrollBody} = instance.$refs;
      let mustHide = (widget.scrollWidth <= widget.offsetWidth);
      if (!mustHide) {
        let containerRect = container.getBoundingClientRect();
        let maxVisibleY = scrollBody ?
          scrollBody.getBoundingClientRect().bottom :
          window.innerHeight || document.documentElement.clientHeight;
        mustHide = ((containerRect.bottom <= maxVisibleY) || (containerRect.top > maxVisibleY));
      }
      if (instance.visible === mustHide) {
        // This will toggle class “handy-scroll-hidden” on the widget element
        instance.visible = !mustHide;
      }
    },

    syncContainer() {
      let {widget, container} = this.$refs;
      let {scrollLeft} = widget;
      if (container.scrollLeft !== scrollLeft) {
        // Prevents container’s “scroll” event handler from syncing back again widget scroll position
        this.skipSyncWidget = true;
        // Note that this makes container’s “scroll” event handlers execute
        container.scrollLeft = scrollLeft;
      }
    },

    syncWidget() {
      let {widget, container} = this.$refs;
      let {scrollLeft} = container;
      if (widget.scrollLeft !== scrollLeft) {
        // Prevents widget’s “scroll” event handler from syncing back again container scroll position
        this.skipSyncContainer = true;
        // Note that this makes widget’s “scroll” event handlers execute
        widget.scrollLeft = scrollLeft;
      }
    },

    // Recalculate scroll width and container boundaries
    update() {
      let {widget, strut, container, scrollBody} = this.$refs;
      let {style: widgetStyle} = widget;
      let {clientWidth, scrollWidth} = container;
      widgetStyle.width = `${clientWidth}px`;
      if (!scrollBody) {
        widgetStyle.left = `${container.getBoundingClientRect().left}px`;
      }
      strut.style.width = `${scrollWidth}px`;
      // Fit widget height to the native scrollbar height if needed
      if (scrollWidth > clientWidth) {
        widgetStyle.height = `${widget.offsetHeight - widget.clientHeight + 1}px`; // +1px JIC
      }
      this.syncWidget();
      this.checkVisibility(); // fixes issue Amphiluke/floating-scroll#2
    }
  }
};
</script>


<style scoped>
  .handy-scroll {
    bottom: 0;
    min-height: 17px; /* based on https://codepen.io/sambible/post/browser-scrollbar-widths (fixes Amphiluke/handy-scroll#3) */
    overflow: auto;
    position: fixed;
  }
  .handy-scroll div {
    height: 1px;
    overflow: hidden;
    pointer-events: none;
  }
  .handy-scroll div:before {
    content: "\A0"; /* fixes Amphiluke/floating-scroll#6 */
  }
  .handy-scroll,
  .handy-scroll div {
    font-size: 1px;
    line-height: 0;
    margin: 0;
    padding: 0;
  }
  .handy-scroll-hidden {
    /* We cannot simply hide the widget since its scrollLeft property will not update in that case */
    bottom: 9999px;
  }
  .handy-scroll-hidden div:before {
    content: "\A0\A0"; /* changing content fixes eventual bug with widget re-rendering in Chrome */
  }
  .handy-scroll-viewport {
    /* It can be any type of positioning except static. Redefine in your CSS as needed */
    position: relative;
  }
  .handy-scroll-body,
  .handy-scroll-area {
    overflow: auto;
  }
  .handy-scroll-viewport .handy-scroll {
    left: 0;
    position: absolute;
  }
  .handy-scroll-unobtrusive .handy-scroll {
    opacity: 0;
    transition: opacity 0.5s ease 0.3s;
  }
  .handy-scroll-unobtrusive:hover .handy-scroll {
    opacity: 1;
  }
</style>
