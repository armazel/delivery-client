// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
import { store, actions } from './store'
import Table from './components/Table'
import Breadcrumbs from './components/Breadcrumbs'
import ModelOrder from './components/ModalOrder'
import DatePicker from './components/DatePicker'
import VueTimepicker from 'vue2-timepicker'

Vue.config.productionTip = false

Vue.use(Vuex)
Vue.use(router)
Vue.use(KeenUI)

/*Componetns*/
Vue.component('rf-table', Table)
Vue.component('rf-breadcrumbs', Breadcrumbs);
Vue.component('model-order', ModelOrder)
Vue.component('date-picker-area', DatePicker)
Vue.component('vue-timepicker', VueTimepicker)

/* eslint-disable no-new */

sync(store, router)

new Vue({
  el: '#app',
  router,
  store: store,
  template: '<App/>',
  components: { App }
})

