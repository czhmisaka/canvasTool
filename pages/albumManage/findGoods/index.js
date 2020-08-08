// pages/albumManage/findGoods/index.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({
  data: {
    searchValue: '',
    goodsList: [], // 商品列表
  },

  // 绑定搜索框输入
  searchInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  },

  // 回车搜索
  searchStart(e) {
    util.request({
      url: '/photo/serial',
      data: {
        id: this.data.searchValue,
        storeId: app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      res = res.data
      res.sort((a, b) => {
        return b.goodsId - a.goodsId
      })
      this.setData({
        goodsList: res
      })
    })
  },

  // 通用跳转
  navTo(e) {
    app.navTo( e.currentTarget.dataset.url);
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.searchStart()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onReachBottom: function () {}
})