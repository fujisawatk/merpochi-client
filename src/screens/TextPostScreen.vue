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
          <nb-textarea class="textarea" bordered placeholder="このお店どうだった？" />
        </view>

        <view fixedLabel class="rating-section">
          <airbnb-rating
            :count="5"
            :reviews="reviews"
            :defaultRating="rating"
            :size="40"
            class="post-rating"
          />
        </view>
        <!-- <input-with-error
          :error="$v.form.email.$dirty && (!$v.form.email.required || !$v.form.email.isValidEmail)"
          message="形式が正しくありません"
        /> -->

      </nb-form>

      <view class="form-btn">
        <nb-button rounded
          class="send-btn" danger
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
import {
  required,
  email,
  minLength,
  sameAs,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      title: "アカウント登録",
      reviews: ["二度と行かない！", "次はないかな…", "まあ、普通かな。", "また行きたい！", "最高！おすすめ！！"],
      rating: 3,
      text: ""
    }
  },
  validations: {
    
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
      return store.state.shop.shopName
    },
  },
  created() {
  },
  methods: {
    pickImages() {
      this.navigation.navigate('ImageBrowser')
    },
    pressedShopSearchInput() {
      this.navigation.navigate('ShopSearch')
    },
  },
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
  margin-left: 10;
  margin-right: 10;
  height: 200;
  font-size: 20;
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