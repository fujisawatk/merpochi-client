<template>
  <root>
    <app-navigator />
  </root>
</template>

<script>
import HomeScreen from './screens/HomeScreen.vue'
import SigninScreen from './screens/SigninScreen.vue'

import { Root } from 'native-base'

import {
  createAppContainer,
  createStackNavigator,
} from "vue-native-router"

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Signin: SigninScreen,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
);

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: {
    AppNavigator,
    Root
  }
}
</script>