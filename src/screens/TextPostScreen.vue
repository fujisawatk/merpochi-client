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
          :error="$v.text.$dirty && (!$v.text.maxLength)"
          message="ユーザー名は1000文字以内で入力してください"
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
import { maxLength } from 'vuelidate/lib/validators'

const baseApiUrl = ENV.baseApiUrl

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
    text: {
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
          text: this.form.text,
          rating: this.rating,
          images: base64Imgs
        }
        await axios.post( baseApiUrl + '/shops/code', { code: store.state.shop.shop.id })
        // 店舗登録済の場合
        .then(async res => {
          await axios.post( baseApiUrl + '/shops/' + String(res.data.id) + '/posts', postData)
          this.navigation.navigate("Home", { message: 'post' })
        })
        // 未登録の場合、先に店舗登録
        .catch(async() => {
          const data = {
            shopData: {
              code: store.state.shop.shop.id,
              name: store.state.shop.shop.name,
              category: store.state.shop.shop.category,
              opentime: store.state.shop.shop.opentime,
              access: store.state.shop.shop.access.line +
                store.state.shop.shop.access.stations +
                store.state.shop.shop.access.station_exit +
                store.state.shop.shop.access.walk + '分',
              budget:   Number(store.state.shop.shop.budget),
              img:     store.state.shop.shop.img,
              url: store.state.shop.shop.url,
              latitude: Number(store.state.shop.shop.latitude),
              longitude: Number(store.state.shop.shop.longitude),
            },
            shop_id: 0,
          }
          await store.dispatch('shop/saveShop', data.shopData)
          axios.post( baseApiUrl + '/shops/' + String(store.state.shop.shopId) + '/posts', postData)
          this.navigation.navigate("Home", { message: 'post' })
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