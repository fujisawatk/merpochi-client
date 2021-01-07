import axios from 'axios'

export default {
  namespaced: true,
  state: {
    selectedImage: {
      uri: ""
    }
  },
  getters: {}, 
  mutations: {
    setImage (state, image) {
      state.selectedImage = image
    },
  },
  actions: {
    selectedImage ({commit}, image) {
      return commit('setImage', image)
    }
  }
}