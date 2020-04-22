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
</style>
