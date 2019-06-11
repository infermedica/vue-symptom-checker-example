<template>
  <div class="question__group">
    <h5 class="question__title">{{ question.text }}</h5>
    <div>
      <BaseCheckbox v-for="item in question.items" :key="item.id"
                    v-model="answers" :value-check="item.id" :selected="item.selected"
                    :label="item.name"/>
    </div>
  </div>
</template>

<script>
  import BaseCheckbox from '../common/BaseCheckbox';

  export default {
    name: 'QuestionGroupMultiple',
    props: {
      question: {
        type: Object,
        default: Object
      },
      selected: {
        type: Array,
        default: Array
      }
    },
    data() {
      return {
        answers: this.selected
      };
    },
    watch: {
      answers() {
        this.$emit('answer', this.answers);
      }
    },
    components: {
      BaseCheckbox
    }
  };
</script>
