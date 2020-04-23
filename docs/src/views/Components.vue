<template>
  <Page>
    <base-container size="sm">
      <base-text tag="h1" weight="700" full>Components</base-text>
      <base-text tag="p">
        Ionic apps are made of high-level building blocks called Components,
        which allow you to quickly construct the UI for your app. Ionic comes
        stock with a number of components, including cards, lists, and tabs.
        Once you’re familiar with the basics, refer to the API Index for a
        complete list of each component and sub-component.
      </base-text>
    </base-container>
    <base-box margin-y="xl">
      <base-grid gap="lg" columns="4">
        <base-grid-item
          sm="4"
          md="2"
          lg="1"
          v-for="(menuGroup, name) in groupedComponents"
          :key="name"
        >
          <base-text tag="h2">{{ name }}</base-text>
          <base-grid columns="1" gap="lg">
            <base-grid-item sm="1" :key="i" v-for="(page, i) in menuGroup">
              <router-link
                tag="base-box"
                clickable
                full
                depth="md"
                radius="md"
                padding="lg"
                :to="`/components/${page.name}`"
              >
                <base-text tag="h3">{{ page.name }}</base-text>
                <base-text tag="small">{{ page.desc }}</base-text>
              </router-link>
            </base-grid-item>
          </base-grid>
        </base-grid-item>
      </base-grid>
    </base-box>
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
    };
  },
  computed: {
    groupedComponents() {
      return this.components.reduce(
        (acc, comp) => {
          const catName = comp.category || "Uncategorized";

          const prevComps = acc[`${catName}`] ? acc[`${catName}`] : [];

          return {
            ...acc,
            [`${catName}`]: [...prevComps, { ...comp }],
          };
        },
        {
          Layout: [],
          Elements: [],
          Form: [],
        }
      );
    },
  },
};
</script>
