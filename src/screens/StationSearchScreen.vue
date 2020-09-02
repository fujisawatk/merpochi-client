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
          v-model="keyword"
          auto-capitalize="none"
        />
        <nb-icon
          active
          name='search'
        />
      </nb-item> 
    </nb-form>

    <nb-list 
      v-for="station in stations"
      :key="station.id">
      <station-item
        :station="station"
        :selected-station-list="selectedStationList"
      />
    </nb-list>

  </nb-container>
</template>

<script>
import store from '../store'
import { throttle, isEmpty } from "lodash"

export default {
  data: function() {
    return {
      title: "駅名から探す",
      keyword: ""
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    selectedStationList(name) {
      store.dispatch("station/selectedStationList", name)
        .then(res => {
          store.dispatch("station/delStationList")
          this.navigation.navigate('Home')
        })
        .catch(() => {
          console.log("選択されていません")
        })
    },
    searchStations() {
      const data = {
        search_word: this.keyword
        }
      store.dispatch("station/searchStations", data)
    }
  },
  computed: {
    stations() {
      return store.state.station.stations
    },
  },
  watch: {
    keyword(val, prev) {
      if (!isEmpty(val)) {
        this.searchWithInterval()
      }
    }
  },
  created() {
    //APIの実行を0.5秒に1回に制限
    this.searchWithInterval = throttle(this.searchStations, 500)
  },
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
</style> 