import Utils from './utils'
import store from '../store';

const URI = '/gedemin/client'

export default {
  addClient (client) {
    const options = Utils.prepareFetchOptions(store.getters.authUser);
    return Utils.fetchPost(URI,client, options)
      .then(Utils.unwrapJsonResponse);
  },

  searchClientByPhone(phone){
    const options = Utils.prepareFetchOptions(store.getters.authUser);

    options.query = {
      phoneNumber: phone.slice(1)
    };

    return Utils.fetchGet(URI + '/phone', options)
      .then(Utils.unwrapJsonResponse);
  }

}
