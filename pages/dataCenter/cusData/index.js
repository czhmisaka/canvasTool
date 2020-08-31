// pages/dataCenter/cusData/index.js
const wxCharts = require('../../../utils/wxCharts/index.js')
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
Page({
  data: {
    fastMsg: [{
      num: '加载中',
      type: '总数'
    }, {
      num: '加载中',
      type: '新增'
    }, {
      num: '加载中',
      type: '拿货'
    }],
    topCusList: [{}, {}, {}, {}, {}],
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
      const data = [];
      data.push({
        value: 1 * 3 + Math.random(10) * 100,
        date: (1900 + 1) + '-12-10',
        type: '当日访客'
      })
      chart.source(data, {
        date: {
          type: 'timeCat',
          mask: 'YYYY-MM-DD'
        },
        value: {
          tickCount: 4
        }
      });
      chart.area().position('date*value').color('type').adjust('stack');
      chart.line().position('date*value').color('type').adjust('stack');
      chart.render();
      return chart;
    },
    onInitChart2(F2, config) {
      let data = []
      for (let i = 0; i < 100; i++) {
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

  // 获取top5成交客户
  getTop5Cus(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/orderData',
      data
    }).then(res => {
      if (res.code != 200) return app.noIconToast(res.msg)
      this.setData({
        topCusList: res.data
      })
    })
  },

  // 获取粉丝城市分布
  getCusCityData(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/browser/city',
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

  // 访客趋势
  getVisitTendData(e) {
    let data = this.addTime({
      storeId: this.data.storeId
    })
    util.request({
      url: '/customer/user/trend',
      data
    }).then(res => {
      if (res.code != 200) return app.noIconToast(res.msg)
      let Sdata = []
      res.data.forEach(item => {
        Sdata.push({
          value: item.num,
          date: item.days,
          type: '当日访客'
        })
      })
      let salesTrend = this.selectComponent('#tend');
      salesTrend.chart.changeData(Sdata)
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
    util.request({
      url: '/customer/getNum',
      data: {
        id: this.data.storeId
      }
    }).then((res) => {
      this.formatNum([{
        num: res.data ? res.data.total || 0 : 0,
        type: '总数'
      }, {
        num: res.data ? res.data.fansNum || 0 : 0,
        type: '新增'
      }, {
        num: res.data ? res.data.buyNum || 0 : 0,
        type: '拿货'
      }])
    })
  },

  // 更新 图表数据等
  initFn(e) {
    this.getTimeCheckList().then(res => {
      this.getCusNumToday()
      this.getCusCityData()
      this.getTop5Cus()
      this.getVisitTendData()
      this.getCusStructData()
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