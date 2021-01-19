<template>
  <nb-container class="image-browser-container">
    <nb-header class="header">
      <nb-left class="header-left">
        <nb-button transparent>
          <nb-icon name="arrow-back" />
        </nb-button>
      </nb-left>
      <nb-body class="header-body">
        <nb-title> {{ count }} ファイル選択中</nb-title>
      </nb-body>
      <nb-right class="header-right">
        <TouchableOpacity :title="'Done'" :onPress="isOnSubmit">
          <Text :onPress="isOnSubmit">完了</Text>
        </TouchableOpacity>
      </nb-right>
    </nb-header>
    <view class="image-browser-content">
        <image-browser
          :max="4"
          :onChange="updateHandler"
          :callback="imagesCallback"
          :renderSelectedComponent="renderSelectedComponent"
          :emptyStayComponent="emptyStayComponent"
          :loadCompleteMetadata="false"
        />
      </view>
  </nb-container>
</template>

<script>
import React, { Component } from 'react'
import { StyleSheet, View, Text, TouchableOpacity, ActivityIndicator, Header } from 'react-native'
import * as ImageManipulator from 'expo-image-manipulator'
import {ImageBrowser} from 'expo-image-picker-multiple'
import store from '../store'

export default {
  data() {
    return {
      count: 0,
      onSubmit: ""
    }
  },
  props: {
    navigation: {
      type: Object
    },
  },
  components: {
    ImageBrowser
  },
  computed: {
    isCount() {
      return this.count
    },
    isOnSubmit() {
      return this.onSubmit
    }
  },
  methods: {
    // 画像未選択時のエラー回避
    emptyStayComponent() {
      return (
        <Text style={styles.emptyStay}>Empty =(</Text>
      )
    },
    // 画像選択時のカウント表示
    renderSelectedComponent(number) {
      return (
        <View style={styles.countBadge}>
          <Text style={styles.countBadgeText}>{number}</Text>
        </View>
      )
    },
    // 画像選択状況をローカルに格納
    updateHandler(count, onSubmit) {
      this.count = count
      this.onSubmit = onSubmit
    },
    // 画像整形
    async _processImageAsync(uri) {
      const file = await ImageManipulator.manipulateAsync(
        uri,
        [{resize: { width: 1000 }}],
        { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
      );
      return file;
    },
    // コールバックのデータ形式に整形〜投稿作成画面に遷移
    imagesCallback(callback) {
      callback.then(async (photos) => {
        const cPhotos = [];
        for(let photo of photos) {
          const pPhoto = await this._processImageAsync(photo.uri);
          cPhotos.push({
            uri: pPhoto.uri,
            name: photo.filename,
            type: 'image/jpg'
          })
        }
        await store.dispatch('image/cachePostImages', cPhotos)
        this.navigation.goBack()
      })
      .catch((e) => console.log(e));
    },
  }
}

const styles = StyleSheet.create({
  emptyStay:{
    textAlign: 'center',
  },
  countBadge: {
    paddingHorizontal: 8.6,
    paddingVertical: 5,
    borderRadius: 50,
    position: 'absolute',
    right: 3,
    bottom: 3,
    justifyContent: 'center',
    backgroundColor: '#0580FF'
  },
  countBadgeText: {
    fontWeight: 'bold',
    alignSelf: 'center',
    padding: 'auto',
    color: '#ffffff'
  }
});
</script>

<style>
.image-browser-container {
  flex: 1;
}
.image-browser-content {
  flex: 1;
  position: relative;
}
.header {
  background-color: #FFCC33;
}
.header-left {
  flex: 1;
  margin-left: 10;
}
.header-body {
  flex: 2;
  justify-content: center;
  align-items: center;
}
.header-right {
  flex: 1;
  margin-right: 10;
}
</style>