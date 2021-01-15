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
    // 指定の店舗IDに紐付いたお気に入り数を取得
    // getFavorites ({commit}, shopId) {
    //   const strId = String(shopId)
    //   return axios.get( baseApiUrl + '/shops/' + strId + '/favorites')
    //   .then(res => {
    //     commit('setFavorites', res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    // お気に入り登録がない店舗情報を呼び出した際のリセット用
    delFavorites ({commit}) {
      return commit('resetFavorites')
    },
    // お気に入り保存
    async saveFavorite ({dispatch, rootState}, data) {
      // 店舗が未登録なら、先に店舗を登録する
      if (data.shop_id == 0) {
        await dispatch('shop/saveShop', data.shopData, { root: true })
        data.shop_id = rootState.shop.shopId
      }
      const strId = String(data.shop_id)
      return axios.post( baseApiUrl + '/shops/' + strId + '/favorites')
      .then(() => {})
    },
    // お気に入り解除
    delFavorite ({commit, rootState}, shopId) {
      const strId = String(shopId)
      return axios.delete( baseApiUrl + '/shops/' + strId + '/favorites')
      .then(res => {})
      .catch(err => {
        console.log(err)
      })
    },
  }
}