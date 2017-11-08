import mutations from './_mutations';
import actions from './_actions';
import {moments, base64,common} from '../utils'

export default {
    getters: {
        scanString: (state) => {
            return state.string;
        },

        scanAction: (state) => {
            return state.action;
        }
    },

    actions: {
        [actions.initScan]: ({commit}, processAction) => {
            // Очистим строку сканирования штрих-кода
            commit(mutations.CLEAR_GLOBAL_SCAN_STRING);
            // Установим обработчик проверки штрих-кода

            commit(mutations.SET_SCAN_STRING_ACTION, processAction);
        },

        /**
         * Обработка клавиатурного ввода

         * @param payload
         */
        [actions.scanKey]: ({state, commit, dispatch}, payload) => {
            switch (payload.code) {
                case 'Backspace':
                case 'Delete':
                    commit(mutations.REMOVE_GLOBAL_SCAN_LAST_CHAR);
                    break;

                case 'Enter':
                case 'NumpadEnter':
                    if (state.action) {
                        if (typeof state.action === 'function') {
                            state.action();
                        } else if (typeof state.action === 'string') {
                            dispatch(state.action);
                        }
                    }
                    break;

                default:
                    if (payload.char) {
                        commit(mutations.ADD_GLOBAL_SCAN_CHAR, payload);
                    }
                    break;
            }
        },

        [actions.scanClear]: ({commit}) => {
            commit(mutations.CLEAR_GLOBAL_SCAN_STRING);
        }
    },

    state: {
        string: '',
        action: '',
    },

    mutations: {
        [mutations.ADD_GLOBAL_SCAN_CHAR]: (state, key) => {
          if(state.string.length === key.operatorCode){
            state.string = state.string + ' ' + key.char;
          }else{
            state.string = state.string + key.char;
          }
          if((base64.nospace(state.string)).length > key.countSimbolsOnNumber + key.operatorCode){
            state.string = (state.string).substr(0,key.countSimbolsOnNumber + key.operatorCode + 1); //1 - это пробел
          }
        },

        [mutations.REMOVE_GLOBAL_SCAN_LAST_CHAR]: (state) => {
          if(state.string.length === 0){
            state.string = ''
          }else{
            state.string = state.string.slice(0, -1);
          }

        },

        [mutations.CLEAR_GLOBAL_SCAN_STRING]: (state) => {
            state.string = '';
        },

        [mutations.SET_SCAN_STRING_ACTION]: (state, action) => {
            state.action = action;
        }
    }
};
