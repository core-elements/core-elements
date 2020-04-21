<template>
  <div>
    <Header></Header>
    <div class="page">
      <div class="sidebar">
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
body {
  padding: 0;
  margin: 0;
}

.page {
  display: flex;
  flex-wrap: wrap;
  max-width: 1100px;
  width: 100%;
  margin: 0 auto;
}

.sidebar {
  width: 100%;
  position: initial;
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
    width: 22%;
    height: max-content;
    position: sticky;
    top: 0;
  }

  .main {
    width: 78%;
  }
}

nav[toc] {
  font-size: 18px;
}

nav[toc] label {
  margin-top: 50px;
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

@media (min-width: 800px) {
  nav[toc] a {
    display: block;
  }
}

nav[toc] a[active="true"] {
  font-weight: 600;
}

main h1 {
  margin-bottom: 50px;
}

main h2 {
  margin-top: 80px;
}
</style>
