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
      <nb-button :active="inMypage" :on-press="goMypage">
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
      return store.state.homeTab
    },
    inSearch() {
      return store.state.searchTab
    },
    inMypage() {
      return store.state.mypageTab
    }
  },
  methods: {
    goHome() {
      store.state.homeTab = true
      store.state.searchTab = false
      store.state.mypageTab = false
      this.navigation.navigate("Home");
    },
    goSearch() {
      store.state.homeTab = false
      store.state.searchTab = true
      store.state.mypageTab = false
      this.navigation.navigate("Search");
    },
    goMypage() {
      store.state.homeTab = false
      store.state.searchTab = false
      store.state.mypageTab = true
      this.navigation.navigate("Mypage");
    },
  }
}
</script>

<style>
</style>