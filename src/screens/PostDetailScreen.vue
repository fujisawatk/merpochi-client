<template>
  <nb-container class="post-item-container">

    <navigation-events :on-did-focus="checkForMessage" />

    <header :screen="title" :navigation="navigation" />
    
    <nb-content>
      <nb-card>
        <nb-card-item bordered>
          <nb-left>
            <nb-thumbnail :source="{uri: post.user_image }"></nb-thumbnail>
            <nb-body class="post-top">
              <nb-text class="top-nickname">{{ post.user_nickname }}</nb-text>
              <rating
                :ratingCount="5"
                :startingValue="post.rating"
                :readonly="true"
                :imageSize="13"
                class="top-rating"
              />
            </nb-body>
          </nb-left>
          <nb-right class="post-top-right">
            <nb-button transparent
              v-if="currentUserID == post.user_id"
              :on-press="pressedEditPostBtn"
            >
              <nb-icon type="FontAwesome5" name="edit" class="edit-icon"/>
            </nb-button>
            <nb-button transparent
              v-if="currentUserID == post.user_id"
              :on-press="pressedDelPostBtn"
            >
              <nb-icon type="FontAwesome5" name="trash" class="trash-icon"/>
            </nb-button>
          </nb-right>
        </nb-card-item> 
        <nb-card-item bordered cardBody class="post-body">
              <nb-text class="post-text">
                {{ post.text }}
              </nb-text>
              <scroll-view :horizontal="true">
                <nb-list-item	
                  avatar
                  v-for="(image, i) in post.images"
                  :key="i"
                >	
                  <image-modal
                    :swipeToDismiss="false"
                    :resizeMode="`contain`"
                    :imageBackgroundColor="`#000000`"
                    :style="{
                      width: 150,
                      height: 150,
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
              <nb-text class="comment-count">{{ post.comments_count }}</nb-text>
            </nb-button>
          </nb-left>
          <nb-right>
            <nb-text note>{{ post.time }}</nb-text>
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
import { ScrollView, Alert } from 'react-native'
import ImageModal from 'react-native-image-modal'
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
import { Toast } from 'native-base'

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
      comments: [],
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
    post() {
      return store.state.post.post
    },
    currentUserNickname() {
      return store.state.auth.user.nickname
    },
    currentUserImage() {
      return store.state.image.userImage
    },
    isAuth() {
      return store.state.auth.isAuthResolved
    },
    currentUserID() {
      return store.state.auth.user.id
    },
  },
  methods: {
    pressedAddCommentBtn() {
      this.$v.$touch()
      if (!this.$v.$invalid) {
        axios.post( baseApiUrl + '/posts/' + String(this.post.id) + '/comments', { text: this.newComment })
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
    },
    pressedEditPostBtn() {
      this.navigation.navigate("EditPost")
    },
    checkForMessage() {
      const message = this.navigation.getParam('message')
      if (message == 'update') {
        Toast.show({
          text: 'レビューを更新しました',
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
      this.navigation.setParams({ message: null })
      }
    },
    pressedDelPostBtn() {
      Alert.alert(
        '確認',
        '本当に削除しますか？',
        [
          {text: 'いいえ', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'はい', onPress: () => this.execDelPost()},
        ],
        { cancelable: false }
      )
    },
    async execDelPost() {
      // 操作する投稿に紐付く店舗情報を取得
      const shop = await axios.post( baseApiUrl + '/shops/posted', {post_id: store.state.post.post.id})
      await store.dispatch('shop/addShopForMyList', shop.data)
      // 投稿削除
      axios.delete( baseApiUrl + '/shops/' + String(store.state.shop.shop.id) +'/posts/' + String(store.state.post.post.id))
      .then(() => {
        store.dispatch("footer/activeHomeTab")
        this.navigation.navigate("Home")
      })
      .catch(() => {})
    }
  },
  async created () {
    await axios.get( baseApiUrl + '/posts/' + String(store.state.post.post.id) + '/comments')
    .then(res => {
      if (res.data != null) {
          this.comments = res.data
        }else{
          this.comments = []
        }
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
.post-top-right {
  flex-direction: row;
  justify-content: flex-end;
}
.edit-icon {
  margin-right: 30;
  color: #777;
  font-size: 20;
}
.trash-icon {
  margin-right: 15;
  color: #777;
  font-size: 20;
}
.post-body {
  flex-direction: column;
  min-height: 150;
}
.post-text {
  align-items: flex-start;
  width: 90%;
  font-size: 20;
  letter-spacing: 2;
  line-height: 25;
  min-height: 100;
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