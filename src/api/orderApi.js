import Utils from './utils'

const URI = 'https://rest-game.herokuapp.com/'

export default {
  saveOrder () {
    return Utils.fetchGet(URI + 'users', null)
      .then(Utils.unwrapJsonResponse)
  }

}
