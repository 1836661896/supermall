import { debounce } from "./utils"
import BackTop from 'components/content/backTop/BackTop'

export const itemImageListenerMixin = {
  data() {
    return {
      itemImgListener: null
    }
  },
  mounted() {
    // 图片加载完成的事件监听
    let refresh = debounce(this.$refs.scroll.refresh, 50)
    this.itemImgListener = () => {
      refresh()
    }
     this.$bus.$on('itemImageLoad', this.itemImgListener)
  }
}

export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      showBack: false,
    }
  },
  methods: {    
    backClick() {
      this.$refs.scroll.scrollTo(0, 0)
    },
    backTop(position) {      
      // 1.判断backTop是否显示
      this.showBack = (-position.y) > 1000
    }
  }
}