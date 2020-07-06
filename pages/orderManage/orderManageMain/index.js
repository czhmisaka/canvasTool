// pages/orderManage/orderDetail/index.js
const app = getApp()
const util = require('../../../utils/util.js')
let order_list = [0, 0, 0, 0, 0]
let lock = true
Page({

  /**
   * 页面的初始数据
   */
  data: {
    typeList: [
      '全部',
      '待接单',
      '已接单',
      '已完成',
      '已取消'
    ],
    typeStatus:['', 50, 60, 40, 0],
    selectType: 0,
    orderList: []
  },
  watch: {},

  // 切换tab页（滑动控制）
  swiperChaneg(e) {
    this.switchSubtitle(e.detail.current)
  },

  // 切换tab页（主函数）
  switchSubtitle(e) {
    var that = this
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
    let indexList = ['', 50, 60, 40, 0];
    util.request({
      url: 'order/getOrders',
      data: {
        "keyWord": "",
        "memberId": "",
        "pageNum": order_list[index],
        "pageSize": 6,
        "sellerId": "",
        "source": "cloudPhoto",
        "status": indexList[index],
        "storeId": app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      wx.hideLoading()
      if (res.data.pages-1 > order_list[index]) {
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
      }else{
        wx.showToast({
          title: '没有更多数据',
          icon:'none'
        })
      }
      lock = true
    })
  },

  // 获得订单信息
  getOrderList(index) {
    let indexList = ['', 50, 60, 40, 0];
    util.request({
      url: 'order/getOrders',
      data: {
        "keyWord": "",
        "memberId": "",
        "pageNum": 0,
        "pageSize": 6,
        "sellerId": "",
        "source": "cloudPhoto",
        "status": indexList[index],
        "storeId": app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      let {
        orderList
      } = this.data
      orderList[index] = res.data.data
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
    this.initFn()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {
    this.getMoreOrderList(this.data.selectType.index)
  },
  onShareAppMessage: function () {},
  onReachBottom: function () {}
})