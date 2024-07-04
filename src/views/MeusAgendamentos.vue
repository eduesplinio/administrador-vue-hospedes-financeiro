<template>
  <v-container>
    <div class="mt-5"></div>

    <v-row align="center">
      <v-col cols="12" sm="auto" class="d-flex align-items-center">
        <v-icon color="primary" class="mt-20" size="40"
          >mdi-calendar-today</v-icon
        >
        <h2 class="ml-2 mt-3 font-weight-normal primary--text">
          Agendar Evento
        </h2>
      </v-col>
    </v-row>

    <v-divider
      class="my-3"
      :style="{ backgroundColor: 'tertiary' }"
    ></v-divider>

    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        prepend-icon="mdi-rename-outline"
        v-model="titulo"
        label="Nome do Evento"
        :rules="[rules.required]"
      ></v-text-field>
      <v-textarea
        prepend-icon="mdi-subtitles-outline"
        v-model="descricao"
        label="Descrição"
        :rules="[rules.required]"
      ></v-textarea>

      <v-row>
        <v-col cols="12" md="6">
          <v-text-field
            v-model="linkVideo"
            label="Link"
            prepend-icon="mdi-link-variant"
            :rules="[rules.optionalUrl]"
          ></v-text-field>
        </v-col>
      </v-row>

      <v-row>
        <v-col cols="12" sm="3">
          <v-menu
            v-model="showDatePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ attrs }">
              <v-text-field
                v-model="dataReuniaoFormatted"
                label="Data"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                @click="showDatePicker = true"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="dataReuniao"
              @input="showDatePicker = false"
              no-title
              scrollable
              :locale="'pt-BR'"
            ></v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="3">
          <v-menu
            v-model="showTimePicker"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ attrs }">
              <v-text-field
                v-model="horaReuniao"
                label="Hora"
                prepend-icon="mdi-clock-time-four-outline"
                readonly
                v-bind="attrs"
                @click="showTimePicker = true"
              ></v-text-field>
            </template>
            <v-time-picker
              v-model="horaReuniao"
              @input="showTimePicker = false"
              format="24hr"
            ></v-time-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" sm="3"></v-col>
      </v-row>

      <v-btn color="primary" @click="submitEvento">Agendar</v-btn>
    </v-form>

    <!-- Snackbar -->
    <v-snackbar v-model="snackbar" :timeout="3000" color="green">
      Evento adicionado em
      <v-btn class="snackbar-link" text @click="navigateToMinhasTarefas"
        >Minhas Tarefas</v-btn
      >
    </v-snackbar>
  </v-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      titulo: "",
      descricao: "",
      dataReuniao: "",
      horaReuniao: "",
      linkVideo: "",
      valid: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório",
        optionalUrl: (value) => {
          if (!value) return true;
          const pattern =
            /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([-.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
          return pattern.test(value) || "URL inválido";
        },
      },
      showDatePicker: false,
      showTimePicker: false,
      snackbar: false,
    };
  },
  computed: {
    dataReuniaoFormatted() {
      return this.dataReuniao
        ? new Date(this.dataReuniao).toLocaleDateString("pt-BR")
        : "";
    },
  },
  methods: {
    ...mapActions(["criarEvento", "adicionarTarefa"]),
    submitEvento() {
      if (this.$refs.form.validate()) {
        const formData = {
          titulo: this.titulo,
          descricao: this.descricao,
          dataReuniao: this.dataReuniao,
          horaReuniao: this.horaReuniao,
          linkVideo: this.linkVideo,
        };
        console.log("Form Data:", formData);
        this.criarEvento(formData)
          .then(() => {
            console.log("Evento criado com sucesso");
            this.adicionarTarefa({
              nomeEvento: formData.titulo,
              descricaoEvento: formData.descricao,
              dataReuniao: this.dataReuniaoFormatted,
              horaReuniao: formData.horaReuniao,
              concluida: false,
              link: formData.linkVideo,
            });
            this.snackbar = true; // Show the snackbar
            this.resetForm();
          })
          .catch((error) => {
            console.error("Erro ao criar evento:", error);
          });
      } else {
        console.log("Formulário inválido");
      }
    },
    navigateToMinhasTarefas() {
      this.$router.push({ name: "minhasTarefas" });
    },
    resetForm() {
      this.titulo = "";
      this.descricao = "";
      this.dataReuniao = null;
      this.horaReuniao = null;
      this.linkVideo = "";
      this.valid = false;
      this.showDatePicker = false;
      this.showTimePicker = false;
      this.$refs.form.resetValidation();
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
.snackbar-link {
  text-decoration: underline;
  text-transform: capitalize;
}
</style>
