<template v-if="errors.length > 0">
  <div v-for="error of errors" :key="error.$uid">
    <div class="event-create-message-error">* {{ error.$message }}</div>
  </div>
</template>

<style>
  .event-create-message-error {
    text-align: left;
    font-size: 0.7em;
    color: red;
    font-style: italic;
    padding: 0 0 0 0.75em;
  }
</style>

<script>
  export default {
    name: "FieldErrorMessage",
    props: {
      errors: {
        type: Array,
        required: true
      }
    }
  };
</script>
