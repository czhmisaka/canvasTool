// pages/orderManage/components/orderDetailBox/orderDetailBox.js
// const util = require('../../../../utils/util.js')

const util = require("../../../../utils/util");

Component({
  /**
   * 组件的属性列表
   */
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
            status = '已提交';
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
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {

    timeset:function(date){
    return util.formatTime(date)  
    }
  }
})