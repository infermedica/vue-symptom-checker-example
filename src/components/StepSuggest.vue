<template>
  <Step>
    <div class="step__subtitle">Collect all related symptoms</div>
    <h5 class="step__caption">Check if any of below symptoms apply to you?</h5>
    <div class="step__center">
      <BaseCheckbox v-for="suggestion in suggestions" :key="suggestion.id"
                    v-model="selectedSuggestions" :value-check="suggestion.id"
                    :label="suggestion.common_name"/>
      <Icon v-if="isLoading" name="spinner" spin/>
    </div>
  </Step>
</template>

<script>
  import {mapState} from 'vuex';
  import BaseCheckbox from './common/BaseCheckbox';

  export default {
    name: 'StepSuggest',
    computed: {
      ...mapState({
        isLoading: (state) => state.api.isLoading,
        suggestions: (state) => state.api.suggestions
      }),
      selectedSuggestions: {
        get() {
          return this.$store.getters.selectedSuggestions;
        },
        set(value) {
          this.$store.dispatch('setSuggestionEvidence', value);
        }
      }
    },
    beforeCreate() {
      this.$store.dispatch('suggest');
    },
    components: {
      BaseCheckbox
    }
  };
</script>
