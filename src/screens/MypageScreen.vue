<template>
  <nb-container class="mypage-container">
    <header
      root
      :screen="title"
      :navigation="navigation"
    />

      <nb-content padder class="mypage-account" v-if="isAuth">
        <nb-list-item thumbnail>
          <nb-left>
              <nb-thumbnail square :source="{uri: image}"/>
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
        <nb-button :style="{marginTop:10}" small block dark>
            <nb-text>編集</nb-text>
        </nb-button>
        <nb-button :style="{marginTop:20}" small block danger>
            <nb-text>ログアウト</nb-text>
        </nb-button>
      </nb-content>

      <nb-content padder class="mypage-account" v-else>
        <nb-list-item thumbnail>
          <nb-left>
              <nb-thumbnail square :source="require('../../assets/icon.png')"/>
          </nb-left>
          <nb-body>
              <nb-text class="nickname">未登録ユーザー</nb-Text>
          </nb-body>
        </nb-list-item>

        <view class="show-no-login">
          <nb-text class="no-login-text">
            お気に入りのお店を登録したり、
          </nb-text>
          <nb-text class="no-login-text">
            好みに合ったお店が見つけやすくなります。
          </nb-text>
        </view>
        <nb-button class="login-btn" block :on-press="pressedRoginBtn">
            <nb-text>ログインする</nb-text>
        </nb-button>
      </nb-content>

     <footer
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
import store from "../store"
import React from "react"

export default {
  data: function() {
    return {
      title: "マイページ"
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    userNickname() {
      return store.state.auth.user.nickname
    },
    userEmail() {
      return store.state.auth.user.email
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
    image() {
      return store.state.image.selectedImage
    }
  },
  methods: {
    pressedRoginBtn() {
      this.navigation.navigate('Signin')
    }
  }
}
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
.password-section {
  padding: 10;
}
.icon {
  font-size: 15;
}
.email,
.password {
  color: gray;
  font-weight: bold;
}
.show-no-login {
  height: 100px;
  width: 100%;
  padding-top: 25px;
}
.no-login-text {
  font-size: 20;
  text-align: center;
}
.login-btn {
  background-color: #FFCC33;
}
</style>