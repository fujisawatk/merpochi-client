<template>
  <nb-container class="signin-container">
    <navigation-events :on-did-focus="checkForMessage" />
    <header
      auth
      :screen="title"
      :navigation="navigation"
    />

    <nb-form class="form">
      <nb-item fixedLabel class="form-input">
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

      <nb-item fixedLabel class="form-input">
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
      <nb-button rounded danger
        class="send-btn"
        :on-press="login"
      >
        <nb-text>ログイン</nb-text>
      </nb-button>

      <nb-button rounded dark
        class="send-btn"
        :on-press="pressedTestLoginBtn"
      >
        <nb-text>テストログイン</nb-text>
      </nb-button>

      <nb-button transparent
        class="signup-btn"
        :on-press="pressedRegisterLink"
      >
        <nb-text>登録がまだの方はこちら</nb-text>
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
      title: "ログイン",
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
    pressedRegisterLink() {
      this.navigation.navigate("Signup")
    },
    login() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        store.dispatch("auth/loginOne", this.form)
        .then(user => {
          store.dispatch("footer/activeHomeTab")
          this.navigation.navigate('Home', { message: 'login' })
        })
        .catch(() => {
          console.log("ログインに失敗しました")
        })
      }
    },
    pressedTestLoginBtn() {
      const test = {
        email: "miku@email.com",
        password: "mikumiku"
      }
      store.dispatch("auth/loginOne", test)
      .then(user => {
        store.dispatch("footer/activeHomeTab")
        this.navigation.navigate('Home', { message: 'login' })
      })
      .catch(() => {})
    },
    checkForMessage() {
      const message = this.navigation.getParam('message')
      if ( message ) {
        Toast.show({
          text: message,
          buttonText: 'Ok',
          type: 'success',
          position: 'bottom',
          duration: 5000
        })
      }
    }
  },
}
</script>

<style>
.signin-container {
  flex: 1;
  width: 100%;
}
.form {
  align-items: center;
  max-height: 450px;
  margin-top: 50;
}
.form-input {
  max-width: 350px;
  margin-bottom: 10;
}
.form-btn {
  align-items: center;
  flex: 1;
}
.send-btn {
  margin-bottom: 10;
  max-width: 350px;
  width: 100%;
  justify-content: center;
}
.signup-btn {
  margin-bottom: 10;
  max-width: 350px;
  width: 100%;
  justify-content: flex-end;
}
</style>
