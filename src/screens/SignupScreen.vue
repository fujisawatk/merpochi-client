<template>
  <nb-container class="signup-container">
      <view class="logo">
        
        <image
          class="logo-image"
          :source="require('../../assets/icons/logo.png')"
        />
        <text class="logo-title">merpochi</text>
      </view>

      <nb-form class="form">
        <nb-item rounded class="form-input">
          <nb-icon active type="Entypo" name="user"/>
          <nb-input placeholder="Name"/>
        </nb-item>
        <nb-item rounded class="form-input">
          <nb-icon active type="Entypo" name="mail"/>
          <nb-input placeholder="E-mail"/>
        </nb-item>
        <nb-item rounded class="form-input">
          <nb-icon active type="Entypo" name="key"/>
          <nb-input placeholder="Password"/>
        </nb-item>
        <nb-item rounded class="form-input">
          <nb-icon active type="Entypo" name="key"/>
          <nb-input placeholder="Repeat the password"/>
        </nb-item>

        <nb-button rounded dark class="form-btn">
          <nb-text>Create account</nb-text>
        </nb-button>

        <nb-button rounded dark
          class="form-btn"
          :on-press="changeHome"
        >
          <nb-text>Cancel</nb-text>
        </nb-button>
        
      </nb-form>

      <view class="form-bottom" />

  </nb-container>
</template>

<script>
export default {
  props: {
    navigation: {
      type: Object,
    }
  },
  methods: {
    changeHome() {
      this.navigation.navigate("Home")
    }
  }
}
</script>

<style>
.signup-container {
  flex: 1;
  background-color: #FFCC33;
}
.logo {
  flex: 2;
  align-items: center;
  justify-content: center;
}
.logo-image {
  width: 120;
  height: 120;
}
.logo-title {
  font-size: 30;
  font-family: DancingScript-Bold;
}
.form {
  flex: 3;
  justify-content: center;
  align-items: center;
}
.form-input {
  flex: 1;
  background-color: beige;
  width: 90%;
  max-width: 350px;
  margin-bottom: 10;
}
.form-btn {
  flex: 1;
  width: 90%;
  max-width: 350px;
  margin-bottom: 10;
}
.form-bottom {
  flex: 2;
}
</style>