<template>
  <app v-if="isAppReady" />
</template>

<script>
import * as Font from "expo-font"
import { Ionicons } from "@expo/vector-icons"
import App from "./src"

export default {
  components: {
    App
  },
  data: function() {
    return {
      isAppReady: false
    }
  },
  async created () {
    await Font.loadAsync({
      'Roboto': require('native-base/Fonts/Roboto.ttf'),
      'Roboto_medium': require('native-base/Fonts/Roboto_medium.ttf'),
      'DancingScript-Bold': require('./assets/fonts/DancingScript-Bold.ttf'),
      ...Ionicons.font
    })
    this.isAppReady = true
  }
}
</script>

<style>
.container {
  flex: 1;
}
</style>