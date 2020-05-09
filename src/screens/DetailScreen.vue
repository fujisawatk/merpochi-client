<template>
  <nb-container class="detail-container">
    <scroll-view class="detail-card">

      <nb-card-item class="card-top">
          <image :source="require('../../assets/icons/sample.jpg')" class="card-image"/>
      </nb-card-item>

      <nb-list class="card-body">
        <nb-separator class="card-index">
          <nb-text class="index-title">店舗情報</nb-text>
        </nb-separator>

        <nb-item class="card-info">
          <nb-text class="card-title">店名：</nb-text>
          <nb-text class="card-text">鳥貴族</nb-text>
        </nb-item>

        <nb-item class="card-info">
          <nb-text class="card-title">営業時間：</nb-text>
          <nb-text class="card-text">17:00〜23:00</nb-text>
        </nb-item>

        <nb-item class="card-info">
          <nb-text class="card-title">平均予算：</nb-text>
          <nb-text class="card-text">4,000円</nb-text>
        </nb-item>
      </nb-list>

      <nb-form>
        <nb-text class="comment-title">コメント</nb-text>
        <nb-textarea :rowSpan="5" bordered placeholder="コメントを入力してください" />
      </nb-form>

    </scroll-view>

    <view class="detail-footer">
      <nb-button warning class="like-button">
        <nb-icon active type="AntDesign" name="like1" />
        <nb-text>いいね</nb-text>
      </nb-button>
      <nb-button warning class="like-button">
        <nb-icon active type="Entypo" name="phone" />
        <nb-text>詳細</nb-text>
      </nb-button>
    </view>    

  </nb-container>
</template>

<script>
import { ScrollView } from 'react-native'

export default {
  components: {
    ScrollView
  }
}
</script>

<style>
.detail-container {
  position: relative;
}
.detail-card {
  padding: 10;
  overflow: scroll;
}
.card-top {
  height: 350;
}
.card-image {
  height: 100%;
  width: 100%;
}
.card-body {
  height: 250;
}
.card-index {
  height: 25%;
  align-items: center;
}
.index-title {
  font-size: 15;
}
.card-info {
  height: 25%;
  flex-direction: row;
}
.card-title {
  flex: 1;
  text-align: center;
  font-size: 15;
  font-weight: bold;
}
.card-text {
  flex: 2;
  margin-left: 15;
  font-size: 15;
}
.comment-title {
  padding-top: 15px;
}
.detail-footer {
  flex-direction: row;
  background-color: #DDDDDD	;
  position: absolute;
  bottom: 0;
  padding: 10px;
}
.like-button {
  flex: 1;
  margin-left: 10;
  margin-right: 10;
}
</style>