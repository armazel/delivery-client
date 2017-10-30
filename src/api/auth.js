import Utils from './utils'

const URI = '/gedemin';

export default {
  login: (password) => {
    const options = Utils.prepareFetchOptions({password});
    return Utils.fetchPost(URI + '/login', {password}, options)
      .then(Utils.unwrapJsonResponse)
      .then(Utils.prepareMapper());
  }
};
