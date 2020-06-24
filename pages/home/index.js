// pages/home/index.js
const utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopDetail: {
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
      item.num = item.num > 10000 ? item.num / 10000 > 10000 ? Math.round(item.num / 100000000) + '亿' : Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      shopDetail: promoter
    })
  },
  shareShopName() {

  },
  toPhotoManage() {
    wx.navigateTo({
      url: ''
    });
  },
  //  获取 首页详情
  getShopDetail() {
    let that = this
    let times = 10
    let time = setInterval(() => {
      if (app.globalData.accessToken || times < 0) {
        if(!app.globalData.shopInfo) return app.toLoginPage()
        that.setData({
          shopDetail: app.globalData.shopInfo
        })
        clearInterval(time)
      } else {
        times--
      }
    }, 100)
  },

  onLoad: function (options) {
    this.getShopDetail()
    // this.formatNum(this.data.shopDetail)
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})