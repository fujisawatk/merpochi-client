import axios from 'axios'

export default {
  namespaced: true,
  state: {
    favorites: [],
  },
  mutations: {
    setFavorites (state, data) {
      state.favorites = data
    },
    resetFavorites (state) {
      state.favorites = []
    },
  },
  actions: {
    // 指定の店舗IDに紐付いたお気に入り数を取得
    getFavorites ({commit}, shopId) {
      const strId = String(shopId)
      return axios.get('http://192.168.100.100:8000/shops/' + strId + '/favorites')
      .then(res => {
        commit('setFavorites', res.data)
      })
    },
    // お気に入り登録がない店舗情報を呼び出した際のリセット用
    delFavorites ({commit}) {
      return commit('resetFavorites')
    },
  }
}