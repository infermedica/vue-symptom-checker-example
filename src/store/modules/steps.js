export default {

  state: {
    steps: [
      'StepWelcome',
      'StepSexAge',
      'StepParse',
      'StepRiskFactorsCommon',
      'StepSuggest',
      'StepRiskFactorsMap',
      'StepDiagnosis'
    ],
    activeStep: 'StepWelcome',
    transition: 'flow-in'
  },

  getters: {
    activeStepIndex: (state) => state.steps.indexOf(state.activeStep),

    nextStepIndex: (state, getters) => {
      let index = getters.activeStepIndex;
      index += 1;
      return (index > state.steps.length)
        ? (state.steps.length - 1)
        : index;
    },
    previousStepIndex: (state, getters) => {
      let index = getters.activeStepIndex;
      index -= 1;
      return (index < 0) ? 0 : index;
    },

    shortStepName: (state) => {
      return state.activeStep.replace(/([a-zA-Z])(?=[A-Z])/g, '$1 ');
    }
  },

  mutations: {
    NEXT_STEP(state, stepId) {
      state.activeStep = state.steps[stepId];
    },
    TRANSITION_NAME(state, name) {
      state.transition = name;
    }
  },

  actions: {
    nextStep({getters, commit}) {
      commit('TRANSITION_NAME', 'flow-in');
      commit('NEXT_STEP', getters.nextStepIndex);
    },
    previousStep({getters, commit}) {
      commit('TRANSITION_NAME', 'flow-out');
      commit('NEXT_STEP', getters.previousStepIndex);
    }
  }
};
