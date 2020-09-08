// pages/mine/index.js
const util = require('../../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    globalData: getApp().globalData,
    myShopId: ''
  },

  toLogin: function () {
    wx.redirectTo({
      url: '/pages/login/index'
    });
  },

  // 通用跳转
  navTo: function (e) {
    if (!app.globalData.isLogin) return util.toLogin()
    app.navTo(e.currentTarget.dataset.url)
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.setData({
      myShopId: getApp().globalData.shopInfo ? getApp().globalData.shopInfo.storeVo ? getApp().globalData.shopInfo.storeVo.id : '' : ''
    })
  },
  onReady: function () {},
  onShow: function () {
    this.setData({
      globalData: getApp().globalData
    })
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})