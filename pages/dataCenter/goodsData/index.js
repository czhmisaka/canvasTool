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
    topGoodsList: [],
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


  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.setData({
      options,
      storeId: options.id || getApp().globalData.shopInfo.storeVo.id
    })
  },
  onReady: function () {},
  onShow: function () {
    setTimeout(()=>{
      this.getTop5Cus()
    },1000)
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})