import axios from 'axios'
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"

export default {
  namespaced: true,
  state: {
    latitude: "",                                             // 現在位置緯度
    longitude: "",                                            // 現在位置経度
    errorMessage: "",                                         // 現在位置取得時のエラーメッセージ
    gnaviApiUrl: "https://api.gnavi.co.jp/RestSearchAPI/v3/", // ぐるなびAPIアクセス用URL
    keyid: "980bec359baeb39b9866300dd9a38675",                // ぐるなびAPIのキーID
    shops: [],                                                // 取得した店舗情報
    count: "",                                                // 各店舗のコメント数、いいね数
    commentedShops: "",                                       // ログインユーザーがコメントした店舗情報
    favoritedShops: "",                                       // ログインユーザーがお気に入りした店舗情報
    shopId: 0,
  },
  getters: {
    // 指定IDの店舗情報をstate.restsから取得
    getShop: (state) => (code) => {
      return state.shops.find(shop => shop.code === code)
    },
    getCommentedShop: (state) => (code) => {
      return state.commentedShops.find(shop => shop.code === code)
    },
    getFavoritedShop: (state) => (code) => {
      return state.favoritedShops.find(shop => shop.code === code)
    }
  }, 
  mutations: {
    setGeolocation (state, location) {
      state.latitude = location.coords.latitude
      state.longitude = location.coords.longitude
      state.errorMessage = ""
    },
    setShop (state, data) {
      state.shops = []
      data.rest.map(function( value, index ) {
        const hash = {
          code: value.id,
          name: value.name,
          img: value.image_url.shop_image1,
          category: value.category,
          opentime: value.opentime,
          budget: value.budget,
          url: value.url,
          latitude: value.latitude,
          longitude: value.longitude,
          commentsCount: state.count[index].comments_count,
          favoritesCount: state.count[index].favorites_count,
          shopId: state.count[index].id
        }
        state.shops.push(hash)
      })
    },
    setCommentsAndFavoritesCount (state, data) {
      state.count = data
    },
    setCommentedAndFavoritedShops (state, data) {
      state.commentedShops = data.commented_shops
      state.favoritedShops = data.favorited_shops
    },
    setShopId (state, shopId) {
      state.shopId = shopId
    },
  },
  actions: {
    // 現在位置情報取得
    getGeolocation ({commit, state}) {
      Permissions.askAsync(Permissions.LOCATION)
        .then(status => {
          if (!status.granted) {
            this.errorMessage = "Permission to access location was denied"
          } else if (status.granted) {
            Location.getCurrentPositionAsync({}).then(location => {
              commit('setGeolocation', location)
            })
          }
        })
        .catch(err => {
          console.log(err)
        }) 
    },
    // 付近の店舗情報取得
    async getShops ({dispatch, state, commit}) {
      await dispatch('getGeolocation')
      const requestUrl = state.gnaviApiUrl + "?keyid=" + state.keyid + "&latitude=" + state.latitude + "&longitude=" + state.longitude
      axios
        .get(requestUrl)
        .then(async (res) => {
          const shopCodes = res.data.rest.map(function( value ) {
            return value.id
          })
          await dispatch('getCommentsAndFavoritesCount', shopCodes)
          commit('setShop', res.data)
        })
        .catch(() => undefined)
    },
    // 各店舗のコメント数、いいね数を取得
    async getCommentsAndFavoritesCount ({commit}, shopCodes) {
      return axios.post('http://192.168.100.100:8000/shops/search', shopCodes)
      .then(res => {
        commit('setCommentsAndFavoritesCount', res.data)
      })
    },
    // 店舗IDを新規登録（初コメor初お気に入り時）
    saveShop ({commit}, data) {
      return axios.post('http://192.168.100.100:8000/shops', data)
      .then(res => {
        commit('setShopId', res.data.id)
      })
    },
    // ユーザーがコメント・お気に入りした店舗情報を取得
    getCommentedAndFavoritedShops ({commit}, uid) {
      return axios.post('http://192.168.100.100:8000/shops/me', { user_id: uid })
      .then(res => {
          commit('setCommentedAndFavoritedShops',res.data)
        })
    },
    // 店名・キーワード検索
    keywordSearch ({dispatch, state, commit}, keyword) {
      const requestUrl = state.gnaviApiUrl + "?keyid=" + state.keyid + "&name=" + keyword
      axios
        .get(requestUrl)
        .then(async (res) => {
          const shopCodes = res.data.rest.map(function( value ) {
            return value.id
          })
          await dispatch('getCommentsAndFavoritesCount', shopCodes)
          commit('setShop', res.data)
        })
        .catch(() => undefined)
    },
    detailSearch ({dispatch, state, commit, rootState}, keyword) {
      const requestUrl = state.gnaviApiUrl + "?keyid=" + state.keyid + "&name=" + keyword + "&freeword=" + rootState.station.selectedStationName + "駅" + "," + rootState.genre.selectedGenre
      axios
        .get(requestUrl)
        .then(async (res) => {
          const shopCodes = res.data.rest.map(function( value ) {
            return value.id
          })
          await dispatch('getCommentsAndFavoritesCount', shopCodes)
          commit('setShop', res.data)
        })
        .catch(() => undefined)
    }
  }
}