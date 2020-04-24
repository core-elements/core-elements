<template>
  <Page class="landing">
    <base-grid columns="8" gap="xl" gap-sm="md">
      <base-grid-item sm="8" md="3">
        <base-text tag="h1" weight="400">
          <b>Base Elements</b> is a free collection of essential UI components
          for any web application
        </base-text>
        <base-text tag="p" look="lead">
          Components that work in
          <b>React</b>,
          <b>Vue</b>,
          <b>Angular</b>, or any other framwork.
        </base-text>
        <base-box margin-y="md">
          <router-link tag="base-button" to="/installation" type="primary">Get Started</router-link>
          <router-link tag="base-button" to="/components" type="secondary">Components</router-link>
        </base-box>
        <base-box margin-y="md">
          <base-tabs @change="e => installMethod = e.target.value" :value="installMethod">
            <base-tab>NPM</base-tab>
            <base-tab>CDN</base-tab>
          </base-tabs>
          <pre v-if="installMethod === 'NPM'"><code align="center" class="hljs">npm install --save base-elements</code></pre>
          <pre v-if="installMethod === 'CDN'"><code align="center" class="hljs">https://unpkg.com/base-elements</code></pre>
        </base-box>
      </base-grid-item>

      <base-grid-item sm="8" md="5">
        <base-box depth="md" padding-y="lg" padding-x="lg">
          <base-text tag="h2">Examples</base-text>
          <base-grid columns="2">
            <base-grid-item sm="2" md="1">
              <base-select placeholder="Select an option">
                <base-option label="Option 1"></base-option>
                <base-option label="Option 2"></base-option>
              </base-select>
            </base-grid-item>
            <base-grid-item sm="2" md="1">
              <base-checkbox>Option 1</base-checkbox>
              <base-checkbox>Option 2</base-checkbox>
            </base-grid-item>
            <base-grid-item sm="2" md="1">
              <base-input full placeholder="Regular input"></base-input>
            </base-grid-item>
            <base-grid-item sm="2" md="1">
              <base-radio name="radio">Option 1</base-radio>
              <base-radio name="radio">Option 2</base-radio>
            </base-grid-item>
            <base-grid-item sm="2" md="1">
              <base-select multiple placeholder="Multiple select">
                <base-option selected label="Option 1"></base-option>
                <base-option label="Option 2"></base-option>
              </base-select>
            </base-grid-item>
            <base-grid-item sm="2" md="1">
              <base-modal @toggle="(e) => (modalOpen = e.open)" :open="modalOpen">
                <header slot="header">Title</header>
                <div>Content</div>
              </base-modal>
              <base-button type="primary" @click="modalOpen = true">Show modal</base-button>
              <base-toggle>Toggle</base-toggle>
            </base-grid-item>
            <base-grid-item sm="2" md="1">
              <base-tabs>
                <base-tab selected>Tab 1</base-tab>
                <base-tab>Tab 2</base-tab>
              </base-tabs>
            </base-grid-item>
          </base-grid>
        </base-box>
      </base-grid-item>
    </base-grid>
  </Page>
</template>

<script>
import Page from "../layouts/Page";

export default {
  components: { Page },
  data() {
    return {
      installMethod: "NPM",
      modalOpen: false
    };
  }
};
</script>

<style>
b {
  color: #333;
}
</style>
