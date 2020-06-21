<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">Halla</div>

    <div>
      <div class="markdown-body" v-html="gettingstarted()"></div>
      <core-box padding-y="lg">
        <core-button type="secondary" @click="$router.push('/components')">
          See the components
          <i slot="end" class="gg-arrow-right"></i>
        </core-button>
      </core-box>
    </div>
  </SidebarLayout>
</template>

<script>
import hljs from "highlight.js";
import marked from "marked";
import gettingstarted from "../markdown/getting-started.md";
import SidebarLayout from "../layouts/SidebarLayout";

const options = {
  highlight: function(code, lang) {
    console.log("highlighting");
    return `<div class="halla">${hljs.highlight(lang, code).value}</div>`;
  }
};

//marked.setOptions(options);

export default {
  props: { showSidebar: Boolean, title: String },
  components: { SidebarLayout },
  methods: {
    gettingstarted() {
      const mark = marked.setOptions(options);
      return mark(gettingstarted);
    }
  }
};
</script>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
</style>
