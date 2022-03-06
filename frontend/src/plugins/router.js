import { createRouter, createWebHistory } from "vue-router";

import Main from "@/views/Main.vue";
import Help from "@/views/Help.vue";

const routes = [
  {
    path: "/",
    name: "Main",
    component: Main
  },
  {
    path: "/help",
    name: "Help",
    component: Help
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
