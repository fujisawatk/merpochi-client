import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    posts: [],
    post: "",
    postImages: []
  },
  getters: {
    getPost: (state) => (id) => {
      return state.posts.find(post => post.id === id)
    },
  },
  mutations: {
    setPosts (state, data) {
      if (data != null) {
        state.posts = data
      }else{
        state.posts = []
      }
    },
    resetPosts (state) {
      state.posts = []
    },
    setPost (state, post) {
      state.post = post
    }
  },
  actions: {
    // 指定の店舗IDに紐付いた投稿を取得
    getPosts ({commit, rootState}) {
      return axios.get( baseApiUrl + '/shops/' + String(rootState.shop.shop.id) + '/posts')
      .then(res => {
        commit('setPosts', res.data)
      })
    },
    // 投稿がない店舗情報を呼び出した際のリセット用
    delPosts ({commit}) {
      return commit('resetPosts')
    },
    async savePost ({dispatch, rootState}, postData) {
      // 店舗IDを新規登録
      if (rootState.shop.shop.id === 0) {
        await dispatch('shop/saveShop', null, { root: true })
      }
      const strId = String(rootState.shop.shop.id)
      return axios.post( baseApiUrl + '/shops/' + strId + '/posts', postData)
      .then(() => {})
    },
    addPost ({commit}, post) {
      return commit('setPost', post)
    },
  }
}