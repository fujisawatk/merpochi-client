import Vuex from 'vuex'
import Vue from 'vue-native-core'
import axios from 'axios'
import { AsyncStorage } from 'react-native'
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"

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
    // 現在位置情報
    latitude: "",     // 緯度
    longitude: "",    // 経度
    errorMessage: ""
  },
  getters: {
    getGeolocation (state) {
      Permissions.askAsync(Permissions.LOCATION)
        .then(status => {
          if (!status.granted) {
            this.errorMessage = "Permission to access location was denied"
          } else if (status.granted) {
            Location.getCurrentPositionAsync({}).then(location => {
              state.latitude = location.coords.latitude
              state.longitude = location.coords.longitude
              state.errorMessage = ""
              console.log(state.latitude, state.longitude)
            })
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  },
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