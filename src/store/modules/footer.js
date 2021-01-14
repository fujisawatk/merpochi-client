export default {
  namespaced: true,
  state: {
    homeTab: true,            // ナビゲーションバーのアクティブページ判定
    homeTab: false,
    myListTab: false,
    myAccountTab: false,
  },
  mutations: {
    setHomeTab (state) {
      state.homeTab = true
      state.addPostTab = false
      state.myListTab = false
      state.myAccountTab = false
    },
    setAddPostTab (state) {
      state.homeTab = false
      state.addPostTab = true
      state.myListTab = false
      state.myAccountTab = false
    },
    setMyListTab (state) {
      state.homeTab = false
      state.addPostTab = false
      state.myListTab = true
      state.myAccountTab = false
    },
    setMyAccountTab (state) {
      state.homeTab = false
      state.addPostTab = false
      state.myListTab = false
      state.myAccountTab = true
    },
  },
  actions: {
    activeHomeTab ({commit}) {
      commit('setHomeTab')
    },
    activeAddPostTab ({commit}) {
      commit('setAddPostTab')
    },
    activeMyListTab ({commit}) {
      commit('setMyListTab')
    },
    activeMyAccountTab ({commit}) {
      commit('setMyAccountTab')
    }
  }
}