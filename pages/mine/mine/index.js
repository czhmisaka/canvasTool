// pages/mine/index.js
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