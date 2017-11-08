import mutations from './_mutations';
import actions from './_actions';

const ALERT_TIMEOUT = 3000;

export default {
    getters: {
        alerts: (state) => {
            return state.alerts;
        }
    },

    actions: {
        [actions.addAlertInfo]: ({commit}, message) => {
            const alert = {message, type: 'info', id: Math.floor(Math.random() * 100000 )};
            commit(mutations.ADD_ALERT, alert);

            addDismissTimeout(commit, alert);
        },

        [actions.addAlertSuccess]: ({commit}, message) => {
            const alert = {message, type: 'success', id: Math.floor(Math.random() * 100000 )};
            commit(mutations.ADD_ALERT, alert);

            addDismissTimeout(commit, alert);
        },

        [actions.addAlertWarning]: ({commit}, message) => {
            const alert = {message, type: 'warning', id: Math.floor(Math.random() * 100000 )};
            commit(mutations.ADD_ALERT, alert);

            addDismissTimeout(commit, alert);
        },

        [actions.addAlertError]: ({commit}, message) => {
            const alert = {message, type: 'error',id: Math.floor(Math.random() * 100000 )};
            commit(mutations.ADD_ALERT, alert);

            addDismissTimeout(commit, alert);
        },

        [actions.dismissAlert]: ({commit}, alert) => {
            commit(mutations.DISMISS_ALERT, alert);
        }
    },

    state: {
        alerts: []
    },

    mutations: {
        [mutations.ADD_ALERT]: (state, alert) => {
          if(state.alerts.length < 2){
            state.alerts.push(alert);
          }else{
            state.alerts.length = 0;
            state.alerts.push(alert);
          }

        },

        [mutations.DISMISS_ALERT]: (state, alert) => {
            dismissAlert(state.alerts, alert);
        },

        [mutations.CLEAR_ALERTS]: (state) => {
            state.alerts.length = 0;
        }
    }
};

function addDismissTimeout(commit, alert) {
    // По истечении таймаута удаляем сообщение
    setTimeout(() => commit(mutations.DISMISS_ALERT, alert), ALERT_TIMEOUT);
}

function dismissAlert(alerts, alert) {
    const alertIndex = alerts.indexOf(alert);
    if (alertIndex >= 0) {
        alerts.splice(alertIndex, 1);
    }
}
