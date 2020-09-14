<template>
  <div v-if="Object.keys(conmentInfo).length!==0" class="comment-info">
    <div class="comment-title">
      <div>用户评论</div>
      <div>更多</div>
    </div>

    <div class="comment-user">
      <img :src="conmentInfo.user.avatar" alt="">
      <span>{{conmentInfo.user.uname}}</span>
    </div>

    <p class="comment-content">{{conmentInfo.content}}</p>

    <div>
      <div class="comment-times">
        <span>{{conmentInfo.created | showDate}}</span>
        <span>{{conmentInfo.style}}</span>
      </div>
      <div v-show="conmentInfo.images" class="comment-img">
        <span v-for="item in conmentInfo.images">
          <img :src="item" alt="">
        </span>
      </div>
    </div>
      
  </div>
</template>

<script>

  import {formatDate} from 'common/utils'

  export default {
    name: 'DetailCommentInfo',
    props: {
      conmentInfo: {
        type: Object,
        default() {
          return {}
        }
      }
    },
    filters: {
      showDate(value) {
        // 1.将时间戳转为Date对象
        const date = new Date(value * 1000)

        // 2.将date进行格式化
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    }
  }
</script>

<style scoped>

  .comment-info {
    background: #fff;
    margin-top: 10px;
    padding: 0 20px;
    padding-bottom: 10px;
  }

  .comment-title {
    padding: 15px 0;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #ccc;
  }

  .comment-user {
    margin: 20px 0;
  }

  .comment-user>img {
    width: 50px;
    height: 50px;
    vertical-align: middle;
    border-radius: 50%;
  }

  .comment-user>span {
    font-size: 16px;
    font-weight: bold;
  }

  .comment-content {
    font-size: 14px;
    color: #666;
  }

  .comment-times {
    font-size: 14px;
    color: #999;
    margin-top: 10px;
  }

  .comment-times>span {
    margin-right: 10px;
  }

  .comment-img {
    margin-top: 10px;
    display: flex;
  }

  .comment-img>span>img {
    height: 100px;
    margin-right: 10px;
  }

</style>