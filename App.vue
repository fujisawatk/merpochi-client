<template>
  <view class="container">
    <app-loading v-if="!isAppReady" />
    <app v-else />
  </view>
</template>

<script>
import { AppLoading } from 'expo';
import * as Font from "expo-font";
import { Ionicons } from "@expo/vector-icons";
import App from "./src";

export default {
  components: {
    App,
    AppLoading
  },
  data: function() {
    return {
      isAppReady: false,
    };
  },
  created: function() {
    this.loadFonts();
  },
  methods: {
    loadFonts: async function() {
      try {
        this.isAppReady = false;
        await Font.loadAsync({
          Roboto: require('native-base/Fonts/Roboto.ttf'),
          Roboto_medium: require('native-base/Fonts/Roboto_medium.ttf'),
          DancingScript_Bold: require('./assets/fonts/DancingScript-Bold.ttf'),
          ...Ionicons.font
        });
        this.isAppReady = true;
      } catch (error) {
        console.log('some error occured', error);
        this.isAppReady = true;
      }
    },
  },
}
</script>

<style>
.container {
  flex: 1;
}
</style>