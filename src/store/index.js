import Vue from 'vue'
import Vuex from 'vuex'
import {
  getFirestore, collection, query, onSnapshot, addDoc,
  doc, deleteDoc, updateDoc
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";

Vue.use(Vuex)

const store = new Vuex.Store({
  getters: {
    cantidadDeCursos(state) {
      return state.cursos.length
    },

    cantidadTotalCupos(state) {
      const { cursos } = state
      let totalCupos=0
      cursos.forEach(item => {
        totalCupos= totalCupos + parseInt(item.data.cupos)
      })
      
      return totalCupos
    },

    cantidadDeAlumnosInscritos(state) {
      const { cursos } = state
      let totalInscritos=0
      cursos.forEach(item => {
        totalInscritos= totalInscritos + parseInt(item.data.inscritos)
      })
      
      return totalInscritos
    },

    cantidadCuposRestantes(state) {
      const { cursos } = state
      let cuposRestantes=0
      cursos.forEach(item => {
        cuposRestantes= cuposRestantes + parseInt(item.data.cupos)
      })
      let totalInscritos=0
      cursos.forEach(item => {
        totalInscritos= totalInscritos + parseInt(item.data.inscritos)
      })
      
      return (cuposRestantes - totalInscritos)
    },

    cantidadCursosTerminados(state) {
      const { cursos } = state
      let cursosTerminados=[]
      cursos.forEach((cursos) => {
        if (cursos.data.estado === true){
          cursosTerminados.push(cursos)
        }
      })
      
      return cursosTerminados.length
    },

    cantidadCursosActivos(state) {
      const { cursos } = state
      let cursosActivos=[]
      cursos.forEach((cursos) => {
        if (cursos.data.estado === false){
          cursosActivos.push(cursos)
        }
      })
      
      return cursosActivos.length
    },

  },
  state: {
    cursos: [],
    user: null
  },
  mutations: {
    SET_CURSOS(state, cursos) {
      state.cursos = cursos
    },
    SET_USER(state, user) {
      state.user = user
    }
  },
  actions: {
    async agregar_Curso(context, curso) {
      const db = getFirestore()
      const referenciaDeLaColeccion = collection(db, "cursos")
      const docRef = await addDoc(referenciaDeLaColeccion, curso);
      console.log(docRef.id)
    },

    async get_Cursos({ commit }) {
      const db = getFirestore()
      const q = query(collection(db, "cursos"));
      onSnapshot(q, (querySnapshot) => {
        const cursos = [];
        querySnapshot.forEach((doc) => {
          const curso = {
            id: doc.id,
            data: doc.data()
          }
          cursos.push(curso);
        });
        commit("SET_CURSOS", cursos)
      });
    },

    async delete_Curso(context, idCurso) {
      const db = getFirestore()
      const docRef = doc(db, "cursos", idCurso)
      await deleteDoc(docRef)
    },

    async update_Curso(context, { id, curso }) {
      const db = getFirestore()
      const cursoRef = doc(db, "cursos", id);
      await updateDoc(cursoRef, curso);
    },

    async registrar_Usuario({ commit }, { email, password }) {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = userCredential
      commit("SET_USER", user)
    },

    async iniciar_Sesion({ commit }, { email, password }) {
      const auth = getAuth()
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const { user } = userCredential
      commit("SET_USER", user)
    },

    async cerrar_Sesion({ commit }) {
      const auth = getAuth()
      await signOut(auth)
      commit("SET_USER", null)
    }
  },
})


export default store
