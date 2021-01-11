import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {},
  getters: {}, 
  mutations: {},
  actions: {
    async saveBookmark ({dispatch, rootState}, data) {
      // 初ブックマーク時、店舗IDを新規登録
      if (data.shop_id == 0) {
        await dispatch('shop/saveShop', data.shopData, { root: true })
        data.shop_id = rootState.shop.shopId
      }
      const strId = String(data.shop_id)
      return axios.post( baseApiUrl + '/shops/' + strId + '/bookmarks')
      .then(res => {})
      .catch(err => {
        console.log(err)
      })
    },
  }
}