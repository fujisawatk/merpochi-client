import axios from 'axios'
import { AsyncStorage } from 'react-native'

export default {
  namespaced: true,
  state: {
    token: null,              // JWTトークン
    isAuthResolved: false,    // 認証が許可されているか判定
    homeTab: true,            // ナビゲーションバーのアクティブページ判定
    searchTab: false,
    mypageTab: false,
  },
  mutations: {
    login (state, token) {
      state.token = token
      state.isAuthResolved = true
    },
    setLogout (state, delToken) {
      state.token = delToken
      state.isAuthResolved = false
    },
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
    },
  }
}