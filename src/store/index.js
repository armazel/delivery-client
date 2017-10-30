import Vue from 'vue'
import Vuex from 'vuex'

import MutationTypes from './_mutations'
import ActionTypes from './_actions'

import ReportModule from './reportModule'
import AlertModule from './alertModule'
import AuthModule from './authModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Включать ли режим разработчика
  modules: {
    report: ReportModule,
    auth: AuthModule,
    alert: AlertModule
  }
})

export {
  store,
  MutationTypes as mutations,
  ActionTypes as actions
}
export default store
