<template>
  <view class="err-area">
    <nb-text
      v-if="error"
      class="error"
    >
      {{ message }}
    </nb-text>
  </view>
</template>

<script>
export default {
  props: {
    error: {
      type: Boolean,
      required: true
    },
    message: {
      type: String,
      default: 'エラー'
    }
  }
}
</script>

<style>
.err-area {
  height: 25px;
}
.error {
  color: red;
  font-size: 14;
}
</style>