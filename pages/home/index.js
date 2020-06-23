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
        num: 1234567890,
        type: '销售金额'
      }, {
        num: 1009099112,
        type: '售出件数'
      }, {
        num: 99012000,
        type: '购买人数'
      }]
    }
  },

  formatNum: function (promoter) {
    // 格式化大数字输出
    promoter.fastMsg.forEach((item) => {
      item.num = item.num > 10000 ? item.num/10000>10000?Math.round(item.num/100000000)+'亿':Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      promoter
    })
  },
  shareShopName() {

  },
  toPhotoManage() {
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