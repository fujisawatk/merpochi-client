<template>
  <nb-container class="detail-container">
    <header :screen="title" :navigation="navigation" />

    <nb-tabs>
      <nb-tab :heading="getDetailsTab()">
        <scroll-view class="detail-card">
          <nb-card-item class="card-top">
              <image :source="require('../../assets/icons/sample.jpg')" class="card-image"/>
          </nb-card-item>

          <nb-list class="card-body">
            <nb-separator class="card-index">
              <nb-text class="index-title">店舗情報</nb-text>
            </nb-separator>

            <nb-item class="card-info">
              <nb-text class="card-title">店名：</nb-text>
              <nb-text class="card-text">鳥貴族</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">営業時間：</nb-text>
              <nb-text class="card-text">17:00〜23:00</nb-text>
            </nb-item>

            <nb-item class="card-info">
              <nb-text class="card-title">平均予算：</nb-text>
              <nb-text class="card-text">4,000円</nb-text>
            </nb-item>
          </nb-list>

          <nb-form>
            <nb-text class="comment-title">コメント</nb-text>
            <nb-textarea :rowSpan="5" bordered placeholder="コメントを入力してください" />
          </nb-form>
        </scroll-view>

        <view class="detail-footer">
          <nb-button warning class="like-button">
            <nb-icon active type="AntDesign" name="like1" />
            <nb-text>いいね</nb-text>
          </nb-button>
          <nb-button warning class="like-button">
            <nb-icon active type="Entypo" name="phone" />
            <nb-text>詳細</nb-text>
          </nb-button>
        </view>    
      </nb-tab>

      <nb-tab :heading="getMapTab()">
        <view class="map-container">
          <map-view class="map-container"
            ref="map"
            :initial-region="coordinates"
          >
            <view>
              <map-view:marker
                :coordinate="marker.coordinate"
                :title="marker.title"
                :description="marker.description"
              ></map-view:marker>
            </view>
          </map-view>
        </view>
      </nb-tab>
    </nb-tabs>

  </nb-container>
</template>

<script>
import { ScrollView } from 'react-native'
import React from "react"
import { TabHeading, Text } from "native-base"
import MapView from 'react-native-maps'

export default {
  components: {
    ScrollView,
    MapView
  },
  data: function() {
    return {
      title: "店舗詳細ページ",
      marker: {
        coordinate: {
          latitude: 45.524548,
          longitude: -122.6749817,
        },
        title: "Best Place",
        description: "This is the best place in Portland",
      },
      coordinates: {
        latitude: 45.52220671242907,
        longitude: -122.6653281029795,
        latitudeDelta: 0.03,
        longitudeDelta: 0.03
      }
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    getDetailsTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color: '#444444', fontSize:13}}>詳細</Text>
        </TabHeading>
      )
    },
    getMapTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>マップ</Text>
        </TabHeading>
      )
    },
  }
}
</script>

<style>
.detail-container {
  position: relative;
}
.detail-card {
  padding: 10;
  overflow: scroll;
}
.card-top {
  height: 350;
}
.card-image {
  height: 100%;
  width: 100%;
}
.card-body {
  height: 250;
}
.card-index {
  height: 25%;
  align-items: center;
}
.index-title {
  font-size: 15;
}
.card-info {
  height: 25%;
  flex-direction: row;
}
.card-title {
  flex: 1;
  text-align: center;
  font-size: 15;
  font-weight: bold;
}
.card-text {
  flex: 2;
  margin-left: 15;
  font-size: 15;
}
.comment-title {
  padding-top: 15px;
}
.detail-footer {
  flex-direction: row;
  background-color: #DDDDDD	;
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.like-button {
  flex: 1;
  margin-left: 10;
  margin-right: 10;
}
.map-container {
  flex: 1;
}
</style>