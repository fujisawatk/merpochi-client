<template>
  <nb-container class="mylist-container">
    <header
      root
      :screen="title"
      :navigation="navigation"
    />

    <nb-tabs>
      <nb-tab :heading="getBookmarkedTab()">
        <nb-content v-if="(bookmark.length > 0)">
          <view v-for="item in bookmark" :key="item.id">
            <item
              mypage
              :item="item"
              :sel-code="item.code"
              :change-detail="changeDetail"
            />
          </view>
        </nb-content>

        <nb-content v-else>
          <view class="show-no-bookmark">
            <nb-text class="no-bookmark-text">行きたいお店はありません</nb-text>
          </view>
        </nb-content>
      </nb-tab>

      <nb-tab :heading="getFavoritedTab()">
        <nb-content v-if="(favorite.length > 0)">
          <view v-for="item in favorite" :key="item.id">
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
            <nb-text class="no-favorite-text">行ったお店はありません</nb-text>
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
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  data: function() {
    return {
      title: "マイリスト",
      bookmarkedShops: [],
      favoritedShops: []
    };
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    bookmark() {
      return this.bookmarkedShops
    },
    favorite() {
      return this.favoritedShops
    }
  },
  async created() {
    if (store.state.auth.isAuthResolved == true) {
      const shops = await axios.post( baseApiUrl + '/users/mylist')
      if (shops.data.bookmarked_shops != null) this.bookmarkedShops = shops.data.bookmarked_shops
      if (shops.data.favorited_shops != null) this.favoritedShops = shops.data.favorited_shops
    }else{
      this.navigation.navigate('Signin')
    }
  },
  methods: {
    getBookmarkedTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>行きたいお店</Text>
        </TabHeading>
      )
    },
    getFavoritedTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>行ったお店</Text>
        </TabHeading>
      )
    },
    changeDetail(code) {
      return this.navigation.navigate('ShopDetail', { code })
    }
  }
}
</script>

<style>
.show-no-bookmark,
.show-no-favorite {
  height: 200px;
  width: 100%;
}
.no-bookmark-text,
.no-favorite-text {
  font-size: 20;
  text-align: center;
  line-height: 200px;
}
</style>