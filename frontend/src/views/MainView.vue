<template>
  <div class="main-background" :style="backgroundImage">
    <div class="card ma-3" style="opacity: 0.85; width: 850px; height: 350px">
      <div class="card-body">
        <div class="card-title main-card-title bg-primary text-start ps-2">{{ t("main_title") }}</div>

        <div class="row">
          <div class="col-4 text-start">
            <label class="fw-bolder">{{ t("main_select_operation") }}</label>
            <select v-model="selectedOperation" class="form-select form-select-sm">
              <option value="CREATE">{{ t("main_operation_create") }}</option>
              <option value="LIST">{{ t("main_operation_list") }}</option>
            </select>
          </div>
          <div class="col-8">
            <component :is="eventActiveOperation"></component>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .main-card-title {
    color: white;
    font-weight: bolder;
    text-transform: uppercase;
  }

  .main-background {
    position: relative;
    height: 100vh;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover !important;
  }
</style>

<i18n>
{
  "en": {
    "main_title": "Event Management",
    "main_operation_create": "Create a new event",
    "main_operation_list": "List all events",
    "main_select_operation": "Select operation"
  },
  "fr": {
    "main_title": "Gestion des événements",
    "main_operation_create": "Créer un nouvel événement",
    "main_operation_list": "Liste des événements",
    "main_select_operation": "Sélectionner opération"
  }
}
</i18n>

<script>
  import { useI18n } from "vue-i18n";
  import { shallowRef } from "vue";

  import EventCreate from "@/components/EventCreate.vue";
  import EventList from "@/components/EventList.vue";

  export default {
    name: "MainView",
    components: {
      EventCreate,
      EventList
    },
    data: () => ({
      backgroundImage: "",
      selectedOperation: "CREATE",
      eventActiveOperation: shallowRef(EventCreate)
    }),
    watch: {
      selectedOperation(currentValue, previousValue) {
        this.eventActiveOperation = currentValue === "CREATE" ? shallowRef(EventCreate) : shallowRef(EventList);
      }
    },
    setup() {
      const { t } = useI18n();
      return { t };
    },
    mounted() {
      let opacity = 0.8;
      let imageFullPath = this.getImageUrl();

      this.backgroundImage =
        "background-image: linear-gradient(rgba(255, 255, 255, {0}), rgba(255, 255, 255, {1})), url({2});".format(
          opacity,
          opacity,
          imageFullPath
        );
    },
    methods: {
      getImageUrl() {
        return new URL("../assets/background.png", import.meta.url).href;
      }
    }
  };
</script>
