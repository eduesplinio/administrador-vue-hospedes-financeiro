<template>
  <v-app>
    <!-- Barra de Navegação Superior -->
    <v-app-bar app color="">
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
      app
      :mini-variant="miniVariant"
      :permanent="true"
      class="my-drawer"
    >
      <v-list>
        <v-list-item @click="toggleDrawer">
          <v-icon>{{ drawer ? "mdi-menu-open" : "mdi-menu-close" }}</v-icon>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/') }"
          @click="navigateTo('/')"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-home</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Principal</v-list-item-title>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/hospedes') }"
          @click="navigateTo('/hospedes')"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Hóspedes</v-list-item-title>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/flats') }"
          @click="navigateTo('/flats')"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Flats</v-list-item-title>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/financas') }"
          @click="navigateTo('/financas')"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-currency-usd</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Finanças</v-list-item-title>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/lembretes') }"
          @click="navigateTo('/lembretes')"
        >
          <v-list-item-icon>
            <v-icon color="primary">mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="!miniVariant">Lembretes</v-list-item-title>
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
        © {{ currentYear }} Direitos Reservados
        <v-img
          class="footer-logo"
          src=""
          max-height="100%"
          max-width="20px"
        ></v-img>
      </v-col>
    </v-footer>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      drawer: true,
      miniVariant: false,
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
    this.$vuetify.theme.dark = this.darkTheme;
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
      this.drawer = !this.drawer;
      this.miniVariant = !this.drawer;
    },

    closeDrawer() {
      this.drawer = false;
      this.miniVariant = true;
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
    navigateTo(route) {
      this.$router.push(route);
    },
    isSelected(route) {
      return this.$route.path === route;
    },
  },
};
</script>

<style scoped>
.my-drawer {
  margin-top: -10px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.footer-content {
  font-size: 13px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-align: right;
  color: #f0ead6;
  background-color: var(--primary-color);
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

/* Estilo para hover e item selecionado */
.v-list-item {
  transition: none !important;
}

.v-list-item:hover {
  transition: none !important;
}

.v-list-item-icon {
  transition: none !important;
  align-items: center;
  justify-content: center;
}

.v-list-item-title {
  transition: none !important;
}

.selected-item {
  transition: none !important;
}
</style>
