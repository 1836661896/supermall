<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" 
                  @tabClick='tabClick'
                  ref="tabControl1"
                  class="tabControl"
                  v-show="isTabFixed"/>
    
    <scroll class="content" 
            ref="scroll" 
            :probe-type='3' 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingup="loadmore">
      <home-swiper :banners='banners' @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends='recommends'></recommend-view>
      <frature-view />
      <tab-control :titles="['流行', '新款', '精选']" 
                   @tabClick='tabClick'
                   ref="tabControl2"/>
      <goods-list :goods="showGoods"/>
    </scroll>

    <back-top @click.native="backClick" v-show="showBack"/>
  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FratureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

import { getHomeMultidata, getHomeGoods } from "network/home"
import {itemImageListenerMixin, backTopMixin} from './../../common/mixins'

export default {
  name: "Home",
  components: {
    HomeSwiper,
    RecommendView,
    FratureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
  },
  mixins: [itemImageListenerMixin, backTopMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {page: 0, list: []},
        new: {page: 0, list: []},
        sell: {page: 0, list: []}
      },
      currentType: 'pop',
      tabOffsetTop: 0,
      isTabFixed: false,
      saveY: 0
    }
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  activated() {
    // console.log(this.saveY)
    this.$refs.scroll.refresh()
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
  },
  deactivated() {
    // 1.保存Y值
    this.saveY = this.$refs.scroll.scroll.y

    // 2.取消全局监听
    this.$bus.$off('itemImageLoad', this.itemImgListener)
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata(),
    this.getHomeGoods('pop'),
    this.getHomeGoods('new'),
    this.getHomeGoods('sell')
  },
  methods: {
    // 事件监听相关方法
    tabClick(index) {
      switch(index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break            
      }      
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
    },
    contentScroll(position) {
      // console.log(position.y)
      this.backTop(position)

      // 2.判断tabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadmore() {
      this.getHomeGoods(this.currentType)
      // console.log(this.goods[this.currentType].page)
    },
    swiperImageLoad() { 
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },

    // 网络请求相关方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type, page).then(res => {
        // console.log(res)
        if(res && res.success) {
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
        }

        setTimeout(() => {
          this.$refs.scroll.finishPullUp()
        }, 3000);
      })
    }
  }
};
</script>

<style scoped>
#home {
  height: 100vh;
  position: relative;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}

.tab-control {
  position: relative;
  z-index: 9;
}
</style>