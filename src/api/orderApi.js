import Utils from './utils'
import store from '../store';

const URI = '/gedemin/order'

export default {
  saveOrder (order) {
    const options = Utils.prepareFetchOptions(store.getters.authUser);
    return Utils.fetchPost(URI, order, options)
      .then(Utils.unwrapJsonResponse);
  }

}
