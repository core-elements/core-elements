<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">
      <nav toc>
        <div class="menu-group" v-for="(menuGroup, name) in groupedPatterns" :key="name">
          <core-box mb="sm">
            <core-text size="sm" weight="500" color="strong">{{ name }}</core-text>
          </core-box>
          <router-link
            @click.native="$emit('toggle-sidebar')"
            :to="`/patterns/${page.name}`"
            v-for="(page, i) in menuGroup"
            :key="i"
          >{{ page.name }}</router-link>
        </div>
      </nav>
    </div>

    <div class="component">
      <core-text tag="h1">{{ pattern.name }}</core-text>
      <core-text tag="p" look="lead">{{ pattern.desc }}</core-text>

      <core-box
        bg="white"
        style="position: sticky; top: 0; left: 0; z-index: 300"
        pt="xl"
        v-if="subMenu.length"
      >
        <core-tabs>
          <router-link
            tag="core-tab"
            :to="{ hash: menu.id }"
            v-for="menu in subMenu"
            :key="menu.id"
          >{{ menu.title }}</router-link>
        </core-tabs>
      </core-box>
      <core-box class="markdown-body" my="xl" v-html="html"></core-box>
    </div>
  </SidebarLayout>
</template>

<script>
import marked from "marked";
import { patterns } from "../db.json";
import SidebarLayout from "../layouts/SidebarLayout";

export default {
  props: { showSidebar: Boolean, title: String },
  components: { SidebarLayout },
  mounted() {
    this.setSubMenu();
  },
  data() {
    return {
      subMenu: [],
      patterns,
    };
  },
  watch: {
    $route: function (val) {
      this.setSubMenu();
    },
    html: {
      handler: function (innerHTML) {
        setTimeout(() => {
          const div = document.createElement("div");
          div.innerHTML = innerHTML;
          const scripts = [...div.querySelectorAll("script")];
          scripts.forEach((script) => {
            var s = document.createElement("script");
            s.type = "text/javascript";
            var code = script.text;
            try {
              s.appendChild(document.createTextNode(code));
              document.body.appendChild(s);
            } catch (e) {
              s.text = code;
              document.body.appendChild(s);
            }
          });
        }, 500);
      },
      immediate: true,
    },
  },
  methods: {
    setSubMenu() {
      setTimeout(() => {
        const headings = [...document.querySelectorAll("h2")];
        this.subMenu = headings.map((h) => ({ id: h.id, title: h.innerText }));
      }, 0);
    },
    goTo(route) {
      this.subMenu = [];
      this.$emit("toggle-sidebar");
      this.$router.push(route);
    },
  },
  computed: {
    pattern() {
      return this.patterns.find((c) => c.name === this.$route.params.pattern);
    },
    html() {
      const innerHTML = marked(this.pattern.content);
      return innerHTML;
    },
    groupedPatterns() {
      return this.patterns.reduce(
        (acc, pattern) => {
          const catName = pattern.category || "Uncategorized";

          const prevPattern = acc[`${catName}`] ? acc[`${catName}`] : [];

          return {
            ...acc,
            [`${catName}`]: [...prevPattern, { ...pattern }],
          };
        },
        {
          Interaction: [],
          Layout: [],
          Form: [],
        }
      );
    },
  },
};
</script>

<style>
.component {
  scroll-behavior: smooth;
}

.content-list {
  padding: 0;
  margin: 0;
  list-style: none;
}

.content-list li {
  margin-bottom: var(--core-space-sm);
}

.content-list a {
  color: var(--core-color-font-weak);
  text-decoration: none;
}

.content-list a:hover {
  color: var(--core-color-font-strong);
}

@media (min-width: 800px) {
  .sticky-tabs {
    display: none;
  }
}

nav[toc] {
  font-size: 1em;
  padding-right: var(--core-space-lg);
}

@media (max-width: 800px) {
  nav[toc] {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
  }
}

nav[toc] a {
  color: var(--core-color-font-weak);
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  font-weight: 400;
  font-size: var(--core-font-size-xs);
  margin-right: 10px;
}

nav[toc] a:hover {
  color: var(--core-color-font-strong);
}

nav[toc] a.router-link-exact-active {
  color: var(--core-color-font-strong);
  transition: all 0.5s ease;
}

nav[toc] a:last-of-type {
  margin-bottom: 30px;
}

@media (min-width: 800px) {
  nav[toc] a {
    display: block;
  }

  nav[toc] a div {
    display: block;
  }
}

nav[toc] a[active="true"] {
  font-weight: 600;
}

main h1 {
  margin-top: 0;
  margin-bottom: 50px;
}

main h2 {
  margin-top: 80px;
}
</style>
