<template>
  <div v-if="Object.keys(goods).length!==0" class="base-info">
    <div class="info-title">{{goods.title}}</div>
    <div class="info-price">
      <span class="new-price">{{goods.price}}</span>
      <span class="old-price">{{goods.oldPrice}}</span>
      <span v-if="goods.discountDesc" class="info-discount" :style="{background: goods.discountBgColor}">{{goods.discountDesc}}</span>
    </div>
    <div class="info-other">
      <span>{{goods.columns[0]}}</span>
      <span>{{goods.columns[1]}}</span>
      <span>{{goods.services[goods.services.length-1].name}}</span>
    </div>
    <div class="info-services">
      <span v-for="index in goods.services.length-1" class="info-services-item">
        <img :src="goods.services[index-1].icon" alt="">
        <span>{{goods.services[index-1].name}}</span>
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailBaseInfo',
    props: {
      goods: {
        type: Object,
        default() {
          return {}
        }
      }
    }
  }
</script>

<style scoped>

  .base-info {
    padding: 20px 10px; 
    background: #fff;   
  }

  .info-title {
    font-size: 20px;
    font-weight: bolder;
  }

  .info-price {
    margin-top: 10px;
  }

  .new-price {
    color: var(--color-high-text);
    font-size: 24px;
  }

  .old-price {
    color: #999;
    font-size: 14px;
    margin-left: 8px;
    text-decoration: line-through;
  }

  .info-discount {
    color: #fff;
    font-size: 14px;
    padding: 3px 5px;
    margin-left: 8px;
    border-radius: 8px;

    position: relative;
    top: -8px;
  }

  .info-other {
    color: #999;
    font-size: 14px;
    margin-top: 15px;

    display: flex;
    justify-content: space-between;
  }

  .info-services {
    margin-top: 15px;
    font-size: 14px;
    color: #666;
    display: flex;
    justify-content: space-between;
  }

  .info-services-item>img {
    width: 14px;
    height: 14px;
  }

</style>