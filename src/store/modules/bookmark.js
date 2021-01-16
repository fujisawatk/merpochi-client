import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {},
  getters: {}, 
  mutations: {},
  actions: {
    async saveBookmark ({dispatch, rootState}) {
      // 店舗が未登録の場合、新規登録
      if (rootState.shop.shop.id === 0) {
        await dispatch('shop/saveShop', null, { root: true })
      }
      const strId = String(rootState.shop.shop.id)
      return axios.post( baseApiUrl + '/shops/' + strId + '/bookmarks')
      .then(() => {})
    },
    // お気に入り解除
    delBookmark ({rootState}) {
      const strId = String(rootState.shop.shop.id)
      return axios.delete( baseApiUrl + '/shops/' + strId + '/bookmarks')
      .then(() => {})
    },
  }
}