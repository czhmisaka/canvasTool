const util = require("../../../utils/util")
const app = getApp()
// pages/orderDetail/orderDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    order: {},
    options: {},
    id: '',
    msgBox: false,
    letCusCheck: false,
    checkData: {},
    checkStatus: false,
    fastMailMsg: {},
    showFastBox: false
  },


  // 打开备注填写接口
  showMsgBox(e) {
    this.setData({
      msgBox: true
    })
  },

  // 自定义组件 快递设置 关闭
  cancel(e) {
    this.setData({
      checkStatus: false,
      checkData: {
        title: '录入快递信息',
        fastMail: {
          code: '',
          expressCode: '',
          expressName: '',
          orderExpressId: '',
        },
      }
    })
    setTimeout(() => {
      this.setData({
        checkStatus: false
      })
    }, 50)
  },

  // 展开和收起快递
  chanegShowFastBox(e) {
    this.setData({
      showFastBox: !this.data.showFastBox
    })
  },

  // 自定义组件 快递设置 获取回调
  returnFastMsg(e) {
    let {
      back
    } = e.detail
    this.setData({
      fastMailMsg: back
    })
    util.request({
      url: 'order/updateExpress',
      data: {
        "code": back.code,
        "expressCode": back.expressCode,
        "expressName": back.expressName,
        // "orderExpressId": back.orderExpressId,
        "orderId": this.data.id
      }
    }).then(res => {
      if (res.data && res.data.success) {
        let {order} = this.data
        order.expresses.push({
          "code": back.code,
          "expressCode": back.expressCode,
          "expressName": back.expressName,
          "orderId": this.data.id
        })
      } else {
        app.noIconToast('提交失败')
      }
    })
  },

  // 自定义组件 快递设置 打开弹窗
  openCusFastMailMsgToast(e) {
    if (this.data.order.orderStatus == 60) {
      let {
        checkData
      } = this.data
      if (!checkData.title) {
        checkData = {
          title: '录入快递信息',
          fastMail: {
            code: '',
            expressCode: '',
            expressName: '',
            orderExpressId: '',
          },
        }
      }
      this.setData({
        checkData,
        checkStatus: true
      })
    } else {
      app.noIconToast('只能在接单后编辑快递信息')
    }
  },

  // 确认接单
  checkIn(e) {
    util.request({
      url: '/order/confirmOrder/' + this.data.options.id,
      data: {},
      method: 'get'
    }).then((res) => {
      if (res.data.success) {
        wx.showToast({
          title: '接单成功',
          success: function () {
            setTimeout(() => {
              wx.navigateBack({
                deleta: 1
              })
            }, 1000)
          }
        })
        let pages = getCurrentPages()
        pages.forEach(item => {
          console.log(item.route)
          if (item.route == "pages/orderManage/orderManageMain/index") {
            let {
              orderList
            } = item.data
            orderList.forEach(tab => {
              tab.forEach(i => {
                if (i.orderId == this.data.options.id) {
                  i.orderStatus = 60
                }
              })
            })
            item.setData({
              orderList
            })
          }
        })
      }
    })
  },

  // 标记完成
  finish(e) {
    util.request({
      url: '/order/completeOrder/' + this.data.order.orderId,
      method: 'get'
    }).then((res) => {
      if (res.data.success) {
        app.successTimeOutBack('操作成功')
      }
    })
  },

  //  取消订单
  cancelAndRefund(e) {
    util.request({
      url: 'order/cancelAndRefund',
      data: {
        msg: '',
        id: this.data.order.orderId
      }
    }).then((res) => {
      app.errorTimeOutBack('操作成功')
    })
  },

  // 获取详情
  getDetail(options) {
    let that = this
    util.request({
      url: 'order/getOrderInfo/' + options.id,
      method: 'get',
    }).then(res => {
      if (res.code == 200) {
        let data = res.data
        data.createTime = data.createTime.replace('T', ' ')
        that.setData({
          order: res.data,
          options: options
        })
      } else {
        app.noIconToast('获取订单失败')
      }
    })
  },

  // 唤起回调
  returnBack(e) {
    let {
      options
    } = e.detail
    this.getDetail(options)
  },

  // 进入页面加载
  onLoad: function (options) {
    this.setData({
      id: options.id
    })
    app.getQuery().then((option) => {
      if (option != "null" && option.id) {
        let preCheck = this.selectComponent('#sharePreDeal')
        preCheck.init(option).then((res) => {
          this.getDetail(option)
        })
      } else {
        this.getDetail(options)
      }
    })
  },

  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {
    wx.stopPullDownRefresh()
  },
  onReachBottom: function () {},
  onShareAppMessage: function (e) {
    return {
      title: this.data.order.wxNickName + '的订单',
      imageUrl: this.data.order.goodsList[0].goodsImage,
      path: '/pages/orderManage/orderDetail/index?id=' + this.data.order.orderId + "&type=toCus"
    }
  }
})