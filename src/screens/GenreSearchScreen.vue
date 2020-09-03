<template>
  <nb-container class="genre-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-list
      v-for="genre in genres"
      :key="genre">
      <nb-list-item>
        <nb-body>
          <nb-text>{{ genre }}</nb-text>
        </nb-body>
      </nb-list-item>
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
}
</script>

<style>
.genre-search-container {
  flex: 1;
}
</style> 