<template>
  <nb-list-item
    thumbnail
    class="list-item"
    :on-press="itemsPress"
  >

    <nb-left class="item-left">
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

    <nb-body class="item-body">
      <nb-text class="shop-category">
        {{ item.category }}
      </nb-text>
      <nb-text class="item-title">
        {{ item.name }}
        </nb-text>
    </nb-body>

    <nb-right class="item-right">
      <nb-button
        transparent
        class="list-icon"
      >
        <nb-icon
          type="AntDesign"
          name="like1"
          class="icon"
        />
        <nb-text class="icon-count">
          +{{ item.commentsCount }}
        </nb-text>
      </nb-button>
      <nb-button
        transparent
        class="list-icon"
      >
        <nb-icon
          name="chatbubbles"
          class="icon"
        />
        <nb-text class="icon-count">
          +{{ item.commentsCount }}
        </nb-text>
      </nb-button>
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
.list-item {
  flex: 1;
}
.item-left {
  flex: 1;
}
.item-body {
  flex: 3;
}
.shop-category {
  font-size: 12px;
  color: #888;
}
.item-right {
  flex: 2;
  flex-direction: row;
}
.list-icon {
  position:relative;
}
.icon {
  color: #FF773E;
  font-size: 20;
}
.icon-count {
  position: absolute;
  top: 15;
  left: 25;
  color: #444;
}
</style>