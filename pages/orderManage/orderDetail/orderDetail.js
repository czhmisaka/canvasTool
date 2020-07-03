const util = require("../../../utils/util")

// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  toAmendAddress: function (e) {
    wx.navigateTo({
      url: '/pages/amendAddress/amendAddress',
    })
  },
  // 物流详情跳转物流页面
  packageExpresPage: function (e) {
    wx.navigateTo({
      url: '/pages/packageExpress/packageExpres'
    })
    console.log(e)
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
      data.createTime =  data.createTime.replace('T', ' ')
      that.setData({
        orderDetailList: res.data,
        status: res.data,
        state: options.state
      })
      console.log('订单详情列表', res.data)
    })
    // wx.request({
    //   url: `https://wxapi.91bkw.com/photo/wechat/order/getOrderInfo/${orderId}`,
    //   data: {},
    //   method: "GET",
    //   header: {
    //     'Authorization': wx.getStorageSync('_auth'),
    //     'content-type': 'application/json' // 默认值
    //   },
    //   success(res) {
    //     _data = res.data.data
    //     _data.forEach(str => {
    //       str.time = str.createTime.replace('T', ' ')
    //     })
    //     that.setData({
    //       orderDetailList: res.data.data,
    //       status: res.data.data,
    //       state: options.state
    //     })
    //     console.log('订单详情列表', res.data.data)
    //   }
    // })
  },

  onReady: function () {

  },

  
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
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