<template>
  <Page>
    <div class="markdown-body" v-html="gettingstarted()"></div>
  </Page>
</template>

<script>
import hljs from "highlight.js";
import marked from "marked";
import gettingstarted from "../markdown/getting-started.md";
import Page from "../layouts/Page";

function removeWhiteSpace(string) {
  return string
    .replace(/\n/g, "")
    .replace(/[\t ]+\</g, "<")
    .replace(/\>[\t ]+\</g, "><")
    .replace(/\>[\t ]+$/g, ">");
}

marked.setOptions({
  highlight: function(code, lang) {
    console.log("highlighting");
    return `<div class="halla">${hljs.highlight(lang, code).value}</div>`;
  },
});

export default {
  components: { Page },
  methods: {
    gettingstarted() {
      return marked(gettingstarted);
    },
  },
};
</script>

<style>
@import url("https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css");
</style>
