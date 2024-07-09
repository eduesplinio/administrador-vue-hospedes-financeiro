<template>
  <v-app>
    <!-- Barra de Navegação Superior -->
    <v-app-bar app color="">
      <v-spacer></v-spacer>
      <v-btn icon @click="toggleDarkTheme">
        <v-icon>{{
          darkTheme ? "mdi-white-balance-sunny" : "mdi-weather-night"
        }}</v-icon>
      </v-btn>
      <v-btn icon @click="performLogout">
@@ -15,56 +14,60 @@
    </v-app-bar>

    <!-- Menu Lateral -->
    <v-navigation-drawer v-model="drawer" app>
      <v-list>
        <v-list-item @click="toggleDrawer">
          <v-icon>{{ drawer ? "mdi-menu-open" : "mdi-menu-close" }}</v-icon>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/') }"
          @click="navigateTo('/')"
        >
          <v-list-item-icon>
            <v-icon>mdi-chart-bar</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="drawer">Dashboard</v-list-item-title>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/hospedes') }"
          @click="navigateTo('/hospedes')"
        >
          <v-list-item-icon>
            <v-icon>mdi-account-group</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="drawer">Hóspedes</v-list-item-title>
        </v-list-item>
        <v-list-item
          :class="{ 'selected-item': isSelected('/flats') }"
          @click="navigateTo('/flats')"
        >
          <v-list-item-icon>
            <v-icon>mdi-home-city</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="drawer">Flats</v-list-item-title>
        </v-list-item>
        <v-list-group prepend-icon="mdi-currency-usd" no-action>
          <template v-slot:activator>
            <v-list-item-title v-if="drawer">Finanças</v-list-item-title>
            <v-list-item-icon v-else>
              <v-icon>mdi-currency-usd</v-icon>
            </v-list-item-icon>
          </template>
          <v-list-item link to="/financas/receitas-despesas">
            <v-list-item-title>Receitas e Despesas</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/financas/pagamento-funcionarios">
            <v-list-item-title>Pagamentos</v-list-item-title>
          </v-list-item>
          <v-list-item link to="/financas/balanco">
            <v-list-item-title>Balanço</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <v-list-item link to="/lembretes">
          <v-list-item-icon>
            <v-icon>mdi-bell</v-icon>
          </v-list-item-icon>
          <v-list-item-title v-if="drawer">Lembretes</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
@@ -73,63 +76,6 @@
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

@@ -139,8 +85,7 @@ import { mapActions } from "vuex";
export default {
  data() {
    return {
      drawer: true,
      darkTheme: false,
      dialog: false,
      snackbar: false,
@@ -153,7 +98,7 @@ export default {
    };
  },
  created() {
    this.$vuetify.theme.dark = this.darkTheme;
  },
  computed: {
    currentYear() {
@@ -179,7 +124,7 @@ export default {
    ...mapActions(["loginUser", "logoutUser"]),
    toggleDrawer() {
      this.drawer = !this.drawer;
    },
    toggleDarkTheme() {
      this.darkTheme = !this.darkTheme;
@@ -214,11 +159,24 @@ export default {
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
@@ -227,26 +185,9 @@ export default {
  justify-content: space-between;
  text-align: right;
  color: #f0ead6;
  position: relative;
}
.menu-button {
  font-weight: normal;
  text-transform: none;
@@ -266,4 +207,27 @@ export default {
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