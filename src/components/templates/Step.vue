<template>
  <div class="step__container">
    <div class="step__content">
      <slot>YOUR CONTENT WILL GO HERE AND THIS TEXT WILL DISAPPEAR!</slot>
    </div>
    <div class="step__footer">
      <transition name="fade">
        <button v-if="index !== 0" @click="previousAction()" class="step__back">
          Back
        </button>
      </transition>
      <button v-if="displayNextQuestion" :disabled="disableNext"
              @click="diagnose" class="main__button">
        Next question &gt;
      </button>
      <button v-else-if="step !== 'StepDiagnosis'"
              :disabled="step === 'StepParse' && parsedSymptoms.length === 0"
              :title="btnPopoverText" @click="$store.dispatch('nextStep')" class="main__button">
        {{ nextStepText }} &gt;
      </button>
    </div>
  </div>
</template>

<script>
  import {mapGetters, mapState} from 'vuex';

  export default {
    name: 'Step',
    props: {
      disableNext: {
        type: Boolean,
        default: true
      }
    },
    computed: {
      ...mapGetters({
        index: 'activeStepIndex',
        parsedSymptoms: 'parsedSymptoms'
      }),
      ...mapState({
        step: (state) => state.steps.activeStep,
        shouldStop: (state) => state.api.shouldStop,
        question: (state) => state.api.question,
        questionCounter: (state) => state.api.questionCounter
      }),
      displayNextQuestion() {
        return (this.step === 'StepDiagnosis' && this.question && this.shouldStop !== true);
      },
      btnPopoverText() {
        if (this.parsedSymptoms.length === 0 && this.step === 'StepParse') {
          return 'Enter at least one symptom';
        }
        return 'Click for next step';
      },
      nextStepText() {
        return (this.step === 'StepWelcome') ? 'Start Interview' : 'Next';
      }
    },
    methods: {
      previousAction() {
        if (this.step === 'StepDiagnosis' && this.questionCounter !== 0
          && !this.shouldStop) {
          this.$store.dispatch('previousQuestion');
        } else {
          this.$store.dispatch('removeCounterEvidences');
          this.$store.dispatch('previousStep');
        }
      },
      nextStep() {
        this.$store.dispatch('nextStep');
      },
      diagnose() {
        if (this.question.type === 'group_single'
          || this.question.type === 'group_multiple') {
          this.$emit('answerGroup');
        } else {
          this.$store.dispatch('diagnosis');
        }
      }
    }
  };
</script>

<style lang="scss">
  .step {
    &__container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
    }

    &__content {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
      width: 90%;
      min-height: 30rem;

      @media (min-width: 560px) {
        width: 80%;
      }
    }

    &__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 80%;
      margin: 20px 0;

      @media (min-width: 560px) {
        width: 52%;
      }
    }

    &__back {
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: $font-regular;
      color: $light-grey;
      cursor: pointer;
      background: transparent;
      border: 1px solid $main-blue;
      outline: 0;
      transition: color 0.2s ease;
      padding: 10px 15px;
      border-radius: 4px;
      transition: color 0.2s, background-color 0.2s, box-shadow 0.2s;

      &:hover {
        color: $dull-blue;
      }

      &:hover:not(:disabled) {
        color: $dim-grey;
        background-color: $dull-blue;
        box-shadow: 0 0 10px $dull-blue;
      }
    }
  }
</style>
