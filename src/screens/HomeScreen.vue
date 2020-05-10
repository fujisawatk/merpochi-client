<template>
  <nb-container class="home-container">

    <header
      :screen="title"
      :change-signin="changeSignin"
    />

    <view
      v-for="item in items"
      :key="item.id"
    >
      <item :item="item" />
    </view>

  </nb-container>
</template>

<script>
export default {
  data: function() {
    return {
      title: "最新のお気に入り",
      items: [
        {id: 0, name: "鳥貴族", category: "焼鳥", like: 3},
        {id: 1, name: "笑笑", category: "洋風居酒屋", like: 2}
      ]
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  methods: {
    changeSignin() {
      this.navigation.navigate('Signin')
    }
  }
}
</script>

<style>
.home-container {
  flex: 1;
}
</style>