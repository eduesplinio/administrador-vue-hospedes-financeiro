<template>
  <v-app>
    <!-- Barra de Navegação Superior -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="toggleDrawer"></v-app-bar-nav-icon>
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDarkTheme">
        <v-icon>{{
          darkTheme ? "mdi-weather-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <v-btn icon @click="performLogout">
        <v-icon>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Menu Lateral -->
    <v-navigation-drawer
      v-model="drawer"
      app
      :mini-variant.sync="miniVariant"
      permanent
    >
      <v-list>
        <v-list-item link to="/">
          <v-list-item-icon>
            <v-icon color="primary">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Principal</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/hospedes">
          <v-list-item-icon>
            <v-icon color="primary">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Hóspedes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/flats">
          <v-list-item-icon>
            <v-icon color="primary">mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Flats</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/financas">
          <v-list-item-icon>
            <v-icon color="primary">mdi-currency-usd</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Finanças</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/lembretes">
          <v-list-item-icon>
            <v-icon color="primary">mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Lembretes</v-list-item-title>
        </v-list-item>
        <v-list-item link to="/meusAgendamentos">
          <v-list-item-icon>
            <v-icon color="primary">mdi-calendar-check</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant"
            >Meus Agendamentos</v-list-item-title
          >
        </v-list-item>
        <v-list-item link to="/forumEmpresa">
          <v-list-item-icon>
            <v-icon color="primary">mdi-forum</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Fórum</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo Principal -->
    <v-main>
      <router-view />
    </v-main>

    <!-- Rodapé -->
    <v-footer padless fixed app>
      <v-col class="footer-content" cols="12">
        © {{ currentYear }} - Esplin Software | Direitos Reservados
        <v-img
          class="footer-logo"
          src=""
          max-height="100%"
          max-width="20px"
        ></v-img>
      </v-col>
    </v-footer>

    <!-- Caixa de Diálogo de Feedback -->
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-form ref="form" v-model="valid" lazy-validation>
          <v-card-title>
            <span class="headline">Deixe seu Feedback sobre a Empresa!</span>
          </v-card-title>
          <v-card-text>
            <v-text-field
              v-model="titulo"
              prepend-icon="mdi-rename-outline"
              label="Título do Feedback"
              :rules="[rules.required]"
            ></v-text-field>
            <v-textarea
              v-model="conteudo"
              prepend-icon="mdi-subtitles-outline"
              label="Conteúdo do Feedback"
              :rules="[rules.required]"
            ></v-textarea>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="cancelFeedback"
              >Cancelar</v-btn
            >
            <v-btn color="blue darken-1" text @click="submitFeedback"
              >Enviar</v-btn
            >
          </v-card-actions>
        </v-form>
      </v-card>
    </v-dialog>

    <!-- Snackbar para confirmação de feedback -->
    <v-snackbar
      v-model="snackbar"
      :timeout="3000"
      class="centered-snackbar"
      color="green"
    >
      Agradecemos o seu feedback!
    </v-snackbar>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: false, // Inicialmente visível
      miniVariant: false, // Controla a variação mini do menu lateral
      darkTheme: false,
      dialog: false,
      snackbar: false,
      titulo: "",
      conteudo: "",
      valid: false,
      rules: {
        required: (value) => !!value || "Campo obrigatório",
      },
    };
  },
  created() {
    this.$vuetify.theme.dark = this.darkTheme; // Aplica o tema claro ao criar o componente
  },
  computed: {
    currentYear() {
      return new Date().getFullYear();
    },
    isMobile() {
      return this.$vuetify.breakpoint.xsOnly;
    },
    shouldShowNavBar() {
      const isAuthenticated = !!localStorage.getItem("userToken");
      const requiresAuth = this.$route.matched.some(
        (record) => record.meta.requiresAuth
      );
      return isAuthenticated && requiresAuth;
    },
  },
  watch: {
    darkTheme(newVal) {
      this.$vuetify.theme.dark = newVal;
    },
  },
  methods: {
    ...mapActions(["loginUser", "logoutUser"]),

    toggleDrawer() {
      this.miniVariant = !this.miniVariant;
    },
    toggleDarkTheme() {
      this.darkTheme = !this.darkTheme;
    },
    performLogout() {
      localStorage.removeItem("userToken");
      localStorage.removeItem("userInfo");
      this.$router.push("/login");
    },
    goToHelpSite() {
      window.open("https://unifeso.gitbook.io/orange-dragon", "_blank");
    },
    openFeedbackDialog() {
      this.dialog = true;
    },
    cancelFeedback() {
      this.dialog = false;
      this.resetForm();
    },
    resetForm() {
      this.$refs.form.reset();
    },
    submitFeedback() {
      if (this.$refs.form.validate()) {
        const feedback = {
          titulo: this.titulo,
          conteudo: this.conteudo,
        };
        console.log(feedback);
        this.dialog = false;
        this.snackbar = true;
        this.resetForm();
      }
    },
  },
};
</script>

<style scoped>
.footer-content {
  font-size: 13px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  color: #f0ead6;
  background-color: #f17ea1; /* Cor de fundo aplicada tanto para o tema claro quanto para o escuro */
  position: relative;
}

.footer-content::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background-color: #f0ead6; /* Linha decorativa aplicada em ambos os temas */
}

.footer-logo {
  height: auto;
  max-width: 100px;
  margin-left: auto;
}

.menu-button {
  font-weight: normal;
  text-transform: none;
  font-size: 15px;
}

.logo-image {
  max-height: 300px;
  max-width: 165px;
  margin-left: 5px;
}

.v-app-bar {
  justify-content: space-between;
}

.centered-snackbar {
  align-items: center;
}
</style>
