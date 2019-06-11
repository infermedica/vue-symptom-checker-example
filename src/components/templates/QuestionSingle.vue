<template>
  <div>
    <h5 class="question__title">{{ question.text }}</h5>
    <div class="question-single__form">
      <button v-for="choice in question.items[0].choices" :key="choice.id"
              class="btn mr-4"
              :class="{'question-single--yes': choice.id === 'present',
                       'question-single--no': choice.id === 'absent',
                       'question-single--unknown': choice.id === 'unknown',
                       'question-single--selected': choice.selected}"
              @click="addEvidence(choice)">
        {{ choice.label }}
      </button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'QuestionSingle',
    props: {
      question: {
        type: Object,
        default: Object
      }
    },
    methods: {
      addEvidence(value) {
        this.$emit('answer', value);
      }
    }
  };
</script>

<style lang="scss">
  .question-single {
    &--selected {
      box-shadow: 0 0 0 5px $pale-blue;
    }

    &__form {
      display: flex;
      justify-content: center;
    }

    &--yes,
    &--no,
    &--unknown {
      display: flex;
      align-items: center;
      padding: 10px 15px;
      margin: 25px;
      font-size: $font-regular;
      color: $black;
      cursor: pointer;
      background: $blank;
      border-radius: 4px;
      transition: color 0.2s, background-color 0.2s;
    }

    &--yes {
      border: 1px solid $success;

      &:hover {
        color: $blank;
        background-color: $success;
      }
    }

    &--no {
      border: 1px solid $error;

      &:hover {
        color: $blank;
        background-color: $error;
      }
    }

    &--unknown {
      border: 1px solid $unclear;

      &:hover {
        color: $blank;
        background-color: $unclear;
      }
    }
  }
</style>
