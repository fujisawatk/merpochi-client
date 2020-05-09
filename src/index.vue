<template>
  <view class="container">
    <signup />
  </view>
</template>

<script>
import Vue from 'vue-native-core'
import { VueNativeBase } from 'native-base'
import Signup from './screens/SignupScreen.vue'

Vue.use(VueNativeBase)

export default {
  components: {
    Signup
  }
}

</script>

<style>
.container {
  flex: 1;
}
</style>