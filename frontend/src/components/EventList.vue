<template>
  <div class="row">
    <div class="col">
      <table class="table table-sm table-striped table-hover">
        <thead>
          <tr>
            <th scope="col">{{ t("event_list_column_title_name") }}</th>
            <th scope="col">{{ t("event_list_column_title_description") }}</th>
            <th scope="col">{{ t("event_list_column_title_date_start") }}</th>
            <th scope="col">{{ t("event_list_column_title_date_end") }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="event in events" :key="event.id">
            <td>{{ event.name }}</td>
            <td>{{ event.description }}</td>
            <td>{{ event.dateStart }}</td>
            <td>{{ event.dateEnd }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<i18n>
{
  "en": {
    "event_list_column_title_name": "Name",
    "event_list_column_title_description": "Description",
    "event_list_column_title_date_start": "Start on",
    "event_list_column_title_date_end": "End on",
  },
  "fr": {
    "event_list_column_title_name": "Nom",
    "event_list_column_title_description": "Description",
    "event_list_column_title_date_start": "Débute le",
    "event_list_column_title_date_end": "Termine le",
  }
}
</i18n>

<script>
  import { useI18n } from "vue-i18n";
  import { shallowRef } from "vue";

  import { dataFunctions } from "@/plugins/data/data";

  export default {
    name: "EventCreate",
    data: () => ({
      events: [],
      date_start: new Date(),
      date_end: new Date()
    }),
    setup() {
      const { t } = useI18n();
      return { t };
    },
    mounted() {
      dataFunctions.retrieveEvents(this.generateTable);
    },
    methods: {
      generateTable(events) {
        this.events = shallowRef(events);
      }
    }
  };
</script>
