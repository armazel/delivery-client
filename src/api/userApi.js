import Utils from './utils'
import store from '../store';

const URI = '/gedemin/userGroup'

export default {
  getUserGroup () {
    const options = Utils.prepareFetchOptions(store.getters.authUser);
    return Utils.fetchGet(URI, options)
      .then(Utils.unwrapJsonResponse);
  }

}
