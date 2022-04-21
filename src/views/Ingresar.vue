<template>
  <div class="iniciarSesion">
    <v-col cols="7" class="ma-auto pt-15">
      
      <v-form ref="formulario">
        <h2 class="mb-7">Iniciar sesión</h2>
        <v-text-field v-model="usuario.email" label="email"></v-text-field>
        <v-text-field type="password"
          v-model="usuario.password"
          label="Ingresar contraseña"
        ></v-text-field>
        <v-btn @click="iniciarSesion" color="blue darken-2" class="white--text">Iniciar Sesión</v-btn>
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
    ...mapActions(["iniciar_Sesion"]),
    async iniciarSesion() {
      //Acceso a iniciar sesión
      try {
        const usuario = { ...this.usuario };
        await this.iniciar_Sesion(usuario);
        this.text = "Sesión iniciada con éxito";
        this.snackbarColor = "blue";
        this.$router.push("/administracion");
      } 
        catch (error) {
        this.snackbarColor = "red";
        this.text = "Ocurrió un problema...." + error;
      } finally {
        this.snackbar = true;
      }
      //Hasta aquí acceso iniciar sesion
    },
  },
};
</script>

<style>
.iniciarSesion{
  max-width: 70%;
  margin-left: auto;
  margin-right: auto;
  margin-top:60px;
  background-color: rgb(217, 233, 240);
}
</style>