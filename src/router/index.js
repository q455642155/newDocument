import Vue from 'vue'
import Router from 'vue-router'
import Index from '../page/Index'
import Goods from '../components/Goods'
import Ratings from '../components/Ratings'
import Seller from '../components/Seller'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Index,
      children: [
        {
          path: '/',
          redirect: '/goods'
        },
        {
          path: 'goods',
          name: 'goods',
          component: Goods
        },
        {
          path: 'ratings',
          name: 'ratings',
          component: Ratings
        },
        {
          path: 'seller',
          name: 'seller',
          component: Seller
        }
      ]
    }
  ]
})
