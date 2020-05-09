<template>
  <nb-content>
    <nb-list-item thumbnail>
      <nb-left>
        <nb-thumbnail square :source="require('../../assets/icons/logo.png')" />
      </nb-left>
      <nb-body>
        <nb-text>鳥貴族</nb-Text>
        <nb-text note :numberOfLines="1">焼き鳥屋</nb-Text>
      </nb-body>
      <nb-right>
          <nb-icon type="AntDesign" name="like1" class="like-icon"/>
          <nb-text>+1</nb-text>
      </nb-right>
    </nb-list-item>
  </nb-content>
</template>

<style>
.like-icon {
  color: #FF773E;
  font-size: 35;
}
</style>