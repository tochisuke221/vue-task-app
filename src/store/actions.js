/* eslint-disable no-unused-vars */
import * as types from './mutation-types'
import { Auth, List, Tas } from '../api'
/* eslint-enable no-unused-vars */

export default {
  login: ({ commit }, authInfo) => {
    return Auth.login(authInfo)
      .then(({ token, userId }) => {
        commit(types.AUTH_LOGIN, { token, userId })
      })
      .catch(err => { throw err })
  },
  fetchLists: ({commit}) => {
    throw new Error(' fetchLists action は作られていません')
  },
  addTask: ({commit}) => {
    throw new Error(' addTask action は作られていません')
  },
  updateTask: ({commit}) => {
    throw new Error(' updateTask action は作られていません')
  },
  removeTask: ({commit}) => {
    throw new Error(' removeTask action は作られていません')
  }
}
