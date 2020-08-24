<style>
core-input {
  width: 150px;
  max-width: 150px;
  min-width: 150px;
}

input[type="color"] {
  border: 0;
  border-radius: var(--core-border-radius-default);
  width: var(--core-element-height-sm);
  height: var(--core-element-height-sm);
  padding: 0;
  outline: 0;
  cursor: pointer;
}
input[type="color"]::-webkit-color-swatch-wrapper {
  padding: 0;
  border: 0;
}
input[type="color"]::-webkit-color-swatch {
  box-shadow: var(--core-depth-sm);
  border-radius: var(--core-border-radius-default);
}
</style>

<template>
  <SidebarLayout showSidebar>
    <div slot="sidebar">
      <core-box margin-y="sm" :key="name" v-for="(variable, name) in variables">
        <core-text size="xs">{{ variable.label }}</core-text>
        <core-box margin-t="sm" v-if="variable.type === 'hue'">
          <core-range
            min="0"
            step="50"
            max="360"
            :style="`--core-range-track-color: var(--${variable.represent})`"
            @change="(e) => setProperty(name, e.target.value)"
            :value="variable.value"
          ></core-range>
        </core-box>
        <core-box margin-t="sm" v-if="variable.type === 'color'">
          <core-flex gap="sm">
            <input
              type="color"
              @input="(e) => setProperty(name, e.target.value)"
              :value="variable.value"
            />
            <core-input
              size="sm"
              @change="(e) => setProperty(name, e.target.value)"
              :value="variable.value"
            ></core-input>
          </core-flex>
        </core-box>
      </core-box>
    </div>

    <main>
      <core-box margin-y="lg">
        <core-text tag="h1">Theme editor</core-text>
      </core-box>
      <core-box margin-y="lg">
        <core-button>Normal</core-button>
        <core-button variant="primary">Primary</core-button>
        <core-button variant="success">Success</core-button>
        <core-button variant="warning">Warning</core-button>
        <core-button variant="danger">Danger</core-button>
        <core-button variant="transparent">Transparent</core-button>
      </core-box>
      <core-box margin-y="lg">
        <core-checkbox>Checkbox</core-checkbox>
        <core-radio>Radio button</core-radio>
      </core-box>
    </main>
  </SidebarLayout>
</template>

<script>
import { TinyColor } from "@ctrl/tinycolor";
import SidebarLayout from "../layouts/SidebarLayout";

const root = document.documentElement;

function getProperty(name) {
  return getComputedStyle(root).getPropertyValue(`--${name}`);
}

export default {
  components: { SidebarLayout },
  data() {
    return {
      variables: {
        "core-color-primary": {
          value: new TinyColor(getProperty("core-color-primary")).toHexString(),
          type: "color",
          label: "Primary color",
        },
        "core-color-primary-hover": {
          value: new TinyColor(
            getProperty("core-color-primary-hover")
          ).toHexString(),
          type: "color",
          label: "Primary hover color",
        },
        "core-color-primary-contrast": {
          value: new TinyColor(
            getProperty("core-color-primary-contrast")
          ).toHexString(),
          type: "color",
          label: "Primary contrast color",
        },
      },
    };
  },
  methods: {
    reCalculate() {
      Object.keys(this.variables).forEach((key) => {
        this.variables[key].value = getProperty(key);
      });
    },
    setProperty(name, value) {
      console.log({ name, value });
      root.style.setProperty(`--${name}`, value);
      this.variables[name].value = value;
      this.reCalculate();
    },
  },
};
</script>
