<template>
  <nb-container class="select-post-container">
    <header
      root
      :screen="title"
      :navigation="navigation"
    />

    <view class="select-post-content">
      <view class="post-section">
        <view class="easy-post-section">
          <nb-item class="post-picker">
            <nb-input placeholder="店舗選択" v-model="shopName"/>
            <nb-icon active type="FontAwesome5" name="arrow-circle-right" />
            <nb-button
            :on-press="pressedShopSearchInput"
            class="input-cover"
          />
          </nb-item>

          <press-me-button
            :height="80"
            :width="220"
            :backgroundColor="`#FFC7AF`"
            :buttonColor="`#FF773E`"
            :edgeHeight="20"
            :cornerRadius="30"
            :shadowStyle="{
              shadowColor: '#FF9872',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: 0.8,
              shadowRadius: 6,
              elevation: 10,
            }"
            :on-press="pressedFavoriteBtn"
          >
            <view class="easy-post-btn">
              <nb-icon type="AntDesign" name="like1" class="like-icon"/>
              <nb-text class="like-text">最高！！</nb-text>
            </view>
          </press-me-button>
        </view>
      </view>
    </view>

     <footer
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
import PressMeButton from 'react-native-press-me-button'
import { Toast } from 'native-base'
import store from '../store'
import axios from 'axios'
import { ENV } from "../services/environment"

const baseApiUrl = ENV.baseApiUrl
export default {
  data: function() {
    return {
      title: "簡単投稿",
      selected: "",
      keyword: ""
    };
  },
  components: {
    PressMeButton
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    shopName() {
      return store.state.shop.shop.name
    },
  },
  created() {
    store.dispatch('shop/delShop')
  },
  methods: {
    pressedShopSearchInput() {
      this.navigation.navigate('ShopSearch', { screen: 'easy' })
    },
    async pressedFavoriteBtn() {
      store.dispatch('favorite/saveFavorite')
      .then(() => {
        // フッタータブのアクティブ切替
        store.dispatch("footer/activeHomeTab")
        this.navigation.navigate("Home", { message: 'favorite' })
      })
      .catch(() => {
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
</script>

<style>
.select-post-container {
  flex: 1;
}
.select-post-content {
  flex: 1;
  align-items: center;
}
.easy-post-section{
  height: 100%;
  width: 90%;
  justify-content: center;
  align-items: center;
}
.post-picker {
  position: relative;
  width: 100%;
  margin-bottom: 100;
  background-color: antiquewhite;
}
.input-cover {
  width: 90%;
  height: 100%;
  position: absolute;
  opacity: 0;
}
.easy-post-btn{
  /* position: relative; */
  flex-direction: row;
   justify-content: center;
  align-items: center;
}
.like-icon{
  font-size: 40px;
  color: #fff;
  /* position: absolute; */
  right: 15;
}
.like-text {
  font-size: 20;
  color: #fff;
  font-weight: bold;
}

</style>