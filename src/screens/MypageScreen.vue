<template>
  <nb-container class="mypage-container">
    <header :screen="title" :navigation="navigation" />

    <nb-tabs>
      <nb-tab :heading="getAccountTab()">
        <nb-content padder class="mypage-account">
          <nb-list-item thumbnail>
            <nb-left>
                <nb-thumbnail square :source="require('../../assets/icon.png')"/>
            </nb-left>
            <nb-body>
                <nb-text class="nickname">{{ user[0].nickname }}</nb-Text>
            </nb-body>
          </nb-list-item>

          <nb-label class="email-section">
              <nb-icon active class="icon" name="person"/>
              <nb-text class="email">&nbsp;&nbsp; {{ user[0].email }}</nb-text>
          </nb-label>
          <nb-label class="password-section">
              <nb-icon active class="icon" name="person"/>
              <nb-text class="password">&nbsp;&nbsp; {{ user[0].password }}</nb-text>
          </nb-label>
          <nb-label class="favorite-section">
            <nb-label>
              <nb-icon active class="icon" name="heart"/>
              <nb-text class="favorite">&nbsp;&nbsp; {{ user[0].favorite }} &nbsp;&nbsp;</nb-text>
            </nb-label>
            <nb-label>
              <nb-icon active class="icon" name="chatboxes"/>
              <nb-text class="favorite">&nbsp;&nbsp; {{ user[0].comment }}</nb-text>
            </nb-label>
          </nb-label>
          <nb-button :style="{marginTop:10}" small block dark>
              <nb-text>編集</nb-text>
          </nb-button>
          <nb-button :style="{marginTop:20}" small block danger>
              <nb-text>ログアウト</nb-text>
          </nb-button>
        </nb-content>
      </nb-tab>

      <nb-tab :heading="getFavoritedTab()">
        <view v-for="item in items" :key="item.id">
          <item :item="item" />
        </view>
      </nb-tab>

      <nb-tab :heading="getCommentedTab()">
        <view v-for="item in items" :key="item.id">
          <item :item="item" />
        </view>
      </nb-tab>
    </nb-tabs>
  </nb-container>
</template>

<script>
import store from "../store"
import React from "react"
import { TabHeading, Text } from "native-base"

export default {
  data: function() {
    return {
      title: "マイページ",
      user: [
        {id: 0, nickname: "miku", email: "miku@email.com", password: "********", favorite: 1, comment: 1}
      ],
      items: [
        { id: 0, name: "鳥貴族", category: "焼鳥", like: 3 },
        { id: 1, name: "笑笑", category: "洋風居酒屋", like: 2 }
      ]
    };
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    getAccountTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color: '#444444', fontSize:13}}>アカウント情報</Text>
        </TabHeading>
      )
    },
    getFavoritedTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>お気に入りの店舗</Text>
        </TabHeading>
      )
    },
    getCommentedTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>コメントした店舗</Text>
        </TabHeading>
      )
    }
  }
};
</script>

<style>
.mypage-container {
  flex: 1;
}
.nickname {
  font-weight: bold;
}
.email-section {
  padding: 10;
  margin-top: 10;
}
.password-section,
.favorite-section {
  padding: 10;
}
.icon {
  font-size: 15;
}
.email,
.password,
.favorite {
  color: gray;
  font-weight: bold;
}
</style>