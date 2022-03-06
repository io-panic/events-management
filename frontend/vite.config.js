import { defineConfig } from "vite";

import vue from "@vitejs/plugin-vue";
import vueI18n from "@intlify/vite-plugin-vue-i18n";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {}
      }
    }),
    vueI18n({
      fullInstall: false,
      runtimeOnly: false,
      compositionOnly: true,
      defaultSFCLang: "json",
      globalSFCScope: true,
      useVueI18nImportName: false
    })
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  base: "",
  server: {
    open: "/"
  }
});
