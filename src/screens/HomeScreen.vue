<template>
  <nb-container class="home-container">

    <header
      root
      home
      :screen="title"
      :navigation="navigation"
    />

    <nb-content>
      <nb-form class="search-form">
        <nb-item
          rounded
          class="search-input"
        >
          <nb-input
            placeholder="店名・キーワード"
            v-model="search.keyword"
            auto-capitalize="none"
          />
          <nb-icon
            active
            name='search'
            :on-press="pressedSearchIcon"
          />
        </nb-item> 
      </nb-form>

      <nb-accordion
        :dataArray="dataArray"
        :renderHeader="_renderHeader"
        :renderContent="_renderContent"
      />

      <view
        v-for="item in items"
        :key="item.code"
      >
        <item
          :item="item"
          :sel-code="item.code"
          :change-detail="changeDetail"
        />
      </view>
    </nb-content>

    <footer
      :navigation="navigation"
    />

  </nb-container>
</template>

<script>
import store from '../store'
import React from "react";
import { View, Text, Icon, Input, Item, Button, Image } from "native-base";

export default {
  data: function() {
    return {
      title: "店舗一覧",
      // 定義しないとNativeBaseテンプレートが読み込まれないため設置。
      dataArray: [
        { title: "", content: "" },
      ],
      search: {
        keyword: ""
      }
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    items() {
      return store.state.shop.shops
    }
  },
  methods: {
    changeDetail(code) {
      if (store.state.auth.isAuthResolved == true) {
        this.navigation.navigate('Detail', { code })
      } else {
        this.navigation.navigate('Signin')
      }
    },
    _renderContent() {
      return (
        <View style={{ flex: 1, backgroundColor: "#EEEEEE" }}>
          <View style={{ flex: 1, padding: 10 }}>
            <Item rounded>
              <Icon active name='train' />
              <Input placeholder='エリア・駅' />
            </Item>
          </View>

          <View style={{ flex: 1, padding: 10 }}>
            <Item rounded>
              <Icon active name='restaurant' />
              <Input placeholder='ジャンル' />
            </Item>
          </View>

          <View style={{ flex: 1, padding: 10 }}>
            <Button danger style={{ flex: 1, flexDirection: "row", justifyContent: "center" }}>
              <Text> 検索する </Text>
            </Button>
          </View>
        </View>
      );
    },
    _renderHeader(expanded) {
      return (
        <View
          style={{ flexDirection: "row", padding: 15, justifyContent: "space-between", alignItems: "center", backgroundColor: "#CCCCCC"}}
        >
          <Text style={{ fontWeight: "600" }}>
            詳細検索
          </Text>
          {expanded
            ? <Icon style={{ fontSize: 18 }} name="remove-circle" />
            : <Icon style={{ fontSize: 18 }} name="add-circle" />
          }
        </View>
      );
    },
    pressedSearchIcon() {
      store.dispatch("shop/keywordSearch", this.search.keyword)
    }
  }
}
</script>

<style>
.home-container {
  flex: 1;
}
.search-form {
  padding: 10px 10px;
}
.search-input {
  padding-left: 10px;
  padding-right: 10px;
}
</style>