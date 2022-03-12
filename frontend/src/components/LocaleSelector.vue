<template>
  <div class="localeSelector-fixedbottomright">
    <div class="d-inline-flex">
      <div class="fw-bolder">EN</div>
      <div class="p-0 mx-2 form-check form-switch">
        <input v-model="isEnglishLanguageSelected" class="mx-0 form-check-input" type="checkbox" />
      </div>
      <div class="fw-bolder">FR</div>
    </div>
  </div>
</template>

<style>
  .localeSelector-fixedbottomright {
    display: flex;
    position: fixed;
    bottom: 0;
    right: 50px;
    opacity: 0.8;
  }

  .form-switch .form-switch-handle-on,
  .form-switch .form-switch-handle-off {
    color: #fff;
    background: #ff9933;
  }

  .fw-bolder {
    user-select: none;
  }
</style>

<script>
  export default {
    name: "LocaleSelector",
    props: [],
    data: (vm) => ({
      isEnglishLanguageSelected: false
    }),
    watch: {
      isEnglishLanguageSelected(currentValue, previousValue) {
        this.$i18n.locale = !currentValue ? "en" : "fr";
      }
    }
  };
</script>
