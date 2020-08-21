// pages/home/index.js
const utils = require('../../utils/util.js')
const util = require('../../utils/util.js')
let app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeVo: {},
    shopDetail: {},
    fastMsg: [{
      num: '加载中',
      type: '客户量'
    },{
      num: '加载中',
      type: '商品销量'
    },{
      num: '加载中',
      type: '成交额'
    }],
    ShareId: '',
    shareDetail: {},
    shareType: '',
    albumManageFastMsg: [{
      num: '12',
      type: '已发布'
    }, {
      num: '200',
      type: '未发布'
    }]
  },

  // 格式化 fastMsg
  formatNum: function (data) {
    data.forEach((item) => {
      item.num = item.num > 10000 ? item.num / 10000 > 10000 ? item.num / (10000 * 10000) > 10000 ? item.num / (10000 * 10000 * 10000) > 10000 ? Math.round(item.num / 100000000 / 100000000) + '兆' : Math.round(item.num / 100000000 / 10000) + '万亿' : Math.round(item.num / 100000000) + '亿' : Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      fastMsg: data
    })
  },
  shareShopName() {},
  toPhotoManage() {
    if (!app.globalData.isLogin) return util.toLogin()
    app.navTo('/pages/albumManage/albumManageMain/index');
  },

  navTo(e) {
    if (!app.globalData.isLogin) return util.toLogin()
    app.navTo(e.currentTarget.dataset.url)
  },
  // 创建相册
  toCreateAlbum(e) {
    if (!app.globalData.isLogin) return util.toLogin()
    app.navTo('/pages/albumManage/newAlbum/index?openChoose=true')
  },

  // 获取 首页详情
  getShopDetail() {
    app = getApp()
    let that = this
    let times = 10
    let time = setInterval(() => {
      if (app.globalData.accessToken || times < 0) {
        if (!app.globalData.shopInfo) {
          clearInterval(time)
          // return app.toLoginPage()
        }
        that.setData({
          shopDetail: app.globalData.shopInfo,
          storeVo: app.globalData.shopInfo ? app.globalData.shopInfo.storeVo ? app.globalData.shopInfo.storeVo : {} : {}
        })
        setTimeout(() => {
          this.getFastMsg()
        }, 300)
        clearInterval(time)
      } else {
        times--
      }
    }, 100)
  },

  // 获取订单数据
  getFastMsg() {
    utils.request({
      url: '/order/getSellSituation',
      data: {
        storeId: this.data.storeVo.id
      },
      type: 'noLogin'
    }).then((res) => {
      // 这里注入了假数据， 待修改
      this.formatNum([{
        num: res.data ? res.data.buyerNum || 0 : 0,
        type: '客户量'
      }, {
        num: res.data ? res.data.goodsNum || 0 : 0,
        type: '商品销量'
      }, {
        num: res.data ? res.data.salesVolume || 0 : 0,
        type: '成交额'
      }])
    })
  },

  // 分享回调 - 来自商品卡片
  returnBack(e) {
    this.setData({
      shareType: 'goods',
      ShareId: e.detail.back.id,
      shareDetail: e.detail.back
    })
    wx.hideTabBar()
    this.selectComponent('#share').show()
  },

  // 分享档口
  shopShare(e) {
    this.setData({
      shareType: 'shop',
      ShareId: e.currentTarget.dataset.id,
      shareDetail: {
        type: 'shop',
        shopInfo: app.globalData.shopInfo
      }
    })
    wx.hideTabBar()
    this.selectComponent('#share').show()
  },

  // 关闭分享
  closeShare(e) {
    wx.showTabBar()
  },


  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
  },
  onReady: function () {},
  onShow: function () {
    this.getShopDetail()
    this.selectComponent('#fall').refresh()
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (e) {
    if (e.target && e.target.dataset.type == "goods") {
      let {
        sharedetail
      } = e.target.dataset
      return {
        title: sharedetail.title,
        imageUrl: sharedetail.image,
        path: 'pages/albumManage/newAlbum/index?id=' + sharedetail.id
      }
    }
  },
  onReachBottom: function () {
    this.selectComponent('#fall').getMore()
  }
})