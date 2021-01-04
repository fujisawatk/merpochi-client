import axios from 'axios'
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    stations: [],
    selectedStationName: ""
  },
  getters: {}, 
  mutations: {
    setStations (state, data) {
      state.stations = data
    },
    setStationName (state, name) {
      state.selectedStationName = name
    },
    resetStationList (state) {
      state.stations = []
    },
    resetStationName (state) {
      state.selectedStationName = ""
    }
  },
  actions: {
    // 指定の店舗IDに紐付いたお気に入り数を取得
    searchStations ({commit}, keyword) {
      return axios.post( baseApiUrl + '/stations/search', keyword)
      .then(res => {
        if (res.data.length != 0) {
          commit('setStations', res.data)
        }else{
          const notData = [
            {
              station_name: "該当なし"
            }
          ]
          commit('setStations', notData)
        }
      })
    },
    selectedStationList ({commit}, name) {
      return commit('setStationName', name)
    },
    delStationList ({commit}) {
      return commit('resetStationList')
    },
    delStationName ({commit}) {
      return commit('resetStationName')
    }
  }
}