<template>
  <nb-container class="signup-container">
    <header
      auth
      :screen="title"
      :navigation="navigation"
    />
    <scroll-view>
      <nb-form class="form">
        <view class="images-section">
          <view class="images-view">
            <scroll-view :horizontal="true">
              <view class="input-images">
                <nb-list-item	
                  avatar
                  v-for="(img, i) in images"
                  :key="i"
                >
                  <image
                    class="images"
                    :source="{uri: img.uri}"
                  />
                </nb-list-item>
              </view>
            </scroll-view>
          </view>
          <view class="images-select">
            <nb-button transparent :on-press="pickImages">
              <nb-text class="select-btn">画像選択</nb-text> 
            </nb-button>
          </view>
        </view>
        <nb-item fixedLabel class="form-input">
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
        
        <nb-item fixedLabel class="form-input">
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

        <nb-item fixedLabel class="form-input">
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

        <nb-item fixedLabel class="form-input">
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
        <nb-button rounded
          class="send-btn" danger
        >
          <nb-text class="btn-text">完了</nb-text>
        </nb-button>

      </view>
    </scroll-view>

  </nb-container>
</template>

<script>
import { ScrollView } from 'react-native'
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
      title: "アカウント登録",
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
  computed: {
    images() {
      return store.state.image.shopImages
    }
  },
  created() {
  },
  methods: {
    pickImages() {
      this.navigation.navigate('ImageBrowser')
    }
  },
}
</script>

<style>
.form {
  width: 100%;
}
.images-section {
  height: 150;
  width: 100%;
}
.images-view {
  height: 100;
  width: 100%;
  background-color: azure;
}
.input-images {
 flex-direction: row;
}
.images {
  height: 100;
  width: 100;
}
.images-select {
  height: 50;
  width: 100%;
  align-items: center;
}
.select-btn {
  text-align: center;
  width: 100%;
  font-size: 20;
}
.form-input {
  max-width: 350px;
}
.form-btn {
  height: 300;
  align-items: center;
}
.send-btn {
  max-width: 350px;
  justify-content: center;
  width: 100%;
}
</style>