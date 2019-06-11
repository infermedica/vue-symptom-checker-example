<template>
  <Step>
    <div class="step__subtitle">Determine possible risk factors</div>
    <h5 class="step__caption">Please check all that apply to you.</h5>
    <div class="step__center">
      <div v-if="riskFactors && riskFactors.length > 0">
        <BaseCheckbox v-for="riskFactor in riskFactors" :key="riskFactor.id"
                      v-model="selectedRiskFactors" :value-check="riskFactor.id"
                      :label="riskFactor.common_name"/>
      </div>
    </div>
  </Step>
</template>

<script>
  import {mapGetters} from 'vuex';
  import BaseCheckbox from './common/BaseCheckbox';

  export default {
    name: 'StepRiskFactorsCommon',
    computed: {
      ...mapGetters({
        riskFactors: 'riskFactors'
      }),
      selectedRiskFactors: {
        get() {
          return this.$store.getters.selectedRiskFactorsCommon;
        },
        set(value) {
          this.$store.dispatch('selectRiskFactors', value);
        }
      }
    },
    components: {
      BaseCheckbox
    }
  };
</script>
