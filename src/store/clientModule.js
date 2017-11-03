import Api from '../api'
import mutations from './_mutations'
import actions from './_actions'
import { collections } from '../utils'

export default {
  state: {
    client: []
  },

  getters: {
   /* getUsersGroup: (state) => {
      return state.usersGroup
    }*/
  },

  mutations: {
    /*[mutations.GET_CLIENT]: (state, usersGroup) => {
      state.usersGroup = usersGroup
    },*/
  },

  actions: {
    [actions.addNewClient]: ({commit}, client) => {
      return Api.client.addClient(client)
        .then((client) => {
          /*if (client) {

          }*/
          return client;
        });
    },
  }
}
