<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name='item-icon'></slot>
    </div>
    <div v-else>
      <slot name='item-icon-active'></slot>
    </div>
    <div :style="activeStyle">
      <slot name='item-text'></slot>
    </div>
    
    <!-- <img src="../../assets/img/tabbar/home.svg" alt="">
    <div>首页</div> -->
  </div>
</template>

<script>
export default {
  name: 'TabBarItem',
  props: {
    path: String,
    activeColor: {
      type: String,
      default: 'red'
    }
  },
  data() {
    return {
      // isActive: true,
    }
  },
  computed: {
    isActive() {
      // this.$route.path为当前活跃的组件的path，this.path为各个组件的path
      //   indexOf()方法可以检测传入的参数是否属于前面的字串
      //     如果前面的字串含有传入的字串，则返回值为0，如不含有则返回值为-1
      return !this.$route.path.indexOf(this.path)
    },
    activeStyle() {
      return this.isActive ? {color: this.activeColor} : {}
    }
  },
  methods: {
    itemClick() {
      if(this.$route.path != this.path) {
        this.$router.replace(this.path)
      }
    }
  }
}
</script>

<style scoped>
  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 49px;
    font-size: 14px;
  }
  .tab-bar-item img{
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
</style>