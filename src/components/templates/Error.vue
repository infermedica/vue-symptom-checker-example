<template>
  <transition name="slide" appear>
    <div v-if="isError" class="error">
      <div class="error__item">
        <Icon name="bug"/>&nbsp; Problem:
        {{ errors.response.data.message }}
      </div>
    </div>
  </transition>
</template>

<script>
  import {mapState} from 'vuex';

  export default {
    name: 'Error',
    computed: {
      ...mapState({
        isError: (state) => state.api.isError,
        errors: (state) => state.api.errors
      })
    }
  };
</script>

<style lang="scss">
  .error {
    position: fixed;
    top: 1%;
    right: 3%;
    z-index: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: $blank;
    background-color: $error;
    border-radius: 4px;

    &__item {
      display: flex;
      align-items: center;
      padding: 10px;
    }
  }
</style>
