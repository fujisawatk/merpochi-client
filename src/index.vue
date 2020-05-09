<template>
  <view class="container">
    <!-- <signup /> -->
    <!-- <signin /> -->
    <home />
  </view>
</template>

<script>
import Vue from 'vue-native-core'
import { VueNativeBase } from 'native-base'

// import Signup from './screens/SignupScreen.vue'
// import Signin from './screens/SigninScreen.vue'
import Home from './screens/HomeScreen.vue'

import Header from './components/Header.vue'
import Item from './components/Item.vue'

// プラグインの登録
Vue.use(VueNativeBase)

// コンポーネントの登録
Vue.component('Header', Header)
Vue.component('Item', Item)

export default {
  components: {
    // Signup,
    // Signin,
    Home
  }
}
</script>

<style>
.container {
  flex: 1;
}
</style>