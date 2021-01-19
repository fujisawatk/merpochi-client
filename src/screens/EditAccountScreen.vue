<template>
  <nb-container>
    <header
      :screen="title"
      :navigation="navigation"
    />
    <scroll-view>
      <nb-form class="form">
        <view class="form-image-input">
          <view class="input-image">
            <image
              class="image-cover"
              :source="{uri: selectedImage}"
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

      </nb-form>

      <view class="form-btn">
        <nb-button rounded
          class="send-btn" danger
          :on-press="pressedUpdateBtn"
        >
          <nb-text class="btn-text">更新</nb-text>
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
  maxLength
} from 'vuelidate/lib/validators'

export default {
  data () {
    return {
      title: "アカウント編集",
      form: {
        nickname: '',
        email: '',
        image: ''
      },
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
      }
    }
  },
  props: {
    navigation: {
      type: Object,
    }
  },
  computed: {
    selectedImage() {
      return this.form.image
    }
  },
  created () {
    this.form.nickname = store.state.auth.user.nickname
    this.form.email = store.state.auth.user.email
    this.form.image = store.state.image.userImage
  },
  methods: {
    pressedUpdateBtn() {
      this.$v.form.$touch()
      if (!this.$v.form.$invalid) {
        const data = {
          userData: {
            nickname: this.form.nickname,
            email: this.form.email
          },
          image: this.form.image
        }
        store.dispatch("auth/updateUser", data)
        .then(() => {
          this.navigation.navigate("MyAccount", { message: 'success' })
        })
        .catch(() => {
          this.navigation.navigate("MyAccount", { message: 'failure' })
      })
      }
    },
    async pickImage() {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      })
      this.form.image = result.uri
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