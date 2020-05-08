<template>
  <view class="container">
    <nb-text class="text-color-primary">{{ msg }}</nb-text>
  </view>
</template>

<script>
import Vue from 'vue-native-core'
import { VueNativeBase } from 'native-base'

Vue.use(VueNativeBase)

export default {
  data: function() {
    return {
      msg: "My Vue Native App"
    }
  }
}

</script>

<style>
.container {
  background-color: white;
  align-items: center;
  justify-content: center;
  flex: 1;
}
.text-color-primary {
  color: blue;
}
</style>