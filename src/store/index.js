import Vuex from 'vuex'
import Vue from 'vue-native-core'
import auth from './modules/auth'
import shop from './modules/shop'
import comment from './modules/comment'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shop,
    comment
  },
  state: {},
  getters: {}, 
  mutations: {},
  actions: {}
})