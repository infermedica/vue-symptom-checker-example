<template>
  <div class="condition-list">
    <div v-for="condition in conditions" :key="condition.id">
      <div class="condition-list__item">
        <h5 class="condition-list__header"> {{ condition.common_name }}&nbsp; </h5>
        <div v-if="condition.probability > 0.2" @click="explain(condition.id)" class="condition-list--explain">
          explain
          <Icon name="eye" class="icon__explain"/>
        </div>
      </div>
      <div class="condition-list__progress progress">
        <div :style="getCalculatedWidth(condition.probability, 'width')"
             :aria-valuenow="condition.probability * 100"
             aria-valuemin="0" aria-valuemax="100" class="progress__bar">
          {{ getCalculatedWidth(condition.probability) }}
        </div>
      </div>
      <div class="condition-list__explain explain">
        <div v-if="condition.supporting_evidence && condition.supporting_evidence.length > 0"
             class="explain__evidences">
          <div class="explain__header">
            <Icon name="plus-square" class="icon__plus"/>Supporting Evidence
          </div>
          <div v-for="exp in condition.supporting_evidence" :key="exp.id" class="explain__condition">
            {{ exp.common_name }}
          </div>
        </div>
        <div v-if="condition.conflicting_evidence && condition.conflicting_evidence.length > 0"
             class="explain__evidences">
          <div class="explain__header">
            <Icon name="minus-square" class="icon__minus"/>Conflicting Evidence
          </div>
          <div v-for="exp in condition.conflicting_evidence" :key="exp.id" class="explain__condition">
            {{ exp.common_name }}
          </div>
        </div>
        <div v-if="condition.unconfirmed_evidence && condition.unconfirmed_evidence.length > 0"
             class="explain__evidences">
          <div class="explain__header">
            <Icon name="question" class="icon__question"/>Unconfirmed Evidence
          </div>
          <div v-for="exp in condition.unconfirmed_evidence" :key="exp.id" class="explain__condition">
            {{ exp.common_name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'ConditionList',
    props: {
      conditions: {
        type: Array,
        default: Array
      }
    },
    methods: {
      getCalculatedWidth(probability, width) {
        let percentage = probability * 100;
        if (width === undefined) {
          percentage = Math.round(percentage * 100) / 100;
          return `${percentage}%`;
        }
        return `${width}:${percentage}%;`;
      },
      explain(target) {
        this.$store.dispatch('explain', target);
      }
    }
  };
</script>

<style lang="scss">
  .condition-list {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__item {
      display: flex;
      flex-wrap: wrap;
      margin: 15px 0 3px 0;
    }

    &__header {
      margin: 0;
      font-size: $font-regular;
    }

    &--explain {
      display: flex;
      align-items: center;
      justify-content: center;
      color: $main-blue;
      cursor: pointer;
      transition: color 0.2s ease;

      &:hover {
        color: $dull-blue;
      }
    }

    &__progress {
      display: flex;
      width: 100%;
      background-color: $pale-grey;
      border-radius: 4px;
    }

    &__explain {
      display: flex;
      flex-wrap: wrap;
      align-items: flex-start;
    }
  }

  .progress {
    &__bar {
      color: $blank;
      text-align: center;
      background-color: $dull-blue;
      border-radius: 4px;
    }
  }

  .explain {
    &__evidences {
      display: flex;
      flex: 1;
      flex-direction: column;
    }

    &__header {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      min-width: 200px;
      margin: 8px 0 4px 0;
      font-weight: bold;
      color: $dull-blue;
    }

    &__condition {
      margin: 0 5px 0 2px;
      color: $dark-grey;
    }
  }

  .icon {
    &__explain {
      margin-left: 5px;
    }

    &__plus,
    &__minus,
    &__question {
      margin: 0 5px 2px 2px;
    }

    &__plus {
      color: $success;
    }

    &__minus {
      color: $error;
    }

    &__question {
      color: $unclear;
    }
  }
</style>
