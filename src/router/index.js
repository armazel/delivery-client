import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import pageOrders from '@/components/pageOrders'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/pageOrders',
      name: 'pageOrders',
      component: pageOrders
    },
    {
      path: '/admin',
      name: 'admin',
      component: pageOrders
    }
  ]
})
