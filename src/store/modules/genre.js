import axios from 'axios'

export default {
  namespaced: true,
  state: {
    selectedGenre: ""
  },
  getters: {}, 
  mutations: {
    setGenre (state, genre) {
      state.selectedGenre = genre
    }
  },
  actions: {
    selectedGenreList ({commit}, genre) {
      return commit('setGenre', genre)
    },
  }
}