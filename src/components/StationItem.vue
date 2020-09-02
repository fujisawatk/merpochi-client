<template>
  <nb-list-item :on-press="pressedStationList">
    <nb-body>
      <nb-text>{{ station.station_name }}</nb-text>
      <nb-text note class="list-sub-text">{{ station.prefucture }} {{ station.line_one }} {{ station.line_two }}</nb-Text>
    </nb-body>
  </nb-list-item>
</template>

<script>
export default {
  props: {
    station: Object,
    navigation: {
      type: Object
    },
    selectedStationList: Function,
  },
  methods: {
    pressedStationList() {
      if (this.station.station_name != "該当なし"){
        this.selectedStationList(this.station.station_name)
      }
    }
  }
}
</script>

<style>
.list-sub-text {
  font-size: 12;
}
</style>