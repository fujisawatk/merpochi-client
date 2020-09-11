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
    },
    resetGenre (state) {
      state.selectedGenre = ""
    }
  },
  actions: {
    selectedGenreList ({commit}, genre) {
      return commit('setGenre', genre)
    },
    delGenre ({commit}) {
      return commit('resetGenre')
    }
  }
}