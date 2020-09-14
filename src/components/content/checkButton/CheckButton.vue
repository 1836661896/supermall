<template>
  <div class="check-button" :class="{'check': isChecked}">
    <img src="~assets/img/cart/tick.svg" alt="">
  </div>
</template>

<script>
  export default {
    name: 'CheckButton',
    props: {
      isChecked: {
        type: Boolean,
        default: false
      }
    }
  }
</script>

<style scoped>

  .check-button {
    border-radius: 50%;
    height: 20px;
    width: 20px;
    border: 2px solid #999;
  }

  .check {
    background: red;
    border-color: red;
  }

</style>