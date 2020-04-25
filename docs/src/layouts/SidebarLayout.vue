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
    showSidebar: Boolean
  }
};
</script>

<style>
.sidebar {
  padding-top: 60px;
  padding-bottom: 60px;
  top: 60px;
  left: 0;
  padding-left: 30px;
  padding-right: 30px;
  width: 100%;
  position: fixed;
  z-index: 500;
  display: none;
  background: white;
  font-size: 1.5em;
  height: calc(100vh - 60px);
  overflow-y: scroll;
}

.sidebar.show {
  display: block;
}

.main {
  width: 100%;
  padding-top: 60px;
}

@media (min-width: 800px) {
  .page {
    display: flex;
    flex-wrap: nowrap;
  }

  .sidebar {
    background: transparent;
    display: block;
    width: 22%;
    height: calc(100vh - 60px);
    position: sticky;
    top: 0;
    font-size: 1.2em;
    overflow-y: scroll;
    padding-left: 0;
    padding-right: 0;
  }

  .main {
    width: 78%;
  }
}
</style>
