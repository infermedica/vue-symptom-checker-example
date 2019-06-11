import Vue from 'vue';
import Vuex from 'vuex';
import api from './modules/api';
import actions from './actions';
import steps from './modules/steps';
import patient from './modules/patient';

Vue.use(Vuex);

export default new Vuex.Store({
  actions,
  modules: {
    api,
    steps,
    patient
  }
});
