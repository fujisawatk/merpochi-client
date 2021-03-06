import axios from 'axios'
import { AsyncStorage } from 'react-native'
import jwtDecode from 'jwt-decode'
import service from '../../services/axios'
import { ENV } from "../../services/environment"

// トークンの有効期限検証
const isTokenValid = (token) => {
  if (token) {
    const decodedToken = jwtDecode(token)
    return decodedToken && (decodedToken.exp * 1000) > new Date().getTime()
  }
  return false
}

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    user: {
      id: 0
    },               // ユーザー値
    isAuthResolved: false,    // 認証が許可されているか判定
  },
  mutations: {
    login (state, user) {
      state.user = user
      state.isAuthResolved = true
    },
    setLogout (state, delUser) {
      state.user = delUser
      state.isAuthResolved = false
    },
    setAuthUser (state, user) {
      state.user = user
    },
    resolveAuth (state) {
      state.isAuthResolved = true
    },
    setUpdateUser (state, user) {
      state.user.nickname = user.nickname
      state.user.email = user.email
    },
  },
  actions: {
    loginOne ({commit, dispatch}, userData) {
      return axios.post( baseApiUrl + '/login', userData)
      .then(res => {
        const user = res.data
        AsyncStorage.setItem('merpochi-jwt', user.token)
        dispatch('image/getUserImage', user.id, { root: true })
        commit('login', user)
      })
    },
    register ({commit}, userData) {
      return axios.post( baseApiUrl + '/users', userData)
        .then(res => {
          const user = res.data
          commit('setAuthUser', user)
          return state.user
        })
        .catch(() => undefined)
    },
    logout ({commit}) {
      return new Promise((resolve) => {
        AsyncStorage.removeItem('merpochi-jwt')
        commit('setLogout', null)
        resolve(true)
      })
    },
    updateUser ({commit, state, dispatch}, data) {
      return axios.put( baseApiUrl + '/users/' + String(state.user.id), data.userData)
        .then(async res => {
          await dispatch("image/updateUserImage", data.image, { root: true })
          commit('setUpdateUser', data.userData)
        })
    },
    // ユーザー確認（認証済ユーザーかどうか）
    async verifyUser ({ dispatch, commit }) {
      const jwt = await AsyncStorage.getItem('merpochi-jwt')
      // トークンが有効の場合
      if (jwt && isTokenValid(jwt)) {
        const user = await dispatch('fetchCurrentUser')
        commit('resolveAuth')
        return user ? Promise.resolve(jwt) : Promise.reject('ログインユーザーを取得できません')
      } else {
        return Promise.reject('トークンの有効期限が切れています')
      }
    },
    // ログインユーザーのデータ取得 & トークン更新
    fetchCurrentUser ({ commit, state, dispatch }) {
      return axios.get( baseApiUrl + '/verify')
        .then(res => {
          const user = res.data
          AsyncStorage.setItem('merpochi-jwt', user.token)
          dispatch('image/getUserImage', user.id, { root: true })
          commit('setAuthUser', user)
          return state.user
        })
        .catch(() => undefined)
    }
  }
}