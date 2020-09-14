export default {
  addCart(context, payload) {
    return new Promise((resolve, reject) => {
      const oldProduct = context.state.cartInfo.find(item => item.iid === payload.iid)
      if(oldProduct) {
        // oldProduct.count += 1
        context.commit('cartInfoCount', oldProduct)
        resolve('当前商品的数量+1')
      } else {
        payload.count = 1
        payload.isChecked = false
        // state.cartInfo.push(payload)
        context.commit('addCartInfo', payload)
        resolve('添加新商品成功')
      }
    })
  }
}