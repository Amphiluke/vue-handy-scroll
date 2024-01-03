# vue-handy-scroll

Handy floating scrollbar component for Vue 3.

## Synopsis

vue-handy-scroll is a component that solves the problem of scrolling lengthy content horizontally when that content doesn’t fit into the viewport. It creates a scrollbar which is attached at the bottom of the scrollable container’s visible area and which doesn’t get out of sight when the page is scrolled, thereby making horizontal scrolling of the container much handier.

> [!TIP]
> If you are looking for a standalone dependency-free module with the same functionality, please check out the sibling project [handy-scroll](https://github.com/Amphiluke/handy-scroll) instead.

## Installation

vue-handy-scroll is available on npm, so you may add it to your project as usual:

```
npm install vue-handy-scroll
```

After that you may import the component in your app:

```javascript
import HandyScroll from "vue-handy-scroll";
```

If you don’t use module bundlers but instead prefer using the component directly in a browser, you may add the component on your page through some CDN such as [jsDelivr](https://www.jsdelivr.com/features) or [unpkg](https://unpkg.com/). E.g.:
```html
<script src="https://cdn.jsdelivr.net/npm/vue@3/dist/vue.global.prod.js"></script>
<script src="https://cdn.jsdelivr.net/npm/vue-handy-scroll/dist/handy-scroll.umd.min.js"></script>

or

<script src="https://unpkg.com/vue@^3/dist/vue.global.prod.js"></script>
<script src="https://unpkg.com/vue-handy-scroll/dist/handy-scroll.umd.min.js"></script>
```

## Usage

### Component registration

You can register the component for your app either [globally](https://v3.vuejs.org/guide/component-registration.html#global-registration)

```javascript
import HandyScroll from "vue-handy-scroll";

let app = Vue.createApp({...})
app.component("handy-scroll", HandyScroll);
```

or [locally](https://v3.vuejs.org/guide/component-registration.html#local-registration)

```javascript
import HandyScroll from "vue-handy-scroll";

let app = Vue.createApp({
  components: {
    "handy-scroll": HandyScroll
  }
});
```

### Adding the component in templates

Add the component in your templates as follows:

```html
<HandyScroll>
  <!-- Place horizontally wide contents here -->
</HandyScroll>
```

or (in DOM templates):

```html
<handy-scroll>
  <!-- Place horizontally wide contents here -->
</handy-scroll>
```

### Updating scrollbar

If the layout of your web page may dynamically change, and these changes affect scrollable containers, then you need a way to update the scrollbar every time the container’s sizes change. This can be done by emitting the event `update` through the _event bus_ provided by the component.

```javascript
import HandyScroll from "vue-handy-scroll";
// ... some actions which change the total scroll width of the container ...
HandyScroll.EventBus.emit("update", {sourceElement: this.$el});
```

As demonstrated by the example above, when emitting the event, you may pass a reference to the source element. The component uses this reference to detect which scrollable container is actually affected, and updates only the one that contains the provided source element inside it. If you emit the `update` event without providing the source element, _all_ instances of the component will be updated.

### Custom viewport element

Sometimes, you may want to place the floating scrollbar in a container living in a positioned box (e.g. in a modal popup with `position: fixed`). To do so, the component needs to be switched to a special functioning mode by specifying the prop `custom-viewport`:

```html
<HandyScroll :custom-viewport="true">
  <!-- Place horizontally wide contents here -->
</HandyScroll>
```

The resulting rendered HTML will have the following structure:

```html
<div class="handy-scroll-viewport">
  <!-- slot “viewport-before” -->
  <div class="handy-scroll-body">
    <!-- slot “body-before” -->
    <div class="handy-scroll-area">
      <!-- Horizontally wide contents goes here (slot “default”) -->
    </div>
    <!-- slot “body-after” -->
  </div>
  <!-- slot “viewport-after” -->
</div>
```

Notice the placement of named slots in this structure (denoted by comments for clarity). You may use them to distribute content as needed. E.g.:

```html
<HandyScroll :custom-viewport="true">
  <template #vieport-before>
    whatever meaningful to be placed between
    “viewport’s” and “body’s” opening tags
  </template>
  <!-- Place horizontally wide contents here -->
</HandyScroll>
```

The `.handy-scroll-viewport` element is a positioned block (with any type of positioning except `static`) which serves for correct positioning of the scrollbar widget. Note that this element itself should _not_ be scrollable. The `.handy-scroll-body` element is a vertically scrollable block (with `overflow: auto`) which encloses the target container the floating scrollbar is mounted in.

The component provides some basic styles for elements with classes `.handy-scroll-viewport` and `.handy-scroll-body`. Feel free to adjust their styles in your stylesheets as needed (it that case you’ll probably need [deep selectors](https://vue-loader.vuejs.org/guide/scoped-css.html#deep-selectors) `::v-deep`).

### “Unobtrusive” mode

You can make the floating scrollbar more “unobtrusive” so that it will appear only when the mouse pointer hovers over the scrollable container. To do so just set the prop `unobtrusive` to `true`:

```html
<HandyScroll :unobtrusive="true">
  <!-- Place horizontally wide contents here -->
</HandyScroll>
```

## Live demos

Check out live usage examples [here](https://amphiluke.github.io/vue-handy-scroll/).

You may also find useful this [vue-handy-scroll Pen Collection](https://codepen.io/collection/naLgyg/?grid_type=list) on Codepen.
