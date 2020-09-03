<style>
input[type="color"] {
  display: inline-block;
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
.tooltip {
  min-width: 150px;
  max-width: 250px;
  text-align: center;
  border-radius: var(--core-border-radius-default);
  background: var(--core-color-ui-weak);
  color: var(--core-color-black);
  padding: var(--core-space-sm);
}

.tooltip::before {
  position: absolute;
  content: "";
  display: block;
  bottom: calc(var(--core-space-xxs) * -1);
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 0;
  z-index: 999;
  border-style: solid;
  border-width: var(--core-space-xxs) var(--core-space-xxs) 0
    var(--core-space-xxs);
  border-color: var(--core-color-ui-weak) transparent transparent transparent;
}
</style>

<template>
  <SidebarLayout showSidebar>
    <div slot="sidebar">
      <core-box margin-y="sm">
        <core-accordion mode="single" :key="i" v-for="(group, i) in variables">
          <core-accordion-item size="lg" :heading="group.label">
            <!-- Colors -->
            <core-box v-if="group.type === 'color'" padding-x="md" padding-b="md">
              <core-box margin-b="sm" :key="index" v-for="(child, index) in group.children">
                <core-text size="xs">{{child.label}}</core-text>
                <core-flex align-items="center" gap="sm">
                  <input
                    type="color"
                    @input="(e) => setProperty(group.label, child.variable, e.target.value)"
                    :value="child.value"
                  />
                  <core-input
                    size="sm"
                    :value="child.value"
                    @input="e => setProperty(group.label, child.variable, e.target.value)"
                  ></core-input>
                </core-flex>
              </core-box>
            </core-box>
            <!-- Pixels -->
            <core-box v-if="group.type === 'pixels'" padding-x="md" padding-b="md">
              <core-box margin-b="sm" :key="index" v-for="(child, index) in group.children">
                <core-text size="xs">{{child.label}}</core-text>
                <core-flex align-items="center" gap="sm">
                  <core-input
                    size="sm"
                    :value="child.value"
                    @input="e => setProperty(group.label, child.variable, e.target.value)"
                  ></core-input>
                </core-flex>
              </core-box>
            </core-box>
          </core-accordion-item>
        </core-accordion>
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
        <core-button size="sm">Small</core-button>
        <core-button size="md">Medium</core-button>
        <core-button size="lg">Large</core-button>
      </core-box>
      <core-box margin-y="lg">
        <core-checkbox>Checkbox</core-checkbox>
        <core-radio>Radio button</core-radio>
        <core-toggle>Toggle</core-toggle>
        <core-range step="10" value="50"></core-range>
        <core-tabs>
          <core-tab selected>Tab 1</core-tab>
          <core-tab>Tab 2</core-tab>
          <core-tab>Tab 3</core-tab>
        </core-tabs>
        <core-input placeholder="Placeholder"></core-input>
        <core-select>
          <core-option selected value="1">Option 1</core-option>
          <core-option value="2">Option 2</core-option>
          <core-option value="3">Option 3</core-option>
        </core-select>
      </core-box>
      <core-box margin-y="lg">
        <core-accordion>
          <core-accordion-item heading="Accordion 1"></core-accordion-item>
          <core-accordion-item heading="Accordion 1"></core-accordion-item>
        </core-accordion>
        <core-menu>
          <core-menu-item>Menu 1</core-menu-item>
          <core-menu-item>Menu 2</core-menu-item>
        </core-menu>
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
      variables: [
        {
          type: "color",
          label: "Primary",
          children: [
            {
              variable: "core-color-primary",
              value: new TinyColor(
                getProperty("core-color-primary")
              ).toHexString(),
              label: "Main",
            },
            {
              variable: "core-color-primary-hover",
              value: new TinyColor(
                getProperty("core-color-primary-hover")
              ).toHexString(),
              label: "Hover",
            },
            {
              variable: "core-color-primary-contrast",
              value: new TinyColor(
                getProperty("core-color-primary-contrast")
              ).toHexString(),

              label: "Contrast",
            },
          ],
        },
        {
          type: "color",
          label: "Success",
          children: [
            {
              variable: "core-color-success",
              value: new TinyColor(
                getProperty("core-color-success")
              ).toHexString(),
              label: "Main",
            },
            {
              variable: "core-color-success-hover",
              value: new TinyColor(
                getProperty("core-color-success-hover")
              ).toHexString(),
              label: "Hover",
            },
            {
              variable: "core-color-success-contrast",
              value: new TinyColor(
                getProperty("core-color-success-contrast")
              ).toHexString(),

              label: "Contrast",
            },
          ],
        },
        {
          type: "color",
          label: "Danger",
          children: [
            {
              variable: "core-color-danger",
              value: new TinyColor(
                getProperty("core-color-danger")
              ).toHexString(),
              label: "Main",
            },
            {
              variable: "core-color-danger-hover",
              value: new TinyColor(
                getProperty("core-color-danger-hover")
              ).toHexString(),
              label: "Hover",
            },
            {
              variable: "core-color-danger-contrast",
              value: new TinyColor(
                getProperty("core-color-danger-contrast")
              ).toHexString(),

              label: "Contrast",
            },
          ],
        },
        {
          type: "color",
          label: "Warning",
          children: [
            {
              variable: "core-color-warning",
              value: new TinyColor(
                getProperty("core-color-warning")
              ).toHexString(),
              label: "Main",
            },
            {
              variable: "core-color-warning-hover",
              value: new TinyColor(
                getProperty("core-color-warning-hover")
              ).toHexString(),
              label: "Hover",
            },
            {
              variable: "core-color-warning-contrast",
              value: new TinyColor(
                getProperty("core-color-warning-contrast")
              ).toHexString(),

              label: "Contrast",
            },
          ],
        },
        {
          type: "color",
          label: "Ui",
          children: [
            {
              variable: "core-color-ui",
              value: new TinyColor(getProperty("core-color-ui")).toHexString(),
              label: "Main",
            },
            {
              variable: "core-color-ui-weak",
              value: new TinyColor(
                getProperty("core-color-ui-weak")
              ).toHexString(),
              label: "Weak",
            },
            {
              variable: "core-color-ui-strong",
              value: new TinyColor(
                getProperty("core-color-ui-strong")
              ).toHexString(),

              label: "Strong",
            },
          ],
        },
        {
          type: "color",
          label: "Font",
          children: [
            {
              variable: "core-color-font",
              value: new TinyColor(
                getProperty("core-color-font")
              ).toHexString(),
              label: "Default",
            },
            {
              variable: "core-color-font-weak",
              value: new TinyColor(
                getProperty("core-color-font-weak")
              ).toHexString(),
              label: "Weak",
            },
            {
              variable: "core-color-font-strong",
              value: new TinyColor(
                getProperty("core-color-font-strong")
              ).toHexString(),

              label: "Strong",
            },
            {
              variable: "core-color-font-heading",
              value: new TinyColor(
                getProperty("core-color-font-heading")
              ).toHexString(),

              label: "Heading",
            },
          ],
        },
        {
          type: "color",
          label: "Focus",
          children: [
            {
              variable: "core-color-focus",
              value: new TinyColor(
                getProperty("core-color-focus")
              ).toHexString(),
              label: "FOcus",
            },
          ],
        },
        {
          type: "pixels",
          label: "Element height",
          children: [
            {
              variable: "core-element-height-default",
              value: getProperty("core-element-height-default"),
              label: "Default",
            },
            {
              variable: "core-element-height-sm",
              value: getProperty("core-element-height-sm"),
              label: "Small",
            },
            {
              variable: "core-element-height-md",
              value: getProperty("core-element-height-md"),
              label: "Medium",
            },
          ],
        },
      ],
    };
  },
  methods: {
    setProperty(label, name, value) {
      console.log({ name, value });
      console.log(root.hasAttribute("mode"));
      root.style.setProperty(`--${name}`, value);
      this.variables = this.variables.map((v) => {
        if (v.label === label) {
          const newChildren = v.children.map((child) =>
            child.variable === name ? { ...child, value } : child
          );
          return { ...v, children: newChildren };
        } else return v;
      });
    },
  },
};
</script>
