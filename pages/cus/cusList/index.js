// pages/cus/cusList/index.js

const app = getApp()
const util = require('../../../utils/util.js')
let pageNum = 1
let lock = false
Page({
  data: {
    cusList: [],
    options: {},
    isRefresh: false
  },

  // 查看客户详情
  toDetail(e) {
    app.navTo('/pages/cus/cusDetail/index?memId=' + e.currentTarget.dataset.val + '&money=' + e.currentTarget.dataset.money)
  },

  // 获取今日数据
  getTodayCus() {
    if (lock) return;
    lock = true
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    util.request({
      url: '/customer/' + this.data.options.type,
      data: {
        pageNum,
        pageSize: 10,
        id: getApp().globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      wx.hideLoading()
      lock = false
      if (res.code == 200) {
        if (res.data && res.data.data.length == 0) return app.noIconToast('暂时还没有客户，点击按钮可以添加')
        if (res.data && pageNum + 1 > res.data.pages) return app.noIconToast('已经到底啦')
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
        this.setData({
          cusList,
          isRefresh: false
        })
        pageNum++
      } else {
        app.noIconToast('获取客户列表失败')
      }
    })
  },

  // 获取客户列表
  getCusList(e) {
    if (lock) return;
    lock = true
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    util.request({
      url: '/customer/label/list/customer',
      data: {
        id: this.data.options.id,
        pageNum,
        pageSize: 10,
        storeId: getApp().globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      wx.hideLoading()
      lock = false
      if (res.code == 200) {
        if (res.data && res.data.data.length == 0) return app.noIconToast('该标签下暂时还没有客户，点击按钮可以添加')
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
          isRefresh: false
        })
      } else {
        app.noIconToast('获取客户列表失败')
      }
    })
  },

  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: options.labelName
    })
    this.setData({
      options
    })
    pageNum = 0
    if (this.data.options.type)
      this.getTodayCus()
    else
      this.getCusList()
  },
  onReady: function () {},
  onShow: function () {

  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    pageNum = 0
    this.setData({
      isRefresh: true
    })
    if (this.data.options.type)
      this.getTodayCus()
    else
      this.getCusList()
  },
  onReachBottom: function () {
    if (this.data.options.type)
      this.getTodayCus()
    else
      this.getCusList()
  },
  onShareAppMessage: function () {}
})