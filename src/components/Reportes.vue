<template>

<!-- aquí van los reportes abajo de la tabla -->
  <div class="my-15">
    <h5>Reporte:</h5>
    <v-card class="pa-3 my-2 ma-2"
      color="red lighten-2" 
      elevation="3"
      outlined
      shaped>

      <v-icon> mdi-account </v-icon>
      <span>Cantidad de Cursos: {{ cantidadDeCursos }} </span>
    </v-card>

    <v-card class="pa-3 my-2 ma-2" 
      color="deep-purple lighten-4"
      elevation="3"
      outlined
      shaped>
      <v-icon> mdi-account </v-icon>
      <span>Cantidad Total de cupos: {{ cantidadTotalCupos }}</span>
    </v-card>

    <v-card class="pa-3 my-2 ma-2"
    color="blue lighten-3"
      elevation="3"
      outlined
      shaped>
      <v-icon> mdi-account </v-icon>
      <span>Total de Alumnos inscritos: {{ cantidadDeAlumnosInscritos }} </span>
    </v-card>

    <v-card class="pa-3 my-2 ma-2"
    color="green lighten-3"
      elevation="3"
      outlined
      shaped>
      <v-icon> mdi-account </v-icon>
      <span>Cantidad de cupos restantes: {{ cantidadCuposRestantes }}</span>
    </v-card>

    <v-card class="pa-3 my-2 ma-2"
    color="lime lighten-3"
      elevation="3"
      outlined
      shaped>
      <v-icon> mdi-account </v-icon>
      <span>Cantidad de cursos terminados: {{cantidadCursosTerminados}}</span>
    </v-card>

    <v-card class="pa-3 my-2 ma-2"
    color="deep-orange lighten-3"
      elevation="3"
      outlined
      shaped>
      <v-icon> mdi-account </v-icon>
      <span>Cantidad cursos activos: {{cantidadCursosActivos}}</span>
    </v-card>

  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";

export default {
  computed: {

    ...mapState(["cursos"]),
    ...mapGetters(["cantidadDeCursos", 
    "cantidadDeAlumnosInscritos", 
    "cantidadTotalCupos",
    "cantidadCuposRestantes",
    "cantidadCursosTerminados",
    "cantidadCursosActivos"]),
  },
};
</script>

<style></style>