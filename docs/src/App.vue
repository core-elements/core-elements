<template>
  <div>
    <Header
      :showSidebar="showSidebar"
      @toggle-sidebar="showSidebar = !showSidebar"
    ></Header>
    <router-view
      :showSidebar="showSidebar"
      @toggle-sidebar="showSidebar = !showSidebar"
    ></router-view>
  </div>
</template>

<script>
import Header from "./components/Header";

export default {
  components: { Header },
  data() {
    return {
      showSidebar: false,
    };
  },
};
</script>

<style>
@import "./styles/github-markdown.css";
@import "../../lib/src/components/base-knobs/shades-of-purple.css";

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
}

a {
  color: currentColor;
}
</style>
