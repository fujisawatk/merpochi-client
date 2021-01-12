import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    selectedImage: {
      uri: ""
    },
    userImage: ""
  },
  getters: {}, 
  mutations: {
    setImage (state, image) {
      state.selectedImage = image
    },
    setUserImage (state, image) {
      state.userImage = image
    },
  },
  actions: {
    selectedImage ({commit}, image) {
      return commit('setImage', image)
    },
    async saveImage ({state, rootState, dispatch}) {
      const data = new FormData();
      let extention = state.selectedImage.uri.split(".")[1]
      var mineType = await dispatch('mineType', extention)
      data.append('image',
        {
          uri: state.selectedImage.uri,
          name: String(rootState.auth.id) + '-image.' + extention,
          type: mineType
        }
      )
      var config = {
        method: 'post',
        url: baseApiUrl + '/users/'+ String(rootState.auth.user.id) + '/image',
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      return axios(config)
    },
    async updateUserImage ({state, rootState, dispatch, commit}, image) {
      const data = new FormData();
      let extention = image.split(".")[1]
      var mineType = await dispatch('mineType', extention)
      data.append('image',
        {
          uri: image,
          name: String(rootState.auth.user.id) + '-image.' + extention,
          type: mineType
        }
      )
      var config = {
        method: 'put',
        url: baseApiUrl + '/users/'+ String(rootState.auth.user.id) + '/image',
        headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
        },
        data: data,
      };
      return axios(config)
      .then(res => {
        commit('setUserImage', image)
      })
    },
    mineType ({}, extention) {
      let allow = {"png":"image/png","pdf":"image/gif","jpeg":"image/jpeg", "jpg":"image/jpg"};
      if (allow[extention] !== undefined){
        return allow[extention]
      }
      else {
        return undefined
      }
    },
    getUserImage ({commit}, uid) {
      return axios.get( baseApiUrl + '/users/' + String(uid) + '/image')
      .then(res => {
        commit('setUserImage',res.data)
      })
    }
  }
}