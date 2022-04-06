<template>
  <div class="home text-center pa-5">
    <h1>Cursos AlfaWeb</h1><hr><br>
<v-container>
    <v-row>
      <v-col
        v-for="({ data: curso, id }, i) in cursos"
        :key="i"
        cols="12"
        sm="6"
        md="4"
        lg="3">
        <v-card width="300">
          <v-img
          contain
          position="top"
           height="200px" :src="curso.url_imagen"> </v-img>

          <v-card-text class="text-left">
            <h3>{{ curso.nombre }}</h3>
            <ul>
              <li>Código: {{ curso.codigo }}</li>
              <li>Duración: {{ curso.duracion }}</li>
              <li>Valor: $ {{ curso.costo }}</li>
              <li>Vacantes: {{ curso.cupos }}</li>
            </ul>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
</v-container>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "Home",
  computed: {
    ...mapState(["cursos"]),
  },
};
</script>