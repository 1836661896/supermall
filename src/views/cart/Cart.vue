<template>
  <div id="cart">
    <!-- 顶部导航 -->
    <nav-bar class="cart-nav-bar">
      <div slot="center">
        购物车({{getCartLength}})
      </div>
    </nav-bar>

    <!-- 商品 -->
    <cart-list />

    <!-- 底部 -->
    <cart-bottom-bar />
  </div>
</template>

<script>

  import NavBar from './../../components/common/navbar/NavBar'
  import CartList from './childCart/CartList'
  import CartBottomBar from './childCart/CartBottomBar'

  import { mapGetters } from 'vuex'

  export default {
    name: 'Cart',
    components: {
      NavBar,
      CartList,
      CartBottomBar
    },
    computed: {
      ...mapGetters(['getCartLength'])
      // ...mapGetters({
      //   length: 'getCartLength'
      // })
    }
  }
</script>

<style scoped>

  #cart {
    height: 100vh;
  }

  .cart-nav-bar {
    background: var(--color-tint);
    color: #fff;
  }

</style>