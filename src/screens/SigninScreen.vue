<template>
  <nb-container class="signin-container">
    <view class="logo">
      <image
        class="logo-image"
        :source="require('../../assets/icons/logo.png')"
      />
      <text class="logo-title">merpochi</text>
    </view>

    <nb-form class="form">
      <nb-item rounded class="form-input">
        <nb-icon active type="Entypo" name="mail" />
        <nb-input
          placeholder="メールアドレス"
          v-model="form.email"
          auto-capitalize="none"
          :on-blur="() => $v.form.email.$touch()"
        />
      </nb-item>
      <input-with-error
        :error="$v.form.email.$dirty && (!$v.form.email.required || !$v.form.email.isValidEmail)"
        message="形式が正しくありません"
      />

      <nb-item rounded class="form-input">
        <nb-icon active type="Entypo" name="key" />
        <nb-input
          placeholder="パスワード"
          v-model="form.password"
          auto-capitalize="none"
          secure-text-entry
          :on-blur="() => $v.form.password.$touch()"
        />
      </nb-item>
      <input-with-error
        :error="$v.form.password.$dirty && (!$v.form.password.required || !$v.form.password.minLength || !$v.form.password.maxLength)"
        message="パスワード6〜20文字で入力してください"
      />
    </nb-form>

    <view class="form-btn">
      <nb-button rounded dark
        class="send-btn"
        :on-press="login"
      >
        <nb-text>ログイン</nb-text>
      </nb-button>

      <nb-button rounded dark
        class="send-btn"
        :on-press="changeSignup"
      >
        <nb-text>アカウント登録</nb-text>
      </nb-button>
    </view>

  </nb-container>
</template>

<script>
import axios from 'axios'
import store from '../store'
import { Toast } from 'native-base'
import {
  required,
  email,
  minLength,
  maxLength
} from 'vuelidate/lib/validators'


export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations: {
    form: {
      email: {
        required,
        isValidEmail: email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      }
    }
  },
  props: {
    navigation: {
      type: Object,
    }
  },
  methods: {
    changeSignup() {
      this.navigation.navigate("Signup")
    },
    login() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        store.dispatch("auth/loginOne", this.form)
        .then(user => {
          this.navigation.navigate('Home', { message: 'ログインしました' })
        })
        .catch(() => {
          console.log("ログインに失敗しました")
        })
      }
    }
  },
  created() {
    const message = this.navigation.getParam('message')
      if (message) {
        Toast.show({
          text: message,
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
      }
  }
}
</script>

<style>
.signin-container {
  flex: 1;
  background-color: #ffcc33;
  width: 100%;
}
.logo {
  align-items: center;
  justify-content: center;
  position: relative;
  height: 30%;
}
.logo-image {
  width: 120;
  height: 120;
  position: absolute;
  top: 30;
}
.logo-title {
  font-size: 30;
  font-family: DancingScript-Bold;
  position: absolute;
  top: 130;
}
.form {
  align-items: center;
  max-height: 450px;
}
.form-input {
  background-color: beige;
  max-width: 350px;
  margin-bottom: 10;
}
.form-btn {
  max-height: 70%;
  align-items: center;
  flex: 1;
}
.send-btn {
  margin-bottom: 10;
  max-width: 350px;
  flex: 1;
  justify-content: center;
  /* iOS用 */
  width: 100%;
  max-height: 50px;
}
</style>
