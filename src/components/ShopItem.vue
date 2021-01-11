<template>
  <nb-container class="item-container">
    <nb-content padder>
      <nb-card class="card" thumbnail :on-press="itemsPress">
        <nb-card-item bordered>
          <nb-left>
            <nb-body>
              <nb-text note>{{ item.category }}</nb-text>
              <nb-text>{{ item.name }}</nb-text> 
            </nb-body>
          </nb-left>
        </nb-card-item>
        <nb-card-item>
          <nb-body class="card-body">
            <image 
              v-if="item.img != ''"
              :source="{uri: item.img}"
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
                  <nb-text v-if="item.budget != ''" class="budget-text">{{ item.budget }}円</nb-text>
                  <nb-text v-else class="budget-text"> - 円</nb-text>
                </view>
                <view class="access-item">
                  <nb-icon class="access-icon" type="FontAwesome5" name="train"/>
                  <nb-text class="access-text">
                    {{ item.access.line }}{{ item.access.station }}{{ item.access.station_exit }}{{ item.access.walk }}分
                    </nb-text>
                </view>
              </nb-left>
              <nb-right class="body-low-right"/>
            </nb-item>
          </nb-body>
        </nb-card-item>
        <nb-card-item class="card-bottom">
          <nb-left class="bottom-left">
            <nb-text class="bottom-text">{{ item.ratingCount }} 人がリピート希望！！</nb-text>
          </nb-left>
          <nb-right class="bottom-right">
            <nb-icon class="bookmark-icon" type="FontAwesome5" name="bookmark"/>
            <nb-text class="bookmark-count">{{ item.bookmarksCount }}</nb-text>
          </nb-right>
        </nb-card-item>
      </nb-card>
    </nb-content>
  </nb-container>
</template>

<script>
import { Dimensions } from "react-native"
const deviceWidth = Dimensions.get("window").width
export default {
  data() {
    return {
      stylesObj: {
        cardItemImage: {
          // resizeMode: "cover",
          width: deviceWidth / 1.18,
          height: 300
        }
      }
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
    itemsPress: function() {
      console.log("kiteru")
      this.changeDetail(this.selCode)
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
}
</style>