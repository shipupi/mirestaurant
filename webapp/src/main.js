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

Vue.filter('limit', function (arr) {
  return arr
  // if ( ! Array.isArray(arr)) return false;
  // return arr.slice(0, limit);
})

Vue.filter('offset', function (arr, offset) {
  if ( ! Array.isArray(arr)) return false;
  return arr.slice(offset, arr.length)
});

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
