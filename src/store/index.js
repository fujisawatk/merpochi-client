import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    // 認証が許可されているかを判定する値
    isAuthResolved: false,
    // ナビゲーションバーのアクティブページ判定
    homeTab: true,
    searchTab: false,
    mypageTab: false,
  },
  getters: {},
  mutations: {
    login (state, token) {
      state.token = token
      state.isAuthResolved = true
    },
    setLogout (state, delToken) {
      state.token = delToken
      state.isAuthResolved = false
    }
  },
  actions: {
    loginOne ({commit}, userData) {
      return axios.post('http://192.168.100.100:8000/login', userData)
      .then(res => {
        const token = res.data
        AsyncStorage.setItem('merpochi-jwt', token)
        commit('login', token)
      })
    },
    register ({commit}, userData) {
      return axios.post('http://192.168.100.100:8000/users', userData)
    },
    logout ({commit}) {
      return new Promise((resolve) => {
        AsyncStorage.removeItem('merpochi-jwt')
        commit('setLogout', null)
        resolve(true)
      })
    }
  }
})