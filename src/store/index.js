import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null,
    // 認証が許可されているかを判定する値
    isAuthResolved: false
  },
  getters: {},
  mutations: {
    login (state, token) {
      state.token = token
      state.isAuthResolved = true
      console.log(state.token)
    }
  },
  actions: {
    loginOne ({commit}, userData) {
      return axios.post('http://localhost:8000/login', userData)
      .then(res => {
        const token = res.data
        AsyncStorage.setItem('merpochi-jwt', token)
        commit('login', token)
      })
    },
    register ({commit}, userData) {
      return axios.post('http://localhost:8000/users', userData)
    }
  }
})