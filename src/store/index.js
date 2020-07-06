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
    errorMessage: "",
    // ぐるなびAPIアクセス用
    gnaviApiUrl: "https://api.gnavi.co.jp/RestSearchAPI/v3/",
    keyid: "980bec359baeb39b9866300dd9a38675",
    // 取得した店舗情報
    rests: []
  },
  getters: {
    getRest: (state) => (code) => {
      return state.rests.find(rest => rest.code === code)
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
    },
    setGeolocation (state, location) {
      state.latitude = location.coords.latitude
      state.longitude = location.coords.longitude
      state.errorMessage = ""
    },
    setRest (state, data) {
      state.rests = []
      data.rest.map(function( value ) {
        const hash = {
          code: value.id,
          name: value.name,
          img: value.image_url.shop_image1,
          category: value.category,
          opentime: value.opentime,
          budget: value.budget,
          url: value.url,
          latitude: value.latitude,
          longitude: value.longitude,
        }
        state.rests.push(hash)
      })
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
    },
    // 現在位置情報取得
    getGeolocation ({commit, state}) {
      Permissions.askAsync(Permissions.LOCATION)
        .then(status => {
          if (!status.granted) {
            this.errorMessage = "Permission to access location was denied"
          } else if (status.granted) {
            Location.getCurrentPositionAsync({}).then(location => {
              commit('setGeolocation', location)
            })
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    // 付近の店舗情報取得
    async getRests ({dispatch, state, commit}) {
      await dispatch('getGeolocation')
      const requestUrl = state.gnaviApiUrl + "?keyid=" + state.keyid + "&latitude=" + state.latitude + "&longitude=" + state.longitude
      axios
        .get(requestUrl)
        .then(res => {
          commit('setRest', res.data)
        })
        .catch(() => undefined)
    }
  }
})