<template>
  <swiper v-if="Object.keys(detailSwiperImage).length!==0">
    <swiper-item v-for="item in detailSwiperImage" class="detailSwiperImage">
        <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper , SwiperItem} from 'components/common/swiper'

export default {
  name: 'HomeSwiper',
  props: {
    detailSwiperImage: {
      type: Array,
      default() {
        return []
      }
    }
  },
  components: {
    SwiperItem,
    Swiper
  },
}
</script>

<style scoped>

  .detailSwiperImage {
    height: 300px;
    overflow: hidden;
  }

</style>