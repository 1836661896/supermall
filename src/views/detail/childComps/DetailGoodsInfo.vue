<template>
  <div class="goods-info" v-if="Object.keys(detailInfo).length!==0">
    <div>
      <div class="start"></div>
      <div class="goods-desc">{{detailInfo.desc}}</div>
      <div class="end"></div>
    </div>

    <div class="goods-key">{{detailInfo.detailImage[0].key}}</div>

    <div class="goods-img">
      <div v-for="item in detailInfo.detailImage[0].list" class="goods-img-item">
        <img :src="item" alt="" @load="goodsImgLoad">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'DetailGoodsInfo',
    props: {
      detailInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    data() {
      return {
        imgLength: 0,
        counter: 0
      }
    },
    methods: {
      goodsImgLoad() {
        if(++this.counter == this.imgLength) {
          this.$emit('goodsImgLoad')
        }
      }
    },
    watch: {
      detailInfo(value) {
        // console.log(value.detailImage[0].list.length)
        this.imgLength = value.detailImage[0].list.length
      }
    }
  }
</script>

<style scoped>

  .goods-info {
    margin-top: 10px;
    padding: 20px;
    background: #fff;
  }

  .start {
    width: 150px;
    height: 5px;
    border-left: 5px solid #999;
    border-bottom: 1px solid #999;
  }

  .goods-desc {
    padding: 15px;
    font-size: 16px;
    font-weight: 500;    
  }

  .end {
    width: 150px;
    height: 5px;
    border-right: 5px solid #999;
    border-bottom: 1px solid #999;
    float: right;
  }

  .goods-key {
    margin-top: 10px;
  }

  .goods-img {
    margin-top: 20px;
  }

  .goods-img-item>img {
    width: 100%;
  }

</style>
