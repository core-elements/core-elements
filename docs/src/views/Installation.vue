<template>
  <Page>
    <div class="markdown-body" v-html="installation()"></div>
  </Page>
</template>

<script>
import hljs from "highlight.js";
import marked from "marked";
import installation from "../markdown/installation.md";
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
    installation() {
      return marked(installation);
    },
  },
};
</script>
