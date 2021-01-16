<template>
  <nb-list-item
    thumbnail
    class="list-item"
    :on-press="itemsPress"
  >

    <nb-left class="item-left">
      <nb-thumbnail
        square
        v-if="item.img != null"
        :source="{uri: item.img}"
      />
      <nb-thumbnail
        square
        v-else
        :source="{uri: 'https://i.gyazo.com/395c068648d593021b87d42be1be9250.png'}"
      />
    </nb-left>

    <nb-body class="item-body">
      <nb-text class="shop-category">
        {{ item.category }}
      </nb-text>
      <nb-text class="item-title">
        {{ item.name }}
        </nb-text>
    </nb-body>

    <nb-right class="item-right">
  </nb-list-item>
</template>

<script>
export default {
  props: {
    item: Object,
    navigation: {
      type: Object
    },
    changeDetail: Function,
    selCode: String,
    mypage: {
      type: Boolean
    },
  },
  methods: {
    itemsPress: function() {
      this.changeDetail(this.selCode)
    }
  }
}
</script>

<style>
.list-item {
  flex: 1;
}
.item-left {
  flex: 1;
}
.item-body {
  flex: 5;
}
.shop-category {
  font-size: 12px;
  color: #888;
}
</style>