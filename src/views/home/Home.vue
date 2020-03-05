<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <scroll class="content" 
            ref="scroll" 
            :probe-type='3' 
            @scroll="contentScroll"
            :pull-up-load="true"
            @pullingup="loadmore">
      <home-swiper :banners='banners'/>
      <recommend-view :recommends='recommends'></recommend-view>
      <frature-view />
      <tab-control :titles="['流行', '新款', '精选']" 
                   class="tab-control" 
                   @tabClick='tabClick'/>
      <goods-list :goods="goods[currentType].list"/>
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
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from "network/home"

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
    BackTop
  },
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
      showBack: false
    }
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
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    contentScroll(position) {
      // console.log(position.y)
      this.showBack = (-position.y) > 1000
    },
    loadmore() {
      this.getHomeGoods(this.currentType)
      // console.log(this.goods[this.currentType].page)
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
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

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
  padding-top: 44px;
  height: 100vh;
}
.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
}

.tab-control {
  position: sticky;
  top: 44px;
}

.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  right: 0;
  left: 0;
}
</style>