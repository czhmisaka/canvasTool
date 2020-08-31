// pages/dataCenter/goodsData/index.js
const util = require('../../../utils/util.js')
let app = getApp()
Page({
  data: {
    fastMsg: [{
      num: '加载中',
      type: '卖出件数'
    }, {
      num: '加载中',
      type: '成交金额'
    }],
    tabBarList: [
      'TOP5浏览榜',
      'TOP5销量榜'
    ],
    tabCheckIndex: 0,
    topGoodsList: [],
    timeCheckList: [{
      tab: '昨日',
      endTime: '',
      startTime: '',
      check: true
    }, {
      tab: '近7天',
      endTime: '',
      startTime: '',
      check: false
    }, {
      tab: '近30天',
      endTime: '',
      startTime: '',
      check: false
    }],
    onInitChart0(F2, config) {
      const chart = new F2.Chart(config);
      const data = [{
          value: 63.4,
          city: 'New York',
          date: '2011-10-01'
        },
        {
          value: 62.7,
          city: 'Alaska',
          date: '2011-10-01'
        },
        {
          value: 72.2,
          city: 'Austin',
          date: '2011-10-01'
        },
        {
          value: 58,
          city: 'New York',
          date: '2011-10-02'
        },
        {
          value: 59.9,
          city: 'Alaska',
          date: '2011-10-02'
        },
        {
          value: 67.7,
          city: 'Austin',
          date: '2011-10-02'
        },
        {
          value: 53.3,
          city: 'New York',
          date: '2011-10-03'
        },
        {
          value: 59.1,
          city: 'Alaska',
          date: '2011-10-03'
        },
        {
          value: 69.4,
          city: 'Austin',
          date: '2011-10-03'
        },
      ];
      chart.source(data, {
        date: {
          range: [0, 1],
          type: 'timeCat',
          mask: 'MM-DD'
        },
        value: {
          max: 300,
          tickCount: 4
        }
      });
      chart.area().position('date*value').color('city').adjust('stack');
      chart.line().position('date*value').color('city').adjust('stack');
      chart.render();
      // 注意：需要把chart return 出来
      return chart;
    },
  },

  // 时间划分 
  getTimeCheckList(e) {
    return new Promise((res, rej) => {
      let {
        timeCheckList,
        selectTime
      } = this.data
      let date = new Date()
      const today = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
      date.setTime(date.getTime() - 24 * 3600 * 1000)
      const yesterday = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
      date.setTime(date.getTime() - 6 * 24 * 3600 * 1000)
      const lastWeek = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
      date.setTime(date.getTime() - 23 * 24 * 3600 * 1000)
      const lastMonth = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + date.getDate()
      timeCheckList.forEach(item => {
        item.endTime = today
      })
      timeCheckList[0].startTime = yesterday
      timeCheckList[1].startTime = lastWeek
      timeCheckList[2].startTime = lastMonth
      this.setData({
        timeCheckList
      })
      res(this.data.storeId)
    })
  },

  // 修改当前所选时间
  changeTime(e) {
    let {
      timeCheckList
    } = this.data
    timeCheckList.forEach(item => {
      if (item.tab == e.currentTarget.dataset.tab) {
        item.check = true
      } else {
        item.check = false
      }
    })
    this.setData({
      timeCheckList
    })
  },

  // 修改当前所选tab
  changeTab(e) {
    let {
      tab,
      index
    } = e.currentTarget.dataset
    this.setData({
      tabCheckIndex: index
    })
  },


  // 在data 中拼入时间
  addTime(data) {
    this.data.timeCheckList.forEach(item => {
      if (item.check) {
        data.startTime = item.startTime
        data.endTime = item.endTime
      }
    })
    return data
  },

  // 获取今日商品数据
  getTodayGoodsData(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/top',
      data
    }).then(res => {

    })
  },

  // 获取图表数据
  getChartsData(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/goods/trend',
      data
    }).then(res => {})
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

  // 获取今日商品信息数据
  getFastMsg() {
    let data = {
      endTime: "",
      startTime: "",
      storeId: this.data.storeId
    }
    this.data.timeCheckList.forEach(item => {
      if (item.tab == "昨日") {
        data.startTime = item.startTime
        data.endTime = item.endTime
      }
    })
    util.request({
      url: '/order/getSellSituation',
      data
    }).then((res) => {
      this.formatNum([{
        num: res.data ? res.data.goodsNum || 0 : 0,
        type: '卖出件数'
      }, {
        num: res.data ? res.data.salesVolume || 0 : 0,
        type: '成交金额'
      }])
    })
  },

  // 加载图表数据
  initFn() {
    this.getTimeCheckList().then(res => {
      this.getChartsData()
      this.getTodayGoodsData()
    })
  },


  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.setData({
      options,
      storeId: options.id || getApp().globalData.shopInfo.storeVo.id
    })
    this.getFastMsg()
  },
  onReady: function () {},
  onShow: function () {
    setTimeout(() => {
      this.initFn()
    }, 500)
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    this.initFn()
    setTimeout(() => {
      wx.stopPullDownRefresh()
    }, 500)
  },
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})