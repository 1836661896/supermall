export default {
  getCartLength(state) {
      return state.cartInfo.length
  },
  cartList(state) {
    return state.cartInfo
  }
}