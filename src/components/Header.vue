<template>
  <nb-header class="header">
    <nb-left class="header-left"/>
      <nb-body class="header-body">
        <nb-title class="header-title">{{ screen }}</nb-title>
      </nb-body>
      <nb-right class="header-right">
        <nb-button transparent class="header-icon">
          <nb-icon
            type="Fontisto"
            name="map-marker-alt"
            class="map-icon"
            :on-press="pushMarker"  
          />
        </nb-button>
        <nb-button transparent
          class="header-icon"
          :on-press="displayActionSheet"
        >
          <nb-icon type="Entypo" name="user" class="user-icon"/>
        </nb-button>
      </nb-right>
    </nb-header>
</template>

<script>
import { ActionSheet } from 'native-base'
import store from '../store'

export default {
  props: {
    screen: {
      type: String,
    },
    navigation: {
      type: Object,
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
              this.navigation.navigate('Home')
            })
          break
        default:
          return null
      }
    },
    pushMarker () {
     store.dispatch("shop/getShops")
    },
  }
}
</script>

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