// pages/cus/AddCusToTab/index.js
const app = getApp()
const util = require('../../../utils/util.js')
let pageNum = 1
let lock = false
Page({
  data: {
    cusList: [],
    options: {},
    isRefresh: false,
    canAdd: false,
    keyword: ''
  },

  // 改变选择状态 
  checkIn(e) {
    console.log(e)
    if (!this.data.canAdd) {
      return app.navTo('/pages/cus/cusDetail/index?memId=' + e.currentTarget.dataset.val + '&money=' + e.currentTarget.dataset.money)
    }
    let {
      cusList
    } = this.data
    cusList[e.currentTarget.dataset.checkin].check = !cusList[e.currentTarget.dataset.checkin].check
    this.setData({
      cusList
    })
  },

  // 添加客户到标签并返回
  addCusToTab(e) {
    let {
      cusList
    } = this.data
    let memberIds = []
    cusList.forEach(item => {
      if (item.check) {
        memberIds.push(item.memberId)
      }
    })
    util.request({
      url: 'customer/label/addCustomer',
      data: {
        labelId: this.data.options.labelId,
        memberIds,
        storeId: getApp().globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      if (res.code == 200) {
        app.successTimeOutBack('添加成功')
      } else {
        app.noIconToast('添加失败')
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
      url: '/customer/list',
      data: {
        keyword: this.data.keyword,
        pageNum,
        pageSize: 10,
        storeId: getApp().globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      wx.hideLoading()
      lock = false
      if (res.code == 200) {
        if (res.data && res.data.data.length == 0) return app.noIconToast('没有找到客户')
        if (res.data && pageNum > res.data.pages) return app.noIconToast('已经到底啦')
        let {
          cusList
        } = this.data
        if (this.data.isRefresh) {
          cusList = []
          wx.stopPullDownRefresh()
        }
        res.data.data.forEach((item, index) => {
          item.check = false
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

  // 获取搜索内容
  searchStart(e) {
    this.setData({
      keyword: e.detail.value
    })
    pageNum = 1
    this.setData({
      isRefresh: true
    })
    this.getCusList()
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    if (options.search) {
      this.setData({
        keyword:options.search
      })
      wx.setNavigationBarTitle({
        title: '检索客户'
      })
    } else {
      wx.setNavigationBarTitle({
        title: '检索客户'
      })
    }
    this.setData({
      options,
      canAdd: options.canAdd ? options.canAdd == 'true' : false
    })
    pageNum = 1
    if (this.data.options.type)
      this.getTodayCus()
    else
      this.getCusList()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    pageNum = 1
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