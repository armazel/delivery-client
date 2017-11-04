import Api from '../api'
import mutations from './_mutations'
import actions from './_actions'
import { collections } from '../utils'

export default {
  state: {
    client: [],
    searchClients: []
  },

  getters: {
    getSearchClients: (state) => {
      return state.searchClients
    }
  },

  mutations: {
    [mutations.GET_CLIENTS_BY_PHONE]: (state, searchClients) => {
      state.searchClients = searchClients
    },
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

    [actions.getClientsByPhone]: ({commit}, phone) => {
      return Api.client.searchClientByPhone(phone)
        .then((searchClients) => {
          commit(mutations.GET_CLIENTS_BY_PHONE,searchClients);
          return searchClients;
        });
    },
  }
}
