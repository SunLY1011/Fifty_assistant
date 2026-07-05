import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import globalVariable from "./assets/js/global.js";

createApp(App)
  .use(store)
  .use(router)
  .provide("globalVariable", globalVariable)
  .mount("#app");
