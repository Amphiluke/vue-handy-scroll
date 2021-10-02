!function(e){"use strict";
/*!
  vue-handy-scroll v3.0.1
  https://amphiluke.github.io/vue-handy-scroll/
  */let t=Object.create(null),o={emit(e,...o){let n=t[e];n&&n.forEach((e=>e(...o)))},on(e,o){let n=t[e];n||(n=[],t[e]=n),n.push(o)},off(e,o){let n=t[e];if(n){let l=n.indexOf(o);l>=0&&(n.splice(l,1),n.length||delete t[e])}}};var n={EventBus:o,props:{customViewport:{type:Boolean,default:!1},unobtrusive:{type:Boolean,default:!1}},data:()=>({visible:!0}),created(){this.skipSyncContainer=this.skipSyncWidget=!1},mounted(){this.queueUpdate().then((()=>{this.addEventHandlers()}))},unmounted(){this.removeEventHandlers()},methods:{queueUpdate(){let e=this;return e.$nextTick().then((()=>{e.update(),e.skipSyncContainer=e.skipSyncWidget=!1}))},addEventHandlers(){let e=this;if(!e.$refs.scrollBody){let t=e.windowScrollHandler=()=>e.checkVisibility(),o=e.windowResizeHandler=()=>e.update();window.addEventListener("scroll",t,!1),window.addEventListener("resize",o,!1)}let t=e.updateHandler=({sourceElement:t}={})=>{t&&!e.$el.contains(t)||e.queueUpdate()};o.on("update",t)},removeEventHandlers(){let e=this;window.removeEventListener("scroll",e.windowScrollHandler,!1),window.removeEventListener("resize",e.windowResizeHandler,!1),o.off("update",e.updateHandler)},handleWidgetScroll(){let e=this;e.visible&&!e.skipSyncContainer&&e.syncContainer(),e.skipSyncContainer=!1},handleContainerScroll(){let e=this;e.skipSyncWidget||e.syncWidget(),e.skipSyncWidget=!1},handleContainerFocus(){setTimeout((()=>{this.$refs&&this.$refs.widget&&this.syncWidget()}),0)},checkVisibility(){let e=this,{widget:t,container:o,scrollBody:n}=e.$refs,l=t.scrollWidth<=t.offsetWidth;if(!l){let e=o.getBoundingClientRect(),t=n?n.getBoundingClientRect().bottom:window.innerHeight||document.documentElement.clientHeight;l=e.bottom<=t||e.top>t}e.visible===l&&(e.visible=!l)},syncContainer(){let{widget:e,container:t}=this.$refs,{scrollLeft:o}=e;t.scrollLeft!==o&&(this.skipSyncWidget=!0,t.scrollLeft=o)},syncWidget(){let{widget:e,container:t}=this.$refs,{scrollLeft:o}=t;e.scrollLeft!==o&&(this.skipSyncContainer=!0,e.scrollLeft=o)},update(){let{widget:e,strut:t,container:o,scrollBody:n}=this.$refs,{style:l}=e,{clientWidth:r,scrollWidth:i}=o;l.width=`${r}px`,n||(l.left=`${o.getBoundingClientRect().left}px`),t.style.width=`${i}px`,i>r&&(l.height=e.offsetHeight-e.clientHeight+1+"px"),this.syncWidget(),this.checkVisibility()}}};const l={key:0,class:"handy-scroll-viewport"},r={ref:"strut"},i={ref:"strut"};!function(e,t){void 0===t&&(t={});var o=t.insertAt;if(e&&"undefined"!=typeof document){var n=document.head||document.getElementsByTagName("head")[0],l=document.createElement("style");l.type="text/css","top"===o&&n.firstChild?n.insertBefore(l,n.firstChild):n.appendChild(l),l.styleSheet?l.styleSheet.cssText=e:l.appendChild(document.createTextNode(e))}}('.handy-scroll[data-v-71ecdf2e]{bottom:0;min-height:17px;overflow:auto;position:fixed}.handy-scroll div[data-v-71ecdf2e]{height:1px;overflow:hidden;pointer-events:none}.handy-scroll div[data-v-71ecdf2e]:before{content:"\\A0"}.handy-scroll[data-v-71ecdf2e],.handy-scroll div[data-v-71ecdf2e]{font-size:1px;line-height:0;margin:0;padding:0}.handy-scroll-hidden[data-v-71ecdf2e]{bottom:9999px}.handy-scroll-hidden div[data-v-71ecdf2e]:before{content:"\\A0\\A0"}.handy-scroll-viewport[data-v-71ecdf2e]{position:relative}.handy-scroll-area[data-v-71ecdf2e],.handy-scroll-body[data-v-71ecdf2e]{overflow:auto}.handy-scroll-viewport .handy-scroll[data-v-71ecdf2e]{left:0;position:absolute}.handy-scroll-unobtrusive .handy-scroll[data-v-71ecdf2e]{opacity:0;transition:opacity .5s ease .3s}.handy-scroll-unobtrusive:hover .handy-scroll[data-v-71ecdf2e]{opacity:1}'),n.render=function(t,o,n,s,a,d){return n.customViewport?(e.openBlock(),e.createElementBlock("div",l,[e.renderSlot(t.$slots,"viewport-before"),e.createElementVNode("div",{ref:"scrollBody",class:"handy-scroll-body",onScroll:o[3]||(o[3]=(...e)=>d.checkVisibility&&d.checkVisibility(...e))},[e.renderSlot(t.$slots,"body-before"),e.createElementVNode("div",{ref:"container",class:e.normalizeClass(["handy-scroll-area",{"handy-scroll-unobtrusive":n.unobtrusive}]),onScroll:o[1]||(o[1]=(...e)=>d.handleContainerScroll&&d.handleContainerScroll(...e)),onFocusin:o[2]||(o[2]=(...e)=>d.handleContainerFocus&&d.handleContainerFocus(...e))},[e.renderSlot(t.$slots,"default"),e.createElementVNode("div",{ref:"widget",class:e.normalizeClass(["handy-scroll",{"handy-scroll-hidden":!a.visible}]),onScroll:o[0]||(o[0]=(...e)=>d.handleWidgetScroll&&d.handleWidgetScroll(...e))},[e.createElementVNode("div",r,null,512)],34)],34),e.renderSlot(t.$slots,"body-after")],544),e.renderSlot(t.$slots,"viewport-after")])):(e.openBlock(),e.createElementBlock("div",{key:1,ref:"container",class:e.normalizeClass(["handy-scroll-area",{"handy-scroll-unobtrusive":n.unobtrusive}]),onScroll:o[5]||(o[5]=(...e)=>d.handleContainerScroll&&d.handleContainerScroll(...e)),onFocusin:o[6]||(o[6]=(...e)=>d.handleContainerFocus&&d.handleContainerFocus(...e))},[e.renderSlot(t.$slots,"default"),e.createElementVNode("div",{ref:"widget",class:e.normalizeClass(["handy-scroll",{"handy-scroll-hidden":!a.visible}]),onScroll:o[4]||(o[4]=(...e)=>d.handleWidgetScroll&&d.handleWidgetScroll(...e))},[e.createElementVNode("div",i,null,512)],34)],34))},n.__scopeId="data-v-71ecdf2e",n.__file="src/handy-scroll.vue";var s={name:"DemoHandscrolls",components:{HandyScroll:n},props:{unobtrusive:{type:Boolean,default:!1}},data:()=>({handscroll:"along-the-river",handscrolls:[{id:"along-the-river",title:"Qingming Shanghe Tu",description:"“Along the River During the Qingming Festival” by Zhang Zeduan",src:"assets/images/along-the-river.jpg",width:10561,height:1e3},{id:"nine-dragons",title:"Nine Dragons",description:"“Nine Dragons” by Chen Rong",src:"assets/images/nine-dragons.jpg",width:19039,height:964},{id:"emperor-tour",title:"Kangxi Emperor’s Southern Inspection Tour",description:"“Kangxi Emperor’s Southern Inspection Tour” by Wang Hui",src:"assets/images/emperor-tour.jpg",width:3001,height:1396}]}),watch:{handscroll(){this.$nextTick((()=>this.scrollRight())),n.EventBus.emit("update",{sourceElement:this.$refs.handscrolls.$el})}},mounted(){this.scrollRight()},methods:{scrollRight(){let e=this.$refs.handscrolls.$el;e.scrollLeft=e.scrollWidth}}};const a=t=>(e.pushScopeId("data-v-53fa13d8"),t=t(),e.popScopeId(),t),d={id:"demo-handscrolls"},c=a((()=>e.createElementVNode("h2",null,"#1: Handscrolls",-1))),h=a((()=>e.createElementVNode("h3",null,"Description",-1))),u=a((()=>e.createElementVNode("p",null,[e.createTextVNode("Using of the "),e.createElementVNode("code",null,"vue-handy-scroll"),e.createTextVNode(" component can be appropriate for an online exhibiting of large "),e.createElementVNode("a",{href:"https://en.wikipedia.org/wiki/Handscroll",rel:"nofollow noopener",target:"_blank"},"handscrolls"),e.createTextVNode(".")],-1))),p=a((()=>e.createElementVNode("p",null,[e.createTextVNode("The demo below also shows a possible use case for the "),e.createElementVNode("a",{href:"https://github.com/Amphiluke/vue-handy-scroll#updating-scrollbar"},[e.createElementVNode("code",null,"update")]),e.createTextVNode(" event. Click the “tabs” to switch over the paintings, and the component parameters will update accordingly (note that handscrolls are viewed starting from the right end).")],-1))),m=a((()=>e.createElementVNode("h3",null,"Live demo",-1))),v={class:"handscrolls-ctrl"},g=["onClick"],f=["src","alt","width","height"],b=a((()=>e.createElementVNode("h3",null,"Demo’s code",-1))),y=a((()=>e.createElementVNode("iframe",{height:"370",style:{width:"100%"},scrolling:"no",title:"vue-handy-scroll@2 - Handscrolls",src:"https://codepen.io/amphiluke/embed/QWGYJoX?height=370&theme-id=light&default-tab=js",frameborder:"no",loading:"lazy",allowtransparency:"true",allowfullscreen:"true"},"\n      See the Pen <a href='https://codepen.io/amphiluke/pen/QWGYJoX'>vue-handy-scroll@2 - Handscrolls</a> by Amphiluke\n      (<a href='https://codepen.io/amphiluke'>@amphiluke</a>) on <a href='https://codepen.io'>CodePen</a>.\n    ",-1)));s.render=function(t,o,n,l,r,i){const s=e.resolveComponent("HandyScroll");return e.openBlock(),e.createElementBlock("section",d,[c,h,e.createCommentVNode(" eslint-disable vue/max-attributes-per-line "),u,p,e.createCommentVNode(" eslint-enable vue/max-attributes-per-line "),m,e.createElementVNode("div",null,[e.createElementVNode("div",v,[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(r.handscrolls,(t=>(e.openBlock(),e.createElementBlock("span",{key:t.id,class:e.normalizeClass({active:r.handscroll===t.id}),onClick:e=>r.handscroll=t.id},e.toDisplayString(t.title),11,g)))),128))]),e.createVNode(s,{ref:"handscrolls",class:"handscrolls",unobtrusive:n.unobtrusive},{default:e.withCtx((()=>[(e.openBlock(!0),e.createElementBlock(e.Fragment,null,e.renderList(r.handscrolls,(t=>(e.openBlock(),e.createElementBlock("img",{key:t.id,class:e.normalizeClass({active:r.handscroll===t.id}),src:t.src,alt:t.description,width:t.width,height:t.height},null,10,f)))),128))])),_:1},8,["unobtrusive"])]),b,e.createCommentVNode(" eslint-disable vue/max-attributes-per-line "),y,e.createCommentVNode(" eslint-enable vue/max-attributes-per-line ")])},s.__scopeId="data-v-53fa13d8",s.__file="src/components/DemoHandscrolls.vue";var k={name:"DemoPopup",components:{HandyScroll:n},props:{unobtrusive:{type:Boolean,default:!1}},setup(){let t=e.ref(!0),o=({target:e})=>{t.value||e.closest(".hs-popup, .hs-open-popup")||(t.value=!0)};return e.onMounted((()=>{document.addEventListener("click",o,!1)})),e.onUnmounted((()=>{document.removeEventListener("click",o,!1)})),{popupHidden:t}},methods:{openPopup(){this.popupHidden=!1;let e=this.$refs.popup.$refs.container;this.$nextTick((()=>e.scrollLeft=e.scrollWidth)),n.EventBus.emit("update",{sourceElement:e})}}};const E=t=>(e.pushScopeId("data-v-a71f77ee"),t=t(),e.popScopeId(),t),V={id:"demo-popup",class:"demo-popup"},N=E((()=>e.createElementVNode("h2",null,"#2: handy-scroll widget in a popup",-1))),w=E((()=>e.createElementVNode("h3",null,"Description",-1))),C=E((()=>e.createElementVNode("p",null,[e.createTextVNode("This example demonstrates a special use case — a widget inside a positioned popup. Please find out the details of this use case in the "),e.createElementVNode("a",{href:"https://github.com/Amphiluke/vue-handy-scroll#custom-viewport-element"},"module’s docs"),e.createTextVNode(".")],-1))),S=E((()=>e.createElementVNode("h3",null,"Live demo",-1))),x=E((()=>e.createElementVNode("h4",null,"“Along the River During the Qingming Festival”",-1))),B=E((()=>e.createElementVNode("img",{src:"assets/images/along-the-river.jpg",alt:"“Along the River During the Qingming Festival” by Zhang Zeduan",width:"10561",height:"1000"},null,-1))),H=E((()=>e.createElementVNode("p",{class:"small"},[e.createElementVNode("a",{href:"https://en.wikipedia.org/wiki/Along_the_River_During_the_Qingming_Festival",rel:"nofollow noopener",target:"_blank"},[e.createElementVNode("em",null,"“Along the River During the Qingming Festival”")]),e.createTextVNode(" (fragment), painting by Zhang Zeduan (12th century) ")],-1))),D=E((()=>e.createElementVNode("h3",null,"Demo’s code",-1))),$=E((()=>e.createElementVNode("iframe",{height:"370",style:{width:"100%"},scrolling:"no",title:"vue-handy-scroll@2 - positioned popup",src:"https://codepen.io/amphiluke/embed/eYBxbRv?height=370&theme-id=light&default-tab=js",frameborder:"no",loading:"lazy",allowtransparency:"true",allowfullscreen:"true"},"\n      See the Pen <a href='https://codepen.io/amphiluke/pen/eYBxbRv'>vue-handy-scroll@2 - positioned popup</a> by Amphiluke\n      (<a href='https://codepen.io/amphiluke'>@amphiluke</a>) on <a href='https://codepen.io'>CodePen</a>.\n    ",-1)));k.render=function(t,o,n,l,r,i){const s=e.resolveComponent("HandyScroll");return e.openBlock(),e.createElementBlock("section",V,[N,w,C,S,e.createElementVNode("p",null,[e.createElementVNode("span",{class:"hs-open-popup",onClick:o[0]||(o[0]=(...e)=>i.openPopup&&i.openPopup(...e))}," Click here to open a popup ")]),e.createVNode(s,{ref:"popup",class:e.normalizeClass(["hs-popup",{"hs-popup-hidden":l.popupHidden}]),unobtrusive:n.unobtrusive,"custom-viewport":!0},{"body-before":e.withCtx((()=>[e.createElementVNode("span",{class:"hs-popup-close",onClick:o[1]||(o[1]=e=>l.popupHidden=!0)}),x])),"body-after":e.withCtx((()=>[H])),default:e.withCtx((()=>[B])),_:1},8,["class","unobtrusive"]),D,e.createCommentVNode(" eslint-disable vue/max-attributes-per-line "),$,e.createCommentVNode(" eslint-enable vue/max-attributes-per-line ")])},k.__scopeId="data-v-a71f77ee",k.__file="src/components/DemoPopup.vue";var _={name:"DemoUnobtrusive",props:{unobtrusive:{type:Boolean,default:!1}},emits:["change"]};const T={id:"demo-unobtrusive"},W=e.createElementVNode("h2",null,"#3 “Unobtrusive” mode",-1),L=e.createElementVNode("h3",null,"Description",-1),R=e.createElementVNode("p",null,[e.createTextVNode("This feature makes handy-scroll widgets appear only when the mouse pointer hovers over the scrollable container. Refer the "),e.createElementVNode("a",{href:"https://github.com/Amphiluke/vue-handy-scroll#unobtrusive-mode"},"module’s docs"),e.createTextVNode(" for more details.")],-1),A=e.createElementVNode("h3",null,"Live demo",-1),z={action:"#",autocomplete:"off"},F=["checked"],P=e.createTextVNode(" Unobtrusive mode: "),U=e.createElementVNode("br",null,null,-1),I=e.createElementVNode("span",{class:"small"},"Check/uncheck this checkbox to toggle the “unobtrusive” mode for all component instances on this page",-1);_.render=function(t,o,n,l,r,i){return e.openBlock(),e.createElementBlock("section",T,[e.createCommentVNode(" eslint-disable vue/max-attributes-per-line "),W,L,R,A,e.createElementVNode("form",z,[e.createElementVNode("label",null,[e.createElementVNode("input",{id:"is-unobtrusive",type:"checkbox",checked:n.unobtrusive,onChange:o[0]||(o[0]=e=>t.$emit("change",e.target.checked))},null,40,F),P,e.createElementVNode("b",null,e.toDisplayString(n.unobtrusive?"on":"off"),1)]),U,I]),e.createCommentVNode(" eslint-enable vue/max-attributes-per-line ")])},_.__file="src/components/DemoUnobtrusive.vue";var Q={name:"DemoSection",components:{DemoHandscrolls:s,DemoPopup:k,DemoUnobtrusive:_},data:()=>({unobtrusive:!1})};Q.render=function(t,o,n,l,r,i){const s=e.resolveComponent("DemoHandscrolls"),a=e.resolveComponent("DemoPopup"),d=e.resolveComponent("DemoUnobtrusive");return e.openBlock(),e.createElementBlock("div",null,[e.createVNode(s,{unobtrusive:r.unobtrusive},null,8,["unobtrusive"]),e.createVNode(a,{unobtrusive:r.unobtrusive},null,8,["unobtrusive"]),e.createVNode(d,{unobtrusive:r.unobtrusive,onChange:o[0]||(o[0]=e=>r.unobtrusive=e)},null,8,["unobtrusive"])])},Q.__file="src/DemoSection.vue",e.createApp({components:{DemoSection:Q},render:()=>e.h(e.resolveComponent("DemoSection"))}).mount("#app"),document.body.classList.remove("loading")}(Vue);