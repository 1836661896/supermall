export default {
  cartInfoCount(state, payload) {
    payload.count ++
  },
  addCartInfo(state, payload) {
    state.cartInfo.push(payload)
  },
  cartCheckedChange(state, payload) {
    payload.isChecked = !payload.isChecked
  }
}