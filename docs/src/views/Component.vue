<template>
  <SidebarLayout :showSidebar="showSidebar">
    <div slot="sidebar">
      <nav toc>
        <a @click.prevent="() => goTo('/components')">Overview</a>
        <div v-for="(menuGroup, name) in groupedComponents" :key="name">
          <label>{{ name }}</label>
          <router-link
            @click.native="$emit('toggle-sidebar')"
            :to="`/components/${page.name}`"
            v-for="(page, i) in menuGroup"
            :key="i"
          >
            {{ page.name }}
            <div v-if="subMenu.length && $router.currentRoute.params.element === page.name">
              <router-link
                :to="{ hash: menu.id }"
                v-for="menu in subMenu"
                :key="menu.id"
              >{{ menu.title }}</router-link>
            </div>
          </router-link>
        </div>
      </nav>
    </div>
    <main class="main">
      <base-text tag="h1">{{ component.name }}</base-text>
      <base-text tag="p" look="lead">{{ component.desc }}</base-text>
      <base-box margin-y="xl" v-html="html"></base-box>
    </main>
  </SidebarLayout>
</template>

<script>
import marked from "marked";
import { components } from "../db.json";
import SidebarLayout from "../layouts/SidebarLayout";

export default {
  props: { showSidebar: Boolean },
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
  transition: all 0.5s ease;
}

nav[toc] a:hover {
  color: #1a202c;
}

nav[toc] a:last-of-type {
  margin-bottom: 50px;
}

nav[toc] a div {
  margin-top: 20px;
  margin-left: 10px;
}

nav[toc] a a {
  font-size: 1rem;
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
