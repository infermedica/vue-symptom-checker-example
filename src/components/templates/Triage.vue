<template>
  <div class="triage">
    <h3 v-if="triage.serious.length" class="triage__header">Serious observations: {{ triage.serious.length }}</h3>
    <div v-for="item in triage.serious" :key="item.id" class="triage__item">
      <h5 :class="item.isEmergency ? 'triage__item--danger' : 'triage__item--warning'">{{ item.common_name }}</h5>
    </div>
    <h4 class="triage__header--recommended">Recommended: {{ getTriageLevel(triage.triage_level) }}</h4>
  </div>
</template>

<script>
  export default {
    name: 'Triage',
    props: {
      triage: {
        type: Object,
        default: Object
      }
    },
    methods: {
      getTriageLevel(triageLevel) {
        return triageLevel.replace('_', ' ');
      }
    }
  };
</script>

<style lang="scss">
  .triage {
    display: flex;
    flex: 1 1 100%;
    flex-direction: column;
    align-items: center;
    width: 100%;
    font-size: $font-grand;

    &__header {
      margin: 0;
      color: $dull-blue;

      &--recommended {
        margin: 5px 0;
        color: $pale-blue;
      }
    }

    &__item {
      margin: 5px 0;

      &--danger {
        margin: 0;
        color: $error;
      }

      &--warning {
        margin: 0;
        color: $unclear;
      }
    }
  }
</style>
