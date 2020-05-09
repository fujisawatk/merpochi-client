<template>
  <view class="container">
    <!-- <signup /> -->
    <signin />
  </view>
</template>

<script>
import Vue from 'vue-native-core'
import { VueNativeBase } from 'native-base'
// import Signup from './screens/SignupScreen.vue'
import Signin from './screens/SigninScreen.vue'

Vue.use(VueNativeBase)

export default {
  components: {
    // Signup,
    Signin
  }
}
</script>

<style>
.container {
  flex: 1;
}
</style>