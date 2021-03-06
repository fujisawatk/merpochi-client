import Vuex from 'vuex'
import Vue from 'vue-native-core'
import auth from './modules/auth'
import shop from './modules/shop'
import post from './modules/post'
import comment from './modules/comment'
import favorite from './modules/favorite'
import station from './modules/station'
import genre from './modules/genre'
import image from './modules/image'
import bookmark from './modules/bookmark'
import footer from './modules/footer'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    auth,
    shop,
    post,
    comment,
    favorite,
    station,
    genre,
    image,
    bookmark,
    footer
  },
  state: {},
  getters: {}, 
  mutations: {},
  actions: {}
})