/*!
vue-handy-scroll v3.0.0
https://amphiluke.github.io/vue-handy-scroll/
*/
import { pushScopeId, popScopeId, openBlock, createElementBlock, renderSlot, createElementVNode, normalizeClass } from 'vue';

let handlerRegistry = Object.create(null);

let EventBus = {
  emit(event, ...args) {
    let handlers = handlerRegistry[event];
    if (handlers) {
      handlers.forEach(handler => handler(...args));
    }
  },

  on(event, handler) {
    let handlers = handlerRegistry[event];
    if (!handlers) {
      handlers = [];
      handlerRegistry[event] = handlers;
    }
    handlers.push(handler);
  },

  off(event, handler) {
    let handlers = handlerRegistry[event];
    if (handlers) {
      let index = handlers.indexOf(handler);
      if (index >= 0) {
        handlers.splice(index, 1);
        if (!handlers.length) {
          delete handlerRegistry[event];
        }
      }
    }
  }
};

var script = {
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
      setTimeout(() => this.syncWidget(), 0);
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

pushScopeId("data-v-71ecdf2e");
const _hoisted_1 = {
  key: 0,
  class: "handy-scroll-viewport"
};
const _hoisted_2 = { ref: "strut" };
const _hoisted_3 = { ref: "strut" };
popScopeId();

function render(_ctx, _cache, $props, $setup, $data, $options) {
  return ($props.customViewport)
    ? (openBlock(), createElementBlock("div", _hoisted_1, [
        renderSlot(_ctx.$slots, "viewport-before"),
        createElementVNode("div", {
          ref: "scrollBody",
          class: "handy-scroll-body",
          onScroll: _cache[3] || (_cache[3] = (...args) => ($options.checkVisibility && $options.checkVisibility(...args)))
        }, [
          renderSlot(_ctx.$slots, "body-before"),
          createElementVNode("div", {
            ref: "container",
            class: normalizeClass(["handy-scroll-area", {'handy-scroll-unobtrusive': $props.unobtrusive}]),
            onScroll: _cache[1] || (_cache[1] = (...args) => ($options.handleContainerScroll && $options.handleContainerScroll(...args))),
            onFocusin: _cache[2] || (_cache[2] = (...args) => ($options.handleContainerFocus && $options.handleContainerFocus(...args)))
          }, [
            renderSlot(_ctx.$slots, "default"),
            createElementVNode("div", {
              ref: "widget",
              class: normalizeClass(["handy-scroll", {'handy-scroll-hidden': !$data.visible}]),
              onScroll: _cache[0] || (_cache[0] = (...args) => ($options.handleWidgetScroll && $options.handleWidgetScroll(...args)))
            }, [
              createElementVNode("div", _hoisted_2, null, 512 /* NEED_PATCH */)
            ], 34 /* CLASS, HYDRATE_EVENTS */)
          ], 34 /* CLASS, HYDRATE_EVENTS */),
          renderSlot(_ctx.$slots, "body-after")
        ], 544 /* HYDRATE_EVENTS, NEED_PATCH */),
        renderSlot(_ctx.$slots, "viewport-after")
      ]))
    : (openBlock(), createElementBlock("div", {
        key: 1,
        ref: "container",
        class: normalizeClass(["handy-scroll-area", {'handy-scroll-unobtrusive': $props.unobtrusive}]),
        onScroll: _cache[5] || (_cache[5] = (...args) => ($options.handleContainerScroll && $options.handleContainerScroll(...args))),
        onFocusin: _cache[6] || (_cache[6] = (...args) => ($options.handleContainerFocus && $options.handleContainerFocus(...args)))
      }, [
        renderSlot(_ctx.$slots, "default"),
        createElementVNode("div", {
          ref: "widget",
          class: normalizeClass(["handy-scroll", {'handy-scroll-hidden': !$data.visible}]),
          onScroll: _cache[4] || (_cache[4] = (...args) => ($options.handleWidgetScroll && $options.handleWidgetScroll(...args)))
        }, [
          createElementVNode("div", _hoisted_3, null, 512 /* NEED_PATCH */)
        ], 34 /* CLASS, HYDRATE_EVENTS */)
      ], 34 /* CLASS, HYDRATE_EVENTS */))
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css_248z = ".handy-scroll[data-v-71ecdf2e]{bottom:0;min-height:17px;overflow:auto;position:fixed}.handy-scroll div[data-v-71ecdf2e]{height:1px;overflow:hidden;pointer-events:none}.handy-scroll div[data-v-71ecdf2e]:before{content:\"\\A0\"}.handy-scroll[data-v-71ecdf2e],.handy-scroll div[data-v-71ecdf2e]{font-size:1px;line-height:0;margin:0;padding:0}.handy-scroll-hidden[data-v-71ecdf2e]{bottom:9999px}.handy-scroll-hidden div[data-v-71ecdf2e]:before{content:\"\\A0\\A0\"}.handy-scroll-viewport[data-v-71ecdf2e]{position:relative}.handy-scroll-area[data-v-71ecdf2e],.handy-scroll-body[data-v-71ecdf2e]{overflow:auto}.handy-scroll-viewport .handy-scroll[data-v-71ecdf2e]{left:0;position:absolute}.handy-scroll-unobtrusive .handy-scroll[data-v-71ecdf2e]{opacity:0;transition:opacity .5s ease .3s}.handy-scroll-unobtrusive:hover .handy-scroll[data-v-71ecdf2e]{opacity:1}";
styleInject(css_248z);

script.render = render;
script.__scopeId = "data-v-71ecdf2e";
script.__file = "src/handy-scroll.vue";

export { script as default };
