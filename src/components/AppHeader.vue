<template>
  <div class="app__header">
    <div class="app__title">
      Symptom checker example
    </div>
    <div>
      powered by
      <a target="_blank" href="http://infermedica.com">Infermedica</a>
    </div>
  </div>
</template>

<script>

  export default {
    name: 'AppHeader'
  };
</script>

<style lang="scss">
  .app {
    &__header {
      display: flex;
      justify-content: space-between;
      width: 92%;
      margin-top: 20px;
      color: $dark-blue;
    }

    &__title {
      font: $font-grand 'Soleil', sans-serif;
    }
  }
</style>
