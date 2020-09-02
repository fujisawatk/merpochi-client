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
      <station-item
        :station="station"
        :selected-station-list="selectedStationList"
      />
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
    selectedStationList(name) {
      store.dispatch("station/selectedStationList", name)
      this.navigation.navigate('Home')
    },
    pressedStationSearchIcon() {
      const data = { 
        search_word: this.search.keyword
        }
      store.dispatch("station/searchStations", data)
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
</style> 