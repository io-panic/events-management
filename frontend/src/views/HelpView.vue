<template>
  <div>
    <h1>Help</h1>
  </div>

  <button
    type="button"
    class="btn btn-secondary me-2"
    data-bs-container="body"
    data-bs-toggle="popover"
    data-bs-placement="left"
    data-bs-content="Left popover">
    Popover on left
  </button>
</template>

<script>
  export default {
    name: "HelpView",
    mounted() {
      //inti Popover
      Array.from(document.querySelectorAll('button[data-bs-toggle="popover"]')).forEach(
        (popoverNode) => new this.$popperJs(popoverNode)
      );
    }
  };
</script>
