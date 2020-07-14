<template>
  <Page>
    <core-box margin-y="lg">
      <core-text tag="h1">Theme editor</core-text>
    </core-box>

    <core-box margin-y="lg">
      <core-range
        type="number"
        max="300"
        min="0"
        name="core-color-primary-hue"
        @change="(e) => setProperty(e.target.name, e.target.value)"
        :value="variables['core-color-primary-hue']"
      ></core-range>
      <core-input
        name="core-color-primary"
        @input="(e) => setProperty(e.target.name, e.target.value)"
        :value="variables['core-color-primary']"
      ></core-input>
    </core-box>

    <core-box margin-y="lg">
      <core-button variant="primary">Button</core-button>
    </core-box>
  </Page>
</template>

<script>
import Page from "../layouts/Page";

const root = document.documentElement;

function getProperty(name) {
  return getComputedStyle(root).getPropertyValue(`--${name}`);
}

export default {
  components: { Page },
  data() {
    return {
      variables: {
        "core-color-primary": getProperty("core-color-primary"),
        "core-color-primary-hue": getProperty("core-color-primary-hue"),
      },
    };
  },
  methods: {
    reCalculate() {
      Object.keys(this.variables).forEach((key) => {
        this.variables[key] = getProperty(key);
      });
    },
    setProperty(name, value) {
      console.log({ name, value });
      root.style.setProperty(`--${name}`, value);
      this.variables[name] = value;
      this.reCalculate();
    },
  },
};
</script>
