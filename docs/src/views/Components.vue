<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">
      <nav toc>
        <div v-for="(menuGroup, name) in groupedComponents" :key="name">
          <label>{{ name }}</label>
          <router-link
            v-on:click.native="$emit('toggle-sidebar')"
            :to="`/components/${page.name}`"
            v-for="(page, i) in menuGroup"
            :key="i"
          >{{ page.name }}</router-link>
        </div>
      </nav>
    </div>
    <main class="main">
      <router-view></router-view>
    </main>
  </SidebarLayout>
</template>

<script>
import SidebarLayout from "../layouts/SidebarLayout";
import marked from "marked";
import { components } from "../db.json";
import Header from "../components/Header";

export default {
  props: { showSidebar: Boolean },
  components: { SidebarLayout },
  data() {
    return {
      components
    };
  },
  computed: {
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
          Layout: [],
          Elements: [],
          Form: []
        }
      );
    }
  }
};
</script>

<style>
nav[toc] {
  font-size: 1em;
}

@media (max-width: 800px) {
  nav[toc] {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr;
  }
}

nav[toc] label {
  color: #a0aec0;
  text-transform: uppercase;
  font-size: 0.7em;
  display: block;
  margin-bottom: 10px;
}

nav[toc] a {
  color: #718096;
  margin-bottom: 10px;
  text-decoration: none;
  display: block;
  margin-right: 10px;
}

nav[toc] a.router-link-exact-active {
  color: #1a202c;
}

nav[toc] a:hover {
  color: #1a202c;
}

nav[toc] a:last-of-type {
  margin-bottom: 50px;
}

@media (min-width: 800px) {
  nav[toc] a {
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
