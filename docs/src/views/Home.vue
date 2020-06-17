<template>
  <div>
    <Page class="landing">
      <core-grid columns="12" gap-xl="xl" gap-sm="md">
        <core-grid-item sm="12" md="9" lg="6">
          <core-text tag="h1" weight="400">
            <b>Core Elements</b> is a free collection of essential UI components
            for any web application
          </core-text>
          <core-text tag="p" look="lead">
            Components that work in
            <b>React</b>,
            <b>Vue</b>,
            <b>Angular</b>, or any other framwork.
          </core-text>
          <core-box margin-y="lg">
            <router-link tag="core-button" to="/getting-started" type="primary">Get Started</router-link>
            <router-link tag="core-button" to="/components" type="secondary">Components</router-link>
          </core-box>
          <core-box margin-y="lg">
            <core-tabs
              @change="(e) => (installMethod = e.target.value)"
              :value="installMethod"
            >
              <core-tab>NPM</core-tab>
              <core-tab>CDN</core-tab>
            </core-tabs>
          </core-box>
          <core-box>
      <pre
              v-if="installMethod === 'NPM'"
            ><code align="center" class="hljs">npm install --save core-elements</code></pre>
            <pre v-if="installMethod === 'CDN'">
              <code align="center" class="hljs"><!----><span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">"https://unpkg.com/core-elements"</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
<!----></code></pre>
        </core-box>

        </core-grid-item>

        <core-grid-item sm="12" md="12" lg="6">
          <core-box depth="md" padding-y="lg" padding-x="lg">
            <core-box margin-b="lg">
            <core-text tag="h2" weight="500">Examples</core-text>
            </core-box>
            <core-grid columns="2">
              <core-grid-item sm="2" md="1">
                <core-select placeholder="Select an option">
                  <core-option label="Option 1"></core-option>
                  <core-option label="Option 2"></core-option>
                </core-select>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-checkbox>Option 1</core-checkbox>
                <core-checkbox>Option 2</core-checkbox>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-input placeholder="Regular input"></core-input>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-radio name="radio">Option 1</core-radio>
                <core-radio name="radio">Option 2</core-radio>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-select multiple placeholder="Multiple select">
                  <core-option selected label="Option 1"></core-option>
                  <core-option label="Option 2"></core-option>
                </core-select>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-toggle
                  :checked="darkMode"
                  @change="e => darkMode = e.target.checked"
                >Dark mode</core-toggle>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-tabs>
                  <core-tab selected>Tab 1</core-tab>
                  <core-tab>Tab 2</core-tab>
                  <core-tab>Tab 3</core-tab>
                </core-tabs>
              </core-grid-item>
              <core-grid-item sm="2" md="1">
                <core-modal @toggle="(e) => (modalOpen = e.target.open)" :open="modalOpen">
                  <div slot="header-middle">Title</div>
                  <div>Content</div>
                </core-modal>

                <core-button type="primary" @click="modalOpen = true">Show modal</core-button>
              </core-grid-item>
            </core-grid>
          </core-box>
        </core-grid-item>
      </core-grid>

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
      darkMode: false,
      installMethod: "NPM",
      modalOpen: false
    };
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
