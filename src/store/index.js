import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

Vue.use(Vuex)

// 状態"Auth”と”Board”をいVuexのstateで一元管理
const state = {
  auth: {
    token: null, // 初期状態はnull
    userId: null // 初期状態はnull
  },
  board: {
    lists: [] // 状態TaskListtは空が初期状態
  }
}

export default new Vuex.Store({
  state,
  getters,
  actions,
  mutations,
  strict: process.env.NODE_ENV !== 'production'
})
