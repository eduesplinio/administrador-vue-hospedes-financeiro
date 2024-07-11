import Vue from "vue";

export default {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  CLEAR_USER_DATA(state) {
    state.token = null;
    state.user = null;
  },
  SET_HOSPEDES(state, hospedes) {
    Vue.set(state, "hospedes", hospedes);
  },
  ADD_HOSPEDE(state, hospede) {
    state.hospedes.push(hospede);
    localStorage.setItem("hospedes", JSON.stringify(state.hospedes));
  },
  UPDATE_HOSPEDE(state, updatedHospede) {
    const index = state.hospedes.findIndex((h) => h.id === updatedHospede.id);
    if (index !== -1) {
      Vue.set(state.hospedes, index, updatedHospede);
      localStorage.setItem("hospedes", JSON.stringify(state.hospedes));
    }
  },
  DELETE_HOSPEDE(state, hospedeId) {
    state.hospedes = state.hospedes.filter((h) => h.id !== hospedeId);
    localStorage.setItem("hospedes", JSON.stringify(state.hospedes));
  },
};
