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
    setUpdatePost (state, data) {
      if (state.post.text != data.text) state.post.text = data.text
      if (state.post.rating != data.rating) state.post.rating = data.rating
      if (state.post.images != data.images) state.post.images = data.images
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
    async updatePost ({commit, rootState, state}, postData) {
      const strId = String(rootState.shop.shop.id)
      return axios.put( baseApiUrl + '/shops/' + strId + '/posts/' + String(state.post.id), postData)
      .then(() => {
        // 更新後の画像を表示できるように整形
        const reImgs = []
        for (let i = 0; i < postData.images.length; i++ ){
          reImgs.push({
            uri: 'data:image/jpg;base64,' + postData.images[i]
          })
        }
        postData.images = reImgs
        commit('setUpdatePost', postData)
      })
      
    },
  }
}