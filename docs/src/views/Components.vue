<template>
  <Page>
    <div class="components">
      <core-container size="sm">
        <core-text tag="h1" weight="700">Components</core-text>
        <core-text type="lead">
          The library consists of only a few
          <b>essential UI components</b> that work across all frameworks. They
          are flexible enough that you will be able to style them to your needs,
          but also good enough looking that you could use them out of the box.
          <p>
            If you're in a rush, and don't have time to style the components
            youself, have a look at the available themes, or try our theme
            editor to get the look you're after.
          </p>
        </core-text>
      </core-container>

      <core-container size="xs">
        <core-box depth="md" margin-y="lg">
          <core-select
            :input-value="search"
            @input="e => search = e.target.inputValue"
            @select="(e) => $router.push('/components/' + e.target.value)"
            full
            size="lg"
            searchable
            placeholder="Search"
          >
            <ion-icon slot="start" name="search"></ion-icon>
            <core-option
              :key="component.name"
              v-for="component in components"
              :value="component.name"
            >{{component.name}}</core-option>
          </core-select>
        </core-box>
      </core-container>

      <core-tabs class="tabs" :value="category" @change="(e) => (category = e.target.value)">
        <core-tab>All</core-tab>
        <core-tab>Layout</core-tab>
        <core-tab>Interaction</core-tab>
        <core-tab>Form</core-tab>
        <core-tab>Navigation</core-tab>
      </core-tabs>

      <core-container size="md">
        <core-box margin-y="xl">
          <core-grid gap-sm="md" gap-md="lg" columns="12">
            <core-grid-item
              sm="6"
              md="3"
              lg="3"
              v-for="component in filteredComponents"
              :key="component.name"
            >
              <router-link
                style="height: 100%"
                tag="core-box"
                depth="sm"
                padding="lg"
                radius="xs"
                clickable
                full
                :to="`/components/${component.name}`"
              >
                <core-text tag="h3" weight="400">
                  {{
                  component.name
                  }}
                </core-text>
                <core-text tag="small">{{ component.desc }}</core-text>
              </router-link>
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
  width: calc(100% + 15px);
  background: var(--core-color-white);
  margin-left: -15px;
  padding-left: 15px;
  z-index: 500;
  margin-top: 30px;
}
</style>
