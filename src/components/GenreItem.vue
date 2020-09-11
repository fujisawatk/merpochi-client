<template>
  <nb-list-item :on-press="pressedGenreList">
        <nb-body>
          <nb-text>{{ genre }}</nb-text>
        </nb-body>
      </nb-list-item>
</template>

<script>
export default {
  props: {
    genre: String,
    navigation: {
      type: Object
    },
    selectedGenreList: Function,
  },
  methods: {
    pressedGenreList() {
      this.selectedGenreList(this.genre)
    }
  }
}
</script>

<style>
</style>