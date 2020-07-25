<template>
  <nb-container class="home-container">

    <header
      root
      :screen="title"
      :navigation="navigation"
    />

    <nb-content>
      <view
        v-for="item in items"
        :key="item.code"
      >
        <item
          :item="item"
          :sel-code="item.code"
          :change-detail="changeDetail"
        />
      </view>
    </nb-content>

    <footer
      :navigation="navigation"
    />

  </nb-container>
</template>

<script>
import store from '../store'

export default {
  data: function() {
    return {
      title: "付近の店舗一覧",
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    items() {
      return store.state.shop.shops
    }
  },
  methods: {
    changeDetail(code) {
      if (store.state.auth.isAuthResolved == true) {
        this.navigation.navigate('Detail', { code })
      } else {
        this.navigation.navigate('Signin')
      }
    }
  },
  created () {
    store.dispatch("shop/getShops")
  }
}
</script>

<style>
.home-container {
  flex: 1;
}
</style>