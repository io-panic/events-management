<template>
  <div class="row">
    <div class="col">
      <div class="event-list-table-overflow">
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
              <td>{{ getLocalDate(new Date(event.dateStart)) }}</td>
              <td>{{ getLocalDate(event.dateEnd == null ? null : new Date(event.dateEnd)) }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<style>
  .event-list-table-overflow {
    display: block;
    height: 285px;
    overflow-y: scroll;
  }
</style>

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
  import { UtilsFunctions } from "@/plugins/utils";

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
      getLocalDate(dateValue) {
        return UtilsFunctions.getLocalDate(dateValue);
      },
      generateTable(events) {
        this.events = shallowRef(events);
      }
    }
  };
</script>
