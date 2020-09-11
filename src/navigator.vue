<template>
  <root>
    <app-navigator />
  </root>
</template>

<script>
import HomeScreen from "./screens/HomeScreen"
import SigninScreen from "./screens/SigninScreen"
import SignupScreen from "./screens/SignupScreen"
import DetailScreen from "./screens/DetailScreen"
import MylistScreen from "./screens/MylistScreen"
import MypageScreen from "./screens/MypageScreen"
import StationSearchScreen from "./screens/StationSearchScreen"
import GenreSearchScreen from "./screens/GenreSearchScreen"
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
    Detail: DetailScreen,
    StationSearch: StationSearchScreen,
    GenreSearch: GenreSearchScreen
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