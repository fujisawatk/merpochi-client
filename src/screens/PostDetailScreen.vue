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
              <scroll-view :horizontal="true">
                <nb-list-item	
                  avatar
                  v-for="image in images"
                  :key="image.id"
                >	
                  <image-modal
                    :swipeToDismiss="false"
                    :resizeMode="`contain`"
                    :imageBackgroundColor="`#000000`"
                    :style="{
                      width: 250,
                      height: 250,
                    }"
                    :source="{uri: image.uri}"
                  />
                </nb-list-item>
              </scroll-view>
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
            :source="{uri: currentUserImage }"
          />	
        </nb-left>	
        <nb-body>	
          <nb-text>{{ currentUserNickname }}</nb-Text>	
          <nb-form :style="{width:'100%',marginTop:8}">	
            <nb-textarea	
              :rowSpan="3"
              :style="{paddingTop:8}"
              bordered
              placeholder="コメント..."
              v-model="newComment"
            />	
            <input-with-error	
              :error="$v.newComment.$dirty && (!$v.newComment.required || !$v.newComment.minLength || !$v.newComment.maxLength)"	
              message="コメントは1〜255文字で入力してください"	
            />	
            <nb-button
              small
              :style="{width:60}"
              :on-press="pressedAddCommentBtn"
              auto-capitalize="none"
              :on-blur="() => $v.newComment.$touch()"
            >	
              <nb-text>追加</nb-text>	
            </nb-button>	
          </nb-form>	
        </nb-body>	
      </nb-list-item>	
      <nb-list-item	
        avatar
        v-for="comment in comments"
        :key="comment.id"
        class="comment-list"
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
import { ScrollView } from 'react-native'
import ImageModal from 'react-native-image-modal';
import { Rating } from 'react-native-ratings'
import store from '../store'
import axios from 'axios'
import service from '../services/axios'
import { ENV } from "../services/environment"
import {
  required,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'

const baseApiUrl = ENV.baseApiUrl
export default {
  components: {
    ScrollView,
    ImageModal,
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
      images: [
        {
          uri: "https://cdn.pixabay.com/photo/2018/01/11/09/52/three-3075752_960_720.jpg",
          id: 1
        },
        {
          uri: "https://cdn.pixabay.com/photo/2018/01/11/09/52/three-3075752_960_720.jpg",
          id: 2
        },
        {
         uri: "https://cdn.pixabay.com/photo/2018/01/11/09/52/three-3075752_960_720.jpg",
         id: 3
        },
      ],
      comments: [],
      postTime: "",
      newComment: ""
    }
  },
  validations: {
    newComment: {
      required,
      minLength: minLength(1),
      maxLength: maxLength(255)
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    currentUserNickname() {
      return store.state.auth.user.nickname
    },
    currentUserImage() {
      return store.state.image.userImage
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
  },
  methods: {
    pressedAddCommentBtn() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        axios.post( baseApiUrl + '/posts/' + String(this.postId) + '/comments', { text: this.newComment })
        .then(res => {
          this.comments.push(res.data)
          this.newComment = ""
          // $dirtyをfalseに設定（コメント入力欄アクティブリセット）
          this.$v.newComment.$reset()
        })
        .catch(err => {
          console.log(err)
        })
      }
    }
  },
  async created () {
    const postId = this.navigation.getParam('id')
    this.postId = postId
    await axios.get( baseApiUrl + '/shops/' + String(store.state.shop.shopId) + '/posts/' + String(postId))
    .then(res => {
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
}
.post-text {
  align-items: flex-start;
  width: 90%;
  font-size: 20;
  letter-spacing: 2;
  line-height: 25;
}
.image {
  height: 150;
  width: 150;
  margin: 10;
}
.comment-list {
  padding-right: 15;
  padding-bottom: 20;
}
.comment-icon {
  color: #bbb;
}
.comment-count {
  color: #444;
  left: -5;
}
</style>