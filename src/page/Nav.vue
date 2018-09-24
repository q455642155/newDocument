<template>
  <div class="nav border-1px">
    <div class="item">
      <router-link to="/goods" active-class="active">商品</router-link>
    </div>
    <div class="item">
      <router-link to="/ratings" active-class="active">评价</router-link>
    </div>
    <div class="item">
      <router-link to="/seller" active-class="active">商家</router-link>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
@import "../assets/css/mixin.scss";
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #666;
  font-size: 14px;
  @include border-1px(rgba(7, 17, 27, 0.1));
  .item {
    flex: 1;
    .active{
      color:#f00;
      display: block;
    }
  }
}
</style>
