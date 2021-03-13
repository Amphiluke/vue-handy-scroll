!function(e){"use strict";
/*!
  vue-handy-scroll v2.0.0
  https://amphiluke.github.io/vue-handy-scroll/
  */let t=Object.create(null),o={emit(e,...o){let n=t[e];n&&n.forEach((e=>e(...o)))},on(e,o){let n=t[e];n||(n=[],t[e]=n),n.push(o)},off(e,o){let n=t[e];if(n){let l=n.indexOf(o);l>=0&&(n.splice(l,1),n.length||delete t[e])}}};var n={EventBus:o,props:{customViewport:{type:Boolean,default:!1},unobtrusive:{type:Boolean,default:!1}},data:()=>({visible:!0}),created(){this.skipSyncContainer=this.skipSyncWidget=!1},mounted(){this.queueUpdate().then((()=>{this.addEventHandlers()}))},unmounted(){this.removeEventHandlers()},methods:{queueUpdate(){let e=this;return e.$nextTick().then((()=>{e.update(),e.skipSyncContainer=e.skipSyncWidget=!1}))},addEventHandlers(){let e=this;if(!e.$refs.scrollBody){let t=e.windowScrollHandler=()=>e.checkVisibility(),o=e.windowResizeHandler=()=>e.update();window.addEventListener("scroll",t,!1),window.addEventListener("resize",o,!1)}let t=e.updateHandler=({sourceElement:t}={})=>{t&&!e.$el.contains(t)||e.queueUpdate()};o.on("update",t)},removeEventHandlers(){let e=this;window.removeEventListener("scroll",e.windowScrollHandler,!1),window.removeEventListener("resize",e.windowResizeHandler,!1),o.off("update",e.updateHandler)},handleWidgetScroll(){let e=this;e.visible&&!e.skipSyncContainer&&e.syncContainer(),e.skipSyncContainer=!1},handleContainerScroll(){let e=this;e.skipSyncWidget||e.syncWidget(),e.skipSyncWidget=!1},handleContainerFocus(){setTimeout((()=>this.syncWidget()),0)},checkVisibility(){let e=this,{widget:t,container:o,scrollBody:n}=e.$refs,l=t.scrollWidth<=t.offsetWidth;if(!l){let e=o.getBoundingClientRect(),t=n?n.getBoundingClientRect().bottom:window.innerHeight||document.documentElement.clientHeight;l=e.bottom<=t||e.top>t}e.visible===l&&(e.visible=!l)},syncContainer(){let{widget:e,container:t}=this.$refs,{scrollLeft:o}=e;t.scrollLeft!==o&&(this.skipSyncWidget=!0,t.scrollLeft=o)},syncWidget(){let{widget:e,container:t}=this.$refs,{scrollLeft:o}=t;e.scrollLeft!==o&&(this.skipSyncContainer=!0,e.scrollLeft=o)},update(){let{widget:e,strut:t,container:o,scrollBody:n}=this.$refs,{style:l}=e,{clientWidth:s,scrollWidth:a}=o;l.width=`${s}px`,n||(l.left=`${o.getBoundingClientRect().left}px`),t.style.width=`${a}px`,a>s&&(l.height=e.offsetHeight-e.clientHeight+1+"px"),this.syncWidget(),this.checkVisibility()}}};const l=e.withScopeId("data-v-71ecdf2e");e.pushScopeId("data-v-71ecdf2e");const s={key:0,class:"handy-scroll-viewport"},a={ref:"strut"},i={ref:"strut"};e.popScopeId();const r=l(((t,o,n,l,r,d)=>n.customViewport?(e.openBlock(),e.createBlock("div",s,[e.renderSlot(t.$slots,"viewport-before"),e.createVNode("div",{ref:"scrollBody",class:"handy-scroll-body",onScroll:o[4]||(o[4]=(...e)=>d.checkVisibility&&d.checkVisibility(...e))},[e.renderSlot(t.$slots,"body-before"),e.createVNode("div",{ref:"container",class:["handy-scroll-area",{"handy-scroll-unobtrusive":n.unobtrusive}],onScroll:o[2]||(o[2]=(...e)=>d.handleContainerScroll&&d.handleContainerScroll(...e)),onFocusin:o[3]||(o[3]=(...e)=>d.handleContainerFocus&&d.handleContainerFocus(...e))},[e.renderSlot(t.$slots,"default"),e.createVNode("div",{ref:"widget",class:["handy-scroll",{"handy-scroll-hidden":!r.visible}],onScroll:o[1]||(o[1]=(...e)=>d.handleWidgetScroll&&d.handleWidgetScroll(...e))},[e.createVNode("div",a,null,512)],34)],34),e.renderSlot(t.$slots,"body-after")],544),e.renderSlot(t.$slots,"viewport-after")])):(e.openBlock(),e.createBlock("div",{key:1,ref:"container",class:["handy-scroll-area",{"handy-scroll-unobtrusive":n.unobtrusive}],onScroll:o[6]||(o[6]=(...e)=>d.handleContainerScroll&&d.handleContainerScroll(...e)),onFocusin:o[7]||(o[7]=(...e)=>d.handleContainerFocus&&d.handleContainerFocus(...e))},[e.renderSlot(t.$slots,"default"),e.createVNode("div",{ref:"widget",class:["handy-scroll",{"handy-scroll-hidden":!r.visible}],onScroll:o[5]||(o[5]=(...e)=>d.handleWidgetScroll&&d.handleWidgetScroll(...e))},[e.createVNode("div",i,null,512)],34)],34))));!function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===o&&n.firstChild?n.insertBefore(l,n.firstChild):n.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}('.handy-scroll[data-v-71ecdf2e]{bottom:0;min-height:17px;overflow:auto;position:fixed}.handy-scroll div[data-v-71ecdf2e]{height:1px;overflow:hidden;pointer-events:none}.handy-scroll div[data-v-71ecdf2e]:before{content:"\\A0"}.handy-scroll[data-v-71ecdf2e],.handy-scroll div[data-v-71ecdf2e]{font-size:1px;line-height:0;margin:0;padding:0}.handy-scroll-hidden[data-v-71ecdf2e]{bottom:9999px}.handy-scroll-hidden div[data-v-71ecdf2e]:before{content:"\\A0\\A0"}.handy-scroll-viewport[data-v-71ecdf2e]{position:relative}.handy-scroll-area[data-v-71ecdf2e],.handy-scroll-body[data-v-71ecdf2e]{overflow:auto}.handy-scroll-viewport .handy-scroll[data-v-71ecdf2e]{left:0;position:absolute}.handy-scroll-unobtrusive .handy-scroll[data-v-71ecdf2e]{opacity:0;transition:opacity .5s ease .3s}.handy-scroll-unobtrusive:hover .handy-scroll[data-v-71ecdf2e]{opacity:1}'),n.render=r,n.__scopeId="data-v-71ecdf2e",n.__file="src/handy-scroll.vue";var d={name:"DemoHandscrolls",components:{HandyScroll:n},props:{unobtrusive:{type:Boolean,default:!1}},data:()=>({handscroll:"along-the-river",handscrolls:[{id:"along-the-river",title:"Qingming Shanghe Tu",description:"“Along the River During the Qingming Festival” by Zhang Zeduan",src:"assets/images/along-the-river.jpg",width:10561,height:1e3},{id:"nine-dragons",title:"Nine Dragons",description:"“Nine Dragons” by Chen Rong",src:"assets/images/nine-dragons.jpg",width:19039,height:964},{id:"emperor-tour",title:"Kangxi Emperor’s Southern Inspection Tour",description:"“Kangxi Emperor’s Southern Inspection Tour” by Wang Hui",src:"assets/images/emperor-tour.jpg",width:3001,height:1396}]}),watch:{handscroll(){this.$nextTick((()=>this.scrollRight())),n.EventBus.emit("update",{sourceElement:this.$refs.handscrolls.$el})}},mounted(){this.scrollRight()},methods:{scrollRight(){let e=this.$refs.handscrolls.$el;e.scrollLeft=e.scrollWidth}}};const c=e.withScopeId("data-v-53fa13d8");e.pushScopeId("data-v-53fa13d8");const h={id:"demo-handscrolls"},p=e.createVNode("h2",null,"#1: Handscrolls",-1),u=e.createVNode("h3",null,"Description",-1),g=e.createVNode("p",null,[e.createTextVNode("Using of the "),e.createVNode("code",null,"vue-handy-scroll"),e.createTextVNode(" component can be appropriate for an online exhibiting of large "),e.createVNode("a",{href:"https://en.wikipedia.org/wiki/Handscroll",rel:"nofollow noopener",target:"_blank"},"handscrolls"),e.createTextVNode(".")],-1),v=e.createVNode("p",null,[e.createTextVNode("The demo below also shows a possible use case for the "),e.createVNode("a",{href:"https://github.com/Amphiluke/vue-handy-scroll#updating-scrollbar"},[e.createVNode("code",null,"update")]),e.createTextVNode(" event. Click the “tabs” to switch over the paintings, and the component parameters will update accordingly (note that handscrolls are viewed starting from the right end).")],-1),m=e.createVNode("h3",null,"Live demo",-1),f={class:"handscrolls-ctrl"},y=e.createStaticVNode('<h3 data-v-53fa13d8>Demo’s code</h3><pre class="hs-code" data-v-53fa13d8>&lt;template&gt;\n  &lt;!-- skipping --&gt;\n  <span class="hs-highlight" data-v-53fa13d8>&lt;HandyScroll class=&quot;handscrolls&quot; ref=&quot;handscrolls&quot; :unobtrusive=&quot;unobtrusive&quot;&gt;</span>\n    &lt;img\n      v-for=&quot;item in handscrolls&quot;\n      :key=&quot;item.id&quot;\n      :class=&quot;{active: handscroll === item.id}&quot;\n      :src=&quot;item.src&quot;\n      :alt=&quot;item.description&quot;\n      :width=&quot;item.width&quot;\n      :height=&quot;item.height&quot;\n    &gt;\n  <span class="hs-highlight" data-v-53fa13d8>&lt;/HandyScroll&gt;</span>\n  &lt;!-- skipping --&gt;\n&lt;/template&gt;\n\n&lt;script&gt;\n  <span class="hs-highlight" data-v-53fa13d8>import HandyScroll from &quot;vue-handy-scroll&quot;;</span>\n\n  export default {\n    name: &quot;DemoHandscrolls&quot;,\n    components: {\n      <span class="hs-highlight" data-v-53fa13d8>HandyScroll</span>\n    },\n    props: {\n      unobtrusive: {\n        type: Boolean,\n        default: false\n      }\n    },\n    data() {\n      return {\n        handscroll: &quot;along-the-river&quot;,\n        handscrolls: [/* skipping */]\n      };\n    },\n    watch: {\n      handscroll() {\n        <span class="hs-highlight" data-v-53fa13d8>HandyScroll.EventBus.emit(&quot;update&quot;, {sourceElement: this.$refs.handscrolls.$el});</span>\n      }\n    }\n  };\n&lt;/script&gt;</pre>',2);e.popScopeId();const b=c(((t,o,n,l,s,a)=>{const i=e.resolveComponent("HandyScroll");return e.openBlock(),e.createBlock("section",h,[p,u,e.createCommentVNode(" eslint-disable vue/max-attributes-per-line "),g,v,e.createCommentVNode(" eslint-enable vue/max-attributes-per-line "),m,e.createVNode("div",null,[e.createVNode("div",f,[(e.openBlock(!0),e.createBlock(e.Fragment,null,e.renderList(s.handscrolls,(t=>(e.openBlock(),e.createBlock("span",{key:t.id,class:{active:s.handscroll===t.id},onClick:e=>s.handscroll=t.id},e.toDisplayString(t.title),11,["onClick"])))),128))]),e.createVNode(i,{ref:"handscrolls",class:"handscrolls",unobtrusive:n.unobtrusive},{default:c((()=>[(e.openBlock(!0),e.createBlock(e.Fragment,null,e.renderList(s.handscrolls,(t=>(e.openBlock(),e.createBlock("img",{key:t.id,class:{active:s.handscroll===t.id},src:t.src,alt:t.description,width:t.width,height:t.height},null,10,["src","alt","width","height"])))),128))])),_:1},8,["unobtrusive"])]),y])}));d.render=b,d.__scopeId="data-v-53fa13d8",d.__file="src/components/DemoHandscrolls.vue";var V={name:"DemoPopup",components:{HandyScroll:n},props:{unobtrusive:{type:Boolean,default:!1}},setup(){let t=e.ref(!0),o=({target:e})=>{t.value||e.closest(".hs-popup, .hs-open-popup")||(t.value=!0)};return e.onMounted((()=>{document.addEventListener("click",o,!1)})),e.onUnmounted((()=>{document.removeEventListener("click",o,!1)})),{popupHidden:t}},methods:{openPopup(){this.popupHidden=!1;let e=this.$refs.popup.$refs.container;this.$nextTick((()=>e.scrollLeft=e.scrollWidth)),n.EventBus.emit("update",{sourceElement:e})}}};const N=e.withScopeId("data-v-a71f77ee");e.pushScopeId("data-v-a71f77ee");const k={id:"demo-popup",class:"demo-popup"},w=e.createVNode("h2",null,"#2: handy-scroll widget in a popup",-1),x=e.createVNode("h3",null,"Description",-1),S=e.createVNode("p",null,[e.createTextVNode("This example demonstrates a special use case — a widget inside a positioned popup. Please find out the details of this use case in the "),e.createVNode("a",{href:"https://github.com/Amphiluke/vue-handy-scroll#custom-viewport-element"},"module’s docs"),e.createTextVNode(".")],-1),C=e.createVNode("h3",null,"Live demo",-1),H=e.createVNode("h4",null,"“Along the River During the Qingming Festival”",-1),B=e.createVNode("img",{src:"assets/images/along-the-river.jpg",alt:"“Along the River During the Qingming Festival” by Zhang Zeduan",width:"10561",height:"1000"},null,-1),T=e.createVNode("p",{class:"small"},[e.createVNode("a",{href:"https://en.wikipedia.org/wiki/Along_the_River_During_the_Qingming_Festival",rel:"nofollow noopener",target:"_blank"},[e.createVNode("em",null,"“Along the River During the Qingming Festival”")]),e.createTextVNode(" (fragment), painting by Zhang Zeduan (12th century) ")],-1),D=e.createVNode("h3",null,"Demo’s code (key parts)",-1),q=e.createVNode("pre",{class:"hs-code hs-code-scrollable"},[e.createTextVNode("<template>\n  \x3c!-- skipping --\x3e\n  "),e.createVNode("span",{class:"hs-highlight"},'<HandyScroll\n    class="hs-popup"\n    :class="{\'hs-popup-hidden\': popupHidden}"\n    ref="popup"\n    :custom-viewport="true"\n  >'),e.createTextVNode("\n    "),e.createVNode("span",{class:"hs-highlight"},"<template #body-before>"),e.createTextVNode("\n      <h4>“Along the River During the Qingming Festival”</h4>\n    "),e.createVNode("span",{class:"hs-highlight"},"</template>"),e.createTextVNode('\n    <img src="../assets/images/along-the-river.jpg" alt="" width="10561" height="1000">\n    '),e.createVNode("span",{class:"hs-highlight"},"<template #body-after>"),e.createTextVNode("\n      <p><em>“Along the River During the Qingming Festival”</em> (fragment), painting by Zhang Zeduan (12th century)</p>\n    "),e.createVNode("span",{class:"hs-highlight"},"</template>"),e.createTextVNode("\n  "),e.createVNode("span",{class:"hs-highlight"},"</HandyScroll>"),e.createTextVNode("\n  \x3c!-- skipping --\x3e\n</template>\n\n<script>\n  "),e.createVNode("span",{class:"hs-highlight"},'import HandyScroll from "vue-handy-scroll";'),e.createTextVNode('\n\n  export default {\n    name: "DemoPopup",\n    components: {\n      '),e.createVNode("span",{class:"hs-highlight"},"HandyScroll"),e.createTextVNode("\n    },\n    data() {\n      return {\n        popupHidden: true\n      }\n    },\n    methods: {\n      openPopup() {\n        this.popupHidden = false;\n        "),e.createVNode("span",{class:"hs-highlight"},'HandyScroll.EventBus.emit("update", {sourceElement: this.$refs.popup.$el});'),e.createTextVNode('\n      }\n    }\n  };\n<\/script>\n\n<style lang="less" scoped>\n  .demo-popup .hs-popup {\n    height:550px;\n    left:50%;\n    margin-left:-700px / 2;\n    padding:10px;\n    '),e.createVNode("span",{class:"hs-highlight"},"position:fixed;"),e.createTextVNode("\n    top:20px;\n    width:700px;\n    z-index:1;\n\n    &.hs-popup-hidden {\n      left:-99999px;\n      top:-99999px;\n    }\n\n    // About ::v-deep - https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors\n    "),e.createVNode("span",{class:"hs-highlight"},"& ::v-deep(.handy-scroll-body) {"),e.createTextVNode("\n      height:550px;\n      width:100%;\n    }\n\n    "),e.createVNode("span",{class:"hs-highlight"},"& ::v-deep(.handy-scroll:not(.handy-scroll-hidden)) {"),e.createTextVNode("\n      bottom:10px; // same value as the bottom padding\n      left:10px; // same value as the left padding\n    }\n\n    "),e.createVNode("span",{class:"hs-highlight"},"& ::v-deep(.handy-scroll-area) {"),e.createTextVNode("\n      font-size:0;\n      line-height:0;\n      width:100%;\n    }\n  }\n</style>")],-1);e.popScopeId();const $=N(((t,o,n,l,s,a)=>{const i=e.resolveComponent("HandyScroll");return e.openBlock(),e.createBlock("section",k,[w,x,S,C,e.createVNode("p",null,[e.createVNode("span",{class:"hs-open-popup",onClick:o[1]||(o[1]=(...e)=>a.openPopup&&a.openPopup(...e))}," Click here to open a popup ")]),e.createVNode(i,{ref:"popup",class:["hs-popup",{"hs-popup-hidden":l.popupHidden}],unobtrusive:n.unobtrusive,"custom-viewport":!0},{"body-before":N((()=>[e.createVNode("span",{class:"hs-popup-close",onClick:o[2]||(o[2]=e=>l.popupHidden=!0)}),H])),"body-after":N((()=>[T])),default:N((()=>[B])),_:1},8,["class","unobtrusive"]),D,e.createVNode(i,{unobtrusive:n.unobtrusive},{default:N((()=>[q])),_:1},8,["unobtrusive"])])}));V.render=$,V.__scopeId="data-v-a71f77ee",V.__file="src/components/DemoPopup.vue";var _={name:"DemoUnobtrusive",props:{unobtrusive:{type:Boolean,default:!1}},emits:["change"]};const E={id:"demo-unobtrusive"},W=e.createVNode("h2",null,"#3 “Unobtrusive” mode",-1),L=e.createVNode("h3",null,"Description",-1),R=e.createVNode("p",null,[e.createTextVNode("This feature makes handy-scroll widgets appear only when the mouse pointer hovers over the scrollable container. Refer the "),e.createVNode("a",{href:"https://github.com/Amphiluke/vue-handy-scroll#unobtrusive-mode"},"module’s docs"),e.createTextVNode(" for more details.")],-1),A=e.createVNode("h3",null,"Live demo",-1),F={action:"#",autocomplete:"off"},I=e.createTextVNode(" Unobtrusive mode: "),U=e.createVNode("br",null,null,-1),P=e.createVNode("span",{class:"small"},"Check/uncheck this checkbox to toggle the “unobtrusive” mode for all component instances on this page",-1);_.render=function(t,o,n,l,s,a){return e.openBlock(),e.createBlock("section",E,[e.createCommentVNode(" eslint-disable vue/max-attributes-per-line "),W,L,R,A,e.createVNode("form",F,[e.createVNode("label",null,[e.createVNode("input",{id:"is-unobtrusive",type:"checkbox",checked:n.unobtrusive,onChange:o[1]||(o[1]=e=>t.$emit("change",e.target.checked))},null,40,["checked"]),I,e.createVNode("b",null,e.toDisplayString(n.unobtrusive?"on":"off"),1)]),U,P]),e.createCommentVNode(" eslint-enable vue/max-attributes-per-line ")])},_.__file="src/components/DemoUnobtrusive.vue";var Q={name:"DemoSection",components:{DemoHandscrolls:d,DemoPopup:V,DemoUnobtrusive:_},data:()=>({unobtrusive:!1})};Q.render=function(t,o,n,l,s,a){const i=e.resolveComponent("DemoHandscrolls"),r=e.resolveComponent("DemoPopup"),d=e.resolveComponent("DemoUnobtrusive");return e.openBlock(),e.createBlock("div",null,[e.createVNode(i,{unobtrusive:s.unobtrusive},null,8,["unobtrusive"]),e.createVNode(r,{unobtrusive:s.unobtrusive},null,8,["unobtrusive"]),e.createVNode(d,{unobtrusive:s.unobtrusive,onChange:o[1]||(o[1]=e=>s.unobtrusive=e)},null,8,["unobtrusive"])])},Q.__file="src/DemoSection.vue",e.createApp({components:{DemoSection:Q},render:()=>e.h(e.resolveComponent("DemoSection"))}).mount("#app"),document.body.classList.remove("loading")}(Vue);
