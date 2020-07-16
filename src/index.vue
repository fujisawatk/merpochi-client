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
import Footer from "./components/Footer.vue"

// プラグインの登録
Vue.use(VueNativeBase)
Vue.use(Vuelidate)

// コンポーネントの登録
Vue.component("Header", Header)
Vue.component("Item", Item)
Vue.component("Footer", Footer)

export default {
  components: {
    Navigator
  },
  created () {
    store.dispatch('auth/verifyUser')
      .catch(() => {})
  }
};
</script>

<style>
.container {
  flex: 1;
}
</style>
