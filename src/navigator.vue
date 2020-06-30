<template>
  <root>
    <app-navigator />
  </root>
</template>

<script>
import HomeScreen from './screens/HomeScreen.vue'
import SigninScreen from './screens/SigninScreen.vue'
import SignupScreen from './screens/SignupScreen.vue'
import DetailScreen from './screens/DetailScreen.vue'
import MapScreen from './screens/MapScreen.vue'
import SearchScreen from './screens/SearchScreen.vue'
import { Root } from 'native-base'

import {
  createAppContainer,
  createStackNavigator,
  createMaterialTopTabNavigator
} from "vue-native-router"

const DetailTab = createMaterialTopTabNavigator(
  {
    Detail: DetailScreen,
    Map: MapScreen
  },
  { 
    initialRouteName: 'Detail',
    tabBarOptions: {
      style: { backgroundColor: '#FFCC33' }
    }
  }
)

const StackNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Signin: SigninScreen,
    Signup: SignupScreen,
    Search: SearchScreen,
    DetailTab
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