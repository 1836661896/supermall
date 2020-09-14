<template>
  <div class="bottom-bar">
    <div class="bottom-left">
      <div>
        <i class="icon service"></i>
        <span>客服</span>        
      </div>
      <div>
        <i class="icon shop"></i>
        <span>店铺</span>        
      </div>
      <div>
        <i class="icon select"></i>
        <span>收藏</span>        
      </div>
    </div>
    <div class="bottom-right">
      <div class="cart" @click="cartClick">加入购物车</div>
      <div class="buy">购买</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailBottomBar',
  methods: {
    cartClick() {
      this.$emit('cartClick')
    }
  }
}
</script>

<style scoped>

  .bottom-bar {
    height: 49px;
    background: #fff;
    text-align: center;

    display: flex;
    position: relative;
  }

  /* .bottom-bar>div {
    flex: 1;
  } */

  .bottom-left {
    display: flex;
    width: 40%;
  }

  .bottom-left>div {
    flex: 1;
  }

  .icon {
    display: block;
    width: 22px;
    height: 22px;
    margin: 5px auto 0;
    background: url("~assets/img/detail/detail_bottom.png")0 0/100%;
  }

  .service {
    background-position: 0 -52px;
  }

  .shop {
    background-position: 0 -98px;
  }

  .bottom-left>div>span {
    font-size: 12px;
  }

  .bottom-right {
    display: flex;
    width: 60%;
  }

  .bottom-right>div {
    flex: 1;
    line-height: 35px;
  }

  .cart {
    border: 0;
    background: rgb(255, 196, 1);
    margin: 7px 0 7px 5px;
    border-radius: 18px 0 0 18px;
    font-size: 14px;
    color: #000;
  }

  .buy {
    border: 0;
    background: var(--color-high-text);
    margin: 7px 5px 7px 0;
    border-radius: 0 18px 18px 0;
    font-size: 14px;
    color: #fff;
  }

</style>