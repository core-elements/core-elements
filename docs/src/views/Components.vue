<template>
  <Page>
    <div class="components">
      <base-container size="sm">
        <base-text tag="h1" weight="700">Components</base-text>
        <base-text type="lead">
          The library consists of only a few
          <b>essential UI components</b> that work across all frameworks. They
          are flexible enough that you will be able to style them to your needs,
          but also good enough looking that you could use them out of the box.
          <p>
            If you're in a rush, and don't have time to style the components
            youself, have a look at the available themes, or try our theme
            editor to get the look you're after.
          </p>
        </base-text>
      </base-container>

      <base-tabs
        class="tabs"
        :value="category"
        @change="(e) => (category = e.target.value)"
      >
        <base-tab>All</base-tab>
        <base-tab>Layout</base-tab>
        <base-tab>Elements</base-tab>
        <base-tab>Form</base-tab>
        <base-tab>Navigation</base-tab>
      </base-tabs>

      <base-container size="md">
        <base-box margin-y="xl">
          <base-grid gap-sm="md" gap-md="lg" columns="12">
            <base-grid-item
              sm="6"
              md="3"
              lg="3"
              v-for="component in filteredComponents"
              :key="component.name"
            >
              <router-link
                style="height: 100%"
                tag="base-box"
                depth="sm"
                padding="lg"
                radius="xs"
                clickable
                full
                :to="`/components/${component.name}`"
              >
                <base-text tag="h3" weight="400">{{
                  component.name
                }}</base-text>
                <base-text tag="small">{{ component.desc }}</base-text>
              </router-link>
            </base-grid-item>
          </base-grid>
        </base-box>
      </base-container>
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
    };
  },
  computed: {
    filteredComponents() {
      if (this.category === "All") return this.components;
      return this.components.filter((comp) => comp.category === this.category);
    },
  },
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
  width: calc(100% + 15px);
  background: var(--base-color-white);
  margin-left: -15px;
  padding-left: 15px;
  z-index: 500;
  margin-top: 30px;
}
</style>
