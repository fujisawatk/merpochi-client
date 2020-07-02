<template>
  <nb-container class="home-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-content>
      <view
        v-for="item in items"
        :key="item.id"
      >
        <item :item="item" :change-detail="changeDetail" />
      </view>
    </nb-content>

    <footer
      :navigation="navigation"
    />

  </nb-container>
</template>

<script>
import store from '../store'

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
    changeDetail() {
      if (store.state.isAuthResolved == true) {
        this.navigation.navigate('DetailTab')
      } else {
        this.navigation.navigate('Signin')
      }  
    }
  }
}
</script>

<style>
.home-container {
  flex: 1;
}
</style>