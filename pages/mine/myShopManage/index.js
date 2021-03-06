// pages/mine/myShopManage/index.js

const app = getApp()
const util = require('../../../utils/util')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shopList: '',
    state: ['关闭中', '', '审核中']
  },

  //  通用跳转
  navTo: function (e) {
    app.navTo(e.currentTarget.dataset.url)
  },

  // 获取档口列表 
  getShopList: function (e) {
    util.request({
      url: '/store/list',
      data: {
        pageSize: 100,
        num: 1
      }
    }).then((res) => {
      if (res.code == 200) {
        this.setData({
          shopList: res.data.data
        })
      } else {
        app.noIconToast('没有获取到店铺哦')
      }
    })
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.getShopList()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})