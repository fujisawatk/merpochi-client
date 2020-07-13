import axios from 'axios'
import { AsyncStorage } from 'react-native'
import jwtDecode from 'jwt-decode'
import service from '../../services/axios'

// トークンの有効期限検証
const isTokenValid = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    console.log((decodedToken.exp * 1000) > new Date().getTime())
    return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  }
  return false
}

export default {
  namespaced: true,
  state: {
    user: null,
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
    setAuthUser (state, user) {
      state.user = user
    },
    resolveAuth (state) {
      state.isAuthResolved = true
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
    // ユーザー確認（認証済ユーザーかどうか）
    async verifyUser ({ dispatch, commit }) {
      const jwt = await AsyncStorage.getItem('merpochi-jwt')
      // トークンが有効の場合
      if (jwt && isTokenValid(jwt)) {
        const user = await dispatch('fetchCurrentUser')
        commit('resolveAuth')
        console.log(user)
        return user ? Promise.resolve(jwt) : Promise.reject('ログインユーザーを取得できません')
      } else {
        return Promise.reject('トークンの有効期限が切れています')
      }
    },
    // ログインユーザーのデータ取得 & トークン更新
    fetchCurrentUser ({ commit, state }) {
      return axios.get('http://192.168.100.100:8000/verify')
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('merpochi-jwt', user.token)
          commit('setAuthUser', user)
          return state.user
        })
        .catch(() => undefined)
    },
  }
}