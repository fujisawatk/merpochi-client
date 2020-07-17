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
          <nb-input
            placeholder="ユーザー名"
            v-model="form.nickname"
            auto-capitalize="none"
            :on-blur="() => $v.form.nickname.$touch()"
          />
        </nb-item>
        <input-with-error
          :error="$v.form.nickname.$dirty && (!$v.form.nickname.required || !$v.form.nickname.minLength || !$v.form.nickname.maxLength)"
          message="ユーザー名は1〜20文字で入力してください"
        />
        
        <nb-item rounded class="form-input">
          <nb-icon active type="Entypo" name="mail"/>
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
          <nb-icon active type="Entypo" name="key"/>
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

        <nb-item rounded class="form-input">
          <nb-icon active type="Entypo" name="key"/>
          <nb-input
            placeholder="パスワード(確認)"
            v-model="form.passwordConfirmation"
            auto-capitalize="none"
            secure-text-entry
            :on-blur="() => $v.form.passwordConfirmation.$touch()"
          />
        </nb-item>
        <input-with-error
          :error="$v.form.passwordConfirmation.$dirty && (!$v.form.passwordConfirmation.required || !$v.form.passwordConfirmation.sameAsPassword)"
          message="パスワードが一致していません"
        />
      </nb-form>

      <view class="form-btn">
        <nb-button rounded dark
          class="send-btn"
          :on-press="register"
        >
          <nb-text class="btn-text">アカウント登録</nb-text>
        </nb-button>

        <nb-button rounded dark
          class="send-btn"
          :on-press="changeHome"
        >
          <nb-text>戻る</nb-text>
        </nb-button>
      </view>
        
      <!-- <view class="form-bottom" /> -->

  </nb-container>
</template>

<script>
import store from '../store';
import {
  required,
  email,
  minLength,
  sameAs,
  maxLength
} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      form: {
        nickname: '',
        email: '',
        password: '',
        passwordConfirmation: ''
      }
    }
  },
  validations: {
    form: {
      nickname: {
        required,
        minLength: minLength(1),
        maxLength: maxLength(20)
      },
      email: {
        required,
        isValidEmail: email
      },
      password: {
        required,
        minLength: minLength(6),
        maxLength: maxLength(20)
      },
      passwordConfirmation: {
        required,
        sameAsPassword: sameAs('password')
      }
    }
  },
  props: {
    navigation: {
      type: Object,
    }
  },
  methods: {
    changeHome() {
      this.navigation.navigate("Home")
    },
    register() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        store.dispatch("auth/register", this.form)
        .then(() => this.navigateToSignin())
        .catch(() => {
            console.log("登録出来ませんでした")
      })
      }
    },
    navigateToSignin() {
      this.navigation.navigate('Signin')
    }
  },
}
</script>

<style>
.signup-container {
  flex: 1;
  background-color: #FFCC33;
  width: 100%;
}
.logo {
  align-items: center;
  justify-content: center;
  position: relative;
  height: 25%;
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
  width: 100%;              /* iOS用 */
}
</style>