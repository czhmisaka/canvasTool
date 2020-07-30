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
    showFastBox: false,
    priceStatus: false,
    price: 0
  },


  // 打开备注填写接口
  showMsgBox(e) {
    this.setData({
      msgBox: true
    })
  },

  // 打开修改价格状态
  changePriceStatus(e) {
    this.setData({
      priceStatus: true,
      price: this.data.order.orderAmount
    })
  },

  // 绑定价格输入
  bindPrice(e) {
    this.setData({
      price: util.checkFloat(e.detail.value)
    })
  },

  // 确认提交订单
  checkPrice(e) {
    app.showModal('确认价格为：' + this.data.price).then(result => {
      wx.showLoading({
        title: '处理中'
      })
      if (!result) {
        this.setData({
          priceStatus: false,
        })
        return wx.hideLoading();
      }
      util.request({
        url: 'order/modifyOrderPrice',
        data: {
          newPrice: this.data.price,
          orderId: this.data.order.orderId
        }
      }).then(res => {
        wx.hideLoading()
        let {
          order
        } = this.data
        if (res.code == 200) {
          order.orderAmount = this.data.price
          this.setData({
            priceStatus: false,
            order
          })
        } else {
          this.setData({
            priceStatus: false,
          })
          app.noIconToast('修改失败')
        }
      })
    })
  },

  // 自定义组件 快递设置 关闭
  cancel(e) {
    this.setData({
      checkStatus: false,
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
      showFastBox: true
    })
  },

  // 自定义组件 快递设置 删除快递
  deleteFastMail(e) {
    util.request({
      url: '/order/deleteExpress/' + e.detail.back,
      method: 'get'
    }).then(res => {
      if (res.code == 200) {
        app.noIconToast('删除成功')
        let {
          order
        } = this.data
        order.expresses.forEach((item, index) => {
          if (item.id == e.detail.back) {
            order.expresses.splice(index, 1);
          }
        })
        this.setData({
          order
        })
      } else {
        app.noIconToast('删除失败')
      }
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
    if (!back.expressName) return 0;
    wx.showLoading({
      mask: true
    })
    let data = {}
    if (back.orderExpressId) {
      data = {
        "code": back.code,
        "expressCode": back.expressCode,
        "expressName": back.expressName,
        "orderExpressId": back.orderExpressId,
        "orderId": this.data.id
      }
    } else {
      data = {
        "code": back.code,
        "expressCode": back.expressCode,
        "expressName": back.expressName,
        "orderId": this.data.id
      }
    }
    util.request({
      url: 'order/updateExpress',
      data
    }).then(res => {
      if (res.data && res.data.success) {
        let {
          order
        } = this.data
        if (back.orderExpressId) {
          order.expresses.forEach((res, index) => {
            if (res.id == back.orderExpressId) {
              res.shippingExpressCode = back.expressCode
              res.shippingCode = back.code
              res.shippingExpressName = back.expressName
            }
          })
        } else {
          order.expresses.push({
            "code": back.code,
            "expressCode": back.expressCode,
            "expressName": back.expressName,
            "orderId": this.data.id
          })
        }
        this.setData({
          order
        })
      } else {
        app.noIconToast('提交失败')
      }
      wx.hideLoading()
      this.reFresh()
    })
  },

  // 自定义组件 快递设置 打开弹窗
  openCusFastMailMsgToast(e) {
    if (this.data.order.orderStatus == 60 || this.data.order.orderStatus == 30) {
      let checkData = {}
      let {
        index
      } = e.currentTarget.dataset
      if (e.currentTarget.dataset.index) {
        checkData = {
          notNew: true,
          title: '修改快递信息',
          fastMail: {
            code: index.shippingCode,
            expressCode: index.shippingExpressCode,
            expressName: index.shippingExpressName,
            orderExpressId: index.id,
          }
        }
      } else {
        checkData = {
          notNew: false,
          title: '录入快递信息',
          fastMail: {}
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
    let that = this
    app.showModal('确认接单').then(res => {
      if (!res) return 0;
      util.request({
        url: '/order/confirmOrder/' + this.data.options.id,
        data: {},
        method: 'get'
      }).then((res) => {
        if (res.data.success) {
          wx.showToast({
            title: '接单成功'
          })
          that.reFresh()
          let pages = getCurrentPages()
          pages.forEach(item => {
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
    })
  },

  // 标记完成
  finish(e) {
    app.showModal('确定完成订单？').then(res => {
      if (!res) return 0;
      util.request({
        url: '/order/completeOrder/' + this.data.order.orderId,
        method: 'get'
      }).then((res) => {
        if (res.data.success) {
          app.noIconToast('操作成功')
          this.reFresh()
        }
      })
    })
  },

  //  取消订单
  cancelAndRefund(e) {
    let that = this
    wx.showModal({
      content: '确认取消订单？',
      success: (asd) => {
        if (asd.confirm) {
          util.request({
            url: 'order/cancelAndRefund',
            data: {
              msg: '',
              orderId: that.data.order.orderId
            }
          }).then((res) => {
            app.errorTimeOutBack('操作成功')
          })
        }
      }
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
        data.receiveTime = data.receiveTime ? data.receiveTime.replace('T', ' ') : ''
        let order = res.data
        that.setData({
          order,
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

  // 刷新页面
  reFresh() {
    this.onLoad(this.data._options)
  },

  // 进入页面加载
  onLoad: function (options) {
    this.setData({
      id: options.id,
      _options: options
    })
    app.getQuery().then((option) => {
      if (option != "null" && option.id) {
        let preCheck = this.selectComponent('#sharePreDeal')
        preCheck.init(option).then((res) => {
          this.setData({
            _options: option
          })
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