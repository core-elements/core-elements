<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">
      <nav toc>
        <div class="menu-group">
          <core-box margin-b="sm">
            <core-text weight="500" color="black">Getting started</core-text>
          </core-box>
          <router-link :to="{ hash: 'introduction' }">Introduction</router-link>
          <router-link :to="{ hash: 'installation' }">Installation</router-link>
        </div>
        <div class="menu-group">
          <core-box margin-b="sm">
            <core-text weight="500" color="black">Concepts</core-text>
          </core-box>
          <router-link :to="{ hash: 'styling' }">Styling</router-link>
          <router-link :to="{ hash: 'slots' }">Named slots</router-link>
          <router-link :to="{ hash: 'events' }">Events</router-link>
          <router-link :to="{ hash: 'attributes' }">Attributes and properties</router-link>
          <router-link :to="{ hash: 'parts' }">Parts</router-link>
        </div>
        <div class="menu-group">
          <core-box margin-b="sm">
            <core-text weight="500" color="black">Guides</core-text>
          </core-box>
          <router-link :to="{ hash: 'react' }">React</router-link>
          <router-link :to="{ hash: 'vue' }">Vue</router-link>
          <router-link :to="{ hash: 'angular' }">Angular</router-link>
          <router-link :to="{ hash: 'vanilla' }">Vanilla</router-link>
        </div>
      </nav>
    </div>

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
