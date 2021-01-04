<template>
  <nb-header class="header">
    <nb-left class="header-left">
      <nb-icon
        type="Fontisto"
        name="map-marker-alt"
        :on-press="pushMarker"
        class="geolocation-icon"
        v-if="home"
      />

      <nb-button
        v-if="!root"
        :on-press="goBack"
        transparent
      >
        <nb-icon name="arrow-back" />
      </nb-button>
    </nb-left>
    <nb-body class="header-body">
      <nb-title class="header-title">{{ screen }}</nb-title>
    </nb-body>
    <nb-right class="header-right">
      
      <nb-button transparent
        :on-press="displayActionSheet"
      >
        <nb-icon type="Entypo" name="user" class="user-icon"/>
      </nb-button>
    </nb-right>
  </nb-header>
</template>

<script>
import { ActionSheet, Toast } from 'native-base'
import store from '../store'

export default {
  props: {
    screen: {
      type: String,
    },
    navigation: {
      type: Object,
    },
    root: {
      type: Boolean
    },
    home: {
      type: Boolean
    }
  },
  computed: {
    optionCancelIndex () {
      return this.btnOptions.length - 1
    },
    btnOptions () {
      if (store.state.auth.isAuthResolved == true) {
        return ['ログアウト', '閉じる']
      } else {
        return ['ログイン', 'アカウント登録', '閉じる']
      }
    }
  },
  methods: {
    displayActionSheet () {
      ActionSheet.show(
        {
          options: this.btnOptions,
          cancelButtonIndex: this.optionCancelIndex
        },
        this.handleOptionSelect
      )
    },
    handleOptionSelect (buttonIndex) {
      const option = this.btnOptions[buttonIndex]
      // 押されたボタンによって分岐
      switch (option) {
        case 'ログイン':
          this.navigation.navigate('Signin')
          break
        case 'アカウント登録':
          this.navigation.navigate('Signup')
          break
        case 'ログアウト':
          store.dispatch('auth/logout')
            .then(() => {
              Toast.show({
                text: 'ログアウトしました。',
                buttonText: 'Ok',
                type: 'success',
                position: 'bottom',
                duration: 5000
              })
            })
          break
        default:
          return null
      }
    },
    pushMarker () {
     store.dispatch("shop/getShops")
    },
    goBack () {
      this.navigation.goBack()
    }
  }
}
</script>

<style>
.header {
  background-color: #FFCC33;
}
.header-left {
  flex: 1;
  margin-left: 10;
}
.geolocation-icon {
  font-size: 20;
}
.geolocation-title {
  font-size: 13;
}
.header-body {
  flex: 1;
  justify-content: center;
  align-items: center;
}
.header-right {
  flex: 1;
  margin-right: 10;
}
.header-title {
  color: #111;
  font-weight: bold;
}
.user-icon {
  color: #111;
  font-size: 20;
}
</style>