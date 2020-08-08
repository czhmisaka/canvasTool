// pages/cus/search/index.js

const app = getApp()
const util = require('../../../utils/util.js')
let pageNum = 1
let lock = false

Page({
  data: {
    cusList: [],
    options: {},
    isRefresh: false,
    searchWord: ''
  },

  // 搜索框绑定函数
  bindConfirm: function (e) {
    this.setData({
      searchWord: e.detail.value
    })
    pageNum = 0
    setTimeout(() => {
      this.getCusList()
    }, 50)
  },

  selectResult: function (e) {
    console.log('select result', e.detail)
  },


  // 获取客户列表
  getCusList(e) {
    if (lock) return;
    lock = true
    wx.showLoading({
      title: pageNum == 0 ? "搜索中" : "加载中",
      mask: true
    })
    util.request({
      url: '/customer/list',
      data: {
        keyword: this.data.searchWord,
        pageNum,
        pageSize: 10,
        storeId: getApp().globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      wx.hideLoading()
      lock = false
      if (res.code == 200) {
        if (res.data && res.data.data.length == 0) return app.noIconToast('没有搜索到相关客户')
        if (res.data && pageNum > res.data.pages) return app.noIconToast('已经到底啦')
        let {
          cusList
        } = this.data
        if (this.data.isRefresh) {
          cusList = []
          wx.stopPullDownRefresh()
        }
        res.data.data.forEach((item, index) => {
          cusList.push(item)
        })
        pageNum++
        this.setData({
          cusList,
          isRefresh: false,
        })
      } else {
        app.noIconToast('获取客户列表失败')
      }
    })
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    wx.setNavigationBarTitle({
      title: '搜索客户'
    })
    this.setData({
      options,
      searchWord: options.search
    })
    pageNum = 0
    this.getCusList()
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    pageNum = 0
    this.setData({
      isRefresh: true
    })
    this.getCusList()
    this.setData({
      search: this.search.bind(this)
    })
  },
  onReachBottom: function () {
    this.getCusList()
  },
  onShareAppMessage: function () {}
})