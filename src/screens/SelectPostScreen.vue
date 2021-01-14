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
          <nb-button class="easy-post-btn">
            <nb-icon type="AntDesign" name="like1" class="like-icon"/>
          </nb-button>
          <nb-text>簡単投稿</nb-text>
        </view>
        <view class="text-post-section">
          <nb-button button class="text-post-btn">
            <nb-icon type="FontAwesome5" name="pencil-alt" class="text-icon"/>
          </nb-button>
          <nb-text>テキスト投稿</nb-text>
        </view>
      </view>
    </view>

     <footer
      :navigation="navigation"
    />
  </nb-container>
</template>

<script>
export default {
  data: function() {
    return {
      title: "おすすめのお店を投稿"
    };
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
  },
  computed: {
  },
}
</script>

<style>
.select-post-container {
  flex: 1;
}
.select-post-content {
  flex: 1;
  background-color: #eee;
}
.post-section {
  flex-direction: row;
}
.easy-post-section,
.text-post-section {
  height: 200;
  width: 50%;
  background-color: #fff;
  
  justify-content: center;
  align-items: center;
}
.easy-post-btn,
.text-post-btn {
  position: relative;
  background-color: #FFCC33;
  width: 80px;
  height: 80px;
  border-radius: 40px;
  border-color: #444;
  margin: 10;
}
.like-icon,
.text-icon {
  font-size: 40px;
  color: #fff;
  position: absolute;
  left: 5;
}

</style>