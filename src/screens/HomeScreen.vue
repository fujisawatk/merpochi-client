<template>
  <nb-container class="home-container">

    <navigation-events :on-did-focus="checkForMessage" />

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
          <nb-button
            transparent
            :on-press="pressedSearchIcon"
          >
            <nb-icon
              active
              type="FontAwesome5"
              name='search'
              class="icon"
            />
          </nb-button>
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
              <nb-icon
                type="MaterialIcons"
                name="cancel"
                :on-press="pressedCancelStationName"
                v-if="selectedStationName"
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
                v-model="selectedGenre"
              />
              <nb-icon
                type="MaterialIcons"
                name="cancel"
                :on-press="pressedCancelGenre"
                v-if="selectedGenre"
              />
            </nb-item>
            <nb-button
              :on-press="selectedGenreInput"
              class="input-cover"
            />
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
        <shop-item
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
import { Toast } from 'native-base'

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
    },
    selectedGenre() {
      return store.state.genre.selectedGenre
    },
  },
  methods: {
    changeDetail(code) {
      this.navigation.navigate('ShopDetail',{
        code: code,
        screen: 'home'
      })
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
    },
    selectedGenreInput() {
      this.navigation.navigate('GenreSearch')
    },
    pressedCancelStationName() {
      store.dispatch("station/delStationName")
    },
    pressedCancelGenre() {
      store.dispatch("genre/delGenre")
    },
    checkForMessage() {
      const message = this.navigation.getParam('message')
      switch (message) {
        case 'login':
          Toast.show({
          text: 'ログインしました',
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        break
        case 'favorite':
          Toast.show({
          text: "お気に入り登録しました",
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        break
        case 'post':
          Toast.show({
          text: "レビューを投稿しました",
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        break
        case 'delPost':
          Toast.show({
          text: "レビューを削除しました",
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
        break
      }
      // ナビゲーションパラメータ初期化
      this.navigation.setParams({ message: null })
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
.icon {
  color: #111;
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
  width: 95%;
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