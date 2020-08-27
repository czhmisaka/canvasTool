// pages/dataCenter/inComeData/index.js
const wx_charts = require('../../../utils/wxCharts/index.js')
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
    cusStruct: [{
      num: '加载中',
      type: '成交商品'
    }, {
      num: '加载中',
      type: '每笔订单'
    }],
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
    selectTime: {},
    onInitChart0,
  },

  // 时间划分 
  getTimeCheckList(e) {
    return new Promise((res, rej) => {
      let {
        timeCheckList,
        selectTime
      } = this.data
      let date = new Date()
      const today = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      date.setTime(date.getTime() - 24 * 3600 * 1000)
      const yesterday = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      date.setTime(date.getTime() - 6 * 24 * 3600 * 1000)
      const lastWeek = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      date.setTime(date.getTime() - 23 * 24 * 3600 * 1000)
      const lastMonth = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate()
      timeCheckList.forEach(item => {
        item.endTime = today
      })
      timeCheckList[0].startTime = yesterday
      timeCheckList[1].startTime = lastWeek
      timeCheckList[2].startTime = lastMonth
      selectTime = timeCheckList[0]
      this.setData({
        timeCheckList,
        selectTime
      })
      res()
      rej()
    })
  },

  // 修改当前所选时间
  changeTime(e) {
    let {
      timeCheckList,
      selectTime
    } = this.data
    timeCheckList.forEach(item => {
      if (item.tab == e.currentTarget.dataset.tab) {
        item.check = true
        selectTime = item
      } else {
        item.check = false
      }
    })
    this.setData({
      timeCheckList,
      selectTime
    })
  },

  // 获取top5成交客户
  getTop5Cus(e) {
    let topGoodsList = []
    topGoodsList.push({})
    topGoodsList.push({})
    topGoodsList.push({})
    topGoodsList.push({})
    topGoodsList.push({})
    this.setData({
      topGoodsList
    })
  },

  // 获取今日商品数据
  getTodayGoodsData(e) {

  },

  // 获取图表数据
  getChartsData(e) {
    let data = {
      endTime: "",
      startTime: "",
      storeId: this.data.storeId
    }
    this.data.timeCheckList.forEach(item => {
      if (item.check) {
        data.startTime = item.startTime
        data.endTime = item.endTime
      }
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

  // 获取客户数据
  getCusNumToday(e) {

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

  // 下单新老客构成  图表函数 
  newOrOldCusStuct(e) {
    let data = {
      storeId: this.data.storeId,
      startTime: this.data.selectTime.startTime,
      endTime: this.data.selectTime.endTime
    }
    // 请求未能成功
    util.request({
      url: '/customer/browser/num',
      data
    }).then((res) => {

    })
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.setData({
      options,
      storeId: options.id || getApp().globalData.shopInfo.storeVo.id
    })
    this.getTimeCheckList().then(res => {
      this.getChartsData()
      this.getFastMsg()
    })
  },
  onReady: function () {},
  onShow: function () {
    setTimeout(() => {
      this.getTop5Cus()
      this.newOrOldCusStuct()
    }, 1000)
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})


function onInitChart0(F2, config) {
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
}