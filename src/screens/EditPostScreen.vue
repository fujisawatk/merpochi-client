<template>
  <nb-container class="text-post-container">
    <header
      auth
      :screen="title"
      :navigation="navigation"
    />
    <scroll-view>
      <nb-form class="form">

        <view class="images-section">
          <view class="images-view">
            <scroll-view :horizontal="true">
              <view class="select-images">
                <nb-list-item	
                  avatar
                  v-for="(img, i) in images"
                  :key="i"
                >
                  <image
                    class="images"
                    :source="{uri: img.uri}"
                  />
                </nb-list-item>
              </view>
            </scroll-view>
          </view>
          <view class="images-select">
            <nb-button transparent :on-press="pickImages">
              <nb-text class="select-btn">画像選択</nb-text> 
            </nb-button>
          </view>
        </view>

        <view class="shop-picker-section">
          <nb-item class="post-picker">
            <nb-input placeholder="店舗選択" v-model="shopName"/>
            <nb-icon active type="FontAwesome5" name="arrow-circle-right" />
            <nb-button
              :on-press="pressedShopSearchInput"
              class="input-cover"
            />
          </nb-item>
        </view>
        
        <view class="text-section">
          <nb-textarea
            bordered
            placeholder="このお店どうだった？"
            class="textarea"
            v-model="text"
            auto-capitalize="none"
            :on-blur="() => $v.text.$touch()"
          />
          <input-with-error
          class="text-error"
          :error="$v.text.$dirty && (!$v.text.required || !$v.text.maxLength)"
          message="1〜1000文字以内で入力してください"
        />
        </view>

        <view fixedLabel class="rating-section">
          <airbnb-rating
            :count="5"
            :reviews="reviews"
            :defaultRating="rating"
            :size="40"
            :onFinishRating="ratingCompleted"
            class="post-rating"
          />
        </view>

      </nb-form>

      <view class="form-btn">
        <nb-button
          rounded
          danger
          class="send-btn"
          :on-press="pressedPostBtn"
        >
          <nb-text class="btn-text">投稿</nb-text>
        </nb-button>

      </view>
    </scroll-view>

  </nb-container>
</template>

<script>
import { ScrollView } from 'react-native'
import store from '../store'
import { AirbnbRating } from 'react-native-ratings'
import axios from 'axios'
import { ENV } from "../services/environment"
import * as FileSystem from 'expo-file-system'
import { maxLength, required } from 'vuelidate/lib/validators'
import { Toast } from 'native-base'

const baseApiUrl = ENV.baseApiUrl

export default {
  data () {
    return {
      title: "レビュー編集",
      reviews: ["二度と行かない！", "次はないかな…", "まあ、普通かな。", "また行きたい！", "最高！おすすめ！！"],
      rating: 3,
      text: ""
    }
  },
  validations: {
    text: {
      required,
      maxLength: maxLength(1000)
    },
  },
  props: {
    navigation: {
      type: Object,
    }
  },
  components: {
    AirbnbRating
  },
  computed: {
    images() {
      return store.state.image.shopImages
    },
    shopName() {
      return store.state.shop.shop.name
  },
  },
  async created() {
    this.rating = store.state.post.post.rating
    this.text = store.state.post.post.text
console.log(store.state.post.post.images)
    await store.dispatch('image/cachePostImages', store.state.post.post.images)
    
  },
  methods: {
    pickImages() {
      this.navigation.navigate('ImageBrowser')
    },
    pressedShopSearchInput() {
      this.navigation.navigate('ShopSearch', { screen: 'text' })
    },
    ratingCompleted(rating) {
      this.rating = rating
    },
    async pressedPostBtn() {
      this.$v.text.$touch()
      if (!this.$v.text.$invalid) {
        // 画像をbase64エンコード
        const base64Imgs = []
        for (let i = 0; i < store.state.image.shopImages.length; i++ ){
          const base64 = await FileSystem.readAsStringAsync(store.state.image.shopImages[i].uri, { encoding: 'base64' })
          base64Imgs.push(base64)
        } 
        const postData = {
          text: this.text,
          rating: this.rating,
          images: base64Imgs
        }
        store.dispatch('post/savePost', postData)
        .then(() => {
          store.dispatch("footer/activeHomeTab")
          this.navigation.navigate("Home", { message: 'post' })
        })
        // 未登録の場合、先に店舗登録
        .catch(async() => {
          Toast.show({
            text: "登録できませんでした",
            buttonText: 'Ok',
            type: 'danger',
            position: 'bottom',
            duration: 5000
          })
        })
      }
    }
  }
}
</script>

<style>
.form {
  width: 100%;
}

/* 画像選択 */
.images-section {
  height: 150;
  width: 100%;
}
.images-view {
  height: 100;
  width: 100%;
  background-color: azure;
}
.select-images {
 flex-direction: row;
}
.images {
  height: 100;
  width: 100;
}
.images-select {
  height: 50;
  width: 100%;
  align-items: center;
}
.select-btn {
  text-align: center;
  width: 100%;
  font-size: 20;
}

/* 店舗選択 */
.shop-picker-section {
  width: 95%;
  align-items: center;
}
.post-picker {
  position: relative;
  width: 100%;
  background-color: #eee;
}
.input-cover {
  width: 100%;
  height: 100%;
  position: absolute;
  opacity: 0;
}

/* 感想 */
.text-section {
  width: 100%;
}
.textarea {
  margin-top: 10;
  margin-left: 10;
  margin-right: 10;
  height: 200;
  font-size: 20;
}
.text-error {
  margin-left: 10;
}

/* 評価選択 */
.rating-section {
  justify-content: center;
  margin-top: 20;
  margin-bottom: 40;
}

/* 登録ボタン */
.form-btn {
  height: 200;
  align-items: center;
}
.send-btn {
  max-width: 350px;
  justify-content: center;
  width: 100%;
}
</style>