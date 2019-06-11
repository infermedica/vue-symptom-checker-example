<template>
  <Step>
    <div class="step__subtitle">Collect geographical risk factors</div>
    <h5 class="step__caption">Please check all that apply to you</h5>
    <div v-if="riskCountries && riskCountries.length > 0" class="step__center">
      <BaseCheckbox v-for="riskCountry in riskCountries" :key="riskCountry.id"
                    v-model="selectedRiskCountries"
                    :value-check="riskCountry.id"
                    :label="riskCountry.common_name"/>
    </div>
  </Step>
</template>

<script>
  import {mapGetters} from 'vuex';
  import BaseCheckbox from './common/BaseCheckbox';

  export default {
    name: 'StepRiskFactorsMap',
    computed: {
      ...mapGetters({
        riskCountries: 'riskCountries'
      }),
      selectedRiskCountries: {
        get() {
          return this.$store.getters.selectedRiskFactorsMap;
        },
        set(value) {
          this.$store.dispatch('selectRiskCountries', value);
        }
      }
    },
    components: {
      BaseCheckbox
    }
  };
</script>
