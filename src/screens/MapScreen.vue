<template>
  <view class="map-container">
    <map-view class="map-container"
      ref="map"
      :initial-region="coordinates"
    >
      <view v-for="(marker, markerIndex) in markers" :key="markerIndex">
        <map-view:marker
          :key="markerIndex"
          :coordinate="marker.coordinate"
          :title="marker.title"
          :description="marker.description"
        ></map-view:marker>
      </view>
    </map-view>
  </view>
</template>

<script>
import MapView from 'react-native-maps'

export default {
  components: {
    MapView
  },
  data: function() {
    return {
      markers: [
        {
          coordinate: {
            latitude: 45.524548,
            longitude: -122.6749817,
          },
          title: "Best Place",
          description: "This is the best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.524698,
            longitude: -122.6655507,
          },
          title: "Second Best Place",
          description: "This is the second best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.5230786,
            longitude: -122.6701034,
          },
          title: "Third Best Place",
          description: "This is the third best place in Portland",
        },
        {
          coordinate: {
            latitude: 45.521016,
            longitude: -122.6561917,
          },
          title: "Fourth Best Place",
          description: "This is the fourth best place in Portland",
        },
      ],
      coordinates: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      }
    }
  }
}
</script>

<style>
.map-container {
  flex: 1;
}
</style>