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
    close: false,
    navTo: 0,
    exitApp: false,
    code: ''
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
      // this.toOtherMiniProgram(this.data.options.id)
      // return 0 
      let {
        encryptedData,
        iv
      } = e.detail
      let that = this
      util.request({
        url: 'order/share/auth',
        data: {
          code: that.data.code,
          iv: iv,
          encryptedData: encryptedData,
          orderId
        },
        type: 'noLogin'
      }).then(result => {
        // wx.showToast({
        //   title: JSON.stringify(result), //提示的内容,
        //   icon: 'none', //图标,
        //   duration: 2000, //延迟时间,
        // });
        if (result.data && result.data.type == "1") {
          that.setData({
            close: false
          })
          that.returnBack()
        } else {
          that.toOtherMiniProgram(that.data.options.id)
        }
      })

    },

    showLoginToast() {
      this.setData({
        navTo: 2
      })
    },

    // 跳转到其他小程序
    toOtherMiniProgram(e) {
      let that = this
      let id = that.data.options.id
      wx.navigateToMiniProgram({
        appId: "wx06a1bdb123d6a27e",
        path: '/pages/orderDetail/orderDetail?type=toOther&id=' + id,
        envVersion: 'trial',
        extraData: {
          id: id,
          type: 'toOther'
        },
        success(res) {
          that.setData({
            exitApp: true
          })
        }
      })
    },

    // 打开跳转
    showNav(num) {
      this.setData({
        navTo: num
      })
    },

    // 预处理 -开始
    init(options) {
      let that = this
      wx.login({
        success: function (res) {
          that.setData({
            code: res.code
          })
        }
      });
      this.setData({
        close: true
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
            },
            type: 'noLogin'
          }).then(res => {
            wx.hideLoading()
            if (res.code == 200) {
              if (res.data.type == 1) {
                // if (false) {
                this.setData({
                  close: false
                })
                resolve(res)
              } else {
                this.showNav(1)
                // this.toOtherMiniProgram(orderId)
              }
            } else if (res.code == 4001) {
              this.showLoginToast()
            } else if (res.code == 4002) {
              this.toHomePage()
            } else if (res.code == 500) {
              // app.toLoginPage()
            } else {}
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