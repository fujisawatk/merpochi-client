<template>
  <nb-container class="search-container">

    <header
      :screen="title"
      :navigation="navigation"
    />

    <nb-form class="search-form">
      <nb-item
        rounded
        class="search-input"
      >
        <nb-input
          placeholder="キーワード"
        />
        <nb-icon
          active
          name='search'
        />
      </nb-item> 
    </nb-form>

    <view
      v-for="item in items"
      :key="item.id"
    >
      <item :item="item"/>
    </view>

  </nb-container>
</template>

<script>
import store from '../store'

export default {
  data: function() {
    return {
      title: "店舗検索",
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
}
</script>

<style>
.search-container {
  flex: 1;
}
.search-form {
  padding: 10px 10px;
}
.search-input {
  padding-left: 10px;
  padding-right: 10px;
}
</style>