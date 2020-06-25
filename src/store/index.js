import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { AsyncStorage } from 'react-native'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: null
  },
  getters: {},
  mutations: {
    login (state, token) {
      state.token = token
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