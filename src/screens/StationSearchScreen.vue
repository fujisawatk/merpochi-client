<template>
  <nb-container class="station-search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-form class="station-search-form">
      <nb-item
        rounded
        class="station-search-input"
      >
        <nb-input
          placeholder="例：東京、しぶや、新宿駅"
          v-model="search.keyword"
          auto-capitalize="none"
        />
        <nb-icon
          active
          name='search'
          :on-press="pressedStationSearchIcon"
        />
      </nb-item> 
    </nb-form>

    <nb-list 
      v-for="station in stations"
      :key="station.id">
        <nb-list-item :on-press="pressedStationList">
          <nb-body>
            <nb-text>{{ station.station_name }}</nb-text>
            <nb-text note class="list-sub-text">{{ station.prefucture }} {{ station.line_one }} {{ station.line_two }}</nb-Text>
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
      title: "駅名から探す",
      search: {
        keyword: ""
      },
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    pressedStationList(id) {
       // APIから取得した駅名をVuexで管理。
       // 特定の駅名リストが選択されたら、選択したリストのIDのデータを取得(getter)
       // 取得したリストの駅名をHome画面の駅名検索に表示させる
      this.navigation.navigate('Home', { id })
    },
    pressedStationSearchIcon() {
      const data = { 
        search_word: this.search.keyword
        }
      store.dispatch("station/searchStations")
    }
  },
  computed: {
    stations() {
      return store.state.station.stations
    },
  }
}
</script>

<style>
.station-search-container {
  flex: 1;
}
.station-search-form {
  padding: 10px 10px;
}
.station-search-input {
  padding-left: 10px;
  padding-right: 10px;
}
.list-sub-text {
  font-size: 12;
}
</style> 