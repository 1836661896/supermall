import {request} from './request'

export function getDetail(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}

export function getRecommend() {
  return request({
    url: '/recommend'
  })
}


export class Goods {
  constructor(itemInfo, columns, shopInfo) {
    this.title = itemInfo.title,
    this.price = itemInfo.price,
    this.oldPrice = itemInfo.oldPrice,
    this.discountDesc = itemInfo.discountDesc,
    this.discountBgColor = itemInfo.discountBgColor,
    this.columns = columns,
    this.services = shopInfo.services
    this.desc = itemInfo.desc
    this.nowPrice = itemInfo.lowNowPrice
  }
}

export class Shop {
  constructor(shopInfo) {
    this.shopLogo = shopInfo.shopLogo,
    this.name = shopInfo.name,
    this.cSells = shopInfo.cSells,
    this.cGoods = shopInfo.cGoods,
    this.score = shopInfo.score
  }
}