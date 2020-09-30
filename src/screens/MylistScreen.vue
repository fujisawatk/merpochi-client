<template>
  <nb-container class="mylist-container">
    <header
      root
      :screen="title"
      :navigation="navigation"
    />

    <nb-tabs>
      <nb-tab :heading="getFavoritedTab()">
        <nb-content v-if="(favoriteItems.length > 0)">
          <view v-for="item in favoriteItems" :key="item.id">
            <item
              mypage
              :item="item"
              :sel-code="item.code"
              :change-detail="changeDetail"
            />
          </view>
        </nb-content>

        <nb-content v-else>
          <view class="show-no-favorite">
            <nb-text class="no-favorite-text">お気に入り登録はありません</nb-text>
          </view>
        </nb-content>
      </nb-tab>

      <nb-tab :heading="getCommentedTab()">
        <nb-content v-if="(commentItems.length > 0)">
          <view v-for="item in commentItems" :key="item.id">
            <item
              mypage
              :item="item"
              :sel-code="item.code"
              :change-detail="changeDetail"
            />
          </view>
        </nb-content>

        <nb-content v-else>
          <view class="show-no-comment">
            <nb-text class="no-comment-text">コメントしたお店はありません</nb-text>
          </view>
        </nb-content>
      </nb-tab>
    </nb-tabs>

     <footer
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
import store from "../store"
import React from "react"
import { TabHeading, Text } from "native-base"
import axios from 'axios'
import service from '../services/axios'

export default {
  data: function() {
    return {
      title: "マイリスト"
    };
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    getFavoritedTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>お気に入りの店舗</Text>
        </TabHeading>
      )
    },
    getCommentedTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>コメントした店舗</Text>
        </TabHeading>
      )
    },
    changeDetail(code) {
      return this.navigation.navigate('Detail', { code })
    }
  },
  computed: {
    commentItems() {
      return store.state.shop.commentedShops
    },
    favoriteItems() {
      return store.state.shop.favoritedShops
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
  },
  created() {
    store.dispatch('shop/getCommentedAndFavoritedShops')
  }
};
</script>

<style>
.mypage-container {
  flex: 1;
}
.nickname {
  font-weight: bold;
}
.email-section {
  padding: 10;
  margin-top: 10;
}
.password-section,
.favorite-section {
  padding: 10;
}
.icon {
  font-size: 15;
}
.email,
.password,
.favorite {
  color: gray;
  font-weight: bold;
}
.show-no-favorite,
.show-no-commend {
  height: 200px;
  width: 100%;
}
.no-favorite-text,
.no-comment-text {
  font-size: 20;
  text-align: center;
  line-height: 200px;
}
</style>