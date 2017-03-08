import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Abs from '@/components/Abs'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/abs',
      name: 'abs',
      component: Abs
    }
  ]
})
