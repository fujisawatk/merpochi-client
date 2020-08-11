<template>
  <nb-footer>
    <nb-footer-tab>
      <nb-button :active="inHome" :on-press="goHome">
        <nb-icon name="apps"/>
        <nb-text>Home</nb-text>
      </nb-button>
      <nb-button :active="inSearch" :on-press="goSearch">
        <nb-icon name="bicycle"/>
        <nb-text>Search</nb-text>
      </nb-button>
      
      <!-- ログイン状態ならマイページタブを表示 -->
      <nb-button v-if="isAuth" :active="inMypage" :on-press="goMypage">
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
    inSearch() {
      return store.state.auth.searchTab
    },
    inMypage() {
      return store.state.auth.mypageTab
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    }
  },
  methods: {
    goHome() {
      store.state.auth.homeTab = true
      store.state.auth.searchTab = false
      store.state.auth.mypageTab = false
      this.navigation.navigate("Home");
    },
    goSearch() {
      store.state.auth.homeTab = false
      store.state.auth.searchTab = true
      store.state.auth.mypageTab = false
      this.navigation.navigate("Mylist");
    },
    goMypage() {
      store.state.auth.homeTab = false
      store.state.auth.searchTab = false
      store.state.auth.mypageTab = true
      this.navigation.navigate("Mypage");
    },
  }
}
</script>

<style>
</style>