import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import "bootstrap/dist/js/bootstrap.min.js";
import { Popover } from "bootstrap/dist/js/bootstrap.min.js";

import { createApp } from "vue";
import App from "./App.vue";

import router from "@/plugins/router";
import i18n, { getBrowserLocale } from "@/plugins/i18n";
import { prototypeFunctions } from "@/plugins/prototype";

const app = createApp(App);
app.use(router).use(i18n).mount("#app");

i18n.global.locale.value = getBrowserLocale({ countryCodeOnly: true });
app.config.globalProperties.$popperJs = Popover;

prototypeFunctions.addFormatFunctionToStringObject();
prototypeFunctions.addToISOStringFunctionToDateObject();
