<template>
  <nb-container class="post-item-container">
    <header :screen="title" :navigation="navigation" />
    
    <nb-content>
      <nb-card>
        <nb-card-item bordered>
          <nb-left>
            <nb-thumbnail :source="{uri: postUserImage }"></nb-thumbnail>
            <nb-body class="post-top">
              <nb-text class="top-nickname">{{ postUser }}</nb-text>
              <rating
                :ratingCount="5"
                :startingValue="rating"
                :readonly="true"
                :imageSize="13"
                class="top-rating"
              />
            </nb-body>
          </nb-left>
        </nb-card-item> 
        <nb-card-item bordered cardBody class="post-body">
              <nb-text class="post-text">
                {{ text }}
              </nb-text>
              <view class="post-image">
                <image class="image" :source="require('../../assets/icons/sample.jpg')" :style="stylesObj.cardItemImage"/>
                <image class="image" :source="require('../../assets/icons/sample.jpg')" :style="stylesObj.cardItemImage"/>
                <image class="image" :source="require('../../assets/icons/sample.jpg')" :style="stylesObj.cardItemImage"/>
              </view>
          </nb-card-item>
        <nb-card-item>
          <nb-left>
            <nb-button transparent>
              <nb-icon class="comment-icon" name="chatbubbles"></nb-icon>
              <nb-text class="comment-count">{{ comments.length }}</nb-text>
            </nb-button>
          </nb-left>
          <nb-right>
            <nb-text note>{{ postTime }}</nb-text>
          </nb-right>
        </nb-card-item>
      </nb-card>

      <nb-list-item	
        v-if="isAuth"	
        :style="{paddingRight:14}"	
        transparent	
        no-shadow	
        avatar	
      >	
        <nb-left>	
          <nb-thumbnail	
            small	
            :source="{uri: postUserImage }"
          />	
        </nb-left>	
        <nb-body>	
          <nb-text>{{ postUser }}</nb-Text>	
          <nb-form :style="{width:'100%',marginTop:8}">	
            <nb-textarea	
              :rowSpan="3"	
              :style="{paddingTop:8}"	
              bordered	
              placeholder="コメント..."	
            />	
            <!-- <input-with-error	
              :error="$v.newComment.$dirty && (!$v.newComment.required || !$v.newComment.minLength || !$v.newComment.maxLength)"	
              message="コメントは1〜255文字で入力してください"	
            />	 -->
            <nb-button	
              :style="{width:60}"	
              small	
              auto-capitalize="none"	
              :on-blur="() => $v.newComment.$touch()"	
            >	
              <nb-text>追加</nb-text>	
            </nb-button>	
          </nb-form>	
        </nb-body>	
      </nb-list-item>	
      <nb-list-item	
        :style="{paddingRight:14}"	
        avatar	
        v-for="comment in comments"	
        :key="comment.id"
      >	
        <nb-left>	
          <nb-thumbnail small :source="{uri: comment.user_image }"/>	
        </nb-left>	
        <nb-body>	
          <nb-text>{{ comment.user_nickname }}</nb-Text>	
          <nb-text note>{{ comment.text }}</nb-Text>	
        </nb-body>	
        <nb-right>	
          <nb-text note>{{ comment.time }}</nb-text>	
        </nb-right>	
      </nb-list-item>
    </nb-content>
    

    <footer
      :navigation="navigation"
      class="footer"
    />

  </nb-container>
</template>

<script>
import { Rating } from 'react-native-ratings'
import store from '../store'
import axios from 'axios'
import service from '../services/axios'
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl
export default {
  components: {
    Rating
  },
  data() {
    return {
      stylesObj: {
          cardItemImage: {
            resizeMode: "cover"
          }
      },
      title: "投稿詳細ページ",
      postId: 0,
      text: "",
      rating: "",
      postUser: "",
      postUserImage: "",
      comments: [],
      postTime: ""
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    currentUser() {
      return store.state.auth.user
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
  },
  async created () {
    const postId = this.navigation.getParam('id')
    this.postId = postId
    await axios.get( baseApiUrl + '/shops/' + String(store.state.shop.shopId) + '/posts/' + String(postId), { code: code })
    .then(res => {
      console.log(res.data)
      if (res.data.comments == null) {
          this.comments = []
        }else{
          this.comments = res.data.comments
        } 
      this.text = res.data.text
      this.rating = res.data.rating
      this.postUser = res.data.user_nickname
      this.postUserImage = res.data.user_image
      this.postTime = res.data.time
    })
    .catch(() => {})
  }
}
</script>

<style>
.post-item-container {
  flex: 1;
  height: 100%;
  width: 100%;
  position: relative;
}
.post-top {
  flex: 1;
  align-items: flex-start;
}
.top-nickname {
  flex: 1;
}
.top-rating {
  flex: 1;
}
.post-body {
  flex-direction: column;
  height: 400;
}
.post-text {
  align-items: flex-start;
  width: 90%;
  font-size: 20;
  letter-spacing: 2;
  line-height: 25;
}
.post-image {
  flex-direction: row;
}
.image {
  height: 100;
  width: 100;
  margin: 10;
}
.comment-icon {
  color: #bbb;
}
.comment-count {
  color: #444;
  left: -5;
}
</style>