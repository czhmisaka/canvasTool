// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    promoter: {
      storeBackground: '/static/images/canvasTool/bg.png',
      shopName: '17826845676的档口',
      fastMsg: [{
        num: 1009.50,
        type: '销售金额'
      }, {
        num: 10090991,
        type: '售出件数'
      }, {
        num: 10090,
        type: '购买人数'
      }]
    }
  },
  formatNum: function (promoter) {
    promoter.fastMsg.forEach((item) => {
      item.num = item.num > 10000 ? Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      promoter
    })
  },
  shareShopName() {

  },
  toPhotoManage() {
    console.log('')
    wx.navigateTo({ url: '' });
  },


  onLoad: function (options) {
    this.formatNum(this.data.promoter)
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  onShareAppMessage: function () {

  }
})