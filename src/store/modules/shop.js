import axios from 'axios'
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    latitude: "",                                             // 現在位置緯度
    longitude: "",                                            // 現在位置経度
    errorMessage: "",                                         // 現在位置取得時のエラーメッセージ
    gnaviApiUrl: "https://api.gnavi.co.jp/RestSearchAPI/v3/", // ぐるなびAPIアクセス用URL
    keyid: "ae0f4e85e8ca70ba78e7ef73bd1db6b9",                // ぐるなびAPIのキーID
    shops: [],                                                // 取得した店舗情報
    count: "",                                                // 各店舗のブックマーク数、いいね数
    commentedShops: [],                                       // ログインユーザーがコメントした店舗情報
    favoritedShops: [],                                       // ログインユーザーがお気に入りした店舗情報
    shopId: 0,
    shopName: "",                                                 // 投稿する店舗
    shop: "",
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
    setShops (state, data) {
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
          access: value.access,
          ratingCount: state.count[index].rating_count,
          bookmarksCount: state.count[index].bookmarks_count,
          shopId: state.count[index].id,
          bookmarkUser: state.count[index].bookmark_user
        }
        state.shops.push(hash)
      })
    },
    setRatingAndBookmarksCount (state, data) {
      state.count = data
    },
    setCommentedAndFavoritedShops (state, data) {
      state.commentedShops = data.commented_shops
      state.favoritedShops = data.favorited_shops
    },
    setShopId (state, shopId) {
      state.shopId = shopId
    },
    resetShopId (state) {
      state.shopId = 0
    },
    setShop (state, shop) {
      state.shopName = shop.name
      state.shop = shop
    },
    setBookmark (state, code) {
      state.shops.find(el => el.code == code).bookmarkUser = true
      state.shops.find(el => el.code == code).bookmarksCount += 1
    },
    resetBookmark (state, code) {
      state.shops.find(el => el.code == code).bookmarkUser = false
      state.shops.find(el => el.code == code).bookmarksCount -= 1
    },
    setRating (state, code) {
      state.shops.find(el => el.code == code).ratingCount += 1
    },
    resetRating (state, code) {
      state.shops.find(el => el.code == code).ratingCount -= 1
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
    async getShops ({dispatch, state, commit, rootState}, genre) {
      await dispatch('getGeolocation')
      // 0.5sec遅延して、commit後のstateを読込
      setTimeout(() => {
        const requestUrl = state.gnaviApiUrl + "?keyid=" + state.keyid + "&latitude=" + state.latitude + "&longitude=" + state.longitude + "&freeword=" + genre
        axios
        .get(requestUrl)
        .then(async (res) => {
          const shopCodes = res.data.rest.map(function( value ) {
            return value.id
          })
          const data = {
            shop_codes: shopCodes,
            user_id: rootState.auth.user.id
          }
          await dispatch('getRatingAndBookmarksAndFavoritesCount', data)
          commit('setShops', res.data)
        })
        .catch(() => undefined)
      }, 500)
    },
    // 各店舗の高評価数、ブックマーク数を取得
    getRatingAndBookmarksAndFavoritesCount ({commit}, data) {
      return axios.post( baseApiUrl + '/shops/search', data)
      .then(res => {
        commit('setRatingAndBookmarksCount', res.data)
      })
    },
    // 店舗IDを新規登録（初コメor初お気に入り時）
    saveShop ({commit}, data) {
      return axios.post( baseApiUrl + '/shops', data)
      .then(res => {
        commit('setShopId', res.data.id)
      })
    },
    // ユーザーがコメント・お気に入りした店舗情報を取得
    getCommentedAndFavoritedShops ({commit}) {
      return axios.get( baseApiUrl + '/shops/me')
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
    },
    // 投稿時の店舗検索
    shopSearch ({state}, keyword) {
      const requestUrl = state.gnaviApiUrl + "?keyid=" + state.keyid + "&name=" + keyword + "&hit_per_page=" + "20"
      return axios
        .get(requestUrl)
        .then((res) => {
          return res.data.rest
        })
        .catch(() => undefined)
    },
    selectedShop({commit}, shop) {
      commit('setShop', shop)
    },
    // 詳細ページ操作後に一覧ページのブックマーク数更新
    plusBookmark ({commit}, code) {
      return commit('setBookmark', code)
    },
    minusBookmark ({commit}, code) {
      return commit('resetBookmark', code)
    },
    // 詳細ページ操作後に一覧ページのリピート数更新
    plusRating ({commit}, code) {
      return commit('setRating', code)
    },
    minusRating ({commit}, code) {
      return commit('resetRating', code)
    },
    addShopId ({commit}, shopId) {
      return commit('setShopId', shopId)
    },
    delShopId ({commit}) {
      return commit('resetShopId')
    },
  }
}