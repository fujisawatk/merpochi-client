<template>
  <nb-container class="home-container">

    <header
      root
      home
      :screen="title"
      :navigation="navigation"
    />

    <nb-content>
      <nb-form class="search-form">
        <nb-item
          rounded
          class="search-input"
        >
          <nb-input
            placeholder="店名・キーワード"
            v-model="search.keyword"
            auto-capitalize="none"
          />
          <nb-icon
            active
            name='search'
            :on-press="pressedSearchIcon"
          />
        </nb-item> 
      </nb-form>

      <view class="detail-search-section">
        <nb-button
          :on-press="pressedDetailSearchBar"
          class="detail-search-bar"
        >
          <nb-text>詳細検索</nb-text>
        </nb-button>

        <view
          v-if="activeDetailSearchForm"
          class="detail-search-form"
        >
          <view class="detail-search-item">
            <nb-item rounded >
              <nb-icon name='train'/>
              <nb-input
                placeholder="エリア・駅"
                v-model="selectedStationName"
              />
            </nb-item>
            <nb-button
              :on-press="selectedStationWordInput"
              class="input-cover"
            />
          </view>

          <view class="detail-search-item">
            <nb-item
              rounded
            >
              <nb-icon name='restaurant'/>
              <nb-input
                placeholder="ジャンル"
                auto-capitalize="none"
              />
            </nb-item>
          </view>

          <view class="detail-search-item">
            <nb-button
              danger
              class="detail-search-btn"
              :on-press="pressedDetailSearchBtn"
            >
              <nb-text> 検索する </nb-text>
            </nb-button>
          </view>
        </view>
      </view>

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
      title: "店舗一覧",
      search: {
        keyword: "",
      },
      detailSearchForm: false,
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
    },
    selectedStationName() {
      return store.state.station.selectedStationName
    },
    activeDetailSearchForm() {
      return this.detailSearchForm
    }
  },
  methods: {
    changeDetail(code) {
      if (store.state.auth.isAuthResolved == true) {
        this.navigation.navigate('Detail', { code })
      } else {
        this.navigation.navigate('Signin')
      }
    },
    pressedDetailSearchBar() {
      return this.detailSearchForm = !this.detailSearchForm
    },
    pressedSearchIcon() {
      store.dispatch("shop/keywordSearch", this.search.keyword)
    },
    selectedStationWordInput() {
      this.navigation.navigate('StationSearch')
    },
    pressedDetailSearchBtn() {
      store.dispatch("shop/detailSearch", this.search.keyword)
    }
  }
}
</script>

<style>
.home-container {
  flex: 1;
}
.search-form {
  padding: 10px 10px;
}
.search-input {
  padding-left: 10px;
  padding-right: 10px;
}
.detail-search-bar {
  height: 50;
  width: 100%;
  background-color: #CCCCCC;
}
.detail-search-form {
  flex: 1;
  background-color: #EEEEEE;
}
.detail-search-item {
  flex: 1;
  padding: 10;
}
.input-cover {
  flex: 1;
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
  top: 10;
  left: 10;
}
.detail-search-btn {
  flex: 1;
  flex-direction: row;
  justify-content: center; 
}
</style>