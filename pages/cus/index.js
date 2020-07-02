// pages/cus/index.js
const app = getApp()
const utils = require('../../utils/util.js')
Page({
  data: {
    fastMsg: [],
    cusList:[]
  },

  // 获取客户数据 // 留个坑 简化版
  getCusList(e){
    utils.request({
      url:'/customer/list',
      data:{
        storeId:app.globalData.shopInfo.storeVo.id,
        pageSize:100,
        pageNum:0
      }
    }).then(res=>{
      this.setData({
        cusList:res.data.data
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


  onLoad: function (options) {
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