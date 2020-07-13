const util = require("../../../utils/util")

// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    options: {},
    id: ''
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
              order
            } = item.data
            order.forEach(tab => {
              tab.forEach(i => {
                if (i.orderId == this.data.options.id) {
                  i.orderStatus = 60
                }
              })
            })
            item.setData({
              order
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

  getDetail(options) {
    let that = this
    util.request({
      url: 'order/getOrderInfo/' + options.id,
      method: 'get'
    }).then(res => {
      if (res.code == 200) {
        let data = res.data
        data.createTime = data.createTime.replace('T', ' ')
        that.setData({
          order: res.data,
          options: options
        })
      } else {
        app.noIconToast('获取订单失败')
      }
    })
  },

  returnBack(e) {
    let {
      options
    } = e.detail
    this.getDetail(options)
  },

  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    let preCheck = this.selectComponent('#sharePreDeal')
    if (options.type == "toCus") {
      preCheck.init(options).then((res) => {
        if (res.type == false) return
        this.getDetail(options)
      })
    } else {
      this.getDetail(options)
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {},
  onShareAppMessage: function (e) {
    console.log(this.data)
    return {
      title: "xxx订单",
      path: 'pages/orderManage/orderDetail/orderDetail?id=' + this.data.id + "&type=toCus"
    }
  }
})