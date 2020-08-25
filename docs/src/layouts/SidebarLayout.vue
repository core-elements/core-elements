<template>
  <Page>
    <core-flex>
      <div class="sidebar" :class="{ show: showSidebar }">
        <slot name="sidebar"></slot>
      </div>
      <main class="main">
        <slot></slot>
      </main>
    </core-flex>
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
  padding-top: 60px;
  padding-bottom: 60px;
  top: 60px;
  left: 0;
  padding-left: var(--core-space-lg);
  padding-right: var(--core-space-lg);
  margin-right: var(--core-space-lg);
  width: 100%;
  position: fixed;
  z-index: 500;
  display: none;
  background: var(--core-color-white);
  font-size: 1.5em;
  height: calc(100vh - 60px);
  overflow: visible;
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
    overflow-x: visible;
    overflow-y: auto;
    padding-left: 0;
    padding-right: 0;
  }

  .main {
    width: 78%;
  }
}
</style>
