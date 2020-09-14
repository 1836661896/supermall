<template>
  <div class="cart-bottom-bar">
    <div class="check-all">
      <check-button class="checked" @click.native="cleckedAll" :is-checked="isSelectAll"/>
      <div class="check-text">全选</div>
    </div>

    <div class="all-price">
      合计：￥ {{allPrice}}
    </div>

    <div class="to-pay">
      去结算({{toPay}})
    </div>
  </div>
</template>

<script>

  import CheckButton from 'components/content/checkButton/CheckButton'
  import { mapGetters } from 'vuex'

  export default {
    name: 'CartBottomBar',
    components: {
      CheckButton
    },
    computed: {
      ...mapGetters(['cartList']),
      allPrice() {
        // return this.$store.state.cartInfo.indexof(item => )
        return this.cartList.filter(item => item.isChecked).reduce((preIndex, item) => { 
          return preIndex + item.price * item.count
          }, 0).toFixed(2)
      },
      toPay() {
        return this.cartList.filter(item => item.isChecked).length
      },
      isSelectAll() {
        if(this.cartList.length) {
          return !this.cartList.find(item => !item.isChecked)
        }else {
          return false
        }
      }
    },
    methods: {
      cleckedAll() {
        if(this.isSelectAll) {
          this.cartList.forEach(item => item.isChecked = false)
        } else {
          this.cartList.forEach(item => item.isChecked = true)
        }
      }
    }
  }
</script>

<style scoped>

  .cart-bottom-bar {
    height: 40px;
    background: #eee;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
  }

  .check-all {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checked {
    margin: 0 10px;
  }

  .checked-text {
    font-size: 14px;
    color: rgb(73, 73, 73);
  }

  .all-price {
    font-size: 16px;
  }

  .to-pay {
    height: 40px;
    width: 100px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    background: red;
  }

</style>