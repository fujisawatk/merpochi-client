import axios from 'axios'

export default {
  namespaced: true,
  state: {
    comments: "",
  },
  mutations: {
    setComments (state, data) {
      state.comments = ""
      state.comments = data
    },
    resetComments (state) {
      state.comments = ""
    }
  },
  actions: {
    // 指定の店舗IDに紐付いたコメントを取得
    getComments ({commit}, shopId) {
      const strId = String(shopId)
      return axios.get('http://192.168.100.100:8000/shops/' + strId)
      .then(res => {
        console.log(res.data)
        commit('setComments', res.data)
      })
    },
    // コメントがない店舗情報を呼び出した際のリセット用
    delComments ({commit}) {
      return commit('resetComments')
    }
  }
}