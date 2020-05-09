<template>
  <nb-header class="header">
    <nb-left class="header-left"/>
      <nb-body class="header-body">
        <nb-title class="header-title">最新のお気に入り</nb-title>
      </nb-body>
      <nb-right class="header-right">
        <nb-button transparent class="header-icon">
          <nb-icon type="Fontisto" name="map-marker-alt" class="map-icon"/>
        </nb-button>
        <nb-button transparent class="header-icon">
          <nb-icon type="Entypo" name="user" class="user-icon"/>
        </nb-button>
      </nb-right>
    </nb-header>
</template>

<style>
.header {
  background-color: #FFCC33;
}
.header-left,
.header-right {
  flex: 5;
}
.header-body {
  flex: 9;
  justify-content: center;
  align-items: center;
}
.header-title {
  color: #111;
  font-weight: bold;
}
.header-icon {
  flex: 1;
}
.map-icon,
.user-icon {
  flex: 1;
  color: #111;
  font-size: 20;
}
</style>