<template>
  <div class="app__footer">
    <transition name="flow-up" appear>
      <div v-if="stepName !== 'Step Welcome'" class="step__bar">
        <div class="step__name">
          {{ stepName }}
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
  import {mapGetters} from 'vuex';

  export default {
    name: 'AppFooter',
    computed: {
      ...mapGetters({
        stepName: 'shortStepName'
      })
    }
  };
</script>

<style lang="scss">
  .app__footer {
    display: flex;
    min-height: 54px;
    overflow: hidden;
  }

  .step {
    &__bar {
      display: flex;
      flex: 1 1 100%;
      align-items: flex-end;
      justify-content: center;
      font: $font-spacious 'Soleil', sans-serif;
      color: $blank;
      background-color: $light-blue;
      border-color: $light-blue;
      border-style: solid;
      border-radius: 4px 4px 0 0;
      box-shadow: 0 0 12px $pale-blue;
    }

    &__index {
      align-self: center;
      padding: 0 10px;
      color: $pale-blue;
    }

    &__name {
      padding: 5px 10px 3px 10px;
      text-align: center;
    }
  }
</style>
