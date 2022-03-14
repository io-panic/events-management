<template>
  <div class="row">
    <div class="col">
      <template v-if="loading">
        <div class="text-success fw-bolder">
          {{ t("event_list_loading_in_progress") }}
        </div>
      </template>

      <template v-else>
        <template v-if="resultAvailable.error">
          <div class="text-danger fw-bolder">
            <span>
              {{ t("event_list_unable_to_load_data") }}
              <br />
              {{ resultAvailable.message }}
            </span>
          </div>
        </template>

        <template v-else>
          <div class="event-list-table-overflow">
            <table class="table table-sm table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">{{ t("event_list_column_title_name") }}</th>
                  <th scope="col">{{ t("event_list_column_title_description") }}</th>
                  <th scope="col">{{ t("event_list_column_title_date_start") }}</th>
                  <th scope="col">{{ t("event_list_column_title_date_end") }}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="event in events" :key="event.id">
                  <td>{{ event.name }}</td>
                  <td>{{ event.description }}</td>
                  <td>{{ getLocalDate(new Date(event.dateStart)) }}</td>
                  <td>{{ getLocalDate(event.dateEnd == null ? null : new Date(event.dateEnd)) }}</td>
                  <td>
                    <button type="button" class="btn btn-sm event-list-force-pa-0" @click="deleteEvent(event.id)">
                      <i class="bi bi-trash3"></i>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </template>
      </template>
    </div>
  </div>
</template>

<style>
  .event-list-force-pa-0 {
    padding: 0 !important;
  }

  .event-list-table-overflow {
    display: block;
    height: 259px;
    overflow-y: scroll;
  }
</style>

<i18n>
{
  "en": {
    "event_list_unable_to_load_data": "An error occured: cannot load data",
    "event_list_timeout_error": "Cannot connect on backend: timeout",
    "event_list_loading_in_progress": "Loading in progress...",
    "event_list_column_title_name": "Name",
    "event_list_column_title_description": "Description",
    "event_list_column_title_date_start": "Start on",
    "event_list_column_title_date_end": "End on",
  },
  "fr": {
    "event_list_unable_to_load_data": "Une erreur est survenue: données non chargés",
    "event_list_timeout_error": "Connexion au backend impossible: délai dépassé",
    "event_list_loading_in_progress": "Chargement en cours...",
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
    setup() {
      const { t } = useI18n();
      return { t };
    },
    data: () => ({
      loading: true,
      events: [],
      resultAvailable: {
        error: false,
        message: ""
      }
    }),
    mounted() {
      this.loading = true;

      dataFunctions
        .retrieveEvents()
        .then((result) => {
          this.resultAvailable.error = false;
          this.generateTable(result);

          this.loading = false;
        })
        .catch((error) => {
          this.resultAvailable.error = true;
          this.resultAvailable.message = "{0}: {1}".format(error.code, error.message);

          this.loading = false;
        });
    },
    methods: {
      getLocalDate(dateValue) {
        return UtilsFunctions.getLocalDate(dateValue);
      },
      generateTable(events) {
        this.events = shallowRef(events);
      },
      deleteEvent(id) {
        dataFunctions
          .deleteEvent(id)
          .then((dataJson) => {
            this.events = this.events.filter(function (event) {
              return event.id !== id;
            });
          })
          .catch((error) => {
            this.resultAvailable.error = true;
            this.resultAvailable.message = "{0}: {1}".format(error.code, error.message);
          });
      }
    }
  };
</script>
