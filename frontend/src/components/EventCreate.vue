<template>
  <template v-if="formState.error">
    <div class="row">
      <div class="col">
        <div class="alert alert-danger alert-dismissible fade show fw-bolder" role="alert">
          <span>
            {{ t("event_create_error_occured") }}
            <br />
            {{ formState.message }}
          </span>

          <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
      </div>
    </div>
  </template>

  <div class="row">
    <div class="col">
      <form ref="formEventCreate" @submit.prevent="onSubmit">
        <div class="form-group text-start">
          <label class="fw-bolder">{{ t("event_create_field_name") }}</label>
          <input
            v-model="v$.formFields.name.$model"
            class="form-control form-control-sm"
            :class="[{ 'is-invalid': v$.formFields.name.$error }]"
            type="text"
            :placeholder="t('event_create_field_placeholder_name')"
            autofocus />

          <FieldErrorMessage :errors="v$.formFields.name.$errors"></FieldErrorMessage>
        </div>

        <div class="form-group text-start mt-2">
          <label class="fw-bolder">{{ t("event_create_field_description") }}</label>
          <textarea
            v-model="v$.formFields.description.$model"
            class="form-control form-control-sm main-textarea"
            :class="[{ 'is-invalid': v$.formFields.description.$error }]"
            :placeholder="t('event_create_field_placeholder_description')"></textarea>

          <FieldErrorMessage :errors="v$.formFields.description.$errors"></FieldErrorMessage>
        </div>

        <div class="row">
          <div class="col">
            <div class="form-group text-start mt-2">
              <label class="fw-bolder">{{ t("event_create_field_date_start") }}</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-calendar-date"></i></span>
                <input
                  v-model="v$.formFields.date_start.$model"
                  class="form-control form-control-sm"
                  :class="[{ 'is-invalid': v$.formFields.date_start.$error }]"
                  type="datetime-local" />
              </div>

              <FieldErrorMessage :errors="v$.formFields.date_start.$errors"></FieldErrorMessage>
            </div>
          </div>

          <div class="col">
            <div class="form-group text-start mt-2">
              <label class="fw-bolder">{{ t("event_create_field_date_end") }}</label>
              <div class="input-group input-group-sm">
                <span class="input-group-text"><i class="bi bi-calendar-date"></i></span>
                <input
                  v-model="v$.formFields.date_end.$model"
                  class="form-control form-control-sm"
                  :class="[{ 'is-invalid': v$.formFields.date_end.$error }]"
                  type="datetime-local" />
              </div>

              <FieldErrorMessage :errors="v$.formFields.date_end.$errors"></FieldErrorMessage>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>

  <div class="row">
    <div class="col text-end">
      <button
        :disabled="v$.formFields.$invalid || createInProgress"
        type="button"
        class="btn btn-primary btn-sm fw-bolder text-uppercase mt-2"
        @click="createButtonClicked">
        {{ t("event_create_button_create") }}
      </button>
    </div>
  </div>
</template>

<style scoped>
  .event-create-message-error {
    text-align: left;
    font-size: 0.7em;
    color: red;
    font-style: italic;
    padding: 0 0 0 0.75em;
  }
</style>

<i18n>
{
  "en": {
    "event_create_field_name": "Name",
    "event_create_field_description": "Description",
    "event_create_field_date_start": "Start on",
    "event_create_field_date_end": "End on",
    "event_create_field_placeholder_name": "< enter an event name >",
    "event_create_field_placeholder_description": "< enter a description of the event >",
    "event_create_button_create": "Create",
    "event_create_error_occured": "Cannot create event: an error occured"
  },
  "fr": {
    "event_create_field_name": "Nom",
    "event_create_field_description": "Description",
    "event_create_field_date_start": "Débute le",
    "event_create_field_date_end": "Termine le",
    "event_create_field_placeholder_name": "< saisir un nom d'événement' >",
    "event_create_field_placeholder_description": "< indiquer une description de l'événement >",
    "event_create_button_create": "Créer",
    "event_create_error_occured": "Création impossible: une erreur est survenue"
  }
}
</i18n>

<script>
  import { useI18n } from "vue-i18n";

  import useVuelidate from "@vuelidate/core";
  import { required, minLength, maxLength, minValue, helpers } from "@vuelidate/validators";

  import FieldErrorMessage from "@/components/FieldErrorMessage.vue";

  import { dataFunctions } from "@/plugins/data/data";
  import { Events } from "@/plugins/data/events";
  import { UtilsFunctions } from "@/plugins/utils";

  const isNameAlreadyExists = helpers.withMessage(
    ({ $pending }) => {
      if (!$pending) return "Field value already exists";
      return "";
    },

    helpers.withAsync(async (value) => {
      if (value == null) return true;

      return await new Promise((resolve, reject) => {
        dataFunctions
          .getEventsWithName(value)
          .then((result) => {
            resolve(result.length < 1);
          })
          .catch((error) => {
            reject(false);
          });
      });
    })
  );

  export default {
    name: "EventCreate",
    components: { FieldErrorMessage },
    setup() {
      const { t } = useI18n();
      const v$ = useVuelidate();
      return { t, v$ };
    },
    data: () => ({
      formState: {
        error: false,
        message: ""
      },
      formFields: {
        name: "",
        description: "",
        date_start: UtilsFunctions.getFormattedDate(UtilsFunctions.getLocalDate(new Date())),
        date_end: null
      },
      createInProgress: false
    }),
    validations() {
      return {
        formFields: {
          name: {
            required,
            min: minLength(4),
            max: maxLength(32),
            isUnique: isNameAlreadyExists
          },
          description: {
            required,
            max: maxLength(2048)
          },
          date_start: {
            required
          },
          date_end: {
            minValue: minValue(this.formFields.date_start)
          }
        }
      };
    },
    methods: {
      createButtonClicked() {
        this.createInProgress = true;
        this.formState.error = false;
        dataFunctions
          .addEvent(new Events(this.formFields))
          .then((dataJson) => {
            this.formFields.name = "";
            this.formFields.description = "";
            this.formFields.date_start = UtilsFunctions.getFormattedDate(UtilsFunctions.getLocalDate(new Date()));
            this.formFields.date_end = null;
            this.v$.formFields.$touch();
            this.v$.formFields.$reset();
            this.createInProgress = false;
          })
          .catch((error) => {
            this.formState.error = true;
            this.formState.message = "{0}: {1}".format(error.code, error.message);
            this.createInProgress = false;
          });
      }
    }
  };
</script>
