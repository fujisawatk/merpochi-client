import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

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
        commit('setImage',res.data)
      })
    }
  }
}