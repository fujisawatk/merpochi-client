<template>
  <nb-container class="genre-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

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
      title: "ジャンルを指定する",
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
      store.dispatch("genre/selectedGenreList", genre)
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
.genre-search-container {
  flex: 1;
}
</style> 