import "regenerator-runtime/runtime";

import "../../lib/dist/components/base-knobs";

import "../../lib/dist/main.js";

import Vue from "vue";
import Router from "vue-router";
import App from "./App.vue";
import Home from "./views/Home";
import Components from "./views/Components";
import Component from "./views/Component";
import Installation from "./views/Installation";

Vue.use(Router);

const router = new Router({
  routes: [
    { path: "/", component: Home },
    {
      path: "/components",
      component: Components,
      children: [{ path: ":element", component: Component }],
    },
    { path: "/installation", component: Installation },
  ],
});

new Vue({
  router,
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
