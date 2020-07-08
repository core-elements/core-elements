<template>
  <Page>
    <div class="components">
      <core-container center style="text-align: center" size="xs">
        <core-text tag="h1">Components</core-text>
        <core-text tag="p" look="lead">
          A collection of lightweight elements that implement the most common
          UI patterns in web development
        </core-text>
      </core-container>

      <core-container style="text-align: center" center size="xs">
        <core-box margin-y="xl">
          <core-select
            :input-value="search"
            @input="(e) => (search = e.target.inputValue)"
            @select="(e) => $router.push('/components/' + e.target.value)"
            full
            searchable
            placeholder="Search"
          >
            <ion-icon slot="start" name="search"></ion-icon>
            <core-option
              :key="component.name"
              v-for="component in components"
              :value="component.name"
            >{{ component.name }}</core-option>
          </core-select>
        </core-box>
      </core-container>

      <core-container style="text-align: center" center size="xs">
        <core-tabs class="tabs" :value="category" @change="(e) => (category = e.target.value)">
          <core-tab>All</core-tab>
          <core-tab>Layout</core-tab>
          <core-tab>Interaction</core-tab>
          <core-tab>Form</core-tab>
        </core-tabs>
      </core-container>

      <core-container center size="sm">
        <core-box margin-y="xl">
          <core-grid gap-sm="md" gap-md="lg" columns="12">
            <core-grid-item
              sm="6"
              md="3"
              lg="3"
              v-for="component in filteredComponents"
              :key="component.name"
            >
              <core-overlay position-y="top" position-x="center" full hoverable>
                <router-link
                  slot="trigger"
                  style="text-align: center"
                  tag="core-box"
                  depth="sm"
                  padding="lg"
                  radius="xs"
                  clickable
                  full
                  :to="`/components/${component.name}`"
                >
                  <core-box padding-b="sm">
                    <ion-icon style="font-size: 2rem" :name="component.icon"></ion-icon>
                  </core-box>
                  <core-text size="md" weight="400">{{ component.name }}</core-text>
                </router-link>
                <div mode="dark" class="tooltip" slot="content">{{component.desc}}</div>
              </core-overlay>
            </core-grid-item>
          </core-grid>
        </core-box>
      </core-container>
    </div>
  </Page>
</template>

<script>
import Page from "../layouts/Page";
import { components } from "../db.json";

export default {
  components: { Page },
  data() {
    return {
      components,
      category: "All",
      search: ""
    };
  },
  computed: {
    tabbedComponents() {
      if (this.category === "All") return this.components;
      return this.components.filter(comp => comp.category === this.category);
    },
    filteredComponents() {
      if (this.search === "") return this.tabbedComponents;
      return this.tabbedComponents.filter(comp =>
        comp.name.toLowerCase().includes(this.search.toLowerCase())
      );
    }
  }
};
</script>

<style scoped>
.components {
  max-width: 100%;
  padding-top: 60px;
}

.tabs {
  position: sticky;
  top: 60px;
  background: var(--core-color-white);
  margin-left: -15px;
  padding-left: 15px;
  z-index: 500;
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
  border-style: solid;
  border-width: var(--core-space-xxs) var(--core-space-xxs) 0
    var(--core-space-xxs);
  border-color: var(--core-color-ui-weak) transparent transparent transparent;
}
</style>
