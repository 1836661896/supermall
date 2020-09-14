<template>
  <div id="detail">
    <detail-nav-bar class="nav-bar" @titleClick="titleClick" ref="navBar"/>
    <scroll class="content" 
            ref="scroll" 
            @scroll="contentScroll" 
            :probeType="3">
      <detail-swiper :detail-swiper-image="detailSwiperImage"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @goodsImgLoad="goodsImgLoad"/>
      <detail-params-info :item-params="itemParams" ref="paramsInfo" />
      <detail-comment-info :conment-info="conmentInfo" ref="commentInfo"/>
      <goods-list :goods="recommend" class="recommend" ref="recommend"/>
    </scroll>

    <detail-bottom-bar @cartClick="cartClick"/>

    <back-top @click.native="backClick" v-show="showBack"/>

  </div>
</template>

<script>

  import DetailNavBar from './childComps/DetailNavBar'
  import DetailSwiper from './childComps/DetailSwiper'
  import DetailBaseInfo from './childComps/DetailBaseInfo'
  import DetailShopInfo from './childComps/DetailShopInfo'
  import DetailGoodsInfo from './childComps/DetailGoodsInfo'
  import DetailParamsInfo from './childComps/DetailParamsInfo'
  import DetailCommentInfo from './childComps/DetailCommentInfo'
  import DetailBottomBar from './childComps/DetailBottomBar'

  import Scroll from 'components/common/scroll/Scroll'
  import GoodsList from 'components/content/goods/GoodsList'

  import {getDetail, Goods, Shop, getRecommend} from 'network/detail'
  import {itemImageListenerMixin, backTopMixin} from 'common/mixins'

  export default { 
    name: 'Detail',
    components: {
      DetailNavBar,
      DetailSwiper,
      DetailBaseInfo,
      DetailShopInfo,
      DetailGoodsInfo,
      DetailParamsInfo,
      DetailCommentInfo,
      DetailBottomBar,
      Scroll,
      GoodsList,
    },
    mixins: [itemImageListenerMixin, backTopMixin],
    destroyed() {
      this.$bus.$off('itemImageLoad', this.itemImgListener)
    },
    data() {
      return {
        iid: null,
        detailSwiperImage: [],
        goods: {},
        shop: {},
        detailInfo: {},
        itemParams: {},
        conmentInfo: {},
        recommend: [],
        moveToYs: [0],
      }
    },
    methods: {
      // 1.信息图片加载完成后重置Better scroll
      goodsImgLoad() {
        this.$refs.scroll.refresh()

        // 商品图片加载完成后获取参数高度
        this.moveToYs.push(-this.$refs.paramsInfo.$el.offsetTop + 44)
        // this.moveToYs[1] = -this.$refs.paramsInfo.$el.offsetTop + 44
        
        // 获取评论高度
        this.moveToYs.push(-this.$refs.commentInfo.$el.offsetTop + 44)
        // this.moveToYs[2] = -this.$refs.commentInfo.$el.offsetTop + 44
        
        //获取推荐高度
        this.moveToYs.push(-this.$refs.recommend.$el.offsetTop + 44)
          // this.moveToYs[3] = -this.$refs.recommend.$el.offsetTop + 44
      },

      // 3.点击title时页面跳到对应的位置
      titleClick(index) {
        this.$refs.scroll.scrollTo(0, this.moveToYs[index], 300)
        // console.log(index)
        // switch(index) {
        //   case 0:
        //     this.$refs.scroll.scrollTo(0, 0, 500)
        //     break
        //   case 1:
        //     this.$refs.scroll.scrollTo(0, this.paramsHeight, 500)
        //     break
        //   case 2:
        //     this.$refs.scroll.scrollTo(0, this.commentHeight, 500)
        //     break
        //   case 3:
        //     this.$refs.scroll.scrollTo(0, this.recommendHeight, 500)
        //     break
        // }
      },

      // 滚动到相对位置后title跳到对应的title
      contentScroll(position) {
        // if(position.y <=  this.moveToYs[3]) {
        //   this.$refs.navBar.currentIndex = 3
        // }
        // else if(position.y <=  this.moveToYs[2]) {
        //   this.$refs.navBar.currentIndex = 2
        // }
        // else if(position.y <=  this.moveToYs[1]) {
        //   this.$refs.navBar.currentIndex = 1
        // }
        // else {
        //   this.$refs.navBar.currentIndex = 0
        // }
        // console.log(position)
        let length = this.moveToYs.length
        for(let i = 0; i < length; i++) {
          if(i !== this.$refs.navBar.currentIndex && ((i < length-1  && this.moveToYs[i] >= position.y && position.y > this.moveToYs[i+1]) || (i === length-1  && position.y <= this.moveToYs[i]))) {
            this.$refs.navBar.currentIndex = i
            // console.log(i)
          }
        }
       this.backTop(position)
      },

      cartClick() {
        // console.log(this.iid)
        // 获取购物车展示时需要的数据
        const product = {}
        product.image = this.detailSwiperImage[0]
        product.title = this.goods.title
        product.desc = this.goods.desc
        product.price = this.goods.nowPrice
        product.iid = this.iid
        this.$store.dispatch('addCart', product).then(res => {
          this.$toast.show(res, 1500)
        })
      }
    },
    created() {
      // 1.保存传入的iid
      this.iid = this.$route.params.iid

      // 2.通过iid获取详情数据
      getDetail(this.iid).then(res => {
        // console.log(res) 
        const data = res.result
        // 1.获取顶端Swiper的图片数据
        this.detailSwiperImage = data.itemInfo.topImages

        // 2.获取商品信息
        this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo)

        // 3.获取商家信息
        this.shop = new Shop(data.shopInfo)

        // 4.获取商品详情图片
        this.detailInfo = data.detailInfo

        // 5.获取商品参数信息
        this.itemParams = data.itemParams

        // 6.获取评论信息
        if(data.rate.cRate!==0) {
          this.conmentInfo = data.rate.list[0]
        }
      }),
      // 获取推荐信息
      getRecommend().then(res => {
        this.recommend = res.data.list        
        // console.log(this.recommend)
      })
    },
  }
</script>

<style scoped>

  #detail {
    background: #eee;
    position: relative;
    z-index: 9;
    height: 100vh;
    overflow: hidden;
  }

  .nav-bar {
    position: relative;
    z-index: 9;
  }

  .content {
    height: calc(100% - 44px - 49px);
  }

  .recommend {
    background: #fff;
    margin-top: 10px;
    padding-top: 10px;
  }

</style>