import { createRouter, createWebHistory } from "vue-router";

import MainView from "@/views/MainView.vue";
import HelpView from "@/views/HelpView.vue";

const routes = [
  {
    path: "/",
    name: "MainView",
    component: MainView
  },
  {
    path: "/help",
    name: "HelpView",
    component: HelpView
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
