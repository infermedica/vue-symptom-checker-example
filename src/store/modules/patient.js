export default {

  state: {
    sex: 'male',
    age: 30,
    evidence: []
  },

  mutations: {
    SET_SEX(state, sex) {
      state.sex = sex;
    },
    SET_AGE(state, age) {
      state.age = age;
    },
    ADD_EVIDENCE(state, evidence) {
      state.evidence.push(evidence);
    },
    REMOVE_EVIDENCE(state, index) {
      state.evidence.splice(index, 1);
    },
    SET_EVIDENCES(state, evidences) {
      state.evidence = evidences;
    }
  }
};
