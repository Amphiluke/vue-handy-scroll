/*!
vue-handy-scroll v1.0.1
https://amphiluke.github.io/vue-handy-scroll/dist/
*/
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('vue')) :
  typeof define === 'function' && define.amd ? define(['exports', 'vue'], factory) :
  (global = global || self, factory(global.HandyScroll = {}, global.Vue));
}(this, (function (exports, Vue) { 'use strict';

  Vue = Vue && Object.prototype.hasOwnProperty.call(Vue, 'default') ? Vue['default'] : Vue;

  var EventBus = new Vue();

  //

  var script = {
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

    // These two flags below need no reactivity
    skipSyncContainer: false,
    skipSyncWidget: false,

    data: function data() {
      return {
        visible: true
      };
    },

    mounted: function mounted() {
      var this$1 = this;

      this.queueUpdate().then(function () {
        this$1.addEventHandlers();
      });
    },

    methods: {
      queueUpdate: function queueUpdate() {
        var instance = this;
        return instance.$nextTick().then(function () {
          // Recalculate scrollbar parameters and set its visibility
          instance.update();
          // Set skipSync flags to their initial values (because update() above calls syncWidget())
          instance.$options.skipSyncContainer = instance.$options.skipSyncWidget = false;
        });
      },

      addEventHandlers: function addEventHandlers() {
        var instance = this;

        if (!instance.$refs.scrollBody) {
          var onScroll = function () { return instance.checkVisibility(); };
          var onResize = function () { return instance.update(); };
          window.addEventListener("scroll", onScroll, false);
          window.addEventListener("resize", onResize, false);
          instance.$once("hook:beforeDestroy", function () {
            window.removeEventListener("scroll", onScroll, false);
            window.removeEventListener("resize", onResize, false);
          });
        }

        EventBus.$on("update", function (ref) {
          if ( ref === void 0 ) ref = {};
          var sourceElement = ref.sourceElement;

          if (!sourceElement || instance.$el.contains(sourceElement)) {
            instance.queueUpdate();
          }
        });
      },

      handleWidgetScroll: function handleWidgetScroll() {
        var instance = this;
        if (instance.visible && !instance.$options.skipSyncContainer) {
          instance.syncContainer();
        }
        // Resume widget->container syncing after the widget scrolling has finished
        // (it might be temporally disabled by the container while syncing the widget)
        instance.$options.skipSyncContainer = false;
      },

      handleContainerScroll: function handleContainerScroll() {
        var instance = this;
        if (!instance.$options.skipSyncWidget) {
          instance.syncWidget();
        }
        // Resume container->widget syncing after the container scrolling has finished
        // (it might be temporally disabled by the widget while syncing the container)
        instance.$options.skipSyncWidget = false;
      },

      handleContainerFocus: function handleContainerFocus() {
        var this$1 = this;

        setTimeout(function () { return this$1.syncWidget(); }, 0);
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
          this.$options.skipSyncWidget = true;
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
          this.$options.skipSyncContainer = true;
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

  function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier /* server only */, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
      if (typeof shadowMode !== 'boolean') {
          createInjectorSSR = createInjector;
          createInjector = shadowMode;
          shadowMode = false;
      }
      // Vue.extend constructor export interop.
      var options = typeof script === 'function' ? script.options : script;
      // render functions
      if (template && template.render) {
          options.render = template.render;
          options.staticRenderFns = template.staticRenderFns;
          options._compiled = true;
          // functional template
          if (isFunctionalTemplate) {
              options.functional = true;
          }
      }
      // scopedId
      if (scopeId) {
          options._scopeId = scopeId;
      }
      var hook;
      if (moduleIdentifier) {
          // server build
          hook = function (context) {
              // 2.3 injection
              context =
                  context || // cached call
                      (this.$vnode && this.$vnode.ssrContext) || // stateful
                      (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext); // functional
              // 2.2 with runInNewContext: true
              if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
                  context = __VUE_SSR_CONTEXT__;
              }
              // inject component styles
              if (style) {
                  style.call(this, createInjectorSSR(context));
              }
              // register component module identifier for async chunk inference
              if (context && context._registeredComponents) {
                  context._registeredComponents.add(moduleIdentifier);
              }
          };
          // used by ssr in case component is cached and beforeCreate
          // never gets called
          options._ssrRegister = hook;
      }
      else if (style) {
          hook = shadowMode
              ? function (context) {
                  style.call(this, createInjectorShadow(context, this.$root.$options.shadowRoot));
              }
              : function (context) {
                  style.call(this, createInjector(context));
              };
      }
      if (hook) {
          if (options.functional) {
              // register for functional component in vue file
              var originalRender = options.render;
              options.render = function renderWithStyleInjection(h, context) {
                  hook.call(context);
                  return originalRender(h, context);
              };
          }
          else {
              // inject component registration as beforeCreate hook
              var existing = options.beforeCreate;
              options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
          }
      }
      return script;
  }

  var isOldIE = typeof navigator !== 'undefined' &&
      /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
  function createInjector(context) {
      return function (id, style) { return addStyle(id, style); };
  }
  var HEAD;
  var styles = {};
  function addStyle(id, css) {
      var group = isOldIE ? css.media || 'default' : id;
      var style = styles[group] || (styles[group] = { ids: new Set(), styles: [] });
      if (!style.ids.has(id)) {
          style.ids.add(id);
          var code = css.source;
          if (css.map) {
              // https://developer.chrome.com/devtools/docs/javascript-debugging
              // this makes source maps inside style tags work properly in Chrome
              code += '\n/*# sourceURL=' + css.map.sources[0] + ' */';
              // http://stackoverflow.com/a/26603875
              code +=
                  '\n/*# sourceMappingURL=data:application/json;base64,' +
                      btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) +
                      ' */';
          }
          if (!style.element) {
              style.element = document.createElement('style');
              style.element.type = 'text/css';
              if (css.media)
                  { style.element.setAttribute('media', css.media); }
              if (HEAD === undefined) {
                  HEAD = document.head || document.getElementsByTagName('head')[0];
              }
              HEAD.appendChild(style.element);
          }
          if ('styleSheet' in style.element) {
              style.styles.push(code);
              style.element.styleSheet.cssText = style.styles
                  .filter(Boolean)
                  .join('\n');
          }
          else {
              var index = style.ids.size - 1;
              var textNode = document.createTextNode(code);
              var nodes = style.element.childNodes;
              if (nodes[index])
                  { style.element.removeChild(nodes[index]); }
              if (nodes.length)
                  { style.element.insertBefore(textNode, nodes[index]); }
              else
                  { style.element.appendChild(textNode); }
          }
      }
  }

  /* script */
  var __vue_script__ = script;

  /* template */
  var __vue_render__ = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.customViewport)?_c('div',{staticClass:"handy-scroll-viewport"},[_vm._t("viewport-before"),_c('div',{ref:"scrollBody",staticClass:"handy-scroll-body",on:{"scroll":_vm.checkVisibility}},[_vm._t("body-before"),_c('div',{ref:"container",staticClass:"handy-scroll-area",class:{'handy-scroll-unobtrusive': _vm.unobtrusive},on:{"scroll":_vm.handleContainerScroll,"focusin":_vm.handleContainerFocus}},[_vm._t("default"),_c('div',{ref:"widget",staticClass:"handy-scroll",class:{'handy-scroll-hidden': !_vm.visible},on:{"scroll":_vm.handleWidgetScroll}},[_c('div',{ref:"strut"})])],2),_vm._t("body-after")],2),_vm._t("viewport-after")],2):_c('div',{ref:"container",staticClass:"handy-scroll-area",class:{'handy-scroll-unobtrusive': _vm.unobtrusive},on:{"scroll":_vm.handleContainerScroll,"focusin":_vm.handleContainerFocus}},[_vm._t("default"),_c('div',{ref:"widget",staticClass:"handy-scroll",class:{'handy-scroll-hidden': !_vm.visible},on:{"scroll":_vm.handleWidgetScroll}},[_c('div',{ref:"strut"})])],2)};
  var __vue_staticRenderFns__ = [];

    /* style */
    var __vue_inject_styles__ = function (inject) {
      if (!inject) { return }
      inject("data-v-2d44a402_0", { source: ".handy-scroll[data-v-2d44a402]{bottom:0;min-height:17px;overflow:auto;position:fixed}.handy-scroll div[data-v-2d44a402]{height:1px;overflow:hidden;pointer-events:none}.handy-scroll div[data-v-2d44a402]:before{content:\"\\A0\"}.handy-scroll[data-v-2d44a402],.handy-scroll div[data-v-2d44a402]{font-size:1px;line-height:0;margin:0;padding:0}.handy-scroll-hidden[data-v-2d44a402]{bottom:9999px}.handy-scroll-hidden div[data-v-2d44a402]:before{content:\"\\A0\\A0\"}.handy-scroll-viewport[data-v-2d44a402]{position:relative}.handy-scroll-area[data-v-2d44a402],.handy-scroll-body[data-v-2d44a402]{overflow:auto}.handy-scroll-viewport .handy-scroll[data-v-2d44a402]{left:0;position:absolute}.handy-scroll-unobtrusive .handy-scroll[data-v-2d44a402]{opacity:0;transition:opacity .5s ease .3s}.handy-scroll-unobtrusive:hover .handy-scroll[data-v-2d44a402]{opacity:1}", map: undefined, media: undefined });

    };
    /* scoped */
    var __vue_scope_id__ = "data-v-2d44a402";
    /* module identifier */
    var __vue_module_identifier__ = undefined;
    /* functional template */
    var __vue_is_functional_template__ = false;
    /* style inject SSR */
    
    /* style inject shadow dom */
    

    
    var __vue_component__ = /*#__PURE__*/normalizeComponent(
      { render: __vue_render__, staticRenderFns: __vue_staticRenderFns__ },
      __vue_inject_styles__,
      __vue_script__,
      __vue_scope_id__,
      __vue_is_functional_template__,
      __vue_module_identifier__,
      false,
      createInjector,
      undefined,
      undefined
    );

  // Wrapper code is taken (with small modifications) here:

  function install(Vue) {
    if (!install.installed) {
      Object.defineProperty(install, "installed", {value: true});
      Vue.component("HandyScroll", __vue_component__);
    }
  }

  var GlobalVue = null;
  if (typeof window !== "undefined") {
    GlobalVue = window.Vue;
  } else if (typeof global !== "undefined") {
    GlobalVue = global.Vue;
  }
  if (GlobalVue) {
    GlobalVue.use({install: install});
  }

  exports.EventBus = EventBus;
  exports.default = __vue_component__;
  exports.install = install;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
