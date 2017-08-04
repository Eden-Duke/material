import Vue from 'vue'
import Router from 'vue-router'
import material from '@/components/material'
import uploadfile from '@/components/uploadfile'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    component: material
  },
  {
    path: '/uploadfile',
    component: uploadfile
  }]
})
