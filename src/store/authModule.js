import Api from '../api';
import mutations from './_mutations';
import actions from './_actions';
import {storage} from '../utils';

export default {
    getters: {
        authenticated: (state) => {
            return Boolean(state.user);
        },

        authUser: (state) => {
            return state.user;
        }
    },

    actions: {
        [actions.authProcessInput]: ({getters, dispatch}) => {
            const password = getters.scanString;

            return dispatch(actions.authLogin, password);
        },

        [actions.authLogin]: ({commit}, password) => {
            return Api.auth.login(password)
                .then((user) => {
                    commit(mutations.SET_AUTH_USER, user);
                    storage.password = password;

                    return user;
                });
        },

        [actions.authLogout]: ({commit}) => {
            commit(mutations.SET_AUTH_USER, null);
            storage.password = '';
        }
    },

    state: {
        user: null
    },

    mutations: {
        [mutations.SET_AUTH_USER]: (state, user) => {
            state.user = user;
        }
    }
};
