<template>
  <nb-container class="geolocation-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <view class="geolocation-search-item">
      <nb-button
        block danger
        :on-press="pressedNotSelectBtn"
      >
        <nb-text> 指定しないで検索 </nb-text>
      </nb-button>
    </view>

    <nb-list-item itemHeader first>
      <nb-text>ジャンル指定</nb-text>
    </nb-list-item>

    <scroll-view>
      <nb-list
        v-for="genre in genres"
        :key="genre">
        <genre-item
          :genre="genre"
          :selected-genre-list="selectedGenreList"
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
      title: "付近の店舗検索",
      genres: [
        "居酒屋", "焼き鳥", "海鮮", "和食", "寿司", "焼肉", "しゃぶしゃぶ", "鉄板焼き",
        "イタリアン", "フレンチ", "バイキング", "カレー", "ステーキ", "お好み焼き",
        "中華", "鍋", "韓国料理", "ラーメン", "そば", "うどん", "ピザ",
        "バー", "カフェ", "ファミレス", "ファーストフード"
      ]
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    selectedGenreList(genre) {
      store.dispatch("shop/getShops", genre)
        .then(res => {
          this.navigation.navigate('Home')
        })
        .catch(() => {
          console.log("選択されていません")
        })
    },
    pressedNotSelectBtn() {
      store.dispatch("shop/getShops", "")
        .then(res => {
          this.navigation.navigate('Home')
        })
        .catch(() => {
          console.log("選択されていません")
        })
    },
  }
}
</script>

<style>
.geolocation-search-container {
  flex: 1;
}
.geolocation-search-item {
  padding: 10;
}
</style> 