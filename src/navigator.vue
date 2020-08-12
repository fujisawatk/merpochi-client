<template>
  <root>
    <app-navigator />
  </root>
</template>

<script>
import HomeScreen from "./screens/HomeScreen.vue"
import SigninScreen from "./screens/SigninScreen.vue"
import SignupScreen from "./screens/SignupScreen.vue"
import DetailScreen from "./screens/DetailScreen.vue"
import MylistScreen from "./screens/MylistScreen.vue"
import MypageScreen from "./screens/MypageScreen.vue"
import { Root } from "native-base"

import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "vue-native-router"

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    Mylist: MylistScreen,
    Mypage: MypageScreen,
    Detail: DetailScreen
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
  }
)

const AppNavigator = createAppContainer(StackNavigator);

export default {
  components: {
    AppNavigator,
    Root
  }
}
</script>