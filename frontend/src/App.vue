<template>
  <router-view></router-view>
  <LocaleSelector />
</template>

<style lang="scss">
  $primary: #3b62b6;
  $warning: #eb8c34;
  $danger: #8f2015;

  @import "node_modules/bootstrap/scss/bootstrap";

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>

<i18n>
{
  "en": {
    "app_title": "Event Management"
  },
  "fr": {
    "app_title": "Gestion des événements"
  }
}
</i18n>

<script>
  import { useI18n } from "vue-i18n";

  import LocaleSelector from "@/components/LocaleSelector.vue";

  export default {
    name: "App",
    components: {
      LocaleSelector
    },
    setup() {
      const { t } = useI18n();
      return { t };
    },
    data: (vm) => ({}),
    watch: {
      "$i18n.locale"(currentValue, previousValue) {
        document.title = this.t("app_title");
      }
    },
    mounted() {
      document.title = this.t("app_title");
    }
  };
</script>
