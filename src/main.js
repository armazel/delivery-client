// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import { storage } from './utils';

import Vuex from 'vuex'
import { sync } from 'vuex-router-sync'
import KeenUI from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
import { store, actions } from './store'
import Table from './components/Table'
import Breadcrumbs from './components/Breadcrumbs'
import ModelOrder from './components/ModalOrder'
import DatePicker from './components/DatePicker'
import VueTimepicker from 'vue2-timepicker'
import vSelect from 'vue-select'
/*Vue.config.productionTip = false*/
import MaskedInput from 'vue-masked-input'

Vue.use(Vuex);
Vue.use(router);
Vue.use(KeenUI);

/*Componetns*/
Vue.component('rf-table', Table);
Vue.component('rf-breadcrumbs', Breadcrumbs);
Vue.component('model-order', ModelOrder);
Vue.component('date-picker-area', DatePicker);
Vue.component('vue-timepicker', VueTimepicker);
Vue.component('masked-input', MaskedInput);
Vue.component('v-select', vSelect);

/* eslint-disable no-new */

sync(store, router);

// Проверяем запомненную локально аутентификацию, потом грузим приложение
checkAuth()
  .then(initApp);

function checkAuth() {
  return Promise.resolve()
    .then(() => {
      // Проверяем состояние логина
      if (!storage.password) {
        return Promise.reject(new Error('Не найден локальный пароль'));
      }

      // Пробуем залогинится по найденного паролю
      return store.dispatch(actions.authLogin, storage.password)
        .then((user) => {
          if (!user) {
            router.replace({name: 'Hello'});
            return Promise.reject(new Error('Не найден пользователь'));
          } else if(user.name){
            router.replace({name: 'pageOrders'});
          }
        })
        .then(() => true);
    })
    .catch((error) => {
      console.warn(error && error.message || error);
      return false;
    });
}

function initApp(authenticated) {
  new Vue({
    el: '#app',
    router,
    store: store,
    template: '<App/>',
    components: { App }
  });
  router.replace({name: 'pageOrders'});
  if (!authenticated) {
    // Перейдем на роут по умолчанию
    router.replace({name: 'Hello'});
  }
}

