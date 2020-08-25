// pages/dataCenter/cusData/index.js
const util = require('../../../utils/util.js')
let app = getApp()
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
    onInitChart1(F2, config) {
      const data = [{
        const: 'const',
        type: '交通出行',
        money: 51.39
      }, {
        const: 'const',
        type: '饮食',
        money: 356.68
      }, {
        const: 'const',
        type: '生活日用',
        money: 20.00
      }, {
        const: 'const',
        type: '住房缴费',
        money: 116.53
      }];
      const chart = new F2.Chart(config)
      chart.source(data);
      chart.coord('polar', {
        transposed: true,
        radius: 0.9,
        innerRadius: 0.5
      });
      chart.axis(false);
      chart.legend(false);
      chart.tooltip(false);
      chart.interval().position('const*money').adjust('stack').color('type', ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14']);
      chart.render();
      return chart
    },
    onInitChart2(F2, config) {
      const data = [{
        country: 'Europe',
        year: '1750',
        value: 163,
        percent: 0.24511278195488723
      }, {
        country: 'Asia',
        year: '1750',
        value: 502,
        percent: 0.7548872180451128
      }, {
        country: 'Europe',
        year: '1800',
        value: 203,
        percent: 0.24224343675417662
      }, {
        country: 'Asia',
        year: '1800',
        value: 635,
        percent: 0.7577565632458234
      }, {
        country: 'Europe',
        year: '1850',
        value: 276,
        percent: 0.2543778801843318
      }, {
        country: 'Asia',
        year: '1850',
        value: 809,
        percent: 0.7456221198156682
      }, {
        country: 'Europe',
        year: '1900',
        value: 408,
        percent: 0.3011070110701107
      }, {
        country: 'Asia',
        year: '1900',
        value: 947,
        percent: 0.6988929889298893
      }, {
        country: 'Europe',
        year: '1950',
        value: 547,
        percent: 0.2806567470497691
      }, {
        country: 'Asia',
        year: '1950',
        value: 1402,
        percent: 0.7193432529502309
      }, {
        country: 'Europe',
        year: '1999',
        value: 729,
        percent: 0.16708686683474674
      }, {
        country: 'Asia',
        year: '1999',
        value: 3634,
        percent: 0.8329131331652533
      }, {
        country: 'Europe',
        year: '2050',
        value: 628,
        percent: 0.10651289009497965
      }, {
        country: 'Asia',
        year: '2050',
        value: 5268,
        percent: 0.8934871099050203
      }, {
        country: 'Europe',
        year: '2100',
        value: 828,
        percent: 0.10227272727272728
      }, {
        country: 'Asia',
        year: '2100',
        value: 7268,
        percent: 0.8977272727272727
      }];
      const chart = new F2.Chart(config);
      chart.source(data, {
        percent: {
          min: 0,
          formatter: function formatter(val) {
            return (val * 100).toFixed(0) + '%';
          }
        }
      });
      chart.tooltip({
        custom: true, // 自定义 tooltip 内容框
        onChange: function onChange(obj) {
          const legend = chart.get('legendController').legends.top[0];
          const tooltipItems = obj.items;
          const legendItems = legend.items;
          const map = {};
          legendItems.forEach(function (item) {
            map[item.name] = _.clone(item);
          });
          tooltipItems.forEach(function (item) {
            const name = item.name;
            const value = item.value;
            if (map[name]) {
              map[name].value = value;
            }
          });
          legend.setItems(_.values(map));
        },
        onHide: function onHide() {
          const legend = chart.get('legendController').legends.top[0];
          legend.setItems(chart.getLegendItems().country);
        }
      });
      chart.interval()
        .position('year*percent')
        .color('country')
        .adjust('stack');
      chart.render();

      return chart
    },

  },

  // 获取top5成交客户
  getTop5Cus(e) {

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
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})