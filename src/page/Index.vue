<template>
    <div class="index">
      <header-view :seller="seller"></header-view>
      <nav-view></nav-view>
      <router-view :seller="seller"></router-view>
    </div>
</template>

<script>
import HeaderView from './Header.vue'
import NavView from './Nav.vue'

const ERR_OK = 0
export default {
  data () {
    return {
      seller: {}
    }
  },
  created () {
    this.$http.get('/api/seller').then(res => {
      console.log(res.data.data)
      if (res.data.errno === ERR_OK) {
        this.seller = Object.assign({}, res.data.data)
        console.log(this.seller)
      }
    }).catch(err => {
      console.log(err)
    })
  },
  components: {
    HeaderView,
    NavView
  }
}
</script>

<style lang="scss">
</style>
