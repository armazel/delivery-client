import Vue from 'vue'
import Vuex from 'vuex'

import MutationTypes from './_mutations'
import ActionTypes from './_actions'

import ReportModule from './reportModule'
import AlertModule from './alertModule'
import AuthModule from './authModule'
import UserModule from './userModule'
import ClientModule from './clientModule'
import ScanModule from './scanModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Включать ли режим разработчика
  modules: {
    report: ReportModule,
    auth: AuthModule,
    alert: AlertModule,
    user: UserModule,
    client: ClientModule,
    scan: ScanModule,
  }
})

export {
  store,
  MutationTypes as mutations,
  ActionTypes as actions
}
export default store
