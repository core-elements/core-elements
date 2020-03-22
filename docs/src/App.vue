<template>
  <div>
    <div class="sidebar">
      <div v-for="(menuGroup, name) in db" :key="name">
        {{ name }}
        <ul>
          <li @click="active = page" v-for="(page, i) in menuGroup" :key="i">
            {{ page.name }}
          </li>
        </ul>
      </div>
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
      db
    };
  },
  methods: {
    html(content) {
      return marked(content);
    }
  }
};
</script>
