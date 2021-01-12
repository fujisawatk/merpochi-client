<template>
  <nb-container class="detail-container">
    <header :screen="title" :navigation="navigation" />

    <nb-tabs>
      <nb-tab :heading="getDetailsTab()">
        <scroll-view>
          <nb-card-item>
            <image
              v-if="img != ''"
              :source="{uri: img}"
              class="card-image"
            />
            <image
              v-else
              :source="require('../../assets/icons/sample.jpg')"
              class="card-image"
            />
          </nb-card-item>

          <nb-list>
            <nb-separator class="card-index">
              <nb-text class="index-title">店舗情報</nb-text>
            </nb-separator>

            <nb-item class="card-info">
              <nb-text class="card-title">店名：</nb-text>
              <nb-text class="card-text">{{ name }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">カテゴリー：</nb-text>
              <nb-text class="card-text">{{ category }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">営業時間：</nb-text>
              <nb-text class="card-text">{{ opentime }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">アクセス：</nb-text>
              <nb-text class="card-text">{{ access }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">平均予算：</nb-text>
              <nb-text class="card-text">{{ budget }}円</nb-text>
            </nb-item>

            <nb-item class="fc-info">
              <nb-left class="fc-left">
                <nb-button transparent class="fc-icons">
                  <nb-icon class="fc-icon" name="thumbs-up"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ isFavoritesCount }}</nb-text>
                </nb-button>
                <nb-button transparent class="fc-icons">
                  <nb-icon class="fc-icon" type="FontAwesome" name="bookmark"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ isBookmarksCount }}</nb-text>
                </nb-button>
                <nb-button transparent class="fc-icons">
                  <nb-icon  class="fc-icon" type="Entypo" name="text-document-inverted"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ posts.length }}</nb-text>
                </nb-button>
              </nb-left>
              <nb-right>
                <nb-button bordered light :on-press="openLink">
                  <nb-icon active type="Entypo" name="phone" />
                  <nb-text>予約</nb-text>
                </nb-button>
              </nb-right>
            </nb-item>
          </nb-list>

          <nb-separator bordered class="post-index">
            <nb-text class="post-title">投稿一覧</nb-text>
          </nb-separator>

          <nb-list
            v-for="post in posts"
            :key="post.id"
          >
            <post-item
              :post="post"
            />
          </nb-list>

          <nb-list-item class="dummy-area" />

        </scroll-view>

        <view class="detail-footer">
          <nb-button
            success
            bordered
            class="like-button"
            :on-press="pressedBookmarkBtn"
            v-if="isBookmark === false"
          >
            <nb-icon active class="btn-icon" type="FontAwesome" name="bookmark-o" />
            <nb-text class="btn-text">ブックマーク</nb-text>
          </nb-button>

          <nb-button
            success
            class="like-button"
            :on-press="pressedCancelBookmarkBtn"
            v-else
          >
            <nb-icon active class="btn-icon" type="FontAwesome" name="bookmark" />
            <nb-text class="btn-text">ブックマーク</nb-text>
          </nb-button>

          <nb-button
            success
            bordered
            class="like-button"
            :on-press="pressedFavoriteBtn"
            v-if="isFavorite === false"
          >
            <nb-icon active class="btn-icon" type="MaterialIcons" name="favorite-border" />
            <nb-text class="btn-text">リピートしたい！</nb-text>
          </nb-button>

          <nb-button
            success
            class="like-button"
            :on-press="pressedCancelFavoriteBtn"
            v-else
          >
            <nb-icon active class="btn-icon" type="MaterialIcons" name="favorite" />
            <nb-text class="btn-text">リピートしたい！</nb-text>
          </nb-button>

        </view>    
      </nb-tab>

      <nb-tab :heading="getMapTab()">
        <view class="map-container">
          <map-view class="map-container"
            ref="map"
            :initial-region="coordinates"
          >
            <map-view:marker
              :coordinate="marker.coordinate"
              :title="name"
              :description="marker.description"
            >
            </map-view:marker>
          </map-view>
        </view>
      </nb-tab>
    </nb-tabs>

  </nb-container>
</template>

<script>
import { ScrollView, Linking } from 'react-native'
import React from "react"
import { TabHeading, Text } from "native-base"
import MapView from 'react-native-maps'
import store from '../store'
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'
import axios from 'axios'
import service from '../services/axios'
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  data: function() {
    return {
      name: "",
      category: "",
      opentime: "",
      access: "",
      budget: "",
      img: "",
      title: "店舗詳細ページ",
      marker: {
        coordinate: {
          latitude: 0,
          longitude: 0,
        },
        description: "",
      },
      coordinates: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.003,
        longitudeDelta: 0.003
      },
      url: "",
      shopId: 0,
      newComment: "",
      code: "",
      posts: [],
      bookmarksCount: 0,
      bookmarkUser: false,
      favoritesCount: 0,
      favoriteUser: false,
    }
  },
  validations: {
    newComment: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(255)
    }
  },
  components: {
    ScrollView,
    MapView
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    currentUser() {
      return store.state.auth.user
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
    isBookmarksCount() {
      return this.bookmarksCount
    },
    isFavoritesCount() {
      return this.favoritesCount
    },
    isBookmark() {
      return this.bookmarkUser
    },
    isFavorite() {
      return this.favoriteUser
    },
  },
  methods: {
    getDetailsTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color: '#444444', fontSize:13}}>詳細</Text>
        </TabHeading>
      )
    },
    getMapTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>マップ</Text>
        </TabHeading>
      )
    },
    openLink() {
      Linking
        .openURL(this.url)
        .catch(
          err => console.error('URLを開けませんでした。', err)
        )
    },
    pressedBookmarkBtn() {
      const data = {
        shopData: {
          code: this.code,
          name: this.name,
          category: this.category,
          opentime: this.opentime,
          access: this.access,
          budget:   Number(this.budget),
          img:     this.img,
          url: this.url,
          latitude: Number(this.marker.coordinate.latitude),
          longitude: Number(this.marker.coordinate.longitude),
        },
        shop_id: this.shopId,
      }
      store.dispatch("bookmark/saveBookmark", data)
      .then(res => {
        // 店舗が新規登録の場合、店舗IDを取得
        if (this.shopId == 0) {
          this.shopId = store.state.shop.shopId
        }
        this.bookmarksCount += 1
        this.bookmarkUser = true
        store.dispatch('shop/plusBookmark', this.code)
        console.log("ブックマーク登録しました")
      })
      .catch(() => {
        console.log("保存に失敗しました")
      })
    },
    pressedCancelBookmarkBtn() {
      store.dispatch('bookmark/delBookmark', this.shopId)
      .then(res => {
          this.bookmarksCount -= 1
          this.bookmarkUser = false
          store.dispatch("shop/minusBookmark", this.code)
          console.log("ブックマーク解除しました")
        })
        .catch(() => {
          console.log("解除に失敗しました")
        })
    },
    pressedFavoriteBtn() {
      const data = {
          shopData: {
            code: this.code,
            name: this.name,
            category: this.category,
            opentime: this.opentime,
            budget:   this.budget,
            img:     this.img,
            latitude: this.marker.coordinate.latitude,
            longitude: this.marker.coordinate.longitude,
            url: this.url
          },
          shop_id: this.shopId,
        }
        store.dispatch("favorite/saveFavorite", data)
        .then(res => {
          // 店舗新規登録時だけstateのshopIdから値を代入する
          if (this.shopId == 0) {
            this.shopId = store.state.shop.shopId
          }
          this.favoritesCount += 1
          this.favoriteUser = true
          store.dispatch('shop/plusRating', this.code)
          console.log("お気に入り登録しました")
        })
        .catch(() => {
          console.log("保存に失敗しました")
        })
    },
    pressedCancelFavoriteBtn() {
      store.dispatch("favorite/delFavorite", this.shopId)
      .then(res => {
          this.favoritesCount -= 1
          this.favoriteUser = false
          store.dispatch('shop/minusRating', this.code)
          console.log("お気に入り解除しました")
        })
        .catch(() => {
          console.log("解除に失敗しました")
        })
    },
  },
  async created () {
    const code = this.navigation.getParam('code')
    this.coordinates.latitude = Number(store.state.shop.latitude)
    this.coordinates.longitude = Number(store.state.shop.longitude)
    this.code = code
    await axios.post( baseApiUrl + '/shops/code', { code: code })
    // 店舗登録済の場合
    .then(res => {
      this.name = res.data.name
      this.category = res.data.category
      this.opentime = res.data.opentime
      this.access = res.data.access
      this.budget = res.data.budget
      this.img = res.data.img
      this.marker.description = res.data.category
      this.marker.coordinate.latitude = res.data.latitude
      this.marker.coordinate.longitude = res.data.longitude
      this.url = res.data.url
      this.shopId = res.data.id
    })
    // 未登録の場合
    .catch(() => {
      const shop = store.getters['shop/getShop'](code)
      this.name = shop.name
      this.category = shop.category
      this.opentime = shop.opentime
      this.access = shop.access.line + shop.access.stations + shop.access.station_exit + shop.access.walk + '分'
      this.budget = Number(shop.budget)
      this.img = shop.img
      this.marker.description = shop.category
      this.marker.coordinate.latitude = Number(shop.latitude)
      this.marker.coordinate.longitude = Number(shop.longitude)
      this.url = shop.url
    })    
    // 店舗IDがAPIで登録されている場合
    if (this.shopId != 0) {
      // 投稿情報取得
      axios.get( baseApiUrl + '/shops/' + String(this.shopId) + '/posts')
      .then(res => {
        if (res.data == null) {
          this.posts = []
        }else{
          this.posts = res.data
        } 
      })
      .catch(() => {})
      const data = {
        shop_codes: [code],
        user_id: store.state.auth.user.id
      }
      // ブックマーク、お気に入り情報取得
      axios.post( baseApiUrl + '/shops/search', data)
      .then(res => {
        this.bookmarksCount = res.data[0].bookmarks_count
        this.bookmarkUser = res.data[0].bookmark_user
        this.favoritesCount = res.data[0].favorites_count
        this.favoriteUser = res.data[0].favorite_user
      })
      .catch(() => {})
    }
  }
}
</script>

<style>
.detail-container {
  position: relative;
}
.card-image {
  height: 300;
  width: 100%;
}
.card-index {
  max-height: 50px;
  align-items: center;
}
.index-title {
  font-size: 15;
}
.card-info {
  padding-top: 20px;
  padding-bottom: 20px;
}
.card-title {
  flex: 1;
  text-align: center;
  font-size: 15;
  font-weight: bold;
}
.card-text {
  flex: 2;
  margin-left: 15;
  font-size: 15;
}
.fc-info {
  padding-top: 5px;
  padding-bottom: 5px;
}
.fc-left {
  flex: 1;
  flex-direction: row;
}
.fc-icons {
  flex: 1;
  position: relative;
}
.fc-icon {
  color: #FFCC33;
}
.fc-count {
  position: absolute;
  left: 40;
  color: #444;
}
.post-index {
  height: 50px;
  align-items: center;
}
.post-title {
  font-size: 15;
}
.detail-footer {
  flex-direction: row;
  background-color: #ffffff;
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.like-button {
  flex: 1;
  margin-left: 10;
  margin-right: 10;
  position: relative;
}
.btn-icon {
  font-size: 18;
}
.btn-text {
  position: absolute;
  font-size: 15;
  left: 25;
}
.map-container {
  flex: 1;
}
.dummy-area {
  height: 100px;
}
</style>