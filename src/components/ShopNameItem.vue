<template>
  <nb-list-item :on-press="pressedShop">
    <nb-text>{{ shop.name }}</nb-text>
  </nb-list-item>
</template>

<script>
export default {
  props: {
    shop: Object,
    navigation: {
      type: Object
    },
    selectedShop: Function,
  },
  methods: {
    pressedShop() {
      this.selectedShop(this.shop)
    }
  }
}
</script>

<style>
.list-sub-text {
  font-size: 12;
}
</style>