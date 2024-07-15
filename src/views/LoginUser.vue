<template>
  <div class="login-background">
    <v-container class="fill-height justify-center align-center">
      <v-card
        class="pa-10 elevation-5"
        style="padding: 40px; max-width: 350px"
        rounded-lg
      >
        <div class="image-container">
          <img src="logo_nome.svg" style="width: 250px" />
        </div>
        <v-card-text>
          <v-form ref="form">
            <v-text-field
              label="E-mail"
              prepend-icon="mdi-email"
              type="email"
              v-model="email"
              :rules="emailRules"
              @input="clearErrorMessage"
              required
            ></v-text-field>
            <v-text-field
              label="Senha"
              prepend-icon="mdi-lock"
              type="password"
              v-model="password"
              :rules="passwordRules"
              @input="clearErrorMessage"
              required
            ></v-text-field>

            <div class="mt-5">
              <v-btn @click="validateAndLogin" color="primary" block
                >Entrar</v-btn
              >
            </div>
          </v-form>
          <v-alert
            type="error"
            v-if="errorMessage"
            dismissible
            @dismiss="errorMessage = ''"
          >
            {{ errorMessage }}
          </v-alert>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

<script>
import api from "@/services/api/api.js"; // Assume que 'api' é uma instância configurada do Axios

export default {
  data() {
    return {
      email: "",
      password: "",
      errorMessage: "",
      valid: false,
      emailRules: [(v) => !!v || "E-mail é obrigatório"],
      passwordRules: [(v) => !!v || "Senha é obrigatória"],
    };
  },

  methods: {
    validateAndLogin() {
      if (this.$refs.form.validate()) {
        this.loginUser();
      }
    },
    loginUser() {
      const credentials = { username: this.email, password: this.password };
      api
        .post("/api/authenticate", credentials)
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("userToken", token);
          this.$router.push("/"); // Redirecionar para a página inicial após o login
        })
        .catch((error) => {
          this.errorMessage = "";
          this.$nextTick(() => {
            this.errorMessage =
              error.response?.data?.message || "Erro na autenticação";
          });
        });
    },
    clearErrorMessage() {
      this.errorMessage = "";
    },
  },
};
</script>

<style>
.login-background {
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: url("/public/background.svg");
  background-size: cover;
  background-position: center;
  background-color: #165091;
  min-height: 100vh;
  background-repeat: no-repeat;
}

.image-container {
  display: flex;
  margin: -10px 0 10px;
  justify-content: center;
  align-items: center;
}

@media (max-width: 1000px) {
  .login-background {
    background-image: none;
    /* Remove a imagem de fundo quando a tela é menor que 1000px */
  }
}
</style>