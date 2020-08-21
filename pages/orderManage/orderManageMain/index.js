// pages/orderManage/orderDetail/index.js
const app = getApp()
const util = require('../../../utils/util.js')
let order_list = [1, 1, 1, 1, 1]
let lock = true
let swiperLock = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      '待接单',
      '待发货',
      '已完成',
      '已取消'
    ],
    typeStatus: [ 50, 60, 40, 0],
    selectType: 0,
    orderList: [],
    requestData: {
      keyWord: "",
      memberId: "",
      pageNum: 0,
      pageSize: 6,
      sellerId: "",
      source: "cloudPhoto",
      status: '',
      storeId: getApp().globalData.shopInfo ? getApp().globalData.shopInfo.storeVo.id : ''
    },
    searchWord: '',
    searchShow: false
  },
  watch: {},

  // 绑定搜索框 输入事件
  bindSearch(e) {
    this.setData({
      searchWord: e.detail.value
    })
  },

  // 绑定搜索框 取消事件 
  searchCancel(e) {
    let {
      requestData
    } = this.data
    requestData.keyWord = ''
    this.setData({
      searchWord: '',
      requestData,
      orderList: [],
    })
    this.initFn()
  },

  // 绑定搜索框 回车搜索事件
  searchStart(e) {
    let {
      requestData
    } = this.data
    requestData.keyWord = this.data.searchWord
    this.setData({
      requestData,
      orderList: [],
    })
    this.initFn()
  },

  // 切换tab页（滑动控制）
  swiperChaneg(e) {
    this.switchSubtitle(e.detail.current)
  },

  // 切换tab页（主函数）
  switchSubtitle(e) {
    var that = this
    if (swiperLock) return
    swiperLock = true
    if (e.currentTarget) {
      e = e.currentTarget.dataset.index
    }
    let node = wx.createSelectorQuery()
    node.selectAll('.type').boundingClientRect()
    node.exec((res) => {
      let selectType = {
        index: e,
        len: that.data.typeList[e].length,
        left: res[0][e].left
      }
      this.setData({
        selectType: selectType
      })
      setTimeout(() => {
        swiperLock = false
      }, 300)
      if (!this.data.orderList[e])
        this.getOrderList(e)
    })
  },

  // 初始化 订单列表
  initOrderList() {
    let orderList = []
    this.data.typeList.forEach((res) => {
      orderList.push()
    })
    this.setData({
      orderList
    })
  },

  // 继续加载订单
  getMoreOrderList(e) {
    if (!lock) return;
    lock = false
    wx.showLoading({
      title: '加载中'
    })
    let index = e.currentTarget.dataset.i
    let indexList = this.data.typeStatus
    let requestData = this.data.requestData
    if (requestData.storeId) {
      try {
        requestData.storeId = getApp().globalData.shopInfo.storeVo.id
      } catch (e) {
        app.noIconToast('系统警告：' + e)
      }
    }
    requestData.pageNum = order_list[index];
    requestData.status = indexList[index]
    util.request({
      url: 'order/getOrders',
      data: requestData
    }).then((res) => {
      wx.hideLoading()
      if (res.data.pages >= order_list[index]) {
        wx.showToast({
          title: '加载成功'
        })
        let {
          orderList
        } = this.data
        order_list[index]++;
        res.data.data.forEach((item) => {
          orderList[index].push(item)
        })
        this.setData({
          orderList: orderList
        })
      } else {
        wx.showToast({
          title: '没有更多数据',
          icon: 'none'
        })
      }
      lock = true
    })
  },

  refreshOrderlist(e) {
    this.getOrderList(e.currentTarget.dataset.i)
  },

  // 获得订单信息
  getOrderList(index) {
    wx.showLoading({
      title: '刷新中'
    })
    let indexList = this.data.typeStatus
    let {
      requestData
    } = this.data
    requestData.pageNum = 0
    requestData.status = indexList[index]
    requestData.storeId = getApp().globalData.shopInfo.storeVo.id
    util.request({
      url: 'order/getOrders',
      data: requestData
    }).then((res) => {
      wx.hideLoading()
      let {
        orderList
      } = this.data
      orderList[index] = res.data.data
      order_list[index] = 2
      this.setData({
        orderList: orderList
      })
    })
  },
  initFn() {
    this.switchSubtitle(0)
    this.initOrderList()
  },
  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()},
  onReady: function () {},
  onShow: function () {
    if (!app.globalData.isLogin) return util.toLogin()
    this.initFn()
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.getMoreOrderList(this.data.selectType.index)
  },
  onShareAppMessage: function () {},
})