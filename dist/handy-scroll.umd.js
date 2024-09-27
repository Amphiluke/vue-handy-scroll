/*!
vue-handy-scroll v3.0.2
https://amphiluke.github.io/vue-handy-scroll/
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('vue')) :
  typeof define === 'function' && define.amd ? define(['vue'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.HandyScroll = factory(global.Vue));
})(this, (function (vue) { 'use strict';

  var handlerRegistry = Object.create(null);

  var EventBus = {
    emit: function emit(event) {
      var args = [], len = arguments.length - 1;
      while ( len-- > 0 ) args[ len ] = arguments[ len + 1 ];

      var handlers = handlerRegistry[event];
      if (handlers) {
        handlers.forEach(function (handler) { return handler.apply(void 0, args); });
      }
    },

    on: function on(event, handler) {
      var handlers = handlerRegistry[event];
      if (!handlers) {
        handlers = [];
        handlerRegistry[event] = handlers;
      }
      handlers.push(handler);
    },

    off: function off(event, handler) {
      var handlers = handlerRegistry[event];
      if (handlers) {
        var index = handlers.indexOf(handler);
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
    EventBus: EventBus,

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

    data: function data() {
      return {
        visible: true
      };
    },

    created: function created() {
      // These two flags below need no reactivity
      this.skipSyncContainer = this.skipSyncWidget = false;
    },

    mounted: function mounted() {
      var this$1$1 = this;

      this.queueUpdate().then(function () {
        this$1$1.addEventHandlers();
      });
    },

    unmounted: function unmounted() {
      this.removeEventHandlers();
    },

    methods: {
      queueUpdate: function queueUpdate() {
        var instance = this;
        return instance.$nextTick().then(function () {
          // Recalculate scrollbar parameters and set its visibility
          instance.update();
          // Set skipSync flags to their initial values (because update() above calls syncWidget())
          instance.skipSyncContainer = instance.skipSyncWidget = false;
        });
      },

      addEventHandlers: function addEventHandlers() {
        var instance = this;
        if (!instance.$refs.scrollBody) {
          var onScroll = instance.windowScrollHandler = function () { return instance.checkVisibility(); };
          var onResize = instance.windowResizeHandler = function () { return instance.update(); };
          window.addEventListener("scroll", onScroll, false);
          window.addEventListener("resize", onResize, false);
        }
        var onUpdate = instance.updateHandler = function (ref) {
          if ( ref === void 0 ) ref = {};
          var sourceElement = ref.sourceElement;

          if (!sourceElement || instance.$el.contains(sourceElement)) {
            instance.queueUpdate();
          }
        };
        EventBus.on("update", onUpdate);
      },

      removeEventHandlers: function removeEventHandlers() {
        var instance = this;
        window.removeEventListener("scroll", instance.windowScrollHandler, false);
        window.removeEventListener("resize", instance.windowResizeHandler, false);
        EventBus.off("update", instance.updateHandler);
      },

      handleWidgetScroll: function handleWidgetScroll() {
        var instance = this;
        if (instance.visible && !instance.skipSyncContainer) {
          instance.syncContainer();
        }
        // Resume widget->container syncing after the widget scrolling has finished
        // (it might be temporally disabled by the container while syncing the widget)
        instance.skipSyncContainer = false;
      },

      handleContainerScroll: function handleContainerScroll() {
        var instance = this;
        if (!instance.skipSyncWidget) {
          instance.syncWidget();
        }
        // Resume container->widget syncing after the container scrolling has finished
        // (it might be temporally disabled by the widget while syncing the container)
        instance.skipSyncWidget = false;
      },

      handleContainerFocus: function handleContainerFocus() {
        var this$1$1 = this;

        setTimeout(function () {
          // The widget might be unmounted before the timer is triggered (issue Amphiluke/handy-scroll#14)
          if (this$1$1.$refs && this$1$1.$refs.widget) {
            this$1$1.syncWidget();
          }
        }, 0);
      },

      checkVisibility: function checkVisibility() {
        var instance = this;
        var ref = instance.$refs;
        var widget = ref.widget;
        var container = ref.container;
        var scrollBody = ref.scrollBody;
        var mustHide = (widget.scrollWidth <= widget.offsetWidth);
        if (!mustHide) {
          var containerRect = container.getBoundingClientRect();
          var maxVisibleY = scrollBody ?
            scrollBody.getBoundingClientRect().bottom :
            window.innerHeight || document.documentElement.clientHeight;
          mustHide = ((containerRect.bottom <= maxVisibleY) || (containerRect.top > maxVisibleY));
        }
        if (instance.visible === mustHide) {
          // This will toggle class “handy-scroll-hidden” on the widget element
          instance.visible = !mustHide;
        }
      },

      syncContainer: function syncContainer() {
        var ref = this.$refs;
        var widget = ref.widget;
        var container = ref.container;
        var scrollLeft = widget.scrollLeft;
        if (container.scrollLeft !== scrollLeft) {
          // Prevents container’s “scroll” event handler from syncing back again widget scroll position
          this.skipSyncWidget = true;
          // Note that this makes container’s “scroll” event handlers execute
          container.scrollLeft = scrollLeft;
        }
      },

      syncWidget: function syncWidget() {
        var ref = this.$refs;
        var widget = ref.widget;
        var container = ref.container;
        var scrollLeft = container.scrollLeft;
        if (widget.scrollLeft !== scrollLeft) {
          // Prevents widget’s “scroll” event handler from syncing back again container scroll position
          this.skipSyncContainer = true;
          // Note that this makes widget’s “scroll” event handlers execute
          widget.scrollLeft = scrollLeft;
        }
      },

      // Recalculate scroll width and container boundaries
      update: function update() {
        var ref = this.$refs;
        var widget = ref.widget;
        var strut = ref.strut;
        var container = ref.container;
        var scrollBody = ref.scrollBody;
        var widgetStyle = widget.style;
        var clientWidth = container.clientWidth;
        var scrollWidth = container.scrollWidth;
        widgetStyle.width = clientWidth + "px";
        if (!scrollBody) {
          widgetStyle.left = (container.getBoundingClientRect().left) + "px";
        }
        strut.style.width = scrollWidth + "px";
        // Fit widget height to the native scrollbar height if needed
        if (scrollWidth > clientWidth) {
          widgetStyle.height = (widget.offsetHeight - widget.clientHeight + 1) + "px"; // +1px JIC
        }
        this.syncWidget();
        this.checkVisibility(); // fixes issue Amphiluke/floating-scroll#2
      }
    }
  };

  var _hoisted_1 = {
    key: 0,
    class: "handy-scroll-viewport"
  };
  var _hoisted_2 = { ref: "strut" };
  var _hoisted_3 = { ref: "strut" };

  function render(_ctx, _cache, $props, $setup, $data, $options) {
    return ($props.customViewport)
      ? (vue.openBlock(), vue.createElementBlock("div", _hoisted_1, [
          vue.renderSlot(_ctx.$slots, "viewport-before"),
          vue.createElementVNode("div", {
            ref: "scrollBody",
            class: "handy-scroll-body",
            onScroll: _cache[3] || (_cache[3] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.checkVisibility && $options.checkVisibility.apply($options, args));
    })
          }, [
            vue.renderSlot(_ctx.$slots, "body-before"),
            vue.createElementVNode("div", {
              ref: "container",
              class: vue.normalizeClass(["handy-scroll-area", {'handy-scroll-unobtrusive': $props.unobtrusive}]),
              onScroll: _cache[1] || (_cache[1] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.handleContainerScroll && $options.handleContainerScroll.apply($options, args));
    }),
              onFocusin: _cache[2] || (_cache[2] = function () {
                var args = [], len = arguments.length;
                while ( len-- ) args[ len ] = arguments[ len ];

                return ($options.handleContainerFocus && $options.handleContainerFocus.apply($options, args));
    })
            }, [
              vue.renderSlot(_ctx.$slots, "default"),
              vue.createElementVNode("div", {
                ref: "widget",
                class: vue.normalizeClass(["handy-scroll", {'handy-scroll-hidden': !$data.visible}]),
                onScroll: _cache[0] || (_cache[0] = function () {
                  var args = [], len = arguments.length;
                  while ( len-- ) args[ len ] = arguments[ len ];

                  return ($options.handleWidgetScroll && $options.handleWidgetScroll.apply($options, args));
    })
              }, [
                vue.createElementVNode("div", _hoisted_2, null, 512 /* NEED_PATCH */)
              ], 34 /* CLASS, NEED_HYDRATION */)
            ], 34 /* CLASS, NEED_HYDRATION */),
            vue.renderSlot(_ctx.$slots, "body-after")
          ], 544 /* NEED_HYDRATION, NEED_PATCH */),
          vue.renderSlot(_ctx.$slots, "viewport-after")
        ]))
      : (vue.openBlock(), vue.createElementBlock("div", {
          key: 1,
          ref: "container",
          class: vue.normalizeClass(["handy-scroll-area", {'handy-scroll-unobtrusive': $props.unobtrusive}]),
          onScroll: _cache[5] || (_cache[5] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.handleContainerScroll && $options.handleContainerScroll.apply($options, args));
    }),
          onFocusin: _cache[6] || (_cache[6] = function () {
            var args = [], len = arguments.length;
            while ( len-- ) args[ len ] = arguments[ len ];

            return ($options.handleContainerFocus && $options.handleContainerFocus.apply($options, args));
    })
        }, [
          vue.renderSlot(_ctx.$slots, "default"),
          vue.createElementVNode("div", {
            ref: "widget",
            class: vue.normalizeClass(["handy-scroll", {'handy-scroll-hidden': !$data.visible}]),
            onScroll: _cache[4] || (_cache[4] = function () {
              var args = [], len = arguments.length;
              while ( len-- ) args[ len ] = arguments[ len ];

              return ($options.handleWidgetScroll && $options.handleWidgetScroll.apply($options, args));
    })
          }, [
            vue.createElementVNode("div", _hoisted_3, null, 512 /* NEED_PATCH */)
          ], 34 /* CLASS, NEED_HYDRATION */)
        ], 34 /* CLASS, NEED_HYDRATION */))
  }

  function styleInject(css, ref) {
    if ( ref === void 0 ) { ref = {}; }
    var insertAt = ref.insertAt;

    if (typeof document === 'undefined') { return; }

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

  var css_248z = ".handy-scroll[data-v-71ecdf2e]{bottom:0;min-height:17px;overflow:auto;position:fixed}.handy-scroll div[data-v-71ecdf2e]{height:1px;overflow:hidden;pointer-events:none}.handy-scroll div[data-v-71ecdf2e]:before{content:\"\\A0\"}.handy-scroll div[data-v-71ecdf2e],.handy-scroll[data-v-71ecdf2e]{font-size:1px;line-height:0;margin:0;padding:0}.handy-scroll-hidden[data-v-71ecdf2e]{bottom:9999px}.handy-scroll-hidden div[data-v-71ecdf2e]:before{content:\"\\A0\\A0\"}.handy-scroll-viewport[data-v-71ecdf2e]{position:relative}.handy-scroll-area[data-v-71ecdf2e],.handy-scroll-body[data-v-71ecdf2e]{overflow:auto}.handy-scroll-viewport .handy-scroll[data-v-71ecdf2e]{left:0;position:absolute}.handy-scroll-unobtrusive .handy-scroll[data-v-71ecdf2e]{opacity:0;transition:opacity .5s ease .3s}.handy-scroll-unobtrusive:hover .handy-scroll[data-v-71ecdf2e]{opacity:1}";
  styleInject(css_248z);

  script.render = render;
  script.__scopeId = "data-v-71ecdf2e";
  script.__file = "src/handy-scroll.vue";

  return script;

}));
