<template>
  <nb-container class="mypage-container">
    <header
      root
      :screen="title"
      :navigation="navigation"
    />

    <nb-tabs>
      <nb-tab :heading="getAccountTab()">
        <nb-content padder class="mypage-account">
          <nb-list-item thumbnail>
            <nb-left>
                <nb-thumbnail square :source="require('../../assets/icon.png')"/>
            </nb-left>
            <nb-body>
                <nb-text class="nickname">{{ userNickname }}</nb-Text>
            </nb-body>
          </nb-list-item>

          <nb-label class="email-section">
              <nb-icon active class="icon" name="person"/>
              <nb-text class="email">&nbsp;&nbsp; {{ userEmail }}</nb-text>
          </nb-label>
          <nb-label class="password-section">
              <nb-icon active class="icon" name="person"/>
              <nb-text class="password">&nbsp;&nbsp; ********</nb-text>
          </nb-label>
          <nb-label class="favorite-section">
            <nb-label>
              <nb-icon active class="icon" name="heart"/>
              <nb-text class="favorite">&nbsp;&nbsp; 0 &nbsp;&nbsp;</nb-text>
            </nb-label>
            <nb-label>
              <nb-icon active class="icon" name="chatboxes"/>
              <nb-text class="favorite">&nbsp; {{ items.length }} &nbsp; </nb-text>
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
        <nb-content>
          <view v-for="item in items" :key="item.id">
            <item :item="item" />
          </view>
        </nb-content>
      </nb-tab>

      <nb-tab :heading="getCommentedTab()">
        <nb-content>
          <view v-for="item in items" :key="item.id">
            <item mypage :item="item" />
          </view>
        </nb-content>
      </nb-tab>
    </nb-tabs>

     <footer
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
import store from "../store"
import React from "react"
import { TabHeading, Text } from "native-base"
import axios from 'axios'
import service from '../services/axios'

export default {
  data: function() {
    return {
      title: "マイページ",
      user: [
        {id: 0, nickname: "miku", email: "miku@email.com", password: "********", favorite: 1, comment: 1}
      ],
      items: []
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
  },
  computed: {
    userNickname() {
      return store.state.auth.user.nickname
    },
    userEmail() {
      return store.state.auth.user.email
    },
  },
  created () {
    return axios.get('http://192.168.100.100:8000/users/' + String(store.state.auth.user.id) + '/commentedshops')
    .then(res => {
        this.items = res.data
        // 店舗IDのみだと、取得した店舗の数だけ外部APIに通信しないといけない
        // DBにはリストで表示するデータも保管するようにする
        // 画像、コメント数
      })
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