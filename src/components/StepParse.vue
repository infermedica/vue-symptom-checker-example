<template>
  <Step>
    <div class="step__subtitle">Gather initial symptoms from patient</div>
    <div class="step-parse">
      <h5 class="step-parse__title">What concerns you most about your health?</h5>
      <div>
        <p>We will try to recognize your symptoms using Natural Language Processing algorithms.</p>
      </div>
      <textarea @input="suggest($event.target.value)" placeholder="e.g. I've got headache" class="step-parse__area">
      </textarea>
      <div v-if="parsedSymptoms.length > 0" class="step-parse__identified">Identified symptoms:</div>
      <ul v-if="parsedSymptoms.length > 0" class="step-parse__list">
        <li v-for="symptom in parsedSymptoms" :key="symptom.id" class="step-parse__item">
          <Icon name="plus-square" class="step-parse__icon"/>
          &nbsp;{{ symptom.common_name }}
          <button @click="removeParsedSymptom(symptom.id)" type="button" aria-label="Close" class="step-parse__remove">
            <Icon name="times" scale="0.85"/>
          </button>
        </li>
      </ul>
      <Icon v-if="isLoading" name="spinner" spin class="step-parse__load"/>
      <div class="step-parse__text">
        This screen uses our NLP engine to find symptoms in a written text.
        Evidence found in text will be marked as initial which is important to
        our engine. Please read more about initial evidence
        <a href="https://developer.infermedica.com/docs/diagnosis#gathering-initial-evidence" target="_blank">here</a>.
      </div>
    </div>
  </Step>
</template>

<script>
  import {mapState, mapActions, mapGetters} from 'vuex';
  import debounce from 'lodash/debounce';

  export default {
    name: 'StepParse',
    computed: {
      ...mapState({
        isLoading: (state) => state.api.isLoading
      }),
      ...mapGetters({
        parsedSymptoms: 'parsedSymptoms'
      })
    },
    methods: {
      ...mapActions(
        ['removeParsedSymptom']
      ),
      suggest: debounce(function (value) {
        if (value.length > 0) {
          this.$store.dispatch('parse', value);
        }
      }, 500)
    }
  };
</script>

<style lang="scss">
  .step-parse {
    display: flex;
    flex-direction: column;
    align-self: center;
    width: 80%;

    @media (min-width: 1000px) {
      width: 60%;
    }

    &__title {
      display: flex;
      margin: 5px 0;
      font-size: $font-grand;
      color: $dull-blue;
    }

    &__remove {
      color: $pale-grey;
      cursor: pointer;
      background: transparent;
      border: 0;
      transition: color 0.2s ease;

      &:hover {
        color: $light-grey;
      }
    }

    &__area {
      display: flex;
      min-width: 8rem;
      height: 10rem;
      max-height: 20rem;
      padding: 6px 10px;
      font-size: $font-regular;
      border: 1px solid $pale-grey;
      border-radius: 5px;
    }

    &__identified {
      margin: 15px 0 2px 0;
      font-weight: bold;
      color: $dull-blue;
    }

    &__load {
      display: flex;
      margin: 15px 0;
    }

    &__list {
      display: flex;
      flex-direction: column;
      padding: 3px;
      margin: 0;
      list-style: none;
    }

    &__item {
      display: flex;
      flex: 0 0 auto;
      align-items: center;
      margin-bottom: 5px;
    }

    &__icon {
      color: $main-blue;
    }

    &__text {
      margin-top: 10px;
      color: $light-grey;
    }
  }
</style>
