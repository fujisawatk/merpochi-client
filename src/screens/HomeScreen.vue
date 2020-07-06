<template>
  <nb-container class="home-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-content>
      <view
        v-for="item in items"
        :key="item.code"
      >
        <item
          :item="item"
          :sel-code="item.code"
          :change-detail="changeDetail"
        />
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
    }
  },
  props: {
    navigation: {
      type: Object
    }
  },
  computed: {
    items() {
      return store.state.rests
    }
  },
  methods: {
    changeDetail(code) {
      if (store.state.isAuthResolved == true) {
        this.navigation.navigate('Detail', { code })
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