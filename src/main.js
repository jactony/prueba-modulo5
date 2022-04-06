import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyCSyeUELtNCfWo1U1egbv1S6v94IpzYGss",
  authDomain: "bdatos-01.firebaseapp.com",
  projectId: "bdatos-01",
  storageBucket: "bdatos-01.appspot.com",
  messagingSenderId: "585782429320",
  appId: "1:585782429320:web:4f8d4d0c23a2585cd2413d"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
