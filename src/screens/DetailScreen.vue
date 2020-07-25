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
                  <nb-text class="fc-count" :style="{paddingLeft:4}">9</nb-text>
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
          <nb-button warning class="like-button">
            <nb-icon active type="AntDesign" name="like1" />
            <nb-text>お気に入り</nb-text>
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
      code: ""
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
          text: this.newComment,
          shop_id: this.shopId,
          user_id: store.state.auth.user.id,
          code: this.code,
          name: this.name,
          category: this.category,
          img:     this.img,
        } 
        store.dispatch("comment/saveComment", data)
          .then(res => {
            this.shopId = store.state.comment.newCommentShopId
            this.newComment = ""
            // $dirtyをfalseに設定（コメント入力欄アクティブリセット）
            this.$v.newComment.$reset()
          })
          .catch(() => {
            console.log("保存に失敗しました")
          })
      }
    }
  },
  async created () {
    const code = this.navigation.getParam('code')
    // 外部APIで取得したデータ値から検索
    const shop = store.getters['shop/getShop'](code)
    // マイページでの呼び出し
    if (shop == undefined) {
      // DBの店舗ID取得用
      const commentedShop = store.getters['shop/getCommentedShop'](code)
      // マイページからの詳細ページアクセスは、外部APIで必要なデータを取得する必要がある。
      const requestUrl = store.state.shop.gnaviApiUrl + "?keyid=" + store.state.shop.keyid + "&id=" + code
      await axios
        .get(requestUrl)
        .then((res) => {
          this.name = res.data.rest[0].name
          this.category = res.data.rest[0].category
          this.opentime = res.data.rest[0].opentime
          this.budget = res.data.rest[0].budget
          this.img = res.data.rest[0].image_url.shop_image1
          this.marker.description = res.data.rest[0].category
          this.marker.coordinate.latitude = Number(res.data.rest[0].latitude)
          this.marker.coordinate.longitude = Number(res.data.rest[0].longitude)
          this.coordinates.latitude = Number(store.state.shop.latitude)
          this.coordinates.longitude = Number(store.state.shop.longitude)
          this.url = res.data.rest[0].url
          this.shopId = Number(commentedShop.id)
          this.code = code
        })
        .catch(() => undefined)
    // 既に取得してある店舗データの場合（付近店舗一覧画面）
    }else{
      this.name = shop.name
      this.category = shop.category
      this.opentime = shop.opentime
      this.budget = shop.budget
      this.img = shop.img
      this.marker.description = shop.category
      this.marker.coordinate.latitude = Number(shop.latitude)
      this.marker.coordinate.longitude = Number(shop.longitude)
      this.coordinates.latitude = Number(store.state.shop.latitude)
      this.coordinates.longitude = Number(store.state.shop.longitude)
      this.url = shop.url
      this.shopId = shop.shopId
      this.code = code
    }
    console.log(this.shopId)
    // 店舗IDがAPIで登録されている場合、コメントを取得。
    if (this.shopId != 0) {
      store.dispatch('comment/getComments', this.shopId)
    }else{
      store.dispatch('comment/delComments')
    }
  },
  computed: {
    comments() {
      return store.state.comment.comments
    },
    currentUser() {
      return store.state.auth.user
    },
    isAuth() {
      return store.state.auth.isAuthResolved
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