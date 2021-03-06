<template>
    <div class="header">
        <div class="content-wrapper">
          <div class="avatar">
            <img :src="seller.avatar" width="64" height="64" alt="">
          </div>
          <div class="content">
            <div class="title">
              <span class="brand"></span>
              <span class="name">{{seller.name}}</span>
            </div>
            <div class="description">
              <span>{{seller.description}}/{{seller.deliveryTime}}分钟送达</span>
            </div>
            <div v-if="seller.supports" class="support">
              <span class="icon" :class="classMap[seller.supports[0].type]"></span>
              <span class="text">{{seller.supports[0].description}}</span>
            </div>
          </div>
          <div v-if="seller.supports" class="supportCount" @click="showDetail">
            <span class="count">{{seller.supports.length}}个</span>
            <i class="icon-keyboard_arrow_right"></i>
          </div>
        </div>
        <div class="bulletin-wrapper" @click="showDetail">
          <span class="bulletin-title"></span><span class="bulletin-text">{{seller.bulletin}}</span>
          <i class="icon-keyboard_arrow_right"></i>
        </div>
        <div class="background">
          <img :src="seller.avatar" alt="" width="100%" height="100%">
        </div>
        <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
          <div class="detail" v-show="detailShow">
            <div class="detail-wrapper clearfix">
              <div class="detail-main">
                <h1 class="name">{{seller.name}}</h1>
                <div class="star-wrapper">
                  <star-view :size="48" :score="seller.score"></star-view>
                </div>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">优惠信息</div>
                  <div class="line"></div>
                </div>
                <ul v-if="seller.supports" class="supports">
                  <li class="support-item" v-for="(item,index) in seller.supports" :key="index">
                    <span class="icon" :class="classMap[seller.supports[index].type]"></span>
                    <span class="text">{{seller.supports[index].description}}</span>
                  </li>
                </ul>
                <div class="title">
                  <div class="line"></div>
                  <div class="text">商家公告</div>
                  <div class="line"></div>
                </div>
                <div class="bulletin">
                  <p class="content">{{seller.bulletin}}</p>
                </div>
              </div>
            </div>
            <div class="detail-close" @click="hideDetail">
              <i class="icon-close"></i>
            </div>
          </div>
        </transition>
    </div>
</template>

<script>
import StarView from '../components/Star'
export default {
  props: ['seller'],
  data () {
    return {
      detailShow: false
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
  },
  components: {
    StarView
  },
  methods: {
    // 显示详情
    showDetail () {
      this.detailShow = true
    },
    // 隐藏详情
    hideDetail () {
      this.detailShow = false
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/icon.css';
@import '../assets/css/mixin.scss';
@import '../assets/css/base.scss';
.header{
  position: relative;
  color:#fff;
  background: rgba(7, 17, 27, 0.5);
  // 商家信息
  .content-wrapper {
    position: relative;
    padding: 24px 12px 18px 24px;
    font-size: 0;
    .avatar {
      display: inline-block;
      vertical-align: top;
      img {
        border-radius: 2px;
      }
    }
    .content {
      display: inline-block;
      margin-left: 16px;
      .title {
        margin: 2px 0 8px 0;
        .brand {
          display: inline-block;
          vertical-align: top;
          width: 30px;
          height: 18px;
          @include bg-image('../assets/images/brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
        }
        .name {
          margin-left: 6px;
          font-size: 16px;
          line-height: 18px;
          font-weight: bold;
        }
      }
      .description {
        margin-bottom: 10px;
        font-size: 12px;
        line-height: 12px;
      }
      .support {
        .icon {
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease {
            @include bg-image('../assets/images/decrease_1');
          }
          &.discount {
            @include bg-image('../assets/images/discount_1');
          }
          &.guarantee {
            @include bg-image('../assets/images/guarantee_1');
          }
          &.invoice {
            @include bg-image('../assets/images/invoice_1');
          }
          &.special {
            @include bg-image('../assets/images/special_1');
          }
        }
        .text {
          line-height: 12px;
          font-size: 10px;
        }
      }
    }
    .supportCount {
      position: absolute;
      right: 12px;
      bottom: 14px;
      padding: 7px 8px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.2);
      text-align: center;
      .count {
        font-size: 10px;
      }
      .icon-keyboard_arrow_right {
        margin-left: 2px;
        font-size: 10px;
      }
    }
  }
  // 公告
  .bulletin-wrapper {
    position: relative;
    padding: 0 22px 0 12px;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    background: rgba(7, 17, 27, 0.2);
    white-space: nowrap;
    text-overflow: ellipsis;
    .bulletin-title {
      display: inline-block;
      vertical-align: top;
      width: 22px;
      height: 12px;
      @include bg-image('../assets/images/bulletin');
      margin-top: 8px;
      background-size: 22px 12px;
      background-repeat: no-repeat;
    }
    .bulletin-text {
      vertical-align: top;
      margin: 0 4px;
      font-size: 10px;
    }
    .icon-keyboard_arrow_right {
      position: absolute;
      font-size: 10px;
      right: 12px;
      top: 8px;
    }
  }
  // 背景图片
  .background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  // 商家详情
  .detail {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;
    width: 100%;
    height: 100%;
    overflow: auto;
    background: rgba(7, 17, 27, 0.8);
    .detail-wrapper {
      width: 100%;
      min-height: 100%;
      .detail-main {
        margin-top: 64px;
        padding-bottom: 64px;
        .name {
          font-size: 16px;
          line-height: 16px;
          text-align: center;
          font-weight: 700;
        }
        .star-wrapper {
          margin-top: 18px;
          padding: 2px 0;
          text-align: center;
        }
        .title {
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line {
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.2);
          }
          .text {
            padding: 0 12px;
            font-weight: 700;
            font-size: 14px;
          }
        }
        .supports {
          width: 80%;
          margin: 0 auto;
          .support-item {
            padding: 0 12px;
            margin-bottom: 12px;
            &:last-child {
              margin-bottom: 0;
            }
            .icon {
              display: inline-block;
              width: 16px;
              height: 16px;
              vertical-align: top;
              margin-right: 6px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              &.decrease {
                @include bg-image('../assets/images/decrease_2');
              }
              &.discount {
                @include bg-image('../assets/images/discount_2');
              }
              &.guarantee {
                @include bg-image('../assets/images/guarantee_2');
              }
              &.invoice {
                @include bg-image('../assets/images/invoice_2');
              }
              &.special {
                @include bg-image('../assets/images/special_2');
              }
            }
            .text {
              line-height: 16px;
              font-size: 12px;
            }
          }
        }
        .bulletin {
          width: 80%;
          margin: 0 auto;
          .content {
            font-size: 12px;
            font-weight: 200;
            line-height: 24px;
            color: #fff;
          }
        }
      }
    }
    .detail-close {
      position: relative;
      margin: -64px auto 0 auto;
      width: 32px;
      height: 32px;
      clear: both;
      font-size: 32px;
    }
  }
}
</style>
