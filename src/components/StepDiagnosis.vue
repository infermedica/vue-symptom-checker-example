<template>
  <Step :disable-next="disabled" @answerGroup="answerGroup">
    <div class="step__subtitle">Diagnose patient based on answers</div>
    <div class="step__widen">
      <div v-if="shouldStop !== true && isLoading === false" class="step-diagnosis">
        <QuestionSingle v-if="question.type === 'single'" :question="question"
                        @answer="answerSingle"/>
        <QuestionGroupSingle v-else-if="question.type==='group_single'"
                             :question="question" :selected="question.selected"
                             @answer="answerGroup"/>
        <QuestionGroupMultiple v-else-if="question.type==='group_multiple'"
                               :question="question" :selected="question.selected"
                               @answer="answerGroup"/>
      </div>
      <div v-else-if="shouldStop === true" class="step__final">
        <Triage v-if="triage && triage.triage_level" :triage="triage"/>
        <ConditionList v-if="conditions.length > 0" :conditions="conditions"/>
      </div>
      <Icon v-if="isLoading" name="spinner" spin class="icon__loading"/>
    </div>
  </Step>
</template>

<script>
  import {mapState} from 'vuex';
  import QuestionSingle from './templates/QuestionSingle';
  import QuestionGroupSingle from './templates/QuestionGroupSingle';
  import QuestionGroupMultiple from './templates/QuestionGroupMultiple';
  import ConditionList from './templates/ConditionList';
  import Triage from './templates/Triage';

  export default {
    name: 'StepDiagnosis',
    data() {
      return {
        answer: ''
      };
    },
    computed: {
      ...mapState({
        isLoading: (state) => state.api.isLoading,
        shouldStop: (state) => state.api.shouldStop,
        question: (state) => state.api.question,
        conditions: (state) => state.api.conditions,
        triage: (state) => state.api.triage
      }),
      disabled() {
        if (this.question.selected) {
          return !(this.question.selected.length > 0);
        }
        return this.answer.length === 0;
      }
    },
    methods: {
      answerSingle(value) {
        this.$store.dispatch('answerSingle', value);
      },
      answerGroup(value) {
        if (value) {
          this.answer = value;
        } else {
          if (this.question.selected) {
            if (this.question.type === 'group_single') {
              this.answer = {id: this.question.selected};
            } else {
              this.answer = this.question.selected;
            }
          } else if (this.answer === '') {
            return;
          }
          this.$store.dispatch('answerGroup', this.answer);
          this.answer = '';
        }
      }
    },
    beforeCreate() {
      this.$store.dispatch('diagnosis');
    },
    components: {
      QuestionSingle,
      QuestionGroupSingle,
      QuestionGroupMultiple,
      ConditionList,
      Triage
    }
  };
</script>

<style lang="scss">
  .step-diagnosis {
    min-height: 13rem;
  }

  .icon__loading {
    align-self: center;
    min-height: 13rem;
  }
</style>
