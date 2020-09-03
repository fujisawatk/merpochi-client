<template>
  <nb-container class="genre-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-list
      v-for="genre in genres"
      :key="genre">
      <genre-item
        :genre="genre"
        :selected-genre-list="selectedGenreList"
      />
    </nb-list>

  </nb-container>
</template>

<script>
import store from '../store'

export default {
  data: function() {
    return {
      title: "ジャンルを指定する",
      genres: [
        "居酒屋", "焼き鳥", "和食", "寿司（すし）", "焼肉・ホルモン・鉄板焼き",
        "イタリアン・フレンチ", "バイキング（ビュッフェ）", "カレー",
        "中華", "洋食・西洋料理", "鍋", "アジア・エスニック料理", "ラーメン・つけ麺",
        "バー・バル・ダイニングバー", "カフェスイーツ", "宴会・カラオケ・エンターテイメント",
        "ファミレス・ファーストフード"
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