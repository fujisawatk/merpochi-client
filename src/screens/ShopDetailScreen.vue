<template>
  <nb-container class="detail-container">
    <header :screen="title" :navigation="navigation" />

    <nb-tabs>
      <nb-tab :heading="getDetailsTab()">
        <scroll-view>
          <nb-card-item>
            <view>
              <scroll-view :horizontal="true">
                <nb-list-item	
                  avatar
                  v-for="(img, i) in isShopImage"
                  :key="i"
                >
                    <image-modal
                      :swipeToDismiss="false"
                      :resizeMode="`contain`"
                      :imageBackgroundColor="`#000000`"
                      :style="{
                        width: 300,
                        height: 250,
                      }"
                      :source="{uri: img.uri}"
                    />
                </nb-list-item>
              </scroll-view>
            </view>
            
          </nb-card-item>

          <nb-list>
            <nb-separator class="card-index">
              <nb-text class="index-title">店舗情報</nb-text>
            </nb-separator>

            <nb-item class="card-info">
              <nb-text class="card-title">店名：</nb-text>
              <nb-text class="card-text">{{ shop.name }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">カテゴリー：</nb-text>
              <nb-text class="card-text">{{ shop.category }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">営業時間：</nb-text>
              <nb-text class="card-text">{{ shop.opentime }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">アクセス：</nb-text>
              <nb-text class="card-text">{{ shop.access }}</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">平均予算：</nb-text>
              <nb-text class="card-text">{{ shop.budget }}円</nb-text>
            </nb-item>

            <nb-item class="fc-info">
              <nb-left class="fc-left">
                <nb-button transparent class="fc-icons">
                  <nb-icon class="fc-icon" name="thumbs-up"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ shop.favoritesCount }}</nb-text>
                </nb-button>
                <nb-button transparent class="fc-icons">
                  <nb-icon class="fc-icon" type="FontAwesome" name="bookmark"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ shop.bookmarksCount }}</nb-text>
                </nb-button>
                <nb-button transparent class="fc-icons">
                  <nb-icon  class="fc-icon" type="Entypo" name="text-document-inverted"></nb-icon>
                  <nb-text class="fc-count" :style="{paddingLeft:4}">{{ posts.length }}</nb-text>
                </nb-button>
              </nb-left>
              <nb-right>
                <nb-button bordered light class="phone-btn" :on-press="openLink">
                  <nb-icon active type="Entypo" name="phone" />
                  <nb-text>予約</nb-text>
                </nb-button>
              </nb-right>
            </nb-item>
          </nb-list>


          <nb-separator v-if="isAuth" class="post-index">
            <nb-text class="post-title">あなたのレビュー</nb-text>
          </nb-separator>
          <nb-list-item
            :style="{paddingRight:20}"
            transparent
            no-shadow
            avatar
            v-if="isAuth"
          >
            <nb-left>
              <nb-thumbnail
                small
                :source="{uri: currentUserImage }"
              />	
            </nb-left>
            <nb-body>
              <nb-item regular class="post-input">
                <nb-input
                  bordered
                  placeholder="このお店のオススメ度は？"
                />
                <nb-button
                  :on-press="pressedPostInput"
                  class="input-cover"
                />
              </nb-item>
            </nb-body>
          </nb-list-item>

          <nb-separator class="post-index">
            <nb-text class="post-title">投稿一覧</nb-text>
          </nb-separator>

          <nb-list
            v-for="post in posts"
            :key="post.id"
          >
            <post-item
              :post="post"
              :post-id="post.id"
              :change-post-detail="changePostDetail"
            />
          </nb-list>

          <view class="dummy-area" />

        </scroll-view>

        <view class="detail-footer">
          <nb-button
            success
            bordered
            class="like-button"
            :on-press="pressedBookmarkBtn"
            v-if="shop.bookmarkUser != true"
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
            v-if="shop.favoriteUser != true"
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
              :title="shop.name"
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
import ImageModal from 'react-native-image-modal'
import React from "react"
import { TabHeading, Text } from "native-base"
import MapView from 'react-native-maps'
import store from '../store'
import axios from 'axios'
import service from '../services/axios'
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  data: function() {
    return {
      title: "店舗詳細",
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
      shopImage: []
    }
  },
  components: {
    ScrollView,
    ImageModal,
    MapView
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    shop() {
      return store.state.shop.shop
    },
    posts() {
      return store.state.post.posts
    },
    currentUser() {
      return store.state.auth.user
    },
    currentUserImage() {
      return store.state.image.userImage
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
    isShopImage() {
      return this.shopImage
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
        .openURL(store.state.shop.shop.url)
        .catch(
          err => console.error('URLを開けませんでした。', err)
        )
    },
    pressedBookmarkBtn() {
      if (store.state.auth.isAuthResolved == true) {
        store.dispatch("bookmark/saveBookmark")
        .then(() => {
          const screen = this.navigation.getParam('screen')
          switch (screen) {
            case 'home':
              store.dispatch('shop/addBookmark')
              break
            case 'mylist':
              store.dispatch('shop/addBookmarkForMyList')
              break
          }
          console.log("ブックマーク登録しました")
        })
        .catch(() => {
          console.log("保存に失敗しました")
        })
      }else{
        this.navigation.navigate('Signin')
      }
      
    },
    pressedCancelBookmarkBtn() {
      store.dispatch('bookmark/delBookmark')
      .then(() => {
        const screen = this.navigation.getParam('screen')
        switch (screen) {
          case 'home':
            store.dispatch('shop/delBookmark')
            break
          case 'mylist':
            store.dispatch('shop/delBookmarkForMyList')
            break
        }
        console.log("ブックマーク解除しました")
      })
      .catch(() => {
        console.log("解除に失敗しました")
      })
    },
    pressedFavoriteBtn() {
      if (store.state.auth.isAuthResolved == true) {
        store.dispatch("favorite/saveFavorite")
        .then(() => {
          const screen = this.navigation.getParam('screen')
          switch (screen) {
            case 'home':
              store.dispatch('shop/addRating')
              store.dispatch('shop/addFavorite')
              break
            case 'mylist':
              store.dispatch('shop/addFavorite')
              break
          }
          console.log("お気に入り登録しました")
        })
        .catch(() => {
          console.log("保存に失敗しました")
        })
      }else{
        this.navigation.navigate('Signin')
      }
    },
    pressedCancelFavoriteBtn() {
      store.dispatch("favorite/delFavorite")
      .then(() => {
        const screen = this.navigation.getParam('screen')
        switch (screen) {
          case 'home':
            store.dispatch('shop/delRating')
            store.dispatch('shop/delFavorite')
            break
          case 'mylist':
            store.dispatch('shop/delFavorite')
            break
        }
        console.log("お気に入り解除しました")
      })
      .catch(() => {
        console.log("解除に失敗しました")
      })
    },
    changePostDetail(post) {
      store.dispatch("post/addPost", post)
      .then(() => {
        this.navigation.navigate('PostDetail')
      })
    },
    pressedPostInput() {
      this.navigation.navigate('TextPost', { screen: 'shopDetail'})
    }
  },
  async created () {
    // ※省略可能
    const code = this.navigation.getParam('code')
    const screen = this.navigation.getParam('screen')
    switch (screen) {
      case 'home':
        const shop1 = store.getters['shop/getShop'](code)
        await store.dispatch("shop/addShop", shop1)
        break
      case 'mylist':
        const shop2 = await axios.post( baseApiUrl + '/shops/code', { code: code })
        await store.dispatch("shop/addShopForMyList", shop2.data)
        const data = {
          shop_codes: [code],
          user_id: store.state.auth.user.id
        }
        // ブックマーク、お気に入り情報取得
        const count = await axios.post( baseApiUrl + '/shops/search', data)
        store.dispatch('shop/addCount', count.data)
        break
    }
    if (store.state.shop.shop.img != '') {
      this.shopImage.push({
        uri: store.state.shop.shop.img
      })
    }else{
      // 画像がない場合、サンプル画像挿入
      this.shopImage.push({
        uri: "https://i.gyazo.com/395c068648d593021b87d42be1be9250.png"
      })
    } 
    // 店舗IDがAPIで登録されている場合
    if (store.state.shop.shop.id != 0) {
      // 投稿情報取得
      await store.dispatch('post/getPosts')
      for (let i = 0; i < store.state.post.posts.length; i++ ) {
        // nullエラー対策
        if (store.state.post.posts[i].images != null) {
          for (let k = 0; k < store.state.post.posts[i].images.length; k++ ){
            this.shopImage.push(store.state.post.posts[i].images[k])
          }
        }
      }
    }else{
      await store.dispatch('post/delPosts')
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
  height: 50px;
  align-items: center;
  background-color: #eee;
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
.phone-btn {
  margin-right: 18;
}
.post-input {
  position: relative;
  width: 100%;
}
.input-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}
.post-index {
  height: 50px;
  align-items: center;
  background-color: #eee;
}
.post-title {
  font-size: 15;
}
.detail-footer {
  flex-direction: row;
  background-color: #fffefe;
  border-top-width: 1;
  border-top-color: #eee;
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
  width: 100%;
  height: 100px;
  background-color: #eee;
}
</style>