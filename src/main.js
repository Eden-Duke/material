// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import axios from 'axios'
import swal from 'sweetalert2'
import jquery from 'jquery'
import 'sweetalert2/dist/sweetalert2.min.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import '../static/js/reuse.js'


// bootstrap fileinput
import '../static/css/bootstrap-fileinput/default.css'
import '../static/css/bootstrap-fileinput/fileinput.css'
import '../static/css/bootstrap-fileinput/theme/explorer/theme.css'

// import '../static/js/bootstrap-fileinput/fileinput.js'
// import '../static/js/bootstrap-fileinput/theme/explorer/theme.js'


// MD5
import '../static/js/MD5/spark-md5.min.js'

Promise.prototype.finally = function (callback) {
  let P = this.constructor
  return this.then(
    value  => P.resolve(callback()).then(() => value),
    reason => P.resolve(callback()).then(() => { throw reason })
  )
}
Promise.finally

window.swal = swal
window.axios = axios
window.Vue = Vue
window.$ = jquery
window.jquery = jquery
window.jQuery = jquery

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
