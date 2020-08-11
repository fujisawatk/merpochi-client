<template>
  <nb-footer>
    <nb-footer-tab>
      <nb-button :active="inHome" :on-press="pressedHomeTab">
        <nb-icon name="apps"/>
        <nb-text>Home</nb-text>
      </nb-button>
      <nb-button :active="inMylist" :on-press="pressedMylistTab">
        <nb-icon name="bicycle"/>
        <nb-text>Search</nb-text>
      </nb-button>
      
      <!-- ログイン状態ならマイページタブを表示 -->
      <nb-button v-if="isAuth" :active="inMypage" :on-press="pressedMypageTab">
        <nb-icon name="contact"/>
        <nb-text>Mypage</nb-text>
      </nb-button>
    </nb-footer-tab>
  </nb-footer>
</template>

<script>
import store from '../store'

export default {
  props: {
    navigation: {
      type: Object,
    }
  },
  computed: {
    inHome() {
      return store.state.auth.homeTab
    },
    inMylist() {
      return store.state.auth.mylistTab
    },
    inMypage() {
      return store.state.auth.mypageTab
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    }
  },
  methods: {
    pressedHomeTab() {
      store.state.auth.homeTab = true
      store.state.auth.mylistTab = false
      store.state.auth.mypageTab = false
      this.navigation.navigate("Home")
    },
    pressedMylistTab() {
      store.state.auth.homeTab = false
      store.state.auth.mylistTab = true
      store.state.auth.mypageTab = false
      this.navigation.navigate("Mylist")
    },
    pressedMypageTab() {
      store.state.auth.homeTab = false
      store.state.auth.mylistTab = false
      store.state.auth.mypageTab = true
      this.navigation.navigate("Mypage")
    },
  }
}
</script>

<style>
</style>