import Api from '../api'
import mutations from './_mutations'
import actions from './_actions'
import { collections } from '../utils'

export default {
  state: {
    orders: []
  },

  getters: {
    getOrders: (state) => {
      return state.orders
    }
  },

  mutations: {
    [mutations.SET_ORDER]: (state, order) => {
      collections.setById(state.order, order.id, order);
    },
  },

  actions: {
    [actions.saveOrder]: ({commit}, order) => {
      return Api.order.saveOrder(order)
        .then((savedOrder) => {
          if (savedOrder) {
            commit(mutations.SET_ORDER, savedOrder);
          }
          return savedOrder;
        });
    },
  }
}
