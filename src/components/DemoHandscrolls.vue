<template>
  <section id="demo-handscrolls">
    <h2>#1: Handscrolls</h2>

    <h3>Description</h3>
    <!-- eslint-disable vue/max-attributes-per-line -->
    <p>Using of the <code>vue-handy-scroll</code> component can be appropriate for an online exhibiting of large <a href="https://en.wikipedia.org/wiki/Handscroll" rel="nofollow noopener" target="_blank">handscrolls</a>.</p>
    <p>The demo below also shows a possible use case for the <a href="https://github.com/Amphiluke/vue-handy-scroll#updating-scrollbar"><code>update</code></a> event. Click the “tabs” to switch over the paintings, and the component parameters will update accordingly (note that handscrolls are viewed starting from the right end).</p>
    <!-- eslint-enable vue/max-attributes-per-line -->

    <h3>Live demo</h3>
    <div>
      <div class="handscrolls-ctrl">
        <span
          v-for="item of handscrolls"
          :key="item.id"
          :class="{active: handscroll === item.id}"
          @click="handscroll = item.id"
        >
          {{ item.title }}
        </span>
      </div>
      <HandyScroll
        ref="handscrolls"
        class="handscrolls"
        :unobtrusive="unobtrusive"
      >
        <img
          v-for="item in handscrolls"
          :key="item.id"
          :class="{active: handscroll === item.id}"
          :src="item.src"
          :alt="item.description"
          :width="item.width"
          :height="item.height"
        >
      </HandyScroll>
    </div>

    <h3>Demo’s code</h3>
    <pre class="hs-code">&lt;template&gt;
  &lt;!-- skipping --&gt;
  <span class="hs-highlight">&lt;HandyScroll class=&quot;handscrolls&quot; ref=&quot;handscrolls&quot; :unobtrusive=&quot;unobtrusive&quot;&gt;</span>
    &lt;img
      v-for=&quot;item in handscrolls&quot;
      :key=&quot;item.id&quot;
      :class=&quot;{active: handscroll === item.id}&quot;
      :src=&quot;item.src&quot;
      :alt=&quot;item.description&quot;
      :width=&quot;item.width&quot;
      :height=&quot;item.height&quot;
    &gt;
  <span class="hs-highlight">&lt;/HandyScroll&gt;</span>
  &lt;!-- skipping --&gt;
&lt;/template&gt;

&lt;script&gt;
  <span class="hs-highlight">import HandyScroll from &quot;vue-handy-scroll&quot;;</span>

  export default {
    name: &quot;DemoHandscrolls&quot;,
    components: {
      <span class="hs-highlight">HandyScroll</span>
    },
    props: {
      unobtrusive: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        handscroll: &quot;along-the-river&quot;,
        handscrolls: [/* skipping */]
      };
    },
    watch: {
      handscroll() {
        <span class="hs-highlight">HandyScroll.EventBus.emit(&quot;update&quot;, {sourceElement: this.$refs.handscrolls.$el});</span>
      }
    }
  };
&lt;/script&gt;</pre>
  </section>
</template>

<script>
import HandyScroll from "vue-handy-scroll";

export default {
  name: "DemoHandscrolls",
  components: {
    HandyScroll
  },
  props: {
    unobtrusive: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      handscroll: "along-the-river",
      handscrolls: [
        {
          id: "along-the-river",
          title: "Qingming Shanghe Tu",
          description: "“Along the River During the Qingming Festival” by Zhang Zeduan",
          src: "assets/images/along-the-river.jpg",
          width: 10561,
          height: 1000
        },
        {
          id: "nine-dragons",
          title: "Nine Dragons",
          description: "“Nine Dragons” by Chen Rong",
          src: "assets/images/nine-dragons.jpg",
          width: 19039,
          height: 964
        },
        {
          id: "emperor-tour",
          title: "Kangxi Emperor’s Southern Inspection Tour",
          description: "“Kangxi Emperor’s Southern Inspection Tour” by Wang Hui",
          src: "assets/images/emperor-tour.jpg",
          width: 3001,
          height: 1396
        }
      ]
    };
  },
  watch: {
    handscroll() {
      this.$nextTick(() => this.scrollRight());
      HandyScroll.EventBus.emit("update", {sourceElement: this.$refs.handscrolls.$el});
    }
  },
  mounted() {
    this.scrollRight();
  },
  methods: {
    scrollRight() {
      let hsEl = this.$refs.handscrolls.$el;
      hsEl.scrollLeft = hsEl.scrollWidth;
    }
  }
};
</script>

<style lang="less" scoped>
  @import (reference) "../../assets/css/ui";

  .handscrolls {
    font-size:0;
    line-height:0;

    img {
      vertical-align:top;
      &:not(.active) {
        left:-50000px;
        position:absolute;
        top:-50000px;
      }
    }

    &-ctrl {
      display:flex;
      padding:0.25em 0;
      position:-webkit-sticky;
      position:sticky;
      text-shadow:1px 1px 1px @bg-color, -1px -1px 1px @bg-color, 1px -1px 1px @bg-color, -1px 1px 1px @bg-color;
      top:0;

      span {
        cursor:pointer;
        padding:0.25em 0.7em;
        &.active {
          font-weight:bold;
        }
        &:not(:first-child) {
          border-left:1px solid;
          box-shadow:-1px 0 0 0 @bg-color;
        }
      }
    }
  }
</style>
