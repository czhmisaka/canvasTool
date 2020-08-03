// pages/cus/cusDetail/index.js

const app = getApp()
const util = require('../../../utils/util.js')

Page({
  data: {
    options: {},
    cusDetail: {},
  },

  // 加入/取消黑名单 -- 客户
  changeStatusInBlackList(e) {
    wx.showLoading({
      title: '处理中',
      mask: true
    })
    util.request({
      url: '/customer/blackList',
      data: {
        id: this.data.options.memId,
        status: 0,
        storeId: getApp().globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      wx.hideLoading()

    })
  },

  // 获得客户详细信息
  getCusDetail(e) {
    wx.showLoading({
      title: '加载中'
    })
    let {
      options
    } = this.data
    util.request({
      url: '/customer/detail/' + options.memId + '/' + getApp().globalData.shopInfo.storeVo.id,
      method: 'get'
    }).then((res) => {
      wx.hideLoading()
      if (res.code == 200) {
        wx.setNavigationBarTitle({
          title: res.data.nickName
        })
        this.setData({
          cusDetail: res.data
        })
      } else {
        app.errorTimeOutBack('获取失败')
      }
    })
  },

  onLoad: function (options) {
    this.setData({
      options
    })
    this.getCusDetail()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})