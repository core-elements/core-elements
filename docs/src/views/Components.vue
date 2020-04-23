<template>
  <Page>
    <base-container size="sm">
      <base-text tag="h1" weight="700" full>Components</base-text>
      <base-text type="lead">
        The library consists of only a few
        <b>essential UI components</b> that work across all frameworks. They are
        flexible enough that you will be able to style them to your needs, but
        also good enough looking that you could use them out of the box.
        <p>
          If you're in a rush, and don't have time to style the components
          youself, have a look at the available themes, or try our theme editor
          to get the look you're after.
        </p>
      </base-text>
    </base-container>
    <base-box margin-y="xl">
      <base-grid gap="lg" columns="1">
        <base-grid-item sm="1" v-for="(menuGroup, name) in groupedComponents" :key="name">
          <base-text tag="h2">{{ name }}</base-text>
          <base-box margin-y="xl">
            <base-grid columns="4" gap="lg">
              <base-grid-item sm="4" md="1" lg="1" :key="i" v-for="(page, i) in menuGroup">
                <router-link
                  style="height: 100%;"
                  tag="base-box"
                  depth="sm"
                  padding="md"
                  radius="md"
                  clickable
                  full
                  :to="`/components/${page.name}`"
                >
                  <base-text tag="h3">{{ page.name }}</base-text>
                  <base-text tag="small">{{ page.desc }}</base-text>
                </router-link>
              </base-grid-item>
            </base-grid>
          </base-box>
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
      components
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
            [`${catName}`]: [...prevComps, { ...comp }]
          };
        },
        {
          Layout: [],
          Elements: [],
          Form: []
        }
      );
    }
  }
};
</script>
