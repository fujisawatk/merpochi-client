<template>
  <nb-container class="mypage-container">

    <header
      root
      :screen="title"
      :navigation="navigation"
    />
    <nb-tabs>
      <nb-tab :heading="getAccountTab()">
        <nb-content padder class="mypage-account" v-if="isAuth">
          <navigation-events :on-did-focus="checkForMessage" />
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
          <nb-button
            rounded
            dark
            class="edit-btn"
            :on-press="pressedEditBtn"
          >
              <nb-text>編集</nb-text>
          </nb-button>
          <nb-button
            rounded
            danger
            class="logout-btn"
            :on-press="pressedLogoutBtn"
          >
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
          <nb-button
            rounded
            class="login-btn"
            :on-press="pressedLoginBtn"
          >
              <nb-text>ログインする</nb-text>
          </nb-button>
        </nb-content>
      </nb-tab>

      <nb-tab :heading="getMyPostsTab()">
        <nb-content v-if="(isMyPosts.length > 0)">
          <view v-for="post in isMyPosts" :key="post.id">
            <post-item
              :post="post"
              :post-id="post.id"
              :change-post-detail="changePostDetail"
            />
          </view>
        </nb-content>
      </nb-tab>

      <nb-tab :heading="getCommentedPostsTab()">
        <nb-content v-if="(isCommentedPosts.length > 0)">
          <view v-for="post in isCommentedPosts" :key="post.id">
            <post-item
              :post="post"
              :post-id="post.id"
              :change-post-detail="changePostDetail"
            />
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
import { Toast, TabHeading, Text } from 'native-base'
import axios from 'axios'
import service from '../services/axios'
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl

export default {
  data: function() {
    return {
      title: "マイページ",
      myPosts: [],
      commentedPosts: []
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
      return store.state.image.userImage
    },
    isMyPosts() {
      return this.myPosts
    },
    isCommentedPosts() {
      return this.commentedPosts
    }
  },
  async created() {
    if (store.state.auth.isAuthResolved == true) {
      const posts = await axios.post( baseApiUrl + '/users/me')
      if (posts.data.my_posts != null) this.myPosts = posts.data.my_posts
    if (posts.data.commented_posts != null) this.commentedPosts = posts.data.commented_posts
    }
  },
  methods: {
     getAccountTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>アカウント情報</Text>
        </TabHeading>
      )
    },
    getMyPostsTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>投稿した{"\n"}レビュー</Text>
        </TabHeading>
      )
    },
    getCommentedPostsTab() {
      return (
        <TabHeading style={{backgroundColor: '#FFCC33'}}>
          <Text style={{color:'#444444', fontSize:13}}>コメントした{"\n"}レビュー</Text>
        </TabHeading>
      )
    },
    pressedLoginBtn() {
      this.navigation.navigate('Signin')
    },
    pressedEditBtn() {
      this.navigation.navigate('EditAccount')
    },
    pressedLogoutBtn() {
      store.dispatch('auth/logout')
        .then(() => {
          Toast.show({
            text: 'ログアウトしました。',
            buttonText: 'Ok',
            type: 'success',
            position: 'bottom',
            duration: 5000
          })
        })
    },
    checkForMessage() {
      const message = this.navigation.getParam('message')
      if ( message == 'success' ) {
        Toast.show({
          text: 'アカウント情報を更新しました。',
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
      }else if ( message == 'failure' ){
        Toast.show({
          text: '更新に失敗しました。',
          buttonText: 'Ok',
          type: 'danger',
          position: 'bottom',
          duration: 5000
        })
      }else{
        return null
      }
      this.navigation.setParams({ message: null })
    },
    changePostDetail(id) {
      this.navigation.navigate('PostDetail', { id })
    },
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
  margin-top: 30;
  justify-content: center;
  max-width: 350px;
}
.edit-btn {
  margin-top: 30;
  justify-content: center;
  max-width: 350px;
}
.logout-btn {
  margin-top: 10;
  justify-content: center;
  max-width: 350px;
}
</style>