<template>
  <v-row justify="center">
    <v-col cols="12" md="10" lg="12">
      <v-container>
        <!-- Espaçamento no topo -->
        <div class="mt-5"></div>

        <!-- Título Hóspedes com ícone -->
        <v-row align="center">
          <v-col cols="12" sm="auto" class="d-flex align-items-center">
            <v-icon large>mdi-account-group</v-icon>
            <h2 class="ml-2 mb-0 font-weight-normal">Hóspedes</h2>
          </v-col>
        </v-row>

        <!-- Linha horizontal personalizada -->
        <v-divider class="my-3" :style="{ backgroundColor: '' }"></v-divider>

        <!-- Botão de Novo Hóspede -->
        <v-btn
          class="action-button mb-7 mt-5"
          color=""
          @click="openNewHospedeDialog"
        >
          Novo Hóspede
        </v-btn>
        <hospede-manager ref="hospedeManager"></hospede-manager>

        <!-- Tabela de Hóspedes -->
        <v-data-table
          :headers="headers"
          :items="hospedes"
          :loading="loading"
          class="elevation-1"
          mobile-breakpoint="500"
          dense
        >
          <template v-slot:item="{ item }">
            <tr>
              <td>{{ item.id }}</td>
              <td>{{ item.nome }}</td>
              <td class="d-none d-md-table-cell">{{ item.cpfOuCnpj }}</td>
              <td class="d-none d-md-table-cell">{{ item.email }}</td>
              <td class="d-none d-md-table-cell">{{ item.telefone }}</td>
              <td>{{ item.dataCheckIn | formatDate }}</td>
              <td>{{ item.dataCheckOut | formatDate }}</td>

              <td>
                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="editarHospede(item)"
                    >
                      <v-icon>mdi-pencil-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Editar Hóspede</span>
                </v-tooltip>

                <v-tooltip bottom>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      icon
                      v-bind="attrs"
                      v-on="on"
                      @click="openDeleteDialog(item)"
                    >
                      <v-icon>mdi-delete-outline</v-icon>
                    </v-btn>
                  </template>
                  <span>Excluir Hóspede</span>
                </v-tooltip>
              </td>
            </tr>
          </template>
        </v-data-table>

        <!-- Diálogo de Confirmação de Exclusão -->
        <v-dialog v-model="deleteDialog" persistent max-width="500px">
          <v-card>
            <v-card-title class="d-flex justify-space-between">
              Excluir Hóspede
              <v-btn icon @click="closeDeleteDialog">
                <v-icon>mdi-close</v-icon>
              </v-btn>
            </v-card-title>
            <v-card-text>
              Você tem certeza que deseja excluir o hóspede
              <strong>{{ selectedHospede?.nome }}</strong
              >?
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn class="delete-button" text @click="deletarHospede">
                Excluir Hóspede
              </v-btn>
              <v-btn class="cancel-button" text @click="closeDeleteDialog">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapActions, mapState } from "vuex";
import HospedeManager from "@/views/HospedeManager.vue";

export default {
  components: {
    HospedeManager,
  },
  data() {
    return {
      deleteDialog: false,
      selectedHospede: null,
      loading: false,
      headers: [
        { text: "ID", value: "id" },
        { text: "Nome", value: "nome" },
        { text: "CPF/CNPJ", value: "cpfOuCnpj" },
        { text: "Email", value: "email" },
        { text: "Telefone", value: "telefone" },
        { text: "Check-in", value: "dataCheckIn", sortable: false },
        { text: "Check-out", value: "dataCheckOut", sortable: false },
        { text: "Ações", value: "actions", sortable: false },
      ],
    };
  },
  computed: {
    ...mapState(["hospedes"]),
  },
  methods: {
    ...mapActions([
      "fetchHospedes",
      "deleteHospede",
      "createHospede",
      "updateHospede",
    ]),
    openNewHospedeDialog() {
      this.$refs.hospedeManager.openDialog();
    },
    editarHospede(hospede) {
      this.$refs.hospedeManager.openDialog(true);
      this.$nextTick(() => {
        this.$refs.hospedeManager.hospede = { ...hospede };
      });
    },
    openDeleteDialog(hospede) {
      this.selectedHospede = hospede;
      this.deleteDialog = true;
    },

    closeDeleteDialog() {
      this.deleteDialog = false;
      this.selectedHospede = null;
    },
    deletarHospede() {
      if (this.selectedHospede) {
        this.loading = true;
        this.deleteHospede(this.selectedHospede.id)
          .then(() => {
            this.closeDeleteDialog();
          })
          .catch((error) => {
            console.error("Erro ao excluir o hóspede:", error);
            if (error.response && error.response.status === 401) {
              this.$router.push("/login");
              alert("Sessão expirada, por favor faça login novamente.");
            } else {
              alert("Erro ao excluir o hóspede. Por favor, tente novamente.");
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },

    // Função para salvar o hóspede
    salvarHospede() {
      if (this.$refs.hospedeManager.$refs.form.validate()) {
        const hospedeData = { ...this.$refs.hospedeManager.hospede };
        if (this.$refs.hospedeManager.editMode) {
          // Editando um hóspede existente
          this.updateHospede(hospedeData)
            .then(() => {
              this.$refs.hospedeManager.closeDialog();
            })
            .catch((error) => {
              console.error("Erro ao atualizar o hóspede:", error);
            });
        } else {
          // Criando um novo hóspede
          this.createHospede(hospedeData)
            .then(() => {
              this.$refs.hospedeManager.closeDialog();
            })
            .catch((error) => {
              console.error("Erro ao criar o hóspede:", error);
            });
        }
      }
    },
  },

  filters: {
    formatDate(value) {
      if (value) {
        return new Intl.DateTimeFormat("pt-BR").format(new Date(value));
      }
    },
  },
  created() {
    this.fetchHospedes();
  },
};
</script>

<style scoped></style>