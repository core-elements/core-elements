<template>
  <Page class="landing">
    <base-grid columns="8" gap="xl">
      <base-grid-item sm="8" md="3">
        <base-text tag="h1" weight="400">
          <b>Base Elements</b> is a free collection of essential UI components for
          any web application
        </base-text>
        <base-text tag="p" class="lead">
          Components that work in
          <b>React</b>,
          <b>Vue</b>,
          <b>Angular</b>, or any other framwork.
        </base-text>
        <base-box padding-y="md">
          <router-link tag="base-button" to="/installation" type="primary">Get Started</router-link>
          <router-link
            tag="base-button"
            to="/components/Container"
            type="primary"
            outline
          >Components</router-link>
        </base-box>
      </base-grid-item>

      <base-grid-item sm="8" md="5">
        <base-box depth="md" padding-y="lg" padding-x="lg">
          <base-text tag="h2">Examples</base-text>
          <base-grid columns="2">
            <base-grid-item sm="1">
              <base-select placeholder="Select an option">
                <base-option label="Option 1"></base-option>
                <base-option label="Option 2"></base-option>
              </base-select>
            </base-grid-item>
            <base-grid-item sm="1">
              <base-checkbox size="sm">Option 1</base-checkbox>
              <base-checkbox size="sm">Option 2</base-checkbox>
            </base-grid-item>
            <base-grid-item>
              <base-input placeholder="Regular input"></base-input>
            </base-grid-item>
            <base-grid-item sm="1">
              <base-radio size="sm" name="radio">Option 1</base-radio>
              <base-radio size="sm" name="radio">Option 2</base-radio>
              <base-radio size="sm" name="radio">Option 3</base-radio>
            </base-grid-item>
            <base-grid-item sm="1">
              <base-select multiple placeholder="Multiple select">
                <base-option label="Option 1"></base-option>
                <base-option label="Option 2"></base-option>
              </base-select>
            </base-grid-item>
            <base-grid-item sm="1">
              <base-modal @toggle="e => modalOpen = e.open" :open="modalOpen">
                <header slot="header">Title</header>
                <div>Content</div>
              </base-modal>
              <base-button size="sm" type="primary" @click="modalOpen = true">Show modal</base-button>
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
      modalOpen: false
    };
  }
};
</script>

<style>
.landing h1 {
  font-weight: 300;
  font-size: 3rem;
}

.landing .lead {
  font-size: 1.4rem;
  line-height: 32px;
  font-weight: 300;
  color: #3c4b62;
}

.content {
  max-width: 700px;
}
</style>
