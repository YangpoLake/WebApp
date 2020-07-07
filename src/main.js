import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store/index";
import i18n from "./lang/index";
import "./index.css";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(i18n);

app.mount('#app');
