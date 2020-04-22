<template>
  <div>
    <Header @route-menu-click="showSidebar = !showSidebar"></Header>
    <div class="page">
      <div class="page__inner">
        <div class="sidebar" :class="{show: showSidebar}">
          <nav toc>
            <div v-for="(menuGroup, name) in groupedComponents" :key="name">
              <label>{{ name }}</label>
              <a @click="active = page" v-for="(page, i) in menuGroup" :key="i">
                {{
                page.name
                }}
              </a>
            </div>
          </nav>
        </div>
        <main class="main" v-if="active">
          <div v-html="html(active.content)"></div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import marked from "marked";
import { components } from "./db.json";
import Header from "./components/Header";

export default {
  components: { Header },
  data() {
    return {
      active: "",
      showSidebar: false,
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
  },
  methods: {
    html(content) {
      return marked(content);
    }
  }
};
</script>

<style>
html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
}

body {
  padding: 0;
  margin: 0;
}

.page {
  width: 100%;
  padding: 30px;
}

.page__inner {
  padding-top: 30px;
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.page__menu-button {
  display: block;
}

@media (min-width: 800px) {
  .page__menu-button {
    display: none;
  }
}

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

nav[toc] {
  font-size: 1em;
}

@media (max-width: 800px) {
  nav[toc] {
    padding-top: 40px;
    display: grid;
    grid-template-columns: 1fr 1fr;
  }
}

nav[toc] label {
  text-transform: uppercase;
  font-size: 0.7em;
  display: block;
  margin-bottom: 10px;
}

nav[toc] a {
  margin-bottom: 10px;
  color: currentColor;
  text-decoration: none;
  display: block;
  margin-right: 10px;
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
