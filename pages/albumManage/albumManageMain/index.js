// pages/albumManage/alnumManageMain/index.js
const app = getApp()
const util = require('../../../utils/util.js')
let swiperLock = false
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
    console.log(e.detail)
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
      setTimeout(() => {
        if (that.data.data[e].length == 0) {
          that.getAblum()
        }
      }, 10)
    })
  },

  // 获取相册
  getAblum(e) {
    if (swiperLock) return
    swiperLock = true
    let that = this
    console.log(that.data.selectType.index)
    let photoShow = that.data.selectType.index != 0 ? that.data.selectType.index - 1 : ''
    console.log('asd', photoShow)
    util.request({
      url: '/photo/list',
      data: {
        storeId: app.globalData.shopInfo.storeVo.id,
        pageNum: 1,
        pageSize: 100,
        photoShow
      }
    }).then((res) => {
      res = res.data
      let {
        data
      } = that.data
      res.data.forEach((item) => {
        data[that.data.selectType.index ? that.data.selectType.index : 0].push(item)
      })
      that.setData({
        data: data
      })
      swiperLock = false
    })
  },


  // 初始化函数
  initFn() {
    this.switchSubtitle(0)
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