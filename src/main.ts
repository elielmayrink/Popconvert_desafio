import { createApp } from "vue";
import "./style.css";
// @ts-ignore
import App from "./App.vue";
// @ts-ignore
import { store } from "./store/store.js";

createApp(App).use(store).mount("#app");
