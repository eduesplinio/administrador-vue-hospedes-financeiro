import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    hospedes: [],
    financas: [],
    pagamentos: [],
    lembretes: []
  },
  mutations: {
    // Definir mutations
  },
  actions: {
    // Definir ações
  },
  modules: {
    // Dividir store em módulos
  }
});
