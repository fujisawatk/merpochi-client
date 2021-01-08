<template>
  <nb-footer>
    <nb-footer-tab>
      <nb-button :active="inHome" :on-press="pressedHomeTab">
        <nb-icon name="search"/>
        <nb-text>さがす</nb-text>
      </nb-button>
      <nb-button :active="inMylist" :on-press="pressedMylistTab">
        <nb-icon name="heart"/>
        <nb-text>マイリスト</nb-text>
      </nb-button>
      <nb-button :active="inMyAccount" :on-press="pressedMyAccountTab">
        <nb-icon name="contact"/>
        <nb-text>マイページ</nb-text>
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
    inMyAccount() {
      return store.state.auth.myAccountTab
    }
  },
  methods: {
    pressedHomeTab() {
      store.state.auth.homeTab = true
      store.state.auth.mylistTab = false
      store.state.auth.myAccountTab = false
      this.navigation.navigate("Home")
    },
    pressedMylistTab() {
      store.state.auth.homeTab = false
      store.state.auth.mylistTab = true
      store.state.auth.myAccountTab = false
      this.navigation.navigate("Mylist")
    },
    pressedMyAccountTab() {
      store.state.auth.homeTab = false
      store.state.auth.mylistTab = false
      store.state.auth.myAccountTab = true
      this.navigation.navigate("MyAccount")
    },
  }
}
</script>

<style>
</style>