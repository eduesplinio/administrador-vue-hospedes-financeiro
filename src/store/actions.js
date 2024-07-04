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

    criarEvento({ commit }, eventoData) {
        commit('ADICIONAR_EVENTO', eventoData);
    },
    carregarTarefas({ commit }) {
        const tarefasSalvas = localStorage.getItem('tarefas');
        if (tarefasSalvas) {
            commit('SET_TAREFAS', JSON.parse(tarefasSalvas));
        }
    },
    adicionarTarefa({ commit, state }, novaTarefa) {
        const tarefasAtualizadas = [...state.tarefas, novaTarefa];
        localStorage.setItem('tarefas', JSON.stringify(tarefasAtualizadas));
        commit('ADICIONAR_TAREFA', novaTarefa);
    },
}