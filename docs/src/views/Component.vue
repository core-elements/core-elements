<template>
  <div v-html="html"></div>
</template>

<script>
import marked from "marked";
import { components } from "../db.json";

export default {
  computed: {
    component() {
      return components.find((c) => c.name === this.$route.params.element);
    },
    html() {
      return marked(this.component.content);
    },
  },
};
</script>
