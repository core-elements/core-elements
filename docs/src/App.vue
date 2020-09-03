<template>
  <div>
    <Header
      :hasSidebar="routerProps.hasSidebar"
      :showInHeader="routerProps.showInHeader"
      :title="routerProps.title"
      :showSidebar="showSidebar"
      @toggle-sidebar="showSidebar = !showSidebar"
    ></Header>
    <router-view :showSidebar="showSidebar" @toggle-sidebar="showSidebar = !showSidebar"></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: { Header },
  data() {
    return {
      checked: false,
      showSidebar: false,
    };
  },
  computed: {
    routerProps() {
      return this.$route.meta;
    },
  },
};
</script>

<style>
@import "./styles/github-markdown.css";
@import "../../lib/src/components/knobs/shades-of-purple.css";

html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
  scroll-behavior: smooth;
}

@media (max-width: 800px) {
  body.no-scroll-mobile {
    overflow: hidden;
  }
}

a {
  color: currentColor;
}

b {
  color: var(--core-color-font-strong);
}
</style>
