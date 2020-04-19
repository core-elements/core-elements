import "regenerator-runtime/runtime";

import "../../lib/dist/components/base-knobs";

import "../../lib/dist/main.js";

import Vue from "vue";
import App from "./App.vue";

new Vue({
  render: function(h) {
    return h(App);
  },
}).$mount("#app");
