<template>
  <div v-if="Object.keys(itemParams).length!==0" class="item-params">
    <table v-for="(tables, index) in itemParams.rule.tables" class="params-info1">
      <tr v-for="table in tables" class="tr-info1">
        <div v-for="(item, index) in table" :class="{'div-info': index!==0}">
          <th v-if="index==0" class="th-info">{{item}}</th>
          <td v-else>{{item}}</td>
        </div>
      </tr>
    </table>

    <table class="params-info2">
      <tr v-for="item in itemParams.info.set" class="tr-info2">
        <th class="th-info2">{{item.key}}</th>
        <td class="td-info2">{{item.value}}</td>
      </tr>
    </table>

    <div v-if="itemParams.info.images">
      <div v-for="(item, index) in itemParams.info.images">
        <img :src="item" alt="" class="params-img">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DetailParamsInfo',
  props: {
    itemParams: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      img: 0,
      count: 0
    }
  }
}
</script>

<style scoped>

  .item-params {
    background: #fff;
    margin-top: 10px;
    padding-top: 15px;
  }

  .params-info1, .params-info2 {
    width: 100%;
    font-size: 16px;
    border-collapse: collapse;
  }

  .tr-info1 {
    display: flex;
    margin: 20px;
    border-bottom: 1px solid #ccc;
  }

  .div-info {
    flex: 1;
  }

  .th-info {
    padding-right: 20px;
  }

  .tr-info2 {
    display: flex;
    margin: 20px;
    border-bottom: 1px solid #ccc;
  }

  .th-info2 {
    white-space: nowrap;
  }

  .td-info2 {
    margin-left: 20px;
    color: var(--color-high-text);
  }

  .params-img {
    width: 100%;
  }

</style>