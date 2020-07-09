const util = require("../../../utils/util")

// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  checkIn(e) {
    util.request({
      url: '/order/confirmOrder/' + this.data.options.id,
      data: {},
      method: 'get'
    }).then((res) => {
      if (res.data.success) {
        let pages = getCurrentPages()
        pages.forEach(item => {
          console.log(item.route)
          if (item.route == "pages/orderManage/orderManageMain/index") {
            let {
              orderList
            } = item.data
            orderList.forEach(tab => {
              tab.forEach(i => {
                if (i.orderId == this.data.options.id) {
                  i.orderStatus = 60
                }
              })
            })
            item.setData({
              orderList
            })
          }
        })
        wx.showToast({
          title: '接单成功',
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                deleta: 1
              })
            }, 1000)
          }
        })
      }
    })
  },
  onLoad: function (options) {
    var that = this
    let orderId = options.id
    util.request({
      url: 'order/getOrderInfo/' + orderId,
      method: 'get'
    }).then(res => {
      let data = res.data
      console.log(data)
      data.createTime = data.createTime.replace('T', ' ')
      that.setData({
        orderDetailList: res.data,
        status: res.data,
        options: options
      })
      console.log('订单详情列表', res.data)
    })
  },

  onReady: function () {

  },


  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})