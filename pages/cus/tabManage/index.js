// pages/cus/tabManage/index.js

const app = getApp()
const util = require('../../../utils/util.js')
let pageNum = 0
Page({
  data: {
    tabList: []
  },

  // 前往查看标签内的内容
  toTabDetail(e) {
    let {
      id,
      labelName
    } = e.currentTarget.dataset.val
    app.navTo('/pages/cus/cusList/index?id=' + id + '&labelName=' + labelName)
  },

  // 获取标签数据
  getTabList(e) {
    util.request({
      url: '/customer/label/list',
      data: {
        id: getApp().globalData.shopInfo.storeVo.id,
        pageNum,
        pageSize:100
      }
    }).then((res) => {
      if (res.code == 200) {
        this.setData({
          tabList: res.data.data
        })
      } else {
        app.errorTimeOutBack('获取失败')
      }
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '标签管理'
    })
    this.getTabList()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})