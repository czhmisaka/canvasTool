// pages/orderManage/orderDetail/index.js
const app = getApp()
const util = require('../../../utils/util.js')

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
    selectType: 0,
    orderList: []
  },
  watch: {},

  swiperChaneg(e) {
    this.switchSubtitle(e.detail.current)
  },
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
    })
  },
  initOrderList() {
    let orderList = []
    this.data.typeList.forEach((res) => {
      orderList.push()
    })
    this.setData({
      orderList
    })
  },

  // 获得订单信息
  getOrderList() {
    util.request({
      url: 'order/getOrders',
      data: {
        "keyWord": "",
        "memberId": "",
        "pageNum": 0,
        "pageSize": 100,
        "sellerId": "",
        "source": "cloudPhoto",
        "status": 0,
        "storeId": app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      let {orderList} = this.data
      orderList[0] = res.data.data
      this.setData({
        orderList:orderList
      })
    })
  },
  initFn() {
    this.switchSubtitle(0)
    this.initOrderList()
    this.getOrderList()
  },
  onLoad: function (options) {
    this.initFn()
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