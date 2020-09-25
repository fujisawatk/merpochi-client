import axios from 'axios'

export default {
  namespaced: true,
  state: {
    comments: []
  },
  mutations: {
    setComments (state, data) {
      state.comments = data
      
    },
    resetComments (state) {
      state.comments = []
    },
    setNewComment (state, data) {
      state.comments.push(data)
    }
  },
  actions: {
    // 指定の店舗IDに紐付いたコメントを取得
    getComments ({commit}, shopId) {
      const strId = String(shopId)
      return axios.get('http://192.168.100.100:8000/shops/' + strId + '/comments')
      .then(res => {
        commit('setComments', res.data)
      })
    },
    // コメントがない店舗情報を呼び出した際のリセット用
    delComments ({commit}) {
      return commit('resetComments')
    },
    // コメント保存
    async saveComment ({commit, dispatch, rootState}, data) {
      // 店舗が未登録なら、先に店舗を登録する
      if (data.commentData.shop_id == 0) {
        await dispatch('shop/saveShop', data.shopData, { root: true })
        data.commentData.shop_id = rootState.shop.shopId
      }
      const strId = String(data.commentData.shop_id)
      delete data.commentData.shop_id
      return axios.post('http://192.168.100.100:8000/shops/' + strId + '/comments', data.commentData)
      .then(res => {
        const newComment = res.data
        // 処理が成功したら、stateにコメント追加。
        commit('setNewComment', newComment)
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
}