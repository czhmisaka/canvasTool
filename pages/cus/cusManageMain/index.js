// pages/cus/cusManageMain/index
const app = getApp()
const utils = require('../../../utils/util.js')
Page({
  data: {
    fastMsg: [],
    cusList: []
  },
  navTo(e) {
    app.navTo(e.currentTarget.dataset.url)
  },

  // 查看 今日数据
  toFastCusMsg(e) {
    let {
      msg
    } = e.currentTarget.dataset
    let type, labelName = msg.type
    switch (msg.type) {
      case '今日游客':
        type = 'getNum'
        break;
      case '今日拿货':
        type = 'getTodayOrderUser'
        break;
      case '今日粉丝':
        type = 'getTodayFans'
        break;
    }
    if (type == "getNum") return
    app.navTo('/pages/cus/cusList/index?type=' + type + '&labelName=' + labelName)
  },

  // 获取客户数据 // 留个坑 简化版
  getCusList(e) {
    utils.request({
      url: '/customer/list',
      data: {
        storeId: app.globalData.shopInfo.storeVo.id,
        pageSize: 100,
        pageNum: 0
      }
    }).then(res => {
      res = res.data.data
      res.forEach(item => {
        item.isBuyer = 1
      })
      let cusList = []
      res.forEach(item => {
        cusList.push(item)
      })
      this.setData({
        // cusList: res
        cusList
      })
    })
  },

  // 格式化 fastmsg
  formatNum: function (data) {
    // 格式化大数字输出
    data.forEach((item) => {
      item.num = item.num > 10000 ? item.num / 10000 > 10000 ? Math.round(item.num / 100000000) + '亿' : Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      fastMsg: data
    })
  },

  // 查看客户详情
  toDetail(e) {
    app.navTo('/pages/cus/cusDetail/index?memId=' + e.currentTarget.dataset.val + '&money=' + e.currentTarget.dataset.money)
  },

  // 获取客户数据
  getCusInfo(e) {
    utils.request({
      url: 'customer/getNum',
      data: {
        id: app.globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      res = res.data
      this.formatNum([{
        num: res.visitorNum || 0,
        type: '今日游客'
      }, {
        num: res.buyNum || 0,
        type: '今日拿货'
      }, {
        num: res.fansNum || 0,
        type: '今日粉丝'
      }])
    })
  },

  // 前往搜索
  searchStart(e) {
    app.navTo('/pages/cus/AddCusToTab/index?canAdd=false&search=' + e.detail.value)
  },


  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    if (!app.globalData.isLogin) return utils.toLogin()
    this.getCusInfo()
    this.getCusList()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})