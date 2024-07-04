<template>
  <v-dialog v-model="dialog" max-width="600">
    <v-card>
      <v-card-title>
        <span class="headline">Deixe seu Feedback</span>
      </v-card-title>
      <v-card-text>
        <v-text-field
          v-model="titulo"
          label="Título do Feedback"
        ></v-text-field>
        <v-textarea
          v-model="conteudo"
          label="Conteúdo do Feedback"
        ></v-textarea>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false"
          >Cancelar</v-btn
        >
        <v-btn color="blue darken-1" text @click="submitFeedback">Enviar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      titulo: "",
      conteudo: "",
    };
  },
  methods: {
    submitFeedback() {
      const feedback = {
        titulo: this.titulo,
        conteudo: this.conteudo,
      };
      console.log(feedback);
      this.titulo = "";
      this.conteudo = "";
      this.dialog = true;
    },
  },
};
</script>
