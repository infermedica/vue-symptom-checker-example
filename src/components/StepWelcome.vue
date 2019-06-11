<template>
  <Step>
    <div class="step-welcome">
      <div class="step-welcome__header">
        <div class="step-welcome__title">Welcome to Symptom Checker Demo!</div>
      </div>
      <ApiCredentials/>
      <div class="step-welcome__info">
        <div class="info__text">
          Grab the source code and guide of this example on our
          <div class="info__link">
            <Icon name="brands/github" class="icon__welcome"/>
            <a target="_blank" href="https://github.com/infermedica" class="info__link--github">GitHub page</a>
          </div>
        </div>
      </div>
      <div class="step-welcome__info">
        <div>
          Familiarize yourself with Infermedica API on our developer
          <a target="_blank" href="https://developer.infermedica.com/docs/introduction">portal</a>
        </div>
      </div>
    </div>
  </Step>
</template>

<script>
  import {mapGetters} from 'vuex';
  import ApiCredentials from './templates/ApiCredentials';

  export default {
    name: 'StepWelcome',
    computed: {
      ...mapGetters({
        stepName: 'shortStepName',
        stepIndex: 'getActiveStepIndex'
      })
    },
    components: {
      ApiCredentials
    }
  };
</script>

<style lang="scss">
  .step-welcome {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 80%;
    overflow: hidden;

    &__header {
      position: relative;
      display: flex;
    }

    &__title {
      font: $font-huge 'Soleil', sans-serif;
      color: $dull-blue;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: flex-start;
      font-size: $font-regular;
      line-height: $font-big;
      color: $dark-blue;
    }
  }

  .info {
    &__text {
      display: flex;
      flex-wrap: wrap;
    }

    &__link {
      display: inline-flex;
      flex: 1 0 auto;
      flex-wrap: wrap;
      align-items: center;
    }

    &--github {
      padding-right: 5px;
    }
  }

  .icon__welcome {
    margin: 0 5px;
  }
</style>
