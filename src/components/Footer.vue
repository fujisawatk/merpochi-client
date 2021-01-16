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
      <nb-button :active="inMyList" :on-press="pressedMyListTab">
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
      return store.state.footer.homeTab
    },
    inAddPost() {
      return store.state.footer.addPostTab
    },
    inMyList() {
      return store.state.footer.myListTab
    },
    inMyAccount() {
      return store.state.footer.myAccountTab
    }
  },
  methods: {
    pressedHomeTab() {
      store.dispatch("footer/activeHomeTab")
      .then(() => {
        this.navigation.navigate("Home")
      })
      .catch(() => {})
    },
    pressedAddPostTab() {
      store.dispatch("footer/activeAddPostTab")
      .then(() => {
        this.navigation.navigate("SelectPost")
      })
      .catch(() => {})
    },
    pressedMyListTab() {
      store.dispatch("footer/activeMyListTab")
      .then(() => {
        this.navigation.navigate("MyList")
      })
      .catch(() => {})
    },
    pressedMyAccountTab() {
      store.dispatch("footer/activeMyAccountTab")
      .then(() => {
        this.navigation.navigate("MyAccount")
      })
      .catch(() => {})
    },
  }
}
</script>

<style>
.footer-text {
  font-size: 12;
}
</style>