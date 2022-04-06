<template>
  <v-app>
    <v-app-bar app color="blue darken-2" dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <h4>Cursos AlfaWeb</h4>
      </div>

      <v-spacer></v-spacer>

      <div v-if="user">
        <span class="mr-2">{{ user.email }}</span>
        <v-btn text @click="cerrarSesion">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </div>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-navigation-drawer v-model="drawer" fixed temporary class="blue-grey lighten-4">
      <v-list nav dense>
        <v-list-item-group active-class="blue-grey lighten-1 white--text">
          <v-list-item to="/">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item to="/ingresar" v-if="!user">
            <v-list-item-title>Ingresar</v-list-item-title>
          </v-list-item>

          <v-list-item to="/registrate" v-if="!user">
            <v-list-item-title>Regístrarte</v-list-item-title>
          </v-list-item>

          <v-list-item to="/administracion" v-if="user">
            <v-list-item-title>Administración</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  name: "App",
  data() {
    return { drawer: false };
  },
  methods: {
    ...mapActions(["get_Cursos", "cerrar_Sesion"]),
    async cerrarSesion() {
      await this.cerrar_Sesion();
      alert("Sesión cerrrada");
      this.$router.push("/ingresar");
    },
  },
  computed: {
    ...mapState(["user"]),
  },
  mounted() {
    this.get_Cursos();
  },
};
</script>
