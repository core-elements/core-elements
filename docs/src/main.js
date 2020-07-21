import "regenerator-runtime/runtime";

import { Knobs } from "core-elements/dist/components/knobs";

customElements.define("core-knobs", Knobs);

import "core-elements";
import { outlineWatcher } from "core-elements";

outlineWatcher();

import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import Home from "./views/Home";
import Components from "./views/Components";
import Component from "./views/Component";
import Documentation from "./views/Documentation";
import ThemeEditor from "./views/ThemeEditor";

Vue.config.ignoredElements = [/core-\w*/];
Vue.config.ignoredElements = [/ion-\w*/];

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: "/",
      component: Home,
      meta: {
        title: "Core Elements",
        showInHeader: true,
        hasSidebar: false,
      },
    },
    {
      path: "/components",
      meta: { title: "Components", showInHeader: true, hasSidebar: false },
      component: Components,
    },
    {
      path: "/components/:element",
      component: Component,
      meta: { title: "Select component", hasSidebar: true },
    },
    {
      path: "/documentation/:slug",
      component: Documentation,
      meta: {
        title: "Documentation",
        showInHeader: true,
        hasSidebar: true,
      },
    },
    {
      path: "/theme-editor",
      component: ThemeEditor,
      meta: {
        title: "Getting Started",
        showInHeader: true,
        hasSidebar: false,
      },
    },
  ],
  scrollBehavior: function(to, from, savedPosition) {
    if (to.hash) {
      return window.scrollTo({
        top: document.querySelector(to.hash).offsetTop - 60,
        behavior: "smooth",
      });
    } else {
      return { x: 0, y: 0 };
    }
  },
});

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
