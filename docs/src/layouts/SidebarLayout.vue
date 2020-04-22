<template>
  <Page>
    <div class="sidebar" :class="{ show: showSidebar }">
      <slot name="sidebar"></slot>
    </div>
    <main class="main">
      <slot></slot>
    </main>
  </Page>
</template>

<script>
import Page from "./Page";

export default {
  components: { Page },
  props: {
    showSidebar: Boolean,
  },
};
</script>

<style>
.sidebar {
  top: 60px;
  left: 0;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  position: fixed;
  display: none;
  z-index: 999;
  background: white;
  font-size: 1.5em;
  height: calc(100vh - 60px);
}

.sidebar.show {
  display: block;
}

.main {
  width: 100%;
}

@media (min-width: 800px) {
  .page {
    display: flex;
    flex-wrap: nowrap;
  }

  .sidebar {
    display: block;
    width: 22%;
    height: max-content;
    position: sticky;
    top: 0;
    font-size: 1.2em;
    padding-left: 0;
    padding-right: 0;
  }

  .main {
    width: 78%;
  }
}
</style>
