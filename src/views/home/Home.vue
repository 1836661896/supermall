<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    
    <scroll class="content">
      <home-swiper :banners='banners'/>
      <recommend-view :recommends='recommends'></recommend-view>
      <frature-view />
      <tab-control :titles="['流行', '新款', '精选']" class="tab-control" @tabClick='tabClick'/>
      <goods-list :goods="goods[currentType].list"/>
    </scroll>

<ul>
  <li>内容1</li>
  <li>内容2</li>
  <li>内容3</li>
  <li>内容4</li>
  <li>内容5</li>
  <li>内容6</li>
  <li>内容7</li>
  <li>内容8</li>
  <li>内容9</li>
  <li>内容10</li>
  <li>内容11</li>
  <li>内容12</li>
  <li>内容13</li>
  <li>内容14</li>
  <li>内容15</li>
  <li>内容16</li>
  <li>内容17</li>
  <li>内容18</li>
  <li>内容19</li>
  <li>内容20</li>
  <li>内容21</li>
  <li>内容22</li>
  <li>内容23</li>
  <li>内容24</li>
  <li>内容25</li>
  <li>内容26</li>
  <li>内容27</li>
  <li>内容28</li>
  <li>内容29</li>
  <li>内容30</li>
  <li>内容31</li>
  <li>内容32</li>
  <li>内容33</li>
  <li>内容34</li>
  <li>内容35</li>
  <li>内容36</li>
  <li>内容37</li>
  <li>内容38</li>
  <li>内容39</li>
  <li>内容40</li>
  <li>内容41</li>
  <li>内容42</li>
  <li>内容43</li>
  <li>内容44</li>
  <li>内容45</li>
  <li>内容46</li>
  <li>内容47</li>
  <li>内容48</li>
  <li>内容49</li>
  <li>内容50</li>
  <li>内容51</li>
  <li>内容52</li>
  <li>内容53</li>
  <li>内容54</li>
  <li>内容55</li>
  <li>内容56</li>
  <li>内容57</li>
  <li>内容58</li>
  <li>内容59</li>
  <li>内容60</li>
  <li>内容61</li>
  <li>内容62</li>
  <li>内容63</li>
  <li>内容64</li>
  <li>内容65</li>
  <li>内容66</li>
  <li>内容67</li>
  <li>内容68</li>
  <li>内容69</li>
  <li>内容70</li>
  <li>内容71</li>
  <li>内容72</li>
  <li>内容73</li>
  <li>内容74</li>
  <li>内容75</li>
  <li>内容76</li>
  <li>内容77</li>
  <li>内容78</li>
  <li>内容79</li>
  <li>内容80</li>
  <li>内容81</li>
  <li>内容82</li>
  <li>内容83</li>
  <li>内容84</li>
  <li>内容85</li>
  <li>内容86</li>
  <li>内容87</li>
  <li>内容88</li>
  <li>内容89</li>
  <li>内容90</li>
  <li>内容91</li>
  <li>内容92</li>
  <li>内容93</li>
  <li>内容94</li>
  <li>内容95</li>
  <li>内容96</li>
  <li>内容97</li>
  <li>内容98</li>
  <li>内容99</li>
  <li>内容100</li>
</ul>

  </div>
</template>

<script>
import HomeSwiper from "./childComps/HomeSwiper"
import RecommendView from './childComps/RecommendView'
import FratureView from './childComps/FeatureView'

import NavBar from "components/common/navbar/NavBar"
import TabControl from 'components/content/tabcontrol/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from 'components/common/scroll/Scroll'

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
    Scroll
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
      currentType: 'pop'
    };
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
      })
    }
  }
};
</script>

<style scoped>
#home {
  padding-top: 44px;
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
  height: 300px;
  overflow: hidden;
}
</style>