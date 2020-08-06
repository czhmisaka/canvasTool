// pages/orderManage/components/orderDetailBox/orderDetailBox.js
// const util = require('../../../../utils/util.js')

const util = require("../../../../utils/util");

Component({
  properties: {
    order_Detail: {
      type: Object,
      value: {},
      observer: function () {
        let {
          order_Detail
        } = this.properties
        let status, time;
        // time = this.timeset(new Date(order_Detail.createTime))
        time = order_Detail.createTime.replace('T',' ')
        switch (order_Detail.orderStatus) {
          case 0:
            status = '已取消';
            break;
          case 10:
            status = '待付款';
            break;
          case 20:
            status = '待发货';
            break;
          case 30:
            status = '待收货';
            break;
          case 40:
            status = '已完成';
            break;
          case 50:
            status = '待接单';
            break;
          case 60:
            status = '已接单';
            break;
        }
        this.setData({
          time,
          status
        })
      }
    },
    TaskType: Number
  },

  data: {
    cdn:getApp().getCdnEnv()
  },

  methods: {
    toDetail: function (e) {
      wx.navigateTo({
        url: "../orderDetail/index?id=" + this.properties.order_Detail.orderId
      })
    },
    timeset: function (date) {
      return util.formatTime(date)
    }
  }
})