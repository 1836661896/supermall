<template>
  <div class="cart-item">
    <div class="item-checked">
      <check-button :is-checked="product.isChecked" @click.native="checkClick"/>
    </div>
    <div class="item-img">
      <img :src="product.image" alt="商品图片">
    </div>
    <div class="item-text">
      <div class="item-title">{{product.title}}</div>
      <div class="item-desc">{{product.desc}}</div>
      <div class="item-bottom">
        <span class="item-price">￥{{product.price}}</span>
        <span class="item-count">×{{product.count}}</span>
      </div>
    </div>
  </div>
</template>

<script>

  import CheckButton from 'components/content/checkButton/CheckButton'

export default {
  name: 'CartListItem',
  components: {
    CheckButton
  },
  props: {
    product: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    checkClick() {
      this.$store.commit('cartCheckedChange', this.product)
    }
  }
}
</script>

<style scoped>

  .cart-item {
    display: flex;
    margin: 5px;
    justify-content: center;
    align-items: center;
  }

  .item-img {
    padding: 5px;
  }

  .item-img>img {
    height: 100px;
    width: 80px;
    display: block;
    border-radius: 5px;
  }

  .item-text {
    padding: 5px;
    overflow: hidden;
    color: #333;
    position: relative;
  }

  .item-title, .item-desc {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .item-title {
    font-weight: bold;
    margin: 5px 3px;
    font-size: 18px;
  }

  .item-desc {
    font-size: 14px;
    margin: 10px 3px;
  }

  .item-bottom {
    font-size: 16px;
    margin-top: 20px;
    display: flex;
    justify-content: space-between;
  }

  .item-price {
    color: orangered;
    font-size: 20px;
  }

</style>