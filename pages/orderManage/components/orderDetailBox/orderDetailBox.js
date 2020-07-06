// pages/orderManage/components/orderDetailBox/orderDetailBox.js
// const util = require('../../../../utils/util.js')

const util = require("../../../../utils/util");
const { WxApiRoot } = require("../../../../config/api");

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
        time = this.timeset(new Date(order_Detail.createTime))
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
            status = '交易完成';
            break;
          case 50:
            status = '待接单';
            break;
          case 60:
            status = '已确认';
            break;
        }
        this.setData({
          time,
          status
        })
      }
    },
    TaskType:Number
  },

  data: {

  },

  methods: {
    toDetail:function(e){
      wx.navigateTo({
        url:"../orderDetail/orderDetail?id="+this.properties.order_Detail.orderId
      })
    },
    timeset:function(date){
    return util.formatTime(date)  
    }
  }
})