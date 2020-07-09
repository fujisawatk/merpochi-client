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
    commentsCount: ""                                         // 各店舗のコメント数
  },
  getters: {
    // 指定IDの店舗情報をstate.restsから取得
    getShop: (state) => (code) => {
      return state.shops.find(shop => shop.code === code)
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
          commentsCount: state.commentsCount[index].count,
          shopId: state.commentsCount[index].id
        }
        state.shops.push(hash)
      })
    },
    setCommentsCount (state, data) {
      state.commentsCount = data
    }
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
          await dispatch('getCommentsCount', shopCodes)
          commit('setShop', res.data)
        })
        .catch(() => undefined)
    },
    // 店舗IDをAPI側にリクエスト → 各店舗のコメント数を期待
    async getCommentsCount ({commit}, shopCodes) {
      console.log(shopCodes)
      return axios.post('http://192.168.100.100:8000/shops', shopCodes)
      .then(res => {
        commit('setCommentsCount', res.data)
      })
    }
  }
}