// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
import swal from 'sweetalert2'
import jqyery from 'jquery'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../static/js/reuse.js'

// bootstrap fileinput
import '../static/css/bootstrap-fileinput/default.css'
import '../static/css/bootstrap-fileinput/fileinput.css'
import '../static/js/bootstrap-fileinput/fileinput.js'

window.swal = swal
window.axios = axios
window.Vue = Vue
window.$ = jqyery

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
