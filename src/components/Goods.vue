<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': index === currentIndex}" :key="index" @click="select(index)"><span class="text border-1px">
            <span v-show="item.type>0" class="icon" :class="classMap[item.type]"></span>{{item.name}}
          </span></li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodWrapper">
      <ul>
        <li v-for="(item, index) in goods" :key="index" class="foodList">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="(list, index) in item.foods" :key="index" class="food-item">
              <div class="icon">
                <img width="57" height="57" :src="list.icon">
              </div>
              <div class="content">
                <h2 class="name">{{list.name}}</h2>
                <p class="desc">{{list.description}}</p>
                <div class="extra">
                  <span class="count">月售{{list.sellCount}}份</span><span>好评率{{list.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{list.price}}</span><span class="old"
                                                                v-show="list.oldPrice">￥{{list.oldPrice}}</span>
                </div>
                <div class="cart-wrapper">
                  <cart-control :food="list"></cart-control>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <!--购物车-->
    <shop-cart :select-food="selectFood" :delivery-price="seller.deliveryPrice" :min-price="seller.minPrice"></shop-cart>
  </div>
</template>

<script>
import ShopCart from './Shopcart.vue'
import CartControl from './Cartcontrol.vue'
const ERR_OK = 0
export default {
  props: ['seller'],
  data () {
    return {
      goods: [],
      listHeight: [],
      scrollY: 0
    }
  },
  components: {
    ShopCart,
    CartControl
  },
  computed: {
    currentIndex () {
      for (var i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
          return i
        }
      }
      return 0
    },
    selectFood () {
      let foods = []
      this.goods.forEach((item) => {
        item.foods.forEach((foodList) => {
          if (foodList.count) {
            foods.push(foodList)
          }
        })
      })
      return foods
    }
  },
  created () {
    this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    this.$http.get('/api/goods').then(res => {
      if (res.data.errno === ERR_OK) {
        this.goods = res.data.data
        this.$nextTick(() => {
          this.getHeight()
        })
      }
    }).catch(err => {
      console.log(err)
    })
  },
  mounted () {
    this.$refs.foodWrapper.addEventListener('scroll', () => {
      // console.log(this.$refs.foodWrapper.scrollTop)
      this.scrollY = this.$refs.foodWrapper.scrollTop
    })
  },
  methods: {
    getHeight () {
      let foodList = this.$refs.foodWrapper.getElementsByClassName('foodList')
      let height = 0
      this.listHeight.push(height)
      for (var i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    select (index) {
      this.$refs.foodWrapper.scrollTop = this.$refs.foodWrapper.getElementsByClassName('foodList')[index].offsetTop
    }
  }
}
</script>

<style lang="scss">
@import '../assets/css/mixin.scss';
@import '../assets/css/base.scss';
.goods {
  display: flex;
  position: absolute;
  top: 174px;
  bottom: 46px;
  width: 100%;
  z-index: 99;
  overflow: hidden;
  .menu-wrapper {
    flex: 0 0 80px;
    width: 80px;
    height: 100%;
    background: #f3f5f7;
    overflow-y: auto;
    .menu-item {
      display: table;
      width: 56px;
      height: 54px;
      padding: 0 12px;
      line-height: 14px;
      &.current {
        position: relative;
        z-index: 10;
        margin-top: -1px;
        background: #fff;
        font-weight: 700;
        .text {
          @include border-none()
        }
      }
      .icon {
        display: inline-block;
        vertical-align: top;
        width: 12px;
        height: 12px;
        margin-right: 2px;
        background-size: 12px 12px;
        background-repeat: no-repeat;
        &.decrease {
          @include bg-image('../assets/images/decrease_3');
        }
        &.discount {
          @include bg-image('../assets/images/discount_3');
        }
        &.guarantee {
          @include bg-image('../assets/images/guarantee_3');
        }
        &.invoice {
          @include bg-image('../assets/images/invoice_3');
        }
        &.special {
          @include bg-image('../assets/images/special_3');
        }
      }
      .text {
        display: table-cell;
        width: 56px;
        vertical-align: middle;
        @include border-1px(rgba(7, 17, 27, 0.1));
        font-size: 12px;
      }
    }
  }
  .foods-wrapper {
    flex: 1;
    height:100%;
    overflow-y: auto;
    .title {
      padding-left: 14px;
      height: 26px;
      line-height: 26px;
      border-left: 2px solid #d9dde1;
      font-size: 12px;
      color: rgb(147, 153, 159);
      background: #f3f5f7
    }
    .food-item {
      display: flex;
      margin: 18px;
      padding-bottom: 18px;
      @include border-1px(rgba(7, 17, 27, 0.1));
      &:last-child {
        @include border-none();
        margin-bottom: 0;
      }
      .icon {
        flex: 0 0 57px;
        margin-right: 10px;
      }
      .content {
        flex: 1;
        .name {
          margin: 2px 0 8px 0;
          height: 14px;
          line-height: 14px;
          font-size: 14px;
          color: rgb(7, 17, 27);
        }
        .desc,.extra {
          line-height: 10px;
          font-size: 10px;
          color: rgb(147, 153, 159);
        }
        .desc {
          line-height: 12px;
          margin-bottom: 8px;
        }
        .extra {
          .count {
            margin-right: 12px;
          }
        }
        .price {
          font-weight: 700;
          line-height: 24px;
          .now {
            margin-right: 8px;
            font-size: 14px;
            color: rgb(240, 20, 20);
          }
          .old {
            text-decoration: line-through;
            font-size: 10px;
            color: rgb(147, 153, 159);
          }
        }
        .cart-wrapper {
          position: absolute;
          right: 0;
          bottom: 8px;
        }
      }
    }
  }
}
</style>
