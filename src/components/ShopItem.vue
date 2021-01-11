<template>
  <nb-container class="item-container">
    <nb-content padder>
      <nb-card class="card" thumbnail :on-press="itemsPress">
        <nb-card-item bordered>
          <nb-left>
            <nb-body>
              <nb-text note>{{ shop.category }}</nb-text>
              <nb-text>{{ shop.name }}</nb-text> 
            </nb-body>
          </nb-left>
        </nb-card-item>
        <nb-card-item>
          <nb-body class="card-body">
            <image 
              v-if="shop.img != ''"
              :source="{uri: shop.img}"
              :style="stylesObj.cardItemImage"
            />
            <image 
              v-else
              :source="require('../../assets/icons/logo.png')"
            />
            <nb-item class="body-low">
              <nb-left class="body-low-left">
                <view class="budget-item">
                  <nb-icon class="budget-icon" type="FontAwesome5" name="money-bill-alt"/>
                  <nb-text v-if="shop.budget != ''" class="budget-text">{{ shop.budget }}円</nb-text>
                  <nb-text v-else class="budget-text"> - 円</nb-text>
                </view>
                <view class="access-item">
                  <nb-icon class="access-icon" type="FontAwesome5" name="train"/>
                  <nb-text class="access-text">
                    {{ shop.access.line }}{{ shop.access.station }}{{ shop.access.station_exit }}{{ shop.access.walk }}分
                    </nb-text>
                </view>
              </nb-left>
              <nb-right class="body-low-right"/>
            </nb-item>
          </nb-body>
        </nb-card-item>
        <nb-card-item class="card-bottom">
          <nb-left class="bottom-left">
            <nb-text class="bottom-text">{{ shop.ratingCount }} 人がリピート希望！！</nb-text>
          </nb-left>
          <nb-right v-if="isBookmark" class="bottom-right">
            <nb-icon class="bookmark-icon" type="FontAwesome" name="bookmark" :on-press="pressedCancelBookmarkBtn"/>
            <nb-text class="bookmark-count">{{ shop.bookmarksCount }}</nb-text>
          </nb-right>
          <nb-right v-else class="bottom-right">
            <nb-icon class="bookmark-icon" type="FontAwesome" name="bookmark-o" :on-press="pressedBookmarkBtn"/>
            <nb-text class="bookmark-count">{{ shop.bookmarksCount }}</nb-text>
          </nb-right>
        </nb-card-item>
      </nb-card>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions } from "react-native"
import store from '../store'
const deviceWidth = Dimensions.get("window").width
export default {
  data() {
    return {
      stylesObj: {
        cardItemImage: {
          width: deviceWidth / 1.18,
          height: 300
        }
      },
      shop: {},
    }
  },
  created() {
    this.shop = this.item
  },
  computed: {
    isBookmark() {
      return this.shop.bookmarkUser
    }
  },
  props: {
    item: Object,
    navigation: {
      type: Object
    },
    changeDetail: Function,
    selCode: String,
    mypage: {
      type: Boolean
    },
  },
  methods: {
    itemsPress() {
      this.changeDetail(this.selCode)
    },
    pressedBookmarkBtn() {
      const data = {
        shopData: {
          code: this.shop.code,
          name: this.shop.name,
          category: this.shop.category,
          opentime: this.opentime,
          budget:   Number(this.shop.budget),
          img:     this.shop.img,
          latitude: Number(this.shop.latitude),
          longitude: Number(this.shop.longitude),
          url: this.shop.url
        },
        shop_id: this.shop.shopId,
      }
      store.dispatch("bookmark/saveBookmark", data)
      .then(res => {
        // 店舗が新規登録の場合、店舗IDを取得
        if (this.shop.shopId == 0) {
          this.shop.shopId = store.state.shop.shopId
        }
        this.shop.bookmarksCount += 1
        this.shop.bookmarkUser = true
        console.log("ブックマーク登録しました")
      })
      .catch(() => {
        console.log("保存に失敗しました")
      })
    },
    pressedCancelBookmarkBtn() {
      store.dispatch("bookmark/delBookmark", this.shop.shopId)
      .then(res => {
          this.shop.bookmarksCount -= 1
          this.shop.bookmarkUser = false
          console.log("ブックマーク解除しました")
        })
        .catch(() => {
          console.log("解除に失敗しました")
        })
    }
  }
}
</script>

<style>
.item-container {
  flex: 1;
  background-color: #eeeeee;
  height: 100%;
  width: 100%;
}
.card {
  flex: 1;
}
.card-item-image {
  width: 100%;
  height: 200;
}
.card-body {
  align-items: center;
}
.body-low {
  flex: 1;
  height: 80;
}
.body-low-left {
  flex: 5;
  flex-direction: column;
  align-items: flex-start;
  

}
.body-low-right {
  flex: 1;
}
.budget-item,
.access-item {
  flex-direction: row;
  margin-bottom: 5;
}
.budget-icon {
  font-size: 20;
}
.access-icon {
  font-size: 20;
  margin-left: 3;
}
.budget-text,
.access-text {
  margin-left: 20;
  color: #444;
}
.card-bottom {
  flex: 1;
  height: 70;
}
.bottom-left {
  flex: 5;
}
.bottom-right {
  flex: 1;
  align-items: center;
}
.bottom-text,
.bookmark-count {
  font-weight: bold;
}
.bookmark-icon {
  font-size: 35;
  color: black;
}
</style>