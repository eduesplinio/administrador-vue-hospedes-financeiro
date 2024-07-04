<template>
  <v-container>
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <v-icon color="secondary" class="mt-20" size="40"
          >mdi-invoice-list-outline</v-icon
        >
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">
          Minhas Tarefas
        </h2>
      </v-col>
    </v-row>
    <v-divider
      class="my-3"
      :style="{ backgroundColor: 'tertiary' }"
    ></v-divider>

    <v-row v-if="tarefas.length > 0">
      <v-col>
        <v-list dense>
          <v-list-item
            v-for="(tarefa, index) in tarefas"
            :key="index"
            @click="toggleTarefa(index)"
            class="hoverable"
          >
            <v-list-item-icon>
              <v-icon :color="tarefa.concluida ? 'blue' : 'blue'">
                {{
                  tarefa.concluida ? "mdi-check-circle" : "mdi-circle-outline"
                }}
              </v-icon>
            </v-list-item-icon>
            <v-list-item-content
              :class="{ 'text--strikethrough': tarefa.concluida }"
            >
              <v-list-item-title>{{ tarefa.nomeEvento }}</v-list-item-title>
              <v-list-item-subtitle v-if="tarefa.descricaoEvento">
                Descrição: {{ tarefa.descricaoEvento }}
              </v-list-item-subtitle>
              <v-list-item-subtitle
                v-if="tarefa.dataReuniao && tarefa.horaReuniao"
              >
                Data: {{ tarefa.dataReuniao }} - Hora: {{ tarefa.horaReuniao }}
              </v-list-item-subtitle>
              <v-list-item-subtitle v-if="tarefa.link">
                Link:
                <a :href="tarefa.link" target="_blank" @click.stop>{{
                  tarefa.link
                }}</a>
              </v-list-item-subtitle>
            </v-list-item-content>
            <v-list-item-action>
              <v-icon color="primary" @click.stop="editarTarefa(index)"
                >mdi-pencil</v-icon
              >
              <v-icon color="primary" @click.stop="confirmarExclusao(index)"
                >mdi-delete</v-icon
              >
            </v-list-item-action>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>

    <v-row v-else>
      <v-col>
        <p class="text-center">Não há tarefas agendadas.</p>
      </v-col>
    </v-row>

    <!-- Modal de Edição -->
    <v-dialog v-model="isEditDialogOpen" max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Editar Tarefa</span>
        </v-card-title>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              v-model="editForm.nomeEvento"
              prepend-icon="mdi-rename-outline"
              label="Nome do Evento"
            ></v-text-field>
            <v-text-field
              v-model="editForm.descricaoEvento"
              prepend-icon="mdi-subtitles-outline"
              label="Descrição"
            ></v-text-field>
            <v-text-field
              v-model="editForm.link"
              label="Link"
              prepend-icon="mdi-link-variant"
            ></v-text-field>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="editForm.dataReuniao"
                  prepend-icon="mdi-calendar"
                  label="Data"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  v-model="editForm.horaReuniao"
                  prepend-icon="mdi-clock-time-four-outline"
                  label="Hora"
                ></v-text-field>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isEditDialogOpen = false"
            >Cancelar</v-btn
          >
          <v-btn color="blue darken-1" text @click="salvarEdicao">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- Modal de Confirmação de Exclusão -->
    <v-dialog v-model="isDeleteDialogOpen" max-width="500px">
      <v-card>
        <v-card-title class="headline">Confirmação de Exclusão</v-card-title>
        <v-card-text
          >Tem certeza de que deseja excluir esta tarefa?</v-card-text
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="isDeleteDialogOpen = false"
            >Cancelar</v-btn
          >
          <v-btn color="red darken-1" text @click="excluirTarefa"
            >Excluir</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      isDesktop: window.innerWidth > 600,
      isEditDialogOpen: false,
      isDeleteDialogOpen: false,
      editIndex: null,
      deleteIndex: null,
      editForm: {
        nomeEvento: "",
        descricaoEvento: "",
        dataReuniao: "",
        horaReuniao: "",
        link: "",
      },
    };
  },
  computed: {
    ...mapState(["tarefas"]),
  },
  mounted() {
    window.addEventListener("resize", this.checkWidth);
    this.carregarTarefas();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkWidth);
  },
  methods: {
    ...mapActions(["carregarTarefas", "salvarTarefas"]),
    checkWidth() {
      this.isDesktop = window.innerWidth > 600;
    },
    toggleTarefa(index) {
      this.tarefas[index].concluida = !this.tarefas[index].concluida;
      this.salvarTarefas();
    },
    confirmarExclusao(index) {
      this.deleteIndex = index;
      this.isDeleteDialogOpen = true;
    },
    excluirTarefa() {
      if (this.deleteIndex !== null) {
        this.tarefas.splice(this.deleteIndex, 1);
        this.salvarTarefas();
        this.isDeleteDialogOpen = false;
      }
    },
    editarTarefa(index) {
      this.editIndex = index;
      this.editForm = { ...this.tarefas[index] };
      this.isEditDialogOpen = true;
    },
    salvarEdicao() {
      if (this.editIndex !== null) {
        // Mescla as propriedades do editForm no objeto da tarefa existente
        Object.assign(this.tarefas[this.editIndex], this.editForm);
        this.salvarTarefas();
      }
      this.isEditDialogOpen = false;
    },
    salvarTarefas() {
      localStorage.setItem("tarefas", JSON.stringify(this.tarefas));
    },
    carregarTarefas() {
      const tarefasSalvas = localStorage.getItem("tarefas");
      if (tarefasSalvas) {
        this.$store.commit("setTarefas", JSON.parse(tarefasSalvas));
      }
    },
  },
};
</script>

<style scoped>
.font-weight-normal {
  font-weight: normal;
}
.text--strikethrough {
  text-decoration: line-through;
}
.hoverable {
  cursor: pointer;
}
</style>
