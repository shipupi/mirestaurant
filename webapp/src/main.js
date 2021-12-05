import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'

// Toast
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
Vue.use(Toast)
// Axios
Vue.prototype.$http = axios

// Config
Vue.config.productionTip = false
Vue.prototype.$api_url = 'http://localhost:8085/api'

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
