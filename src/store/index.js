import Vue from 'vue'
import Vuex from 'vuex'

import MutationTypes from './_mutations'
import ActionTypes from './_actions'

import ReportModule from './reportModule'

Vue.use(Vuex)

const store = new Vuex.Store({
  // Включать ли режим разработчика
  modules: {
    report: ReportModule
  }
})

export {
  store,
  MutationTypes as mutations,
  ActionTypes as actions
}
export default store
