<template>
  <section
    id="demo-popup"
    class="demo-popup"
  >
    <h2>#2: handy-scroll widget in a popup</h2>

    <h3>Description</h3>
    <p>This example demonstrates a special use case — a widget inside a positioned popup. Please find out the details of this use case in the <a href="https://github.com/Amphiluke/vue-handy-scroll#custom-viewport-element">module’s docs</a>.</p>

    <h3>Live demo</h3>
    <p>
      <span
        class="hs-open-popup"
        @click="openPopup"
      >
        Click here to open a popup
      </span>
    </p>
    <HandyScroll
      ref="popup"
      class="hs-popup"
      :class="{'hs-popup-hidden': popupHidden}"
      :unobtrusive="unobtrusive"
      :custom-viewport="true"
    >
      <!-- eslint-disable vue/max-attributes-per-line -->
      <template #body-before>
        <span
          class="hs-popup-close"
          @click="popupHidden = true"
        />
        <h4>“Along the River During the Qingming Festival”</h4>
      </template>
      <img src="assets/images/along-the-river.jpg" alt="“Along the River During the Qingming Festival” by Zhang Zeduan" width="10561" height="1000">
      <template #body-after>
        <p class="small">
          <a href="https://en.wikipedia.org/wiki/Along_the_River_During_the_Qingming_Festival" rel="nofollow noopener" target="_blank"><em>“Along the River During the Qingming Festival”</em></a> (fragment), painting by Zhang Zeduan (12th century)
        </p>
      </template>
      <!-- eslint-enable vue/max-attributes-per-line -->
    </HandyScroll>

    <h3>Demo’s code</h3>
    <!-- eslint-disable vue/max-attributes-per-line -->
    <iframe height="370" style="width: 100%;" scrolling="no" title="vue-handy-scroll@2 - positioned popup" src="https://codepen.io/amphiluke/embed/eYBxbRv?height=370&amp;theme-id=light&amp;default-tab=js" frameborder="no" loading="lazy" allowtransparency="true" allowfullscreen="true">
      See the Pen <a href='https://codepen.io/amphiluke/pen/eYBxbRv'>vue-handy-scroll@2 - positioned popup</a> by Amphiluke
      (<a href='https://codepen.io/amphiluke'>@amphiluke</a>) on <a href='https://codepen.io'>CodePen</a>.
    </iframe>
    <!-- eslint-enable vue/max-attributes-per-line -->
  </section>
</template>

<script>
import {ref, onMounted, onUnmounted} from "vue";
import HandyScroll from "vue-handy-scroll";

export default {
  name: "DemoPopup",
  components: {
    HandyScroll
  },
  props: {
    unobtrusive: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    let popupHidden = ref(true);
    let globalClickHandler = ({target}) => {
      if (!popupHidden.value && !target.closest(".hs-popup, .hs-open-popup")) {
        popupHidden.value = true;
      }
    };
    onMounted(() => {
      document.addEventListener("click", globalClickHandler, false);
    });
    onUnmounted(() => {
      document.removeEventListener("click", globalClickHandler, false);
    });
    return {
      popupHidden
    };
  },
  methods: {
    openPopup() {
      this.popupHidden = false;
      let hsContainer = this.$refs.popup.$refs.container;
      this.$nextTick(() => hsContainer.scrollLeft = hsContainer.scrollWidth);
      HandyScroll.EventBus.emit("update", {sourceElement: hsContainer});
    }
  }
};
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/css/ui";

  .demo-popup .hs-popup {
    background:@bg-color;
    box-shadow:0 0 0 100vw fade(#000, 75%);
    height:550px;
    left:50%;
    margin-left:(-700px / 2);
    padding:10px;
    position:fixed;
    text-align:center;
    top:20px;
    width:700px;
    z-index:1;

    &.hs-popup-hidden {
      box-shadow:none;
      left:-99999px;
      top:-99999px;
    }

    &-close {
      background:linear-gradient(0deg, transparent, transparent 45%, #b00 0, #b00 55%, transparent 0), linear-gradient(90deg, transparent, transparent 45%, #b00 0, #b00 55%, transparent 0);
      cursor:pointer;
      font-size:13px;
      height:20px;
      left:10px;
      position:absolute;
      top:10px;
      transform:rotate(45deg);
      width:20px;
    }

    h4 {
      margin:0.5em 0;
    }

    // About ::v-deep - https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors
    & ::v-deep(.handy-scroll-body) {
      overscroll-behavior:contain;
      height:550px;
      width:100%;
    }

    & ::v-deep(.handy-scroll:not(.handy-scroll-hidden)) {
      bottom:10px; // same value as the bottom padding
      left:10px; // same value as the left padding
    }

    & ::v-deep(.handy-scroll-area) {
      font-size:0;
      line-height:0;
      width:100%;

      img {
        vertical-align:top;
      }
    }
  }

  .hs-open-popup {
    border:1px solid;
    border-radius:4px;
    cursor:pointer;
    display:inline-flex;
    height:2em;
    justify-content:center;
    align-items:center;
    padding:0 1em;
    &:hover {
      box-shadow:0 2px 3px -2px @text-color;
    }
  }
</style>
