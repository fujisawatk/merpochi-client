<template>
  <nb-footer>
    <nb-footer-tab>
      <nb-button :active="inHome" :on-press="pressedHomeTab">
        <nb-icon name="search"/>
        <nb-text class="footer-text">さがす</nb-text>
      </nb-button>
      <nb-button :active="inAddPost" :on-press="pressedAddPostTab">
        <nb-icon type="AntDesign" name="pluscircleo"/>
        <nb-text class="footer-text">投稿</nb-text>
      </nb-button>
      <nb-button :active="inMylist" :on-press="pressedMylistTab">
        <nb-icon name="heart"/>
        <nb-text class="footer-text">マイリスト</nb-text>
      </nb-button>
      <nb-button :active="inMyAccount" :on-press="pressedMyAccountTab">
        <nb-icon name="contact"/>
        <nb-text class="footer-text">マイページ</nb-text>
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
    inAddPost() {
      return store.state.auth.addPostTab
    },
    inMylist() {
      return store.state.auth.mylistTab
    },
    inMyAccount() {
      return store.state.auth.myAccountTab
    }
  },
  methods: {
    pressedHomeTab() {
      store.state.auth.homeTab = true
      store.state.auth.addPostTab = false
      store.state.auth.mylistTab = false
      store.state.auth.myAccountTab = false
      this.navigation.navigate("Home")
    },
    pressedAddPostTab() {
      store.state.auth.homeTab = false
      store.state.auth.addPostTab = true
      store.state.auth.mylistTab = true
      store.state.auth.myAccountTab = false
      // this.navigation.navigate("Mylist")
    },
    pressedMylistTab() {
      store.state.auth.homeTab = false
      store.state.auth.addPostTab = false
      store.state.auth.mylistTab = true
      store.state.auth.myAccountTab = false
      this.navigation.navigate("Mylist")
    },
    pressedMyAccountTab() {
      store.state.auth.homeTab = false
      store.state.auth.addPostTab = false
      store.state.auth.mylistTab = false
      store.state.auth.myAccountTab = true
      this.navigation.navigate("MyAccount")
    },
  }
}
</script>

<style>
.footer-text {
  font-size: 12;
}
</style>