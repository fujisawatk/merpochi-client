<template>
  <view class="container">
    <!-- <signup /> -->
    <!-- <detail /> -->
    <!-- <map /> -->
    <navigator />
  </view>
</template>

<script>
import Vue from "vue-native-core"
import { VueNativeBase } from "native-base"

import Navigator from "./navigator"
// import Signup from './screens/SignupScreen.vue'
// import Detail from './screens/DetailScreen.vue'
// import Map from './screens/MapScreen.vue'

import Header from "./components/Header.vue"
import Item from "./components/Item.vue"

// プラグインの登録
Vue.use(VueNativeBase)

// コンポーネントの登録
Vue.component("Header", Header)
Vue.component("Item", Item)

export default {
  components: {
    // Signup,
    // Detail
    // Map
    Navigator
  },
};
</script>

<style>
.container {
  flex: 1;
}
</style>
