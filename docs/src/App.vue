<template>
  <div class="page">
    <div class="sidebar">
      <nav toc>
        <div v-for="(menuGroup, name) in db" :key="name">
          <label>{{ name }}</label>
          <a @click="active = page" v-for="(page, i) in menuGroup" :key="i">
            {{ page.name }}
          </a>
        </div>
      </nav>
    </div>
    <main v-if="active">
      <div v-html="html(active.content)"></div>
    </main>
  </div>
</template>

<script>
import marked from "marked";
import db from "./db.json";

export default {
  data() {
    return {
      active: "",
      db,
    };
  },
  methods: {
    html(content) {
      return marked(content);
    },
  },
};
</script>

<style>
.page {
  padding-top: 100px;
  display: grid;
  grid-template-columns: 25% 80%;
  grid-gap: 1rem;
  max-width: 1000px;
  width: 100%;
  margin: 0 auto;
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
}

nav[toc] a[active="true"] {
  font-weight: 600;
}
</style>
