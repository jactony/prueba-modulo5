<template>
  <div>
    <v-col cols="7" class="ma-auto pt-15">
      <v-form ref="formulario">
        <h2 class="mb-7">Registro de usuarios</h2>
        <v-text-field v-model="usuario.email" label="email"></v-text-field>
        <v-text-field
          v-model="usuario.password"
          label="password"
        ></v-text-field>
        <v-btn @click="registrarUsuario" color="blue" class="white--text"
          >Crear usuario</v-btn
        >
      </v-form>
    </v-col>

    <v-snackbar :color="snackbarColor" v-model="snackbar" timeout="2000">
      {{ text }}
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Registrate",
  data() {
    return {
      usuario: {
        email: "",
        password: "",
      },
      text: "",
      snackbar: false,
      snackbarColor: "grey",
    };
  },
  methods: {
    ...mapActions(["registrar_Usuario"]),
    async registrarUsuario() {
      try {
        const usuario = { ...this.usuario };
        await this.registrar_Usuario(usuario);
        this.text = "Usuario registrado con éxito";
        this.$refs.formulario.reset();
        this.snackbarColor = "blue";
        this.$router.push("/administracion");
      } catch (error) {
        this.snackbarColor = "red";
        this.text = "Ups!! problemas..." + error;
      } finally {
        this.snackbar = true;
      }
    },
  },
};
</script>

<style></style>