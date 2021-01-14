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
          this.navigation.navigate('EasyPost')
        })
        .catch(() => {
          console.log("選択されていません")
        })
    },
  },
  computed: {
  },
  watch: {
    // keyword(val, prev) {
    //   if (!isEmpty(val)) {
    //     this.searchWithInterval()
    //   }else{
    //     store.dispatch("station/delStationList")
    //   }
    // }
  },
  created() {
    //APIの実行を0.5秒に1回に制限
    // if (store.state.station.selectedStationName != "") {
    //   this.keyword = store.state.station.selectedStationName
    // }
    // store.dispatch("station/delStationList")
    // this.searchWithInterval = throttle(this.searchStations, 500)
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