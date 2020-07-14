const util = require("../../../utils/util")
const app = getApp()
// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    options: {},
    id: '',
    msgBox: false
  },


  // 打开备注填写接口
  showMsgBox(e) {
    this.setData({
      msgBox: true
    })
  },

  // 取消接单
  abolish(e) {
    // util.request({
    //   url:"order/cancelAndRefund",
    //   data:{}
    // }).then((res) => {

    // })
  },

  // 确认接单
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

  // 获取详情
  getDetail(options) {
    let that = this
    util.request({
      url: 'order/getOrderInfo/' + options.id,
      method: 'get',
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

  // 唤起回调
  returnBack(e) {
    let {
      options
    } = e.detail
    this.getDetail(options)
  },

  // 进入页面加载
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    let asd = wx.getLaunchOptionsSync()
    console.log(asd)
    wx.showToast({
      title: JSON.stringify(asd['referrerInfo'].extraData) + ' # ' + JSON.stringify(options),
      icon: 'none',
      duration: 10000
    })
    app.getQuery().then((option) => {
      this.setData({
        extraData: JSON.stringify(asd) + ' ################## ' + JSON.stringify(options) + " ####################### " + JSON.stringify(option.id)
      })
    })

    app.getQuery().then((option) => {

      if (option != "null" && option.id) {
        let preCheck = this.selectComponent('#sharePreDeal')
        preCheck.init(option).then((res) => {
          this.getDetail(option)
        })
      } else {
        this.getDetail(options)
      }
    })
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
    return {
      title: this.data.order.wxNickName + '的订单',
      imageUrl: this.data.order.goodsList[0].goodsImage,
      path: '/pages/orderManage/orderDetail/index?id=' + this.data.order.orderId + "&type=toCus"
    }
  }
})