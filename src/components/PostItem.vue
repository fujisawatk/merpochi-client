<template>
  <nb-container class="post-item-container">
    <!-- <nb-content> -->
      <nb-card>
        <nb-card-item bordered>
          <nb-left>
            <nb-thumbnail :source="{uri: post.user_image}"></nb-thumbnail>
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
        </nb-card-item> 
        <nb-card-item bordered cardBody class="post-body">
              <nb-text
                class="post-text"
                :numberOfLines="3"
                :ellipsizeMode="`tail`"
              >
                {{ post.text }}
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
              <nb-text class="comment-count">{{ post.comments_count }}</nb-text>
            </nb-button>
          </nb-left>
          <nb-right>
            <nb-text note>{{ post.time }}</nb-text>
          </nb-right>
        </nb-card-item>
      </nb-card>
    <!-- </nb-content> -->
  </nb-container>
</template>

<script>
import { Rating } from 'react-native-ratings';
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
    }
  },
  props: {
    post: Object,
    navigation: {
      type: Object
    },
  }
}
</script>

<style>
.post-item-container {
  flex: 1;
  height: 100%;
  width: 100%;
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
  height: 200;
}
.post-text {
  align-items: flex-start;
  width: 90%;
  height: 70;
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