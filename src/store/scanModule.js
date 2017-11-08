import mutations from './_mutations';
import actions from './_actions';

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
          debugger;
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
                        commit(mutations.ADD_GLOBAL_SCAN_CHAR, payload.char);
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
            state.string = state.string + key;
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
