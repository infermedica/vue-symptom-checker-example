import Vue from 'vue';
import constants from '../../api/constants';
import {findIndex, mapRiskFactors, selectedEvidences} from '../../utils';

export default {

  state: {
    isLoading: false,
    isError: false,
    errors: [],
    suggestions: [],
    riskFactors: [],
    shouldStop: false,
    question: {},
    conditions: [],
    triage: {},
    questionCounter: 0
  },

  getters: {
    evidenceIds: (state, getters, rootState) => {
      return rootState.patient.evidence.reduce((result, evidence) => {
        if (evidence.choice_id === 'present') {
          result.push(evidence.id);
        }
        return result;
      }, []);
    },

    riskFactors: (state) => {
      return mapRiskFactors(
        constants.defaultRiskFactors,
        state.riskFactors
      );
    },

    riskCountries: (state) => {
      return mapRiskFactors(
        constants.defaultRiskCountries,
        state.riskFactors
      );
    },

    diagnosisData: (state, getters, rootState) => {
      const evidences = rootState.patient.evidence.map((evidence) => {
        return {
          id: evidence.id,
          choice_id: evidence.choice_id,
          initial: evidence.initial,
          related: evidence.related
        };
      });
      return {
        sex: rootState.patient.sex,
        age: rootState.patient.age,
        evidence: evidences
      };
    },

    selectedRiskFactorsCommon: (state, getters, rootState) => {
      return selectedEvidences(getters.riskFactors, rootState.patient.evidence);
    },

    selectedRiskFactorsMap: (state, getters, rootState) => {
      return selectedEvidences(getters.riskCountries, rootState.patient.evidence);
    },

    selectedSuggestions: (state, getters, rootState) => {
      return selectedEvidences(state.suggestions, rootState.patient.evidence);
    },

    parsedSymptoms: (state, getters, rootState) => {
      return rootState.patient.evidence.filter((evidence) => evidence.initial === true);
    }
  },

  actions: {
    removeParsedSymptom({rootState, commit}, symptomId) {
      commit('REMOVE_EVIDENCE', findIndex(rootState.patient.evidence, symptomId));
    },

    addRiskFactors({commit}, {riskFactors, data}) {
      data
        .filter((factor) => riskFactors.includes(factor.id))
        .map((factor) => commit('PUSH_RISK_FACTOR', factor));
    },

    selectRiskFactors({dispatch, getters}, riskFactors) {
      dispatch('addRiskEvidence', {getter: getters.riskFactors, riskFactors});
    },

    selectRiskCountries({dispatch, getters}, riskFactors) {
      dispatch('addRiskEvidence', {getter: getters.riskCountries, riskFactors});
    },

    addRiskEvidence({rootState, commit}, {getter, riskFactors}) {
      getter.forEach((factor) => {
        const index = findIndex(rootState.patient.evidence, factor.id);
        if (index !== -1) {
          commit('REMOVE_EVIDENCE', index);
        }
      });
      if (riskFactors.length > 0) {
        getter.forEach((factor) => {
          if (riskFactors.includes(factor.id)) {
            commit('ADD_EVIDENCE', {id: factor.id, choice_id: 'present'});
          } else {
            commit('ADD_EVIDENCE', {id: factor.id, choice_id: 'absent'});
          }
        });
      }
    },

    setSuggestionEvidence({rootState, commit}, selectedSuggestions) {
      rootState.api.suggestions.forEach((suggestion) => {
        const evidenceId = findIndex(rootState.patient.evidence, suggestion.id);
        if (!selectedSuggestions.includes(suggestion.id) && evidenceId > -1) {
          commit('REMOVE_EVIDENCE', evidenceId);
        } else if (selectedSuggestions.includes(suggestion.id) && evidenceId === -1) {
          commit('ADD_EVIDENCE', {
            id: suggestion.id,
            choice_id: 'present',
            related: true
          });
        }
      });
    },

    answerSingle({state, commit, dispatch}, value) {
      commit('ADD_EVIDENCE', {
        id: state.question.items[0].id,
        choice_id: value.id,
        counter: state.questionCounter
      });
      commit('INCREMENT_QUESTION_COUNTER');
      dispatch('diagnosis');
    },

    answerGroup({state, commit, dispatch}, value) {
      if (Array.isArray(value)) {
        state.question.items.forEach((item) => {
          if (value.includes(item.id)) {
            commit('ADD_EVIDENCE', {id: item.id, choice_id: 'present', counter: state.questionCounter});
          } else {
            commit('ADD_EVIDENCE', {id: item.id, choice_id: 'absent', counter: state.questionCounter});
          }
        });
      } else {
        commit('ADD_EVIDENCE', {id: value.id, choice_id: 'present', counter: state.questionCounter});
      }
      commit('INCREMENT_QUESTION_COUNTER');
      dispatch('diagnosis');
    },

    previousQuestion({
      state, rootState, commit, dispatch
    }) {
      commit('DECREMENT_QUESTION_COUNTER');
      const {previousEvidences, otherEvidences} = rootState.patient.evidence.reduce((returnObject, evidence) => {
        (evidence.counter === state.questionCounter)
          ? returnObject.previousEvidences.push({
            id: evidence.id,
            choice_id: evidence.choice_id
          })
          : returnObject.otherEvidences.push({...evidence});
        return returnObject;
      }, {
        previousEvidences: [],
        otherEvidences: []
      });
      commit('SET_EVIDENCES', otherEvidences);
      dispatch('diagnosis', previousEvidences);
    },

    removeCounterEvidences({rootState, commit}) {
      const filteredEvidences = rootState.patient.evidence.filter((evidence) => !evidence.counter);
      commit('SET_EVIDENCES', filteredEvidences);
      commit('RESET_QUESTION_COUNTER');
      commit('SET_CONDITIONS', []);
      commit('SET_TRIAGE', {});
      commit('SET_SHOULD_STOP', false);
    },

    logError({commit}, error) {
      commit('SET_ERROR', error);
      commit('SET_IS_ERROR', true);
      commit('SET_LOADING', false);
      setTimeout(() => {
        commit('SET_IS_ERROR', false);
      }, 4000);
    }
  },

  mutations: {
    SET_LOADING(state, isLoading) {
      state.isLoading = isLoading;
    },
    SET_IS_ERROR(state, isError) {
      state.isError = isError;
    },
    SET_ERROR(state, error) {
      state.errors = error;
    },
    PUSH_RISK_FACTOR(state, riskFactor) {
      state.riskFactors.push(riskFactor);
    },
    SET_SUGGESTIONS(state, suggestions) {
      state.suggestions = suggestions;
    },
    SET_QUESTION(state, question) {
      state.question = question;
    },
    SET_SHOULD_STOP(state, shouldStop) {
      state.shouldStop = shouldStop;
    },
    SET_CONDITIONS(state, conditions) {
      state.conditions = conditions;
    },
    SET_CONDITION_EXPLAIN(state, {index, data}) {
      Vue.set(state.conditions[index], 'conflicting_evidence', data.conflicting_evidence);
      Vue.set(state.conditions[index], 'supporting_evidence', data.supporting_evidence);
      Vue.set(state.conditions[index], 'unconfirmed_evidence', data.unconfirmed_evidence);
    },
    RESET_CONDITION_EXPLAIN(state, index) {
      Vue.delete(state.conditions[index], 'conflicting_evidence');
      Vue.delete(state.conditions[index], 'supporting_evidence');
      Vue.delete(state.conditions[index], 'unconfirmed_evidence');
    },
    SET_TRIAGE(state, triage) {
      state.triage = triage;
    },
    INCREMENT_QUESTION_COUNTER(state) {
      state.questionCounter++;
    },
    DECREMENT_QUESTION_COUNTER(state) {
      state.questionCounter--;
    },
    RESET_QUESTION_COUNTER(state) {
      state.questionCounter = 0;
    }
  }
};
