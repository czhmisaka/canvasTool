// pages/orderManage/components/sharePreDeal/sharePreDeal.js

const util = require("../../../../utils/util");
const app = getApp()
let orderId = ''
Component({
  properties: {
    orderId: String,
    userId: String
  },
  data: {
    options: {},
    show: true,
    close: false
  },
  methods: {
    // 主动触发函数
    returnBack(e) {
      this.setData({
        close: false
      })
      this.triggerEvent('returnBack', {
        options: this.data.options
      })
    },

    // 微信登录信息
    login(e) {
      let {
        encryptedData,
        iv
      } = e.detail
      wx.login({
        success: function (res) {
          console.log(res)
          util.request({
            url: 'order/share/auth',
            data: {
              code: res.code,
              iv: iv,
              encryptedData: encryptedData,
              orderId
            }
          }).then(result => {
            console.log(result)
            if (res.data.type == "1") {
              this.setData({
                close: false
              })
            } else {
              this.toOtherMiniProgram(this.options.id)
            }
          })
        }
      })
    },

    showLoginToast() {
      this.setData({
        show: true
      })
    },

    // 跳转到其他小程序
    toOtherMiniProgram(id) {
      wx.showModal({
        title: '好客多',
        content: '打开买家小程序查看订单',
        showCancel: false,
        cancelText: "否",
        confirmText: "是",
        confirmColor: 'skyblue',
        success: function (res) {
          if (res.cancel) {
            console.log('asd')
          } else {
            wx.navigateToMiniProgram({
              appId: "wx06a1bdb123d6a27e",
              path: '/pages/orderDetail/orderDetail',
              envVersion: 'develop',
              extraData: {
                orderId: id
              },
              success(res) {
                wx.showToast({
                  title: '跳转成功'
                })
              },
              complete(res) {
                console.log(res)
              }
            })
          }
        }
      })

    },

    // 预处理 -开始
    init(options) {
      this.setData({
        close:true
      })
      return new Promise((resolve, reject) => {
        this.setData({
          options
        })
        orderId = options.id
        wx.showLoading({
          title: '身份识别中'
        })
        if (orderId) {
          util.request({
            url: 'order/check',
            data: {
              id: orderId
            }
          }).then(res => {
            wx.hideLoading()
            if (res.code == 200) {
              if (res.data.type == 1) {
                this.setData({
                  close: false
                })
                resolve(res)
              } else {
                this.toOtherMiniProgram(id)
              }
            } else if (res.code == 4001) {
              this.showLoginToast()
            } else if (res.code == 4002) {
              this.toHomePage()
            } else if (res.code == 500) {
              app.toLogin()
            }
          })

        } else {
          return reject({
            type: false
          })
        }
      })
    },
  }
})