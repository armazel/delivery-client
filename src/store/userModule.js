import Api from '../api'
import mutations from './_mutations'
import actions from './_actions'
import { collections } from '../utils'

export default {
  state: {
    usersGroup: []
  },

  getters: {
    getUsersGroup: (state) => {
      return state.usersGroup
    }
  },

  mutations: {
    [mutations.GET_USER]: (state, usersGroup) => {
      state.usersGroup = usersGroup
    },
  },

  actions: {
    [actions.getUserGroups]: ({commit}) => {
      return Api.user.getUserGroup()
        .then((userGroup) => {
          if (userGroup) {
            commit(mutations.GET_USER, userGroup);
          }
          return userGroup;
        });
    },
  }
}
