<template>
  <div class="shopcart">
      <div class="content" @click="toggleList">
        <div class="content-left">
          <div class="logo-wrapper">
            <div class="logo" :class="{'hightlight':totalCount>0}">
              <i class="icon-shopping_cart" :class="{'hightlight':totalCount>0}"></i>
            </div>
            <div class="num" v-show="totalCount>0">{{totalCount}}</div>
          </div>
          <div class="price" :class="{'hightlight':totalPrice>0}">￥{{totalPrice}}</div>
          <div class="desc">另需配送费￥{{deliveryPrice}}元</div>
        </div>
        <div class="content-right">
          <div class="pay" :class="payClass">
            {{payDescription}}
          </div>
        </div>
      </div>
      <tansition name="fade" enter-active-class="animated bounceInUp" leave-active-class="animated bounceOutDown">
        <div class="shopcart-list" v-show="showList">
          <div class="list-header">
            <h1 class="title">购物车</h1>
            <span class="empty">清空</span>
          </div>
          <div class="list-content">
            <ul>
              <li class="food" v-for="(food,index) in this.selectFood" :key="index">
                <span class="name">{{food.name}}</span>
                <div class="price">
                  <span>￥{{food.price*food.count}}</span>
                </div>
                <div class="cartcontrol-wrapper">
                  <cart-control :food="food"></cart-control>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </tansition>
      <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
        <div class="list-mask" v-show="showList"></div>
      </transition>
  </div>
</template>

<script>
import CartControl from './Cartcontrol.vue'
export default {
  props: {
    selectFood: {
      type: Array,
      default () {
        return [
          {
            price: 10,
            count: 2
          }
        ]
      }
    },
    deliveryPrice: {
      type: Number,
      default: 0
    },
    minPrice: {
      type: Number,
      default: 0
    }
  },
  components: {
    CartControl
  },
  data () {
    return {
      fold: true
    }
  },
  computed: {
    totalPrice () {
      let total = 0
      this.selectFood.forEach((item) => {
        console.log(item)
        total += item.price * item.count
      })
      return total
    },
    totalCount () {
      let count = 0
      this.selectFood.forEach((item) => {
        count += item.count
      })
      return count
    },
    payDescription () {
      if (this.totalPrice === 0) {
        return `￥${this.minPrice}元起送`
      } else if (this.totalPrice < this.minPrice) {
        let diff = this.minPrice - this.totalPrice
        return `还差￥${diff}元配送`
      } else {
        return '去结算'
      }
    },
    payClass () {
      if (this.totalPrice < this.minPrice) {
        return 'notEnough'
      } else {
        return 'enough'
      }
    },
    showList: {
      get: function () {
        return !this.fold
      },
      set: function () {
        if (!this.totalCount) {
          this.fold = false
          return false
        }
        let show = !this.fold
        return show
      }
    }
  },
  methods: {
    toggleList () {
      if (!this.totalCount) {
        this.fold = !this.fold
      }
    }
  }
}
</script>
<style lang="scss">
@import '../assets/css/mixin.scss';
.shopcart {
  position: fixed;
  left: 0;
  bottom:0;
  z-index: 99;
  width: 100%;
  height: 48px;
  .content {
    display: flex;
    background: #141d27;
    font-size: 0;
    color: rgba(255, 255, 255, 0.4);
    .content-left {
      flex: 1;
      .logo-wrapper {
        display: inline-block;
        vertical-align: top;
        position: relative;
        top: -10px;
        margin: 0 12px;
        padding: 6px;
        width: 56px;
        height: 56px;
        box-sizing: border-box;
        border-radius: 50%;
        background: #141d27;
        z-index: 99;
        .logo {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          text-align: center;
          background: #2b343c;
          &.hightlight {
            background: rgb(0, 160, 220);
          }
          .icon-shopping_cart {
            line-height: 44px;
            font-size: 24px;
            color: #80858a;
            &.hightlight {
              color:#fff;
            }
          }
        }
        .num {
          position: absolute;
          top: 0;
          right: 0;
          width: 24px;
          height: 16px;
          line-height: 16px;
          text-align: center;
          border-radius: 16px;
          font-size: 9px;
          font-weight: 700;
          color: #fff;
          background: rgb(240, 20, 20);
          box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        }
      }
      .price {
        display: inline-block;
        vertical-align: top;
        margin-top: 12px;
        line-height: 24px;
        padding-right: 12px;
        box-sizing: border-box;
        border-right: 1px solid rgba(255, 255, 255, 0.1);
        font-size: 16px;
        font-weight: 700;
        &.hightlight {
          color: #fff;
        }
      }
      .desc {
        display: inline-block;
        vertical-align: top;
        margin: 12px 0 0 12px;
        line-height: 24px;
        font-size: 10px;
      }
    }
    .content-right {
      flex: 0 0 105px;
      width: 105px;
      z-index: 99;
      .pay {
        height: 48px;
        line-height: 48px;
        text-align: center;
        font-size: 12px;
        font-weight: 700;
        &.notEnough {
          background: #2b333b;
        }
        &.enough {
          background: #00b43c;
          color: #fff;
        }
      }
    }
  }
  .shopcart-list {
    position: absolute;
    bottom: 48px;
    left: 0;
    width: 100%;
    z-index: 40;
    background: #fff;
    .list-header {
      height: 40px;
      line-height: 40px;
      padding: 0 18px;
      background: #f3f5f7;
      border-bottom: 1px solid rgba(7, 17, 27, 0.1);
      .title {
        float: left;
        font-size: 14px;
        color: rgb(7, 17, 27);
      }
      .empty {
        float: right;
        font-size: 12px;
        color: rgb(0, 160, 220);
      }
    }
    .list-content {
      padding: 0 18px;
      max-height: 217px;
      overflow: auto;
      background: #fff;
      .food {
        position: relative;
        padding: 12px 0;
        box-sizing: border-box;
        @include border-1px(rgba(7, 17, 27, 0.1));
        .name {
          line-height: 24px;
            font-size: 14px;
            color: rgb(7, 17, 27);
        }
        .price {
          position: absolute;
            right: 90px;
            bottom: 12px;
            line-height: 24px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(240, 20, 20);
        }
        .cartcontrol-wrapper {
            position: absolute;
            right: 0;
            bottom: 6px;
        }
      }
    }
  }
  .list-mask {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
    background: rgba(7, 17, 27, 0.6);
  }
}
</style>
