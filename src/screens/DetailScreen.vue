<template>
  <nb-container class="detail-container">
    <header :screen="title" :navigation="navigation" />

    <nb-tabs>
      <nb-tab :heading="getDetailsTab()">
        <scroll-view class="detail-card">
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
              <nb-text class="card-title">営業時間：</nb-text>
              <nb-text class="card-text">{{ opentime }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">平均予算：</nb-text>
              <nb-text class="card-text">{{ budget }}円</nb-text>
            </nb-item>

            <nb-item class="fc-info">
              <nb-left class="fc-left">
                <nb-button transparent class="fc-icons">
                  <nb-icon class="fc-icon" name="thumbs-up"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ favorites.length }}</nb-text>
                </nb-button>
                <nb-button transparent class="fc-icons">
                  <nb-icon class="fc-icon" name="chatbubbles"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ comments.length }}</nb-text>
                </nb-button>
              </nb-left>
              <nb-right />
            </nb-item>
          </nb-list>

          <nb-list-item
            v-if="isAuth"
            :style="{paddingRight:14}"
            transparent
            no-shadow
            avatar
          >
            <nb-left>
              <nb-thumbnail
                small
                :source="require('../../assets/icon.png')"
              />
            </nb-left>
            <nb-body>
              <nb-text>{{ currentUser.nickname }}</nb-Text>
              <nb-form :style="{width:'100%',marginTop:8}">
                <nb-textarea
                  :rowSpan="3"
                  :style="{paddingTop:8}"
                  bordered
                  placeholder="コメント..."
                  v-model="newComment"
                />
                <input-with-error
                  :error="$v.newComment.$dirty && (!$v.newComment.required || !$v.newComment.minLength || !$v.newComment.maxLength)"
                  message="コメントは1〜255文字で入力してください"
                />
                <nb-button
                  :style="{width:60}"
                  small
                  :on-press="addComment"
                  auto-capitalize="none"
                  :on-blur="() => $v.newComment.$touch()"
                >
                  <nb-text>追加</nb-text>
                </nb-button>
              </nb-form>
            </nb-body>
          </nb-list-item>
          <nb-list-item
            :style="{paddingRight:14}"
            avatar
            v-for="comment in comments"
            :key="comment.id"
          >
            <nb-left>
              <nb-thumbnail small :source="require('../../assets/icon.png')"/>
            </nb-left>
            <nb-body>
              <nb-text>{{ comment.user.nickname }}</nb-Text>
              <nb-text note>{{ comment.text }}</nb-Text>
            </nb-body>
            <nb-right>
              <nb-text note>2020/07/09</nb-text>
            </nb-right>
          </nb-list-item>

          <nb-list-item class="dummy-area" />

        </scroll-view>

        <view class="detail-footer">
          <nb-button
            warning
            class="like-button"
            :on-press="favoriteBtnPress"
            v-if="!favoriteUser"
          >
            <nb-icon active type="AntDesign" name="like1" />
            <nb-text>お気に入り</nb-text>
          </nb-button>

          <nb-button
            warning
            class="like-button"
            :on-press="cancelFavoriteBtnPress"
            v-else
          >
            <nb-icon active type="AntDesign" name="like1" />
            <nb-text>お気に入り解除</nb-text>
          </nb-button>

          <nb-button warning class="like-button" :on-press="openLink">
            <nb-icon active type="Entypo" name="phone" />
            <nb-text>予約</nb-text>
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

export default {
  data: function() {
    return {
      name: "",
      category: "",
      opentime: "",
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
    addComment() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
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
          commentData: {
            text: this.newComment,
          },
          shop_id: this.shopId
        }
        store.dispatch("comment/saveComment", data)
          .then(res => {
            // 店舗新規登録時だけstateのshopIdから値を代入する
            if (this.shopId == 0) {
              this.shopId = store.state.shop.shopId
            }
            this.newComment = ""
            // $dirtyをfalseに設定（コメント入力欄アクティブリセット）
            this.$v.newComment.$reset()
          })
          .catch(() => {
            console.log("保存に失敗しました")
          })
      }
    },
    favoriteBtnPress() {
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
            console.log("お気に入り登録しました")
          })
          .catch(() => {
            console.log("保存に失敗しました")
          })
    },
    cancelFavoriteBtnPress() {
      store.dispatch("favorite/delFavorite", this.shopId)
    }
  },
  async created () {
    const code = this.navigation.getParam('code')
    // マイリスト表示
    const commentedShop = store.getters['shop/getCommentedShop'](code)
    if (commentedShop == undefined) {
      const favoritedShop = store.getters['shop/getFavoritedShop'](code)
      if (favoritedShop == undefined) {
        // 付近にある店舗情報一覧ページの取得値から取得
        const shop = store.getters['shop/getShop'](code)
        this.name = shop.name
        this.category = shop.category
        this.opentime = shop.opentime
        this.budget = Number(shop.budget)
        this.img = shop.img
        this.marker.description = shop.category
        this.marker.coordinate.latitude = Number(shop.latitude)
        this.marker.coordinate.longitude = Number(shop.longitude)
        this.coordinates.latitude = Number(store.state.shop.latitude)
        this.coordinates.longitude = Number(store.state.shop.longitude)
        this.url = shop.url
        this.shopId = shop.shopId
        this.code = code
      }else{
        // お気に入りした店舗を選択
        this.name = favoritedShop.name
        this.category = favoritedShop.category
        this.opentime = favoritedShop.opentime
        this.budget = favoritedShop.budget
        this.img = favoritedShop.img
        this.marker.description = favoritedShop.category
        this.marker.coordinate.latitude = favoritedShop.latitude
        this.marker.coordinate.longitude = favoritedShop.longitude
        this.coordinates.latitude = Number(store.state.shop.latitude)
        this.coordinates.longitude = Number(store.state.shop.longitude)
        this.url = favoritedShop.url
        this.shopId = favoritedShop.id
        this.code = code
      }
    }else{
      // コメントした店舗を選択
      this.name = commentedShop.name
      this.category = commentedShop.category
      this.opentime = commentedShop.opentime
      this.budget = commentedShop.budget
      this.img = commentedShop.img
      this.marker.description = commentedShop.category
      this.marker.coordinate.latitude = commentedShop.latitude
      this.marker.coordinate.longitude = commentedShop.longitude
      this.coordinates.latitude = Number(store.state.shop.latitude)
      this.coordinates.longitude = Number(store.state.shop.longitude)
      this.url = commentedShop.url
      this.shopId = commentedShop.id
      this.code = code
    }
    // 店舗IDがAPIで登録されている場合、コメント情報とお気に入り数を取得。
    if (this.shopId != 0) {
      store.dispatch('comment/getComments', this.shopId)
      await store.dispatch('favorite/getFavorites', this.shopId)
      // カレントユーザーが既にお気に入り登録しているか確認（登録の有無でボタン切り替え）
      const user = store.getters['favorite/checkFavoriteUser'](store.state.auth.user.id)
        if (user) {
          store.dispatch('favorite/pressedFavoriteBtn')
        }else{
          store.dispatch('favorite/notPressedFavoriteBtn')
        }
    }else{
      store.dispatch('comment/delComments')
      store.dispatch('favorite/delFavorites')
      store.dispatch('favorite/notPressedFavoriteBtn')
    }
  },
  computed: {
    comments() {
      return store.state.comment.comments
    },
    favorites() {
      return store.state.favorite.favorites
    },
    currentUser() {
      return store.state.auth.user
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
    favoriteUser() {
      return store.state.favorite.favoriteUser
    }
  },
}
</script>

<style>
.detail-container {
  position: relative;
}
.detail-card {
  padding: 10;
}
.card-image {
  height: 200;
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
.detail-footer {
  flex-direction: row;
  background-color: #DDDDDD;
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.like-button {
  flex: 1;
  margin-left: 10;
  margin-right: 10;
}
.map-container {
  flex: 1;
}
.dummy-area {
  height: 100px;
}
</style>