<template>
  <div class="question__group">
    <h5 class="question__title">{{ question.text }}</h5>
    <div>
      <BaseRadio v-for="item in question.items" :key="item.id" v-model="answer"
                 :check-value="item.id" :selected="item.selected" :label="item.name"/>
    </div>
  </div>
</template>

<script>
  import BaseRadio from '../common/BaseRadio';

  export default {
    props: {
      question: {
        type: Object,
        default: Object
      },
      selected: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        answer: this.selected
      };
    },
    watch: {
      answer() {
        const item = this.question.items.find((item) => {
          return item.id === this.answer;
        });
        this.$emit('answer', item);
      }
    },
    components: {
      BaseRadio
    }
  };
</script>
