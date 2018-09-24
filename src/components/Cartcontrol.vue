<template>
  <div class="cartcontrol">
    <transition name="fade" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut">
      <div class="cart-decrease" v-show="food.count>0" @click="decreaseCart($event)">
        <span class="inner icon-remove_circle_outline"></span>
      </div>
    </transition>
    <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>
<script>
import Vue from 'vue'
export default {
  props: ['food'],
  created () {
    // console.log(this.food)
  },
  methods: {
    addCart (e) {
      if (!this.food.count) {
        Vue.set(this.food, 'count', 1)
      } else {
        this.food.count++
      }
    },
    decreaseCart (e) {
      if (this.food.count) {
        this.food.count--
      }
    }
  }
}
</script>
<style lang="scss">
.cartcontrol {
  font-size: 0;
  .cart-decrease {
    display: inline-block;
    padding: 6px;
    .inner {
      display: inline-block;
      line-height: 24px;
      font-size: 24px;
      color: rgb(0, 160, 220);
    }
  }
  .cart-count {
    display: inline-block;
    vertical-align: top;
    width: 12px;
    padding-top: 6px;
    line-height: 24px;
    text-align: center;
    font-size: 10px;
    color: rgb(147, 153, 159);
  }
  .cart-add {
    display: inline-block;
    padding: 6px;
    line-height: 24px;
    font-size: 24px;
    color: rgb(0, 160, 220);
  }
}
</style>
