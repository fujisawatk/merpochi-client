<template>
  <nb-container class="shop-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-form class="shop-search-form">
      <nb-item
        rounded
        class="shop-search-input"
      >
        <nb-input
          placeholder=""
          v-model="keyword"
          auto-capitalize="none"
        />
        <nb-icon
          button
          active
          name='search'
          :on-press="pressedShopSearchBtn"
        />
      </nb-item> 
    </nb-form>

    <scroll-view>
      <nb-list
        v-for="shop in shops"
        :key="shop.id"
      >
        <shop-name-item
        :shop="shop"
        :selected-shop="selectedShop"
      />
      </nb-list>
    </scroll-view>

  </nb-container>
</template>

<script>
import store from '../store'
import { ScrollView } from 'react-native'
export default {
  data: function() {
    return {
      title: "店舗検索",
      keyword: "",
      shops: []
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  components: {
    ScrollView
  },
  methods: {
    async pressedShopSearchBtn() {
      const shops = await store.dispatch("shop/shopSearch", this.keyword)
      this.shops = shops
    },
    selectedShop(shop) {
      store.dispatch("shop/selectedShop", shop)
        .then(() => {
          const screen = this.navigation.getParam('screen')
          this.navigation.setParams({ message: null })
          switch (screen) {
            case 'easy':
              this.navigation.navigate('EasyPost')
              break
            case 'text':
              this.navigation.navigate('TextPost')
              break
          }
        })
        .catch(() => {
          console.log("選択されていません")
        })
    },
  },
}
</script>

<style>
.shop-search-container {
  flex: 1;
}
.shop-search-form {
  padding: 10;
}
.shop-search-input {
  padding-left: 10;
  padding-right: 10;
}
</style> 