// pages/home/index.js
const utils = require('../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storeVo: {},
    shopDetail: {},
    fastMsg: [],
    ShareId: '',
    shareDetail: {}
  },

  // 格式化 fastMsg
  formatNum: function (data) {
    // 格式化大数字输出
    data.forEach((item) => {
      item.num = item.num > 10000 ? item.num / 10000 > 10000 ? Math.round(item.num / 100000000) + '亿' : Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      fastMsg: data
    })
  },
  shareShopName() {},
  toPhotoManage() {
    wx.navigateTo({
      url: '/pages/albumManage/albumManageMain/index'
    });
  },
  // 获取 首页详情
  getShopDetail() {
    let that = this
    let times = 10
    let time = setInterval(() => {
      if (app.globalData.accessToken || times < 0) {
        if (!app.globalData.shopInfo) {
          clearInterval(time)
          return app.toLoginPage()
        }
        that.setData({
          shopDetail: app.globalData.shopInfo,
          storeVo: app.globalData.shopInfo.storeVo
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
      }
    }).then((res) => {
      let {
        buyerNum,
        goodsNum,
        salesVolume
      } = res.data

      // 这里注入了假数据， 待修改
      this.formatNum([{
        num: buyerNum || 5137,
        type: '购买人数'
      }, {
        num: goodsNum || 11380,
        type: '售出件数'
      }, {
        num: salesVolume || 624312,
        type: '售出金额'
      }])
    })

  },
  // 分享回调
  returnBack(e) {
    this.setData({
      ShareId: e.detail.back.id,
      shareDetail: e.detail.back
    })
    wx.hideTabBar()
    this.selectComponent('#share').show()
  },
  // 关闭分享
  closeShare(e) {
    wx.showTabBar()
  },


  onLoad: function (options) {
    this.getShopDetail()
  },
  onReady: function () {},
  onShow: function () {
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
        path: 'pages/albumManage/newAlbum/index?id' + sharedetail.id
      }
    }

  },
  onReachBottom: function () {
    this.selectComponent('#fall').getMore()
  }
})