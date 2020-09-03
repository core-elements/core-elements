<template>
  <div>
    <Page class="landing">
      <core-container style="text-align: center" center size="md">
        <core-box margin-y="lg">
          <core-text tag="h1" weight="500">Everything you wish HTML elements could do</core-text>
        </core-box>
      </core-container>
      <core-container style="text-align: center" full center size="xs">
        <core-box margin-t="lg" margin-b="xl">
          <core-text tag="p" look="lead">
            Completely customizable components that work in
            <b>React</b>,
            <b>Vue</b>,
            <b>Angular</b>, or any other framwork.
          </core-text>
        </core-box>
      </core-container>
      <core-container style="text-align: center" center size="xs">
        <core-box margin-y="lg">
          <router-link
            tag="core-button"
            to="/documentation/introduction"
            variant="primary"
          >Get Started</router-link>
          <router-link tag="core-button" to="/components">Components</router-link>
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

      <core-container center size="md">
        <core-box margin-t="xl" padding-t="xl" margin-b="xl">
          <core-text style="text-align: center" tag="h2">Features</core-text>
        </core-box>

        <core-grid columns="1" columns-md="3">
          <core-grid-item sm="1" md="1">
            <core-box class="feature-box" padding="md">
              <ion-icon
                style="font-size: 2.5rem; color: var(--core-color-font-strong); margin-bottom: 20px;"
                name="rocket-outline"
              ></ion-icon>
              <core-text tag="h3">Lightweight & performant</core-text>
              <ul class="check-list">
                <li>Tree-shakeable</li>
                <li>No dependencies</li>
                <li>Average on 10kb per element</li>
                <li>Total package on 200kb</li>
              </ul>
            </core-box>
          </core-grid-item>
          <core-grid-item sm="1" md="1">
            <core-box class="feature-box" padding="md">
              <ion-icon
                style="font-size: 2.5rem; color: var(--core-color-font-strong); margin-bottom: 20px;"
                name="color-fill-outline"
              ></ion-icon>
              <core-text tag="h3">Themeable</core-text>
              <ul class="check-list">
                <li>Optional global theming</li>
                <li>Total control on each element</li>
                <li>Support for dark mode</li>
                <li>Style with normal CSS</li>
              </ul>
            </core-box>
          </core-grid-item>
          <core-grid-item sm="1" md="1">
            <core-box class="feature-box" padding="md">
              <ion-icon
                style="font-size: 2.5rem; color: var(--core-color-font-strong); margin-bottom: 20px;"
                name="logo-html5"
              ></ion-icon>
              <core-text tag="h3">HTML Standard</core-text>
              <ul class="check-list">
                <li>Supports any framework</li>
                <li>A11y compliant</li>
                <li>Built with modern web standards</li>
              </ul>
            </core-box>
          </core-grid-item>
        </core-grid>
      </core-container>

      <core-container size="sm" center>
        <core-box style="text-align: center" margin-t="xl" padding-t="xl" margin-b="xl">
          <core-text weight="500" tag="h2">Finally total control over the select element</core-text>

          <core-text tag="p">
            Core Elements is a collection of the HTML elements you wished
            existed. They provide functionality way beyond your normal HTML
            tags, and all aspects of them are stylable with normal CSS.
          </core-text>
        </core-box>
        <core-container center size="xs">
          <core-box margin-b="lg">
            <core-tabs
              full
              :value="activeSelectExample"
              @change="(e) => (activeSelectExample = e.target.value)"
            >
              <core-tab value="basicSelect">Basic</core-tab>
              <core-tab value="animatedSelect">Animated</core-tab>
              <core-tab value="checkMarkSelect">Checkmark</core-tab>
              <core-tab value="searchableSelect">Searchable</core-tab>
              <core-tab value="comboSelect">Multiple</core-tab>
              <core-tab value="roundedSelect">Rounded</core-tab>
              <core-tab value="mobileSelect">Mobile</core-tab>
              <core-tab value="cssVariables">CSS Variables</core-tab>
            </core-tabs>
          </core-box>
          <core-box>
            <core-knobs ref="knob" hideTabs v-html="html" element="core-select"></core-knobs>
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
  data() {
    return {
      activeSelectExample: "basicSelect",
      installMethod: "NPM",
      modalOpen: false,
    };
  },
  computed: {
    html() {
      return this[this.activeSelectExample];
    },
    animatedSelect() {
      return `
  <style>
    core-select {
      perspective: 1000px;
    }
    core-select::part(list) {
      transform-origin: top;
      transform: rotateX(-90deg);
    }
    core-select[list-open]::part(list) {
      transform: rotateX(0deg);
      transition: all 0.4s cubic-bezier(0.13, 0.06, 0.03, 1.5);
    }
  </style>
  <core-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option  2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    roundedSelect() {
      return `
  <style>
    core-select {
      border-radius: 30px;
    }
    core-select::part(list) {
      border-radius: 30px;
      box-shadow: 1px 10px 10px 0px rgba(0,0,0,0.2);
    }
  </style>
  <core-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option  2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    basicSelect() {
      return `
  <core-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option 2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    checkMarkSelect() {
      return `
  <style>
    core-option {
      position: relative;
      padding-left: 30px;
    }
    core-option[selected]::before {
      position: absolute;
      left: 10px;
      top: 50%;
      transform: translateY(-50%);
      content: "✓";
    }
  </style>
  <core-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option  2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    searchableSelect() {
      return `
  <core-select searchable placeholder="Search for option" full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option 2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    comboSelect() {
      return `
  <style>
    core-option[selected] {
      display: none;
    }
  </style>
  <core-select multiple list-open-on-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option 2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    mobileSelect() {
      return `
  <style>
    core-select {
      position: initial;
    }
    core-select:before {
      content: "";
      opacity: 0;
      transition: opacity 0.5s ease;
    }
    core-select[list-open]:before {
      z-index: 999;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(0,0,0,0.1);
      opacity: 1;
      transition: opacity 0.5s ease;
    }
    core-select::part(list) {
      border-radius: 0;
      width: 100%;
      bottom: 0;
      top: initial;
      position: fixed;
      z-index: 1000;
      transform: translateY(100px);
      transition: all 0.2s ease;
    }
    core-select[list-open]::part(list) {
      opacity: 1;
      transform: translateY(0px);
    }
  </style>
  <core-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option 2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
    cssVariables() {
      return `
  <style>
    core-option {
      --core-option-active-color: green;
      --core-option-selected-color: orange;
      --core-option-selected-active-color: red;
    }

  </style>
  <core-select full>
    <core-option value="1" selected>Option 1</core-option>
    <core-option value="2">Option 2</core-option>
    <core-option value="3">Option 3</core-option>
  </core-select>
      `;
    },
  },
  watch: {
    darkMode: (val) => {
      if (val) document.body.setAttribute("mode", "dark");
      else document.body.removeAttribute("mode");
    },
    activeSelectExample: function (val) {
      this.$refs.knob._fetchJson();
      this.$refs.knob._observeProps();
    },
  },
};
</script>

<style>
.landing {
  padding-top: 60px;
}

.check-list {
  list-style: none;
  text-align: left;
  padding: 0;
  margin-top: var(--core-space-lg);
  max-width: 280px;
}

@media (max-width: 800px) {
  .feature-box {
    text-align: center;
  }

  .check-list {
    margin: 0 auto;
    margin-top: var(--core-space-lg);
    max-width: 280px;
  }
}

.check-list li {
  position: relative;
  margin-left: var(--core-space-lg);
  margin-bottom: var(--core-space-sm);
}

.check-list li:before {
  content: "\2713";
  color: var(--core-color-primary);
  position: absolute;
  left: calc(var(--core-space-lg) * -1);
  top: 0;
}
</style>
