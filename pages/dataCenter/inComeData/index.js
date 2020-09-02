// pages/dataCenter/inComeData/index.js
const wxCharts = require('../../../utils/wxCharts/index.js')
const wx_charts = require('../../../utils/wxCharts/index.js')
const util = require('../../../utils/util.js')
let app = getApp()
let cusStruct = new wxCharts({
  animation: true,
  canvasId: 'cusStruct',
  type: 'ring',
  extra: {
    ringWidth: 25,
    pie: {
      offsetAngle: -45
    }
  },
  series: [{
    name: '新客户',
    data: 15,
    stroke: true,
    format: (e, item) => {
      return item.name + ' : ' + e * 100 + '%'
    }
  }, {
    name: '老客户',
    data: 35,
    stroke: false,
    format: (e, item) => {
      return item.name + ' : ' + e * 100 + '%'
    }
  }],
  disablePieStroke: true,
  width: 335,
  height: 200,
  dataLabel: true,
  legend: false,
  background: '#f5f5f5',
  padding: 0
});
let pieChart0 = null
let pieChart1 = null
let pieChart_0 = null
let pieChart_1 = null

Page({
  data: {
    chartView: false,
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
    onInitChart2,
  },
  // 开关预览显示
  open(e) {
    this.setData({
      chartView: true
    })
  },
  close(e) {
    this.setData({
      chartView: false
    })
  },

  // 时间划分 
  getTimeCheckList(e) {
    return new Promise((res, rej) => {
      let {
        timeCheckList,
        selectTime
      } = this.data
      let date = new Date()
      const today = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      date.setTime(date.getTime() - 24 * 3600 * 1000)
      const yesterday = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      date.setTime(date.getTime() - 6 * 24 * 3600 * 1000)
      const lastWeek = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
      date.setTime(date.getTime() - 23 * 24 * 3600 * 1000)
      const lastMonth = date.getFullYear() + '-' + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)) + '-' + (date.getDate() < 10 ? '0' + date.getDate() : date.getDate())
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
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    setTimeout(() => {
      this.initFn()
    }, 500)
    setTimeout(() => {
      wx.hideLoading()
    }, 1500)
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

// 获取客户城市分布
getCusCityData(e) {
  let data = this.addTime({
    storeId: this.data.storeId
  })
  util.request({
    url: '/customer/city',
    data
  }).then(res => {
    if (res.code != 200) return app.noIconToast(res.msg)
    let Sdata = []
    res.data.forEach(item => {
      Sdata.push({
        area: item.city || '其他',
        percent: item.percent,
      })
    })
    Sdata.sort((a, b) => {
      return -a.percent + b.percent
    })
    let salesTrend = this.selectComponent('#area');
    salesTrend.chart.changeData(Sdata.slice(0, 5))
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

  // 获取图表数据
  getChartsData(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/sale/trend',
      data
    }).then(res => {
      if (res.code != 200) return app.noIconToast(res.msg)
      let Sdata = [];
      res.data.forEach(item => {
        Sdata.push({
          value: item.price,
          date: item.days,
          type: '当日销售额'
        })
      })
      let salesTrend = this.selectComponent('#tend');
      salesTrend.chart.changeData(Sdata)
    })
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

  // 格式化销售数据
  formatNum_Avg(data) {
    data.forEach((item) => {
      item.num = item.num > 10000 ? item.num / 10000 > 10000 ? item.num / (10000 * 10000) > 10000 ? item.num / (10000 * 10000 * 10000) > 10000 ? Math.round(item.num / 100000000 / 100000000) + '兆' : Math.round(item.num / 100000000 / 10000) + '万亿' : Math.round(item.num / 100000000) + '亿' : Math.round(item.num / 10000) + '万' : item.num
    })
    this.setData({
      cusStruct: data
    })
  },


  // 新老客 构成
  getCusStructData(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/browser/num',
      data
    }).then(res => {
      if (res.code != 200) return app.noIconToast(res.msg)
      let series = []
      if (res.data.newBrowser == 0 && res.data.oldBrowser == 0)
        series = [{
          name: '暂无',
          data: 1,
          stroke: true,
          format: (e, item) => {
            return "暂无下单客户"
          }
        }]
      else {
        series.push({
          name: '新客户',
          data: res.data.newBrowser || 1,
          stroke: true,
          format: (e, item) => {
            return item.name + ' : ' + e * 100 + '%'
          }
        })
        series.push({
          name: '老客户',
          data: res.data.oldBrowser || 1,
          stroke: true,
          format: (e, item) => {
            return item.name + ' : ' + e * 100 + '%'
          }
        })
      }
      cusStruct.updateData({
        series
      });
    })
  },
  // 获取今日商品信息数据
  getFastMsg() {
    let data = this.addTime({
      storeId: this.data.storeId
    }, '昨日')
    util.request({
      url: '/order/getSellSituation',
      data
    }).then((res) => {
      if (res.code != 200) return app.noIconToast(res.msg)
      this.formatNum([{
        num: res.data ? res.data.goodsNum || 0 : 0,
        type: '卖出件数'
      }, {
        num: res.data ? res.data.salesVolume || 0 : 0,
        type: '成交金额'
      }])
      this.formatNum_Avg([{
        num: res.data ? res.data.goodsAvg || 0 : 0,
        type: '成交商品'
      }, {
        num: res.data ? res.data.orderAvg || 0 : 0,
        type: '每笔订单'
      }])
    })
  },

  // 下单 商品 品类分布图
  getGoodsCategoryDistribution(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/class',
      data
    }).then(res => {
      if (res.code != 200) return app.noIconToast(res.msg)
      let series1 = [],
        series2 = []
      res.data.forEach(item => {
        series1.push({
          name: item.gcName + item.count+'件',
          data: item.count,
        })
        series2.push({
          name: item.gcName + '￥' + (item.price > 10000 ? item.price / 10000 > 10000 ? item.price / (10000 * 10000) > 10000 ? item.price / (10000 * 10000 * 10000) > 10000 ? Math.round(item.num / 100000000 / 100000000) + '兆' : Math.round(item.price / 100000000 / 10000) + '万亿' : Math.round(item.price / 100000000) + '亿' : Math.round(item.price / 10000) + '万' : item.price),
          data: item.price,
        })
      })
      pieChart0 = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas0',
        type: 'pie',
        series: series1,
        width: 137.5,
        height: 200,
        dataLabel: false,
      });
      pieChart1 = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas1',
        type: 'pie',
        series: series2,
        width: 137.5,
        height: 200,
        dataLabel: false,
      });
      pieChart_0 = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas_0',
        type: 'pie',
        series: series1,
        width: 300,
        height: 300,
        dataLabel: true,
      });
      pieChart_1 = new wxCharts({
        animation: true,
        canvasId: 'pieCanvas_1',
        type: 'pie',
        series: series2,
        width: 300,
        height: 300,
        dataLabel: true,
      });
    })
  },


  initFn(e) {
    this.getTimeCheckList().then(res => {
      this.getChartsData()
      this.getFastMsg()
      this.getGoodsCategoryDistribution()
      this.getCusStructData()
      this.getCusCityData()
    })
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.setData({
      options,
      storeId: options.id || getApp().globalData.shopInfo.storeVo.id
    })
  },
  onReady: function () {},
  onShow: function () {
    this.initFn()
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


function onInitChart0(F2, config) {
  const chart = new F2.Chart(config);
  const data = [{
    value: 63.4,
    type: 'New York',
    date: '2011-10-01'
  }];
  chart.source(data, {
    date: {
      range: [0, 1],
      type: 'timeCat',
      mask: 'MM-DD'
    },
    value: {
      formatter(e) {
        return e.toFixed(1)
      },
      tickCount: 4
    }
  });
  chart.area().position('date*value').color('type').adjust('stack');
  chart.line().position('date*value').color('type').adjust('stack');
  chart.render();
  // 注意：需要把chart return 出来
  return chart;
}

function onInitChart2(F2, config) {
  let data = []
  for (let i = 0; i < 5; i++) {
    data.push({
      area: '其他' + i,
      percent: i,
    })
  }
  const chart = new F2.Chart(config);
  chart.source(data, {
    percent: {
      min: 0,
      formatter: function formatter(val) {
        return (val * 100).toFixed(1) + '%';
      }
    }
  });
  chart.interval().position('area*percent').color('area').adjust('stack');
  chart.render();
  return chart
}