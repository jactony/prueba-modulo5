import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Administracion from '../views/Administracion.vue'
import Registrate from '../views/Registrate.vue'
import Ingresar from '../views/Ingresar.vue'
import Store from "@/store"

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/registrate',
    name: 'Registrate',
    component: Registrate
  },
  {
    path: '/ingresar',
    name: 'Ingresar',
    component: Ingresar
  },
  {
    path: '/administracion',
    name: 'Administracion',
    component: Administracion,
    meta: {
      loginRequired: true
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
//Acceso a áreas restringidas
router.beforeEach((to, from, next) => {

  const { user: sesionActiva } = Store.state

  const rutaDestinoRestringida = to.meta.loginRequired

  if (rutaDestinoRestringida && !sesionActiva) {
    alert("Usted no tiene permisos de estar aquí")
    next("/ingresar")
  } else if (rutaDestinoRestringida && sesionActiva) {
    next()
  } else {
    next()
  }

})

export default router
