import axios from 'axios'

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
      state.selectedStationName = name + "駅"
    },
    resetStationList (state) {
      state.stations = []
    }
  },
  actions: {
    // 指定の店舗IDに紐付いたお気に入り数を取得
    searchStations ({commit}, keyword) {
      return axios.post('http://192.168.100.100:8000/stations/search', keyword)
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
    }
  }
}