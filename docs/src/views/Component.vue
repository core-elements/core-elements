<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">
      <nav toc>
        <core-accordion
          :title="name"
          class="menu-group"
          v-for="(menuGroup, name) in groupedComponents"
          :key="name"
        >
          <label slot="title">{{ name }}</label>
          <router-link
            @click.native="$emit('toggle-sidebar')"
            :to="`/components/${page.name}`"
            v-for="(page, i) in menuGroup"
            :key="i"
          >{{ page.name }}</router-link>
        </core-accordion>
      </nav>
    </div>

    <div class="component">
      <core-text tag="h1">{{ component.name }}</core-text>
      <core-text tag="p" look="lead">{{ component.desc }}</core-text>

      <core-box padding-y="sm" v-if="subMenu.length">
        <core-box margin-y="md">
          <core-text tag="p" look="h6">Content</core-text>
        </core-box>
        <ul class="content-list">
          <li v-for="menu in subMenu" :key="menu.id">
            <router-link :to="{ hash: menu.id }">{{ menu.title }}</router-link>
          </li>
        </ul>
      </core-box>
      <core-box class="markdown-body" margin-y="xl" v-html="html"></core-box>
    </div>
  </SidebarLayout>
</template>

<script>
import marked from "marked";
import { components } from "../db.json";
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
      components
    };
  },
  watch: {
    $route: function(val) {
      this.setSubMenu();
    }
  },
  methods: {
    setSubMenu() {
      setTimeout(() => {
        const headings = [...document.querySelectorAll("h2")];
        this.subMenu = headings.map(h => ({ id: h.id, title: h.innerText }));
      }, 0);
    },
    goTo(route) {
      this.subMenu = [];
      this.$emit("toggle-sidebar");
      this.$router.push(route);
    }
  },
  computed: {
    component() {
      return components.find(c => c.name === this.$route.params.element);
    },
    html() {
      return marked(this.component.content);
    },
    groupedComponents() {
      return this.components.reduce(
        (acc, comp) => {
          const catName = comp.category || "Uncategorized";

          const prevComps = acc[`${catName}`] ? acc[`${catName}`] : [];

          return {
            ...acc,
            [`${catName}`]: [...prevComps, { ...comp }]
          };
        },
        {
          Interaction: [],
          Layout: [],
          Form: []
        }
      );
    }
  }
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
  color: var(--core-color-font-light);
  text-decoration: none;
}

.content-list a:hover {
  color: var(--core-color-font-dark);
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

nav[toc] label {
  color: var(--core-color-font-light);
  text-transform: uppercase;
  font-size: 0.7em;
  display: block;
  margin-bottom: 10px;
}

nav[toc] a {
  color: var(--core-color-font);
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  margin-right: 10px;
}

nav[toc] a.router-link-exact-active {
  color: var(--core-color-font-dark);
  transition: all 0.5s ease;
}

nav[toc] a:hover {
  color: var(--core-color-font-dark);
}

nav[toc] a:last-of-type {
  margin-bottom: 30px;
}

nav[toc] a .menu-group {
  margin-top: 20px;
  margin-left: 10px;
  display: none;
}

nav[toc] a a {
  font-size: 1rem;
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
