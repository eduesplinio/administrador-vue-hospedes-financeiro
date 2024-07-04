import Vue from 'vue';

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
    ADICIONAR_TAREFA(state, novaTarefa) {
        state.tarefas.push(novaTarefa);
    },
    setTarefas(state, tarefas) {
        Vue.set(state, 'tarefas', tarefas);
    },
    ADICIONAR_EVENTO(state, novoEvento) {
        state.eventos.push(novoEvento);
    },
}
