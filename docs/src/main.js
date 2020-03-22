import 'regenerator-runtime/runtime'

import "./base-knobs.js";

import "../../dist/main.js"

import Vue from "vue";
import App from "./App.vue";

new Vue({
  render: function(h) {
    return h(App);
  }
}).$mount("#app");
