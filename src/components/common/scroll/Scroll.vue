<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>  
</template>

<script>

  import BScroll from 'better-scroll'

  export default {
    name: 'Scroll',
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        scroll: null
      }
    },
    mounted() {
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        /* 滚动监听 
        *   默认值为0，表示不监听
        *   1也表示不监听
        *   2表示监听手指(鼠标)滑动时，但是离开后的惯性滚动不监听
        *   3表示离开后的惯性滚动也监听
        */
        pullUpLoad: this.pullUpLoad,
        // 上拉加载更多
        click: true
        // 鼠标点击事件
      })

      this.scroll.on('scroll', position => {
        // console.log(position)
        this.$emit('scroll', position)
      })

      this.scroll.on('pullingUp', () => {
        // console.log('上拉加载更多')
        this.$emit('pullingup')
      })
    },
    methods: {
      scrollTo(x, y, time=300) {
        this.scroll.scrollTo(x, y, time)
      },
      finishPullUp() {
        this.scroll.finishPullUp()
      }
    }
  }
</script>

<style scoped>

</style>