<template>
  <root>
    <app-navigator />
  </root>
</template>

<script>
import HomeScreen from "./screens/HomeScreen"
import SigninScreen from "./screens/SigninScreen"
import SignupScreen from "./screens/SignupScreen"
import ShopDetailScreen from "./screens/ShopDetailScreen"
import PostDetailScreen from "./screens/PostDetailScreen"
import MylistScreen from "./screens/MylistScreen"
import MyAccountScreen from "./screens/MyAccountScreen"
import EditAccountScreen from "./screens/EditAccountScreen"
import StationSearchScreen from "./screens/StationSearchScreen"
import GenreSearchScreen from "./screens/GenreSearchScreen"
import GeolocationSearchScreen from "./screens/GeolocationSearchScreen"
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
    ShopDetail: ShopDetailScreen,
    PostDetail: PostDetailScreen,
    Mylist: MylistScreen,
    MyAccount: MyAccountScreen,
    EditAccount: EditAccountScreen,
    StationSearch: StationSearchScreen,
    GenreSearch: GenreSearchScreen,
    GeolocationSearch: GeolocationSearchScreen,
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