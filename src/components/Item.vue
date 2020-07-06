<template>
  <nb-list-item thumbnail :on-press="itemsPress">
    <nb-left>
      <nb-thumbnail
        square
        v-if="item.img != ''"
        :source="{uri: item.img}"
      />
      <nb-thumbnail
        square
        v-else
        :source="require('../../assets/icons/logo.png')"
      />
    </nb-left>
    <nb-body>
      <nb-text>{{ item.name }}</nb-Text>
      <nb-text>{{ item.category }}</nb-Text>
    </nb-body>
    <nb-right>
        <nb-icon type="AntDesign" name="like1" class="like-icon"/>
        <nb-text>+{{ item.like }}</nb-text>
    </nb-right>
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
    selCode: String
  },
  methods: {
    itemsPress: function() {
      this.changeDetail(this.selCode)
    }
  }
}
</script>

<style>
.like-icon {
  color: #FF773E;
  font-size: 35;
}
</style>