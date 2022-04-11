<template>
  <div>
    <!-- Tabla del home que muestra los cursos -->
    <v-data-table 
      :footer-props="{ itemsPerPageText: 'Filas por página' }"
      :headers="headers"
      :items="cursos"
      class="elevation-1">
      
      <template

      v-slot:item.data.costo="{ item }">
      <div class="redondear">
        ${{ formatNumber(item.data.costo) }}
      </div>  
      
      </template>

      <template

      v-slot:item.data.fecha="{ item }">
      <div class="redondear">
        {{ item.data.fecha }}
      </div>  
      
      </template>
      
<!-- boton del lapiz -->
      <template
      v-slot:item.actions="{ item }">
        <v-icon small class="mr-2" @click="editItem(item.id)">
          mdi-pencil
        </v-icon>
<!-- boton del basurero para eliminar -->
        <v-icon small @click="deleteItem(item.id)"> mdi-delete </v-icon>
      </template>
<!-- Aquí va la imagen chica de la tabla -->
      <template v-slot:item.data.url_imagen="{ item }">
        <div class="pa-3">
          <v-img width="60" :src="item.data.url_imagen" />
        </div>
      </template>

    </v-data-table>
<!-- Ventana modal para actualizar los cursos -->
    <v-dialog 
    v-model="dialog"
     width="500">
      
      <v-card ref="card"
      color="blue-grey lighten-4"
      class="pa-5">
      <h3 class="text-center">Editando curso: {{editedItem.nombre}}</h3><hr>
      
        <v-text-field
          v-model="editedItem.nombre"
          label="Nombre del Curso"
          :rules="modeloRules"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.url_imagen"
          label="Ruta de la imagen"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.cupos"
          label="Cupos del curso"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.inscritos"
          label="Inscritos"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.duracion"
          label="Duración del curso"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.costo"
          label="Valor del curso"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.codigo"
          label="Código"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.descripcion"
          label="Descripción general"
          required>
          </v-text-field>

        <v-text-field
        
          v-model="editedItem.fecha"
          label="Fecha del registro"
          required>
          </v-text-field>

        <v-btn color="blue darken-2" class="mr-4 white--text" @click="actualizarCurso">
          Actualizar
        </v-btn>
        <v-btn color="error" class="mr-4" @click="reset">
          Limpiar Datos
        </v-btn>

      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data: () => ({
    dialog: false,
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
      url_imagen: ""
    },
    dialogDelete: false,
    headers: [
      /* aqui va la tabla con el resto de los campos */
      
      {
        text: "Nombre Curso",
        value: "data.nombre",
      },
      {
        text: "Cupos",
        value: "data.cupos",
      },
      {
        text: "Inscritos",
        value: "data.inscritos",
      },
      {
        text: "Duración",
        value: "data.duracion",
      },
      {
        text: "Costo",
        value: "data.costo",
      },
      {
        text: "estado",
        value: "data.estado",
      },
      {
        text: "Fecha Inicio",
        value: "data.fecha",
      },
       
      {
        text: "Imagen",
        value: "data.url_imagen",
      },

      { text: "Actions", value: "actions", sortable: false },
    ],
    editedIndex: null,
    editedItem: {},
    modeloRules: [(val) => val !== "" || "Debe ingresar datos"],
  }),
  computed: {
    ...mapState(["cursos"]),
  },
  methods: {
    ...mapActions(["delete_Curso", "update_Curso"]),
    formatNumber(number) {
      return new Intl.NumberFormat("de-DE").format(number);
    },
    editItem(idCurso) {
      this.editedIndex = idCurso;
      const cursoEncontrado = this.cursos.find((m) => m.id === idCurso);
      this.editedItem = { ...cursoEncontrado.data };
      this.dialog = true;
    },
    async actualizarCurso() {
      const { editedIndex: id, editedItem: curso } = this;
      const payload = { id, curso };
      await this.update_Curso(payload);
      alert("Curso actualizado con éxito");
      this.dialog = false;
    },
    async deleteItem(id) {
      const confirmacion = confirm(
        "¿Quiere borrar el registro?"
      );
      if (confirmacion) {
        await this.delete_Curso(id);
        alert("Curso eliminado");
      }
    },
    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.desserts[this.editedIndex], this.editedItem);
      } else {
        this.desserts.push(this.editedItem);
      }
      this.close();
    },

    reset() {
      this.$refs.card.reset();
    },
    
  },
};
</script>

<style scoped>
.redondear{
  background-color:rgb(133, 174, 85);
  border-radius: 10px;
  padding: 6px;
}
</style>
