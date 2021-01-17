import axios from 'axios'
import * as Location from "expo-location"
import * as Permissions from "expo-permissions"
import { ENV } from "../../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  namespaced: true,
  state: {
    gnaviApiUrl: "https://api.gnavi.co.jp/RestSearchAPI/v3/", // ぐるなびAPIアクセス用URL
    keyid: "ae0f4e85e8ca70ba78e7ef73bd1db6b9",                // ぐるなびAPIのキーID
    latitude: "",                                             // 現在位置緯度
    longitude: "",                                            // 現在位置経度
    errorMessage: "",                                         // 現在位置取得時のエラーメッセージ
    shops: [],                                                // 店舗一覧ページ
    count: "",                                                // 各店舗のブックマーク数、いいね数
    shopId: 0,
    shopName: "",                                              
    shop: {  
      id: 0,                                                 // 操作する店舗情報
      code: "",
      name: "",
      category: "",
      opentime: "",
      access: "",
      budget: 0,
      img: "",
      latitude: 0,
      longitude: 0,
      url: "",
      ratingCount: 0,
      bookmarksCount: 0,
      bookmarkUser: false,
      favoritesCount: 0,
      favoriteUser: false
    },
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
          id: state.count[index].id,
          code: value.id,
          name: value.name,
          category: value.category,
          opentime: value.opentime,
          access: value.access.line + value.access.station + value.access.station_exit + value.access.walk + '分',
          budget: Number(value.budget),
          img: value.image_url.shop_image1,
          latitude: Number(value.latitude),
          longitude: Number(value.longitude),
          url: value.url,
          ratingCount: state.count[index].rating_count,
          bookmarksCount: state.count[index].bookmarks_count,
          bookmarkUser: state.count[index].bookmark_user,
          favoritesCount: state.count[index].favorites_count,
          favoriteUser: state.count[index].favorite_user
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
    setShop (state, shop) {
      state.shop = shop
    },
    resetShop (state) {
      state.shop.id = 0,
      state.shop.code = "",
      state.shop.name = "",
      state.shop.category = "",
      state.shop.opentime = "",
      state.shop.access = "",
      state.shop.budget = 0,
      state.shop.img = "",
      state.shop.latitude = 0,
      state.shop.longitude = 0,
      state.shop.url = "",
      state.shop.ratingCount = 0,
      state.shop.bookmarksCount = 0,
      state.shop.bookmarkUser = false,
      state.shop.favoritesCount = 0,
      state.shop.favoriteUser = false
    },
    setShopId (state, shopId) {
      state.shop.id = shopId
    },
    setBookmark (state) {
      state.shops.find(el => el.code == state.shop.code).bookmarkUser = true
      state.shops.find(el => el.code == state.shop.code).bookmarksCount += 1
    },
    resetBookmark (state) {
      state.shops.find(el => el.code == state.shop.code).bookmarkUser = false
      state.shops.find(el => el.code == state.shop.code).bookmarksCount -= 1
    },
    setBookmarkForMyList (state) {
      state.shop.bookmarkUser = true
      state.shop.bookmarksCount += 1
    },
    resetBookmarkForMyList (state) {
      state.shop.bookmarkUser = false
      state.shop.bookmarksCount -= 1
    },
    setRating (state) {
      state.shops.find(el => el.code == state.shop.code).ratingCount += 1
    },
    resetRating (state) {
      state.shops.find(el => el.code == state.shop.code).ratingCount -= 1
    },
    setFavorite (state) {
      state.shop.favoriteUser = true
      state.shop.favoritesCount += 1
    },
    resetFavorite (state) {
      state.shop.favoriteUser = false
      state.shop.favoritesCount -= 1
    },
    setSelectedShop (state, shop) {
      state.shop.id = 0,
      state.shop.code = shop.id,
      state.shop.name = shop.name,
      state.shop.category = shop.category,
      state.shop.opentime = shop.opentime,
      state.shop.access = shop.access.line + shop.access.station + shop.access.station_exit + shop.access.walk + '分',
      state.shop.budget = Number(shop.budget),
      state.shop.img = shop.image_url.shop_image1,
      state.shop.latitude = Number(shop.latitude),
      state.shop.longitude = Number(shop.longitude),
      state.shop.url = shop.url
      state.shop.ratingCount = 0,
      state.shop.bookmarksCount = 0,
      state.shop.bookmarkUser = false,
      state.shop.favoritesCount = 0,
      state.shop.favoriteUser = false
    },
    setCount (state, count) {
      state.shop.bookmarksCount = count[0].bookmarks_count
      state.shop.bookmarkUser = count[0].bookmark_user
      state.shop.favoritesCount = count[0].favorites_count
      state.shop.favoriteUser = count[0].favorite_user
    },
    setShopForMyList (state, shop) {
      state.shop.id = shop.id,
      state.shop.code = shop.code,
      state.shop.name = shop.name,
      state.shop.category = shop.category,
      state.shop.opentime = shop.opentime,
      state.shop.access = shop.access,
      state.shop.budget = shop.budget,
      state.shop.img = shop.img,
      state.shop.latitude = shop.latitude,
      state.shop.longitude = shop.longitude,
      state.shop.url = shop.url
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
    saveShop ({commit, state}) {
      const data = {
        code: state.shop.code,
        name: state.shop.name,
        category: state.shop.category,
        opentime: state.shop.opentime,
        access: state.shop.access,
        budget:   state.shop.budget,
        img:     state.shop.img,
        url: state.shop.url,
        latitude: state.shop.latitude,
        longitude: state.shop.longitude
      }
      console.log(data)
      return axios.post( baseApiUrl + '/shops', data)
      .then(res => {
        commit('setShopId', res.data.id)
      })
      .catch(() => undefined)
    },
    // 操作する店舗を格納
    addShop ({commit}, shop) {
      return commit('setShop', shop)
    },
    delShop ({commit}) {
      return commit('resetShop')
    },
    // 店舗登録時、操作店舗のIDを更新
    addShopId ({commit}, shopId) {
      return commit('setShopId', shopId)
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
      commit('setSelectedShop', shop)
    },
    // 一覧ページからブックマーク数更新
    addBookmark ({commit}) {
      return commit('setBookmark')
    },
    delBookmark ({commit}) {
      return commit('resetBookmark')
    },
    addBookmarkForMyList ({commit}) {
      return commit('setBookmarkForMyList')
    },
    delBookmarkForMyList ({commit}) {
      return commit('resetBookmarkForMyList')
    },
    // お気に入り数、リピート数更新
    addRating ({commit}) {
      return commit('setRating')
    },
    delRating ({commit}) {
      return commit('resetRating')
    },
    addFavorite ({commit}) {
      return commit('setFavorite')
    },
    delFavorite ({commit}) {
      return commit('resetFavorite')
    },
    addCount ({commit}, count) {
      return commit('setCount', count)
    },
    // マイリストからの詳細ページアクセス用
    addShopForMyList ({commit}, shop) {
      return commit('setShopForMyList', shop)
    },
  }
}