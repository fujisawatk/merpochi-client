<template>
  <view class="container">
    <navigator />
  </view>
</template>

<script>
import Vue from "vue-native-core"
import { VueNativeBase } from "native-base"
import store from './store'

import Navigator from "./navigator"
import Vuelidate from 'vuelidate'

import Header from "./components/Header.vue"
import Item from "./components/Item.vue"
import ShopItem from "./components/ShopItem.vue"
import PostItem from "./components/PostItem.vue"
import Footer from "./components/Footer.vue"
import InputWithError from './components/InputWithError.vue'
import StationItem from "./components/StationItem.vue"
import GenreItem from "./components/GenreItem.vue"
import ShopNameItem from "./components/ShopNameItem.vue"

import React from 'react'
import { NavigationEvents } from 'react-navigation'

// プラグインの登録
Vue.use(VueNativeBase)
Vue.use(Vuelidate)

// コンポーネントの登録
Vue.component("Header", Header)
Vue.component("Item", Item)
Vue.component("ShopItem", ShopItem)
Vue.component("PostItem", PostItem)
Vue.component("Footer", Footer)
Vue.component('InputWithError', InputWithError)
Vue.component("StationItem", StationItem)
Vue.component("GenreItem", GenreItem)
Vue.component("ShopNameItem", ShopNameItem)
Vue.component("NavigationEvents", NavigationEvents)


export default {
  components: {
    Navigator
  },
  created () {
    store.dispatch('auth/verifyUser')
    .catch(() => {})
    store.dispatch("shop/getShops", "")
    .catch(() => {})
    store.dispatch("footer/activeHomeTab")
    .catch(() => {})
  }
};
</script>

<style>
.container {
  flex: 1;
}
</style>
