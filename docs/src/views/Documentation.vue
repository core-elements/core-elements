<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">
      <nav toc>
        <div class="menu-group" v-for="(menuGroup, name) in groupedDocs" :key="name">
          <core-box mb="sm">
            <core-text size="sm" weight="500" color="strong">{{ name }}</core-text>
          </core-box>
          <router-link
            @click.native="$emit('toggle-sidebar')"
            :to="`/documentation/${page.slug}`"
            v-for="(page, i) in menuGroup"
            :key="i"
          >{{ page.name }}</router-link>
        </div>
      </nav>
    </div>

    <div>
      <div class="markdown-body" v-html="html"></div>
    </div>
  </SidebarLayout>
</template>

<script>
import hljs from "highlight.js";
import marked from "marked";
import { docs } from "../db.json";
import SidebarLayout from "../layouts/SidebarLayout";

const options = {
  highlight: function (code, lang) {
    return `<div class="hljs">${hljs.highlight(lang, code).value}</div>`;
  },
};

marked.setOptions(options);

export default {
  props: { showSidebar: Boolean, title: String },
  components: { SidebarLayout },
  computed: {
    doc() {
      return docs.find((c) => c.slug === this.$route.params.slug);
    },
    html() {
      return marked(this.doc.content);
    },
    groupedDocs() {
      return docs.reduce(
        (acc, comp) => {
          const catName = comp.category || "Uncategorized";

          const prevComps = acc[`${catName}`] ? acc[`${catName}`] : [];

          return {
            ...acc,
            [`${catName}`]: [...prevComps, { ...comp }],
          };
        },
        {
          "Getting Started": [],
          Concepts: [],
          Guides: [],
        }
      );
    },
  },
};
</script>


