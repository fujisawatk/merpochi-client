<template>
  <nb-container class="signup-container">
    <header
      auth
      :screen="title"
      :navigation="navigation"
    />
    <scroll-view>
      <nb-form class="form">
        <view class="form-image-input">
          <view class="input-image">
            <image
              class="image-cover"
              :source="{uri: image}"
            />
            <nb-icon active class="image-icon" type="MaterialIcons" name="add-a-photo" :on-press="pickImage"/>
          </view>
          <text class="image-text">プロフィール写真設定</text>
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
          :on-press="register"
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
import * as ImagePicker from 'expo-image-picker';
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
    image() {
      return store.state.image.selectedImage.uri
    }
  },
  methods: {
    changeHome() {
      this.navigation.navigate("Home", { message: null })
    },
    register() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        store.dispatch("auth/register", this.form)
        .then(() => {
          store.dispatch("image/saveImage")
          this.navigateToSignin()
        })
        .catch(() => {
          console.log("登録出来ませんでした")
      })
      }
    },
    navigateToSignin() {
      this.navigation.navigate('Signin', { message: 'ユーザー登録が完了しました。ログインできます。' })
    },
    async pickImage() {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      })
      store.dispatch("image/selectedImage", result)
    }
  },
}
</script>

<style>
.form {
  align-items: center;
}
.form-image-input {
  height: 200;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.input-image {
  width: 80;
  height: 80;
  position: relative;
  background-color: aliceblue;
}
.image-cover {
  width: 100%;
  height: 100%;
  position: absolute;
}
.image-icon {
  position: absolute;
  top: 20;
  left: 20;
  color: #dddddd;
  opacity: 0.3;
  font-size: 40;
}
.image-text {
  margin-top: 20;
  text-align: center;
  width: 100%;
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