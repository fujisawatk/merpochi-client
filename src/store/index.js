import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: null
  },
  getters: {},
  mutations: {
    login (state, user) {
      state.user = user
      console.log(state.user)
    }
  },
  actions: {
    loginOne ({commit}, userData) {
      return axios.post('http://localhost:8000/login', userData)
      .then(res => {
        const user = res.data
        commit('login', user)
      })
    }
  }
})