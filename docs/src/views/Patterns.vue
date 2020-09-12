<template>
  <Page>
    <div class="components">
      <core-container center style="text-align: center" size="xs">
        <core-text tag="h1">Patterns</core-text>
        <core-text tag="p" look="lead">Patterns</core-text>
      </core-container>

      <core-container style="text-align: center" center size="xs">
        <core-box my="xl">
          <core-select
            :input-value="search"
            @input="(e) => (search = e.target.inputValue)"
            @select="(e) => $router.push('/patterns/' + e.target.value)"
            full
            searchable
            placeholder="Search"
          >
            <ion-icon slot="start" name="search"></ion-icon>
            <core-option
              :key="pattern.name"
              v-for="pattern in patterns"
              :value="pattern.name"
            >{{ pattern.name }}</core-option>
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
        <core-box my="xl">
          <core-grid gap-sm="md" gap-md="lg" columns="12">
            <core-grid-item
              sm="6"
              md="3"
              lg="3"
              v-for="pattern in filteredPatterns"
              :key="pattern.name"
            >
              <router-link
                style="text-align: center"
                tag="core-box"
                depth="sm"
                p="lg"
                radius="xs"
                clickable
                full
                :to="`/patterns/${pattern.name}`"
              >
                <core-box pb="sm">
                  <ion-icon style="font-size: 2rem" :name="pattern.icon"></ion-icon>
                </core-box>
                <core-text size="md" weight="400">{{ pattern.name }}</core-text>
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
import { patterns } from "../db.json";

export default {
  components: { Page },
  data() {
    return {
      patterns,
      category: "All",
      search: "",
    };
  },
  computed: {
    tabbedPatterns() {
      if (this.category === "All") return this.patterns;
      return this.patterns.filter(
        (pattern) => pattern.category === this.category
      );
    },
    filteredPatterns() {
      if (this.search === "") return this.tabbedPatterns;
      return this.tabbedPatterns.filter((pattern) =>
        pattern.name.toLowerCase().includes(this.search.toLowerCase())
      );
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
