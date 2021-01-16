import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    favorites: [],
    favoriteUser: false,
  },
  getters: {
    checkFavoriteUser: (state) => (id) => {
      return state.favorites.find(shop => shop.user_id === id)
    }
  }, 
  mutations: {
    setFavorites (state, data) {
      state.favorites = data
    },
    resetFavorites (state) {
      state.favorites = []
    },
    setNewFavorite (state, data) {
      state.favorites.push(data)
      state.favoriteUser = true
    },
    setFavoriteUser (state) {
      state.favoriteUser = true
    },
    resetFavoriteUser (state) {
      state.favoriteUser = false
    },
    resetFavorite (state, uid) {
      state.favorites.some(function(v, i){
        if (v.user_id==uid) state.favorites.splice(i,1)
      })
      state.favoriteUser = false
    }
  },
  actions: {
    // お気に入り保存
    async saveFavorite ({dispatch, rootState}) {
      // 店舗が未登録の場合、新規登録
      if (rootState.shop.shop.id === 0) {
        await dispatch('shop/saveShop', null, { root: true })
      }
      const strId = String(rootState.shop.shop.id)
      return axios.post( baseApiUrl + '/shops/' + strId + '/favorites')
      .then(() => {})
    },
    // お気に入り解除
    delFavorite ({dispatch, rootState}) {
      const strId = String(rootState.shop.shop.id)
      return axios.delete( baseApiUrl + '/shops/' + strId + '/favorites')
      .then(() => {})
    },
  }
}