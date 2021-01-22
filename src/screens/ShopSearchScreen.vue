<template>
  <nb-container class="shop-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-form class="shop-search-form">
      <nb-item
        rounded
        class="shop-search-input"
      >
        <nb-input
          placeholder="店名・キーワード"
          v-model="keyword"
          auto-capitalize="none"
        />
        <nb-icon
          button
          active
          type="FontAwesome5"
          name='search'
          :on-press="pressedShopSearchBtn"
        />
      </nb-item> 
    </nb-form>

    <view class="geolocation-search-btn">
      <nb-button
        rounded danger
        :on-press="pressedGeolocationSearchBtn"
      >
        <nb-text class="btn-text"> 現在地から検索 </nb-text>
      </nb-button>
    </view>

    <scroll-view>
      <nb-list
        v-for="shop in shops"
        :key="shop.id"
      >
        <shop-name-item
        :shop="shop"
        :selected-shop="selectedShop"
      />
      </nb-list>
    </scroll-view>

  </nb-container>
</template>

<script>
import axios from 'axios'
import store from '../store'
import { ScrollView } from 'react-native'
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  data: function() {
    return {
      title: "店舗検索",
      keyword: "",
      shops: []
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  components: {
    ScrollView
  },
  methods: {
    async pressedShopSearchBtn() {
      const shops = await store.dispatch("shop/shopSearch", this.keyword)
      this.shops = shops
    },
    async selectedShop(shop) {
      // 店舗登録済か確認
      await axios.post( baseApiUrl + '/shops/code', { code: shop.id })
      .then(() => {
        store.dispatch("shop/addShop", res.data)
      })
      .catch(() => {
        store.dispatch("shop/selectedShop", shop)
      })
      const screen = this.navigation.getParam('screen')
      this.navigation.setParams({ message: null })
      switch (screen) {
        case 'easy':
          this.navigation.navigate('EasyPost')
          break
        case 'text':
          this.navigation.navigate('TextPost')
          break
      }
    },
    async pressedGeolocationSearchBtn() {
      const shops = await store.dispatch("shop/geolocationSearch")
      this.shops = shops
    },
  },
}
</script>

<style>
.shop-search-container {
  flex: 1;
}
.shop-search-form {
  padding: 10;
}
.geolocation-search-btn {
  padding: 10;
}
.btn-text {
  width: 100%;
  text-align: center;
}
.shop-search-input {
  padding-left: 10;
  padding-right: 10;
}
</style> 