// pages/mine/index.js
const util = require('../../../utils/util')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
      globalData:app.globalData
  },

  toLogin:function(){
    wx.redirectTo({ url: '/pages/login/index' });
  },

  // 通用跳转
  navTo:function(e){
    if (!app.globalData.isLogin) return util.toLogin()
    app.navTo(e.currentTarget.dataset.url)
  },

  onLoad: function (options) {
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})