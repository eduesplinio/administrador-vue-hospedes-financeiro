export default {
    loginUser({ commit }) {
        const token = "dummyToken"; // Token fictício para simular login
        const user = { id: 1, name: "Usuário Demo" }; // Usuário fictício
        localStorage.setItem('userToken', token);
        commit('SET_TOKEN', token);
        commit('SET_USER', user);
    },

    logoutUser({ commit }) {
        localStorage.removeItem('userToken');
        commit('CLEAR_USER_DATA');
    },

    fetchHospedes({ commit }) {
        const hospedesSalvos = localStorage.getItem('hospedes');
        if (hospedesSalvos) {
            commit('SET_HOSPEDES', JSON.parse(hospedesSalvos));
        }
    },

    createHospede({ commit }, novoHospede) {
        commit('ADD_HOSPEDE', novoHospede);
    },

    updateHospede({ commit }, updatedHospede) {
        commit('UPDATE_HOSPEDE', updatedHospede);
    },

    deleteHospede({ commit }, hospedeId) {
        commit('DELETE_HOSPEDE', hospedeId);
    },
};