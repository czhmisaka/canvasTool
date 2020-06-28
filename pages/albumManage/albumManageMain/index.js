// pages/albumManage/alnumManageMain/index.js
const app = getApp()
const util = require('../../../utils/util.js')

Page({

  // 数据
  data: {
    typeList: [
      '全部',
      '未发布',
      '已发布'
    ],
    selectType: 0,
    orderList: [],
    data: [
      [],
      [],
      []
    ]
  },
  watch: {},

  // 页面切换
  swiperChaneg(e) {
    this.switchSubtitle(e.detail.current)
  },
  // 页面切换
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

  // 获取相册
  getAblum(e) {
    console.log(app.globalData)
    util.request({
      url: '/photo/list',
      data: {
        storeId: app.globalData.shopInfo.storeVo.id,
        pageNum: 1,
        pageSize: 100
      }
    }).then((res) => {
      res = res.data
      let {
        data
      } = this.data
      res.data.forEach((item) => {
        data[this.data.selectType.index].push(item)
      })
      this.setData({
        data: data
      })
    })
  },


  // 初始化函数
  initFn() {
    this.switchSubtitle(0)
    this.getAblum()
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