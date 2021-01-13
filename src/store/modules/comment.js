import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    // setComments (state, data) {
    //   state.comments = data
      
    // },
    resetComments (state) {
      state.comments = []
    },
  },
  actions: {
    // 指定の店舗IDに紐付いたコメントを取得
    // getComments ({commit}, shopId) {
    //   const strId = String(shopId)
    //   return axios.get( baseApiUrl + '/shops/' + strId + '/comments')
    //   .then(res => {
    //     commit('setComments', res.data)
    //   })
    //   .catch(err => {
    //     console.log(err)
    //   })
    // },
    // コメントがない店舗情報を呼び出した際のリセット用
    delComments ({commit}) {
      return commit('resetComments')
    },
  }
}