<template>
  <div id="app" class="app">
    <AppHeader/>
    <Error v-if="isError"/>
    <transition :name="transitionName" mode="out-in">
      <keep-alive exclude="StepDiagnosis">
        <component :is="step" :key="step"/>
      </keep-alive>
    </transition>
    <AppFooter/>
  </div>
</template>

<script>
  import {mapState} from 'vuex';
  import AppHeader from './components/AppHeader';
  import AppFooter from './components/AppFooter';
  import StepWelcome from './components/StepWelcome';
  import StepSexAge from './components/StepSexAge';
  import StepParse from './components/StepParse';
  import StepRiskFactorsCommon from './components/StepRiskFactorsCommon';
  import StepRiskFactorsMap from './components/StepRiskFactorsMap';
  import StepSuggest from './components/StepSuggest';
  import StepDiagnosis from './components/StepDiagnosis';
  import Error from './components/templates/Error';

  export default {
    name: 'App',
    computed: {
      ...mapState({
        step: (state) => state.steps.activeStep,
        transitionName: (state) => state.steps.transition,
        riskFactors: (state) => state.api.riskFactors,
        isError: (state) => state.api.isError
      })
    },
    created() {
      this.$store.dispatch('loadRiskFactors');
    },
    components: {
      AppHeader,
      AppFooter,
      StepWelcome,
      StepSexAge,
      StepParse,
      StepRiskFactorsCommon,
      StepRiskFactorsMap,
      StepSuggest,
      StepDiagnosis,
      Error
    }
  };
</script>

<style lang="scss">
  body {
    display: flex;
    flex: 1;
    min-height: 100vh;
    padding: 0;
    margin: 0;
    overflow-x: hidden;
  }

  .app {
    display: flex;
    flex: 1;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    min-height: 100vh;
    font-family: 'Arial', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: left;
  }
</style>
