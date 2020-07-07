// /pages/canvas/index
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    id: '',
    type: ''
  },

  onShareAppMessage: function (e) {
    let {
      title,
      image,
      id
    } = e.target.dataset
    return {
      title,
      path: '/pages/orderManage/orderDetail/orderDetail?id=' + id,
      imageUrl: image
    }
  },
  onLoad(options) {
    let {
      id,
      type
    } = options
    this.setData({
      id,
      type
    })
  },
  
  share(e) {
    let share = this.selectComponent('#share')
    share.show()
  }
})