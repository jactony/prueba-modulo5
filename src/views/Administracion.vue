<template>
  <v-container>
    <h1 class="text-center">Administración</h1><hr>
    <h3 class="text-center">Agregar cursos</h3>

    <v-col cols="10" class="ma-auto">
      <div class="agregarCursos">
      <v-form class="mb-10" ref="form" v-model="valid" lazy-validation>

<!-- Tabla para agregar cursos -->
        <v-text-field
          v-model="curso.nombre"
          label="Nombre del curso"
          :rules="reglasValidar"
          required>
          </v-text-field>

          <v-text-field
          v-model="curso.cupos"
          label="Cupos"
          required>
          </v-text-field>

          <v-text-field
          v-model="curso.inscritos"
          label="Inscritos"
          required>
          </v-text-field>

          <v-text-field
          v-model="curso.duracion"
          label="Duracion"
          required>
          </v-text-field>

        <v-text-field
          v-model="curso.costo"
          label="Costo del curso"
          required>
          </v-text-field>

        <v-text-field
          v-model="curso.estado"
          label="Estado del curso V/F"
          required>
          </v-text-field>

          <v-text-field
          v-model="curso.descripcion"
          label="Breve descripción del curso"
          :rules="reglasValidar"
          required>
          </v-text-field>

        <v-text-field
          v-model="curso.fecha"
          label="Fecha"
          required>
          </v-text-field>

        <v-text-field
        v-model="curso.url_imagen" label="Ingresar Url de la imagen" required></v-text-field>
<!-- <p>{{curso}}</p> -->
        <v-btn
          :disabled="!valid"
          color="blue darken-2"
          class="mr-4 white--text"
          @click="agregarCurso"
        >
          Agregar
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Resetear Campos
        </v-btn>
      </v-form>
</div><br>

<div class="fondoTabla">
      <Tabla />
</div>
      <Reportes />
    </v-col>
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Tabla from "@/components/Tabla";
import Reportes from "@/components/Reportes";
export default {
  name: "Administracion",
  data() {
    return {
      curso: {
        codigo: "",
        costo: "",
        cupos: "",
        duracion: "",
        descripcion:"",
        estado: "",
        fecha: "",
        inscritos: "",
        nombre: "",
        url_imagen: "",
      },
      valid: true,
      reglasValidar: [
        (validar) => validar !== "" || "Debe ingresar datos",
      ],
    };
  },

  methods: {
    ...mapActions(["agregar_Curso"]),
    async agregarCurso() {
      const formularioValidado = this.$refs.form.validate();
      if (!formularioValidado) {
        return alert("Compruebe que todo esté bien");
      }
      const curso = { ...this.curso };
      await this.agregar_Curso(curso);
      alert("Curso agregado");
      this.reset();
    },

    reset() {
      this.$refs.form.reset();
    },
  },
  computed: {
    ...mapGetters(["cantidadDeCursos"]),
  },
  components: {
    Tabla,
    Reportes
  },
};
</script>

<style scoped>
.agregarCursos{
background-color: rgb(224, 234, 240);
max-width: 700px;
padding: 0 20px 0 20px;
margin-left: auto;
margin-right: auto;
}

.v-text-field label{
  font-size: 12px;
}

.fondoTabla{
  background-color: rgb(108, 74, 31);
}
</style>

