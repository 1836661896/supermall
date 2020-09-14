<template>
  <div class="shop-info" v-if="Object.keys(shop).length!==0">
    <div class="shop-title">
      <img :src="shop.shopLogo" alt="">
      <span>{{shop.name}}</span>
    </div>
    <div class="shop-content">
      <div class="shop-content-left shop-content-item">
        <div>
          <div class="sell-info">
            {{shop.cSells | sellCountFilter}}
          </div>
          <div class="sell-name">总销量</div>
        </div>
        <div>
          <div class="goods-info">{{shop.cGoods}}</div>
          <div class="goods-name">全部宝贝</div>
        </div>
      </div>

      <div class="shop-content-right shop-content-item">
        <div v-for="item in shop.score" class="shop-content-right-item">
          <span>{{item.name}}</span>
          <span class="shop-score" :class="{'score-better': item.isBetter}">{{item.score}}</span>
          <span class="shop-score-name" :class="{'score-name-better': item.isBetter}">{{item.isBetter ? '高' : '低'}}</span>
        </div>
      </div>
    </div>
    <div class="shop-btn">
      <button class="btn">进店逛逛</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailShopInfo',
  props: {
    shop: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  filters: {
    sellCountFilter(value) {
      if(value < 10000) return value;
      return (value/10000).toFixed(1) + '万'
    }
  }
}
</script>

<style scoped>

  .shop-info {
    margin-top: 10px;
    background: #fff;
  }

  .shop-title {
    padding: 30px 10px;
  }

  .shop-title>img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
    vertical-align: middle;
  }

  .shop-title>span {
    font-size: 24px;
    margin-left: 20px;
  }

  .shop-content {
    display: flex;
  }

  .shop-content-item {
    flex: 1;
  }

  .shop-content-left {
    display: flex;
    justify-content: space-evenly;
    text-align: center;
    border-right: 1px solid rgba(0, 0, 0, .1);
    margin: 10px 0;

  }

  .sell-info, .goods-info {
    font-size: 24px;
  }

  .sell-name, .goods-name {
    font-size: 16px;
    margin-top: 5px;
  }

  .shop-content-right {
    padding-left: 15px;
  }

  .shop-content-right-item {
    padding: 5px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
  }

  .shop-content-right-item>span {
    margin-left: 10px;
  }

  .shop-score {
    color: #5ea762;
  }

  .score-better {
    color: #f13e3a;
  }

  .shop-score-name {
    color: #fff;
    background: #5ea762;
  }

  .score-name-better {
    background: #f13e3a;
    color: #fff;
  }

  .shop-btn {
    padding: 30px 0;
    display: flex;
    justify-content: center;
  }

  .btn {
    color: #333;
    background: #ddd;
    border: 0px;
    padding: 8px 20px;
    border-radius: 10px;
  }

</style>