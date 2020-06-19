<template>
  <div>
    <Page class="landing">
      <core-container style="text-align: center" center size="sm">
        <core-box margin-y="lg">
          <core-text tag="h1" weight="400">Everything you wish HTML elements could do</core-text>
        </core-box>
      </core-container>
      <core-container style="text-align: center" full center size="xs">
        <core-box margin-t="lg" margin-b="xl">
          <core-text tag="p" look="lead">
            Completely customizable HTML elements that work in
            <b>React</b>,
            <b>Vue</b>,
            <b>Angular</b>, or any other framwork.
          </core-text>
        </core-box>
      </core-container>
      <core-container style="text-align: center" center size="xs">
        <core-box margin-y="lg">
          <router-link tag="core-button" to="/getting-started" type="primary">Get Started</router-link>
          <router-link tag="core-button" to="/components" type="secondary">Components</router-link>
        </core-box>
        <core-box margin-y="lg">
          <core-tabs @change="(e) => (installMethod = e.target.value)" :value="installMethod">
            <core-tab>NPM</core-tab>
            <core-tab>CDN</core-tab>
          </core-tabs>
        </core-box>
        <core-box>
          <pre v-if="installMethod === 'NPM'"><code align="center" class="hljs">npm install --save core-elements</code></pre>
          <pre v-if="installMethod === 'CDN'">
              <code align="center" class="hljs"><!----><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/core-elements"</span>&gt;</span><span
  class="hljs-tag"
>&lt;/<span class="hljs-name">script</span>&gt;</span>
<!----></code></pre>
        </core-box>
      </core-container>

      <core-container size="sm" center>
        <core-box margin-t="xl" padding-t="xl" margin-b="xl">
          <core-text
            weight="400"
            style="text-align: center"
            tag="h2"
          >Ever wanted to style the select element?</core-text>
        </core-box>
        <core-container center size="xs">
          <core-box margin-b="lg">
            <core-tabs
              :value="activeSelectExample"
              @change="e => activeSelectExample = e.target.value"
            >
              <core-tab value="basicSelect">Basic</core-tab>
              <core-tab value="roundedSelect">Rounded</core-tab>
            </core-tabs>
          </core-box>
          <core-box>
            <core-knobs hideTabs v-html="html" element="core-select"></core-knobs>
          </core-box>
        </core-container>
      </core-container>
    </Page>
  </div>
</template>

<script>
import Page from "../layouts/Page";

export default {
  components: { Page },
  mounted() {
    this.darkMode = document.body.hasAttribute("mode");
  },
  data() {
    return {
      activeSelectExample: "basicSelect",
      darkMode: false,
      installMethod: "NPM",
      modalOpen: false
    };
  },
  computed: {
    html() {
      return this[this.activeSelectExample];
    },
    roundedSelect() {
      return `
  <style>
    core-select {
      border-radius: 30px;
    }
    core-select::part(list) {
      border-radius: 10px;
      box-shadow: 1px 10px 10px 0px rgba(0,0,0,0.2);
      top: calc(100% + 30px);
      transition: all 0.2s ease;
      transform: translateY(50px);
      opacity: 0;
    }
    core-select[list-open]::part(list) {
      transform: translateY(0px);
      opacity: 1;
    }
    core-option[selected]::before {
      content: "✓";
      padding-right: 10px;
    }
  </style>
  <core-select full>
    <core-option value="1" selected>Option</core-option>
    <core-option value="2">Option</core-option>
  </core-select>
      `;
    },
    basicSelect() {
      return `
  <core-select full>
    <core-option value="1" selected>Option</core-option>
    <core-option value="2">Option</core-option>
  </core-select>
      `;
    }
  },
  watch: {
    darkMode: val => {
      if (val) document.body.setAttribute("mode", "dark");
      else document.body.removeAttribute("mode");
    }
  }
};
</script>

<style>
.landing {
  padding-top: 60px;
}
</style>
