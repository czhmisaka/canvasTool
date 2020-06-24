// pages/login/index.js
const app = getApp()
const utils = require('../../utils/util.js')
let time = 60 // 倒计时
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkFile: true,
    type: 'phone', // 用于控制当前页面状态 
    input: {
      phoneNumber: '13906600323',
      checkCode: ''
    }, // 用于保存 input 输入数据
    getCodeStatus: false,
    time: ''
  },


  // 修改当前 登录页面状态
  changeType(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },

  // 检查条约是否同意
  checkFile(e) {
    let that = this
    if (!that.data.checkFile) return wx.showToast({
      title: '请确认下方协议',
      icon: 'none',
    });
  },

  // 微信授权手机号登录
  loginWithWx(e) {
    this.checkFile()
    app.checkCode()
    console.log(e.detail)
    let {
      encryptedData,
      iv
    } = e.detail
    utils.request({
      url: '/login/wechat',
      data: {
        code: app.globalData.code,
        iv: iv,
        encryptedData: encryptedData
      }
    }).then(res => {
      if (res.code === 200) {
        app.globalData.userInfo = res.data
        wx.showToast({
          title: '登录成功',
          icon: 'success',
        });
      }
    })
  },

  // 使用验证码登录
  loginWithCheckCode(e) {
    this.checkFile()
    if (!this.checkInput()) return wx.showToast({
      title: '手机号和验证码不能为空',
      icon: 'none',
    });
    utils.request({
      url: '/workbench/login/seller',
      data: {
        code: this.data.input.checkCode,
        codeWechat: app.globalData.code,
        phone: this.data.input.phoneNumber
      }
    }).then((res) => {
      console.log(res)
    })

  },

  // 输入监听事件
  inputChange(e) {
    let {
      type
    } = e.currentTarget.dataset
    let {
      input
    } = this.data
    input[type] = e.detail.value
  },

  // 获取手机验证码
  getCheckCode(e) {
    if (this.data.getCodeStatus) return wx.showToast({
      title: '请不要频繁操作',
      icon: 'none',
    });;
    this.checkFile()
    let {
      phoneNumber
    } = this.data.input
    if (this.checkPhone(phoneNumber)) return wx.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
      mask: true
    });
    else {
      this.startClock()
      utils.request({
        url: '/login/sendsms/' + this.data.input.phoneNumber,
      }).then((res) => {
        if (res.code === 200 && res.msg === '请求成功') {

        }
      })
    }
  },

  // 手机号检查
  checkPhone(phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone)))
      return true
    return false
  },

  // 检查输入框是否为空
  checkInput() {
    let {
      input
    } = this.data
    if (input.phoneNumber && input.checkCode)
      return true
    return false
  },

  // 倒计时
  startClock() {
    let that = this
    that.setData({
      getCodeStatus: true,
      time
    })
    let clock = setInterval(() => {
      if (time <= 0) {
        clearInterval(clock)
        that.setData({
          getCodeStatus: false
        })
        time = 60
      }
      time = time - 1
      this.setData({
        time
      })
    }, 1000)
  },


  // 修改checkbox的属性
  checkBoxStatus(e) {
    this.setData({
      checkFile: !this.data.checkFile
    })
  },

  onLoad: function (options) {
    console.log(app.globalData)
    this.setData({
      code: app.globalData.code
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})