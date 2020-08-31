// pages/mine/my/index.js
const util = require('../../../utils/util.js')
let app = getApp()
let time = 60
Page({
  data: {
    userData: {},
    pageType: '我的账号',
    code: '',
    phone: '',
    getCodeStatus: false,
    time: 0
  },


  // 绑定新手机号
  bindNewPhone(e) {
    if(this.checkPhone(this.data.phone)) return app.noIconToast('请输入正确的手机号')
    if(!this.data.code) return app.noIconToast('请输入验证码')
    getApp().getWxCode().then(codeWechat => {
      let data = {
        code: this.data.code,
        codeWechat,
        oldPhone:this.data.userData.phone,
        phone:this.data.phone
      }
      util.request({
        url: '/account/bindingPhone',
        data
      }).then(res => {
        app.successTimeOutBack(res.msg)
      })
    })
  },

  // 输入绑定
  bindInput(e) {
    let code = e.detail.value.length > 4 ? e.detail.value.slice(0, 4) : e.detail.value
    this.setData({
      code
    })
  },

  // 输入绑定 2
  bindInputPhone(e) {
    this.setData({
      phone: e.detail.value
    })
  },

  // 验证手机
  checkPhoneCode(phone) {
    this.setData({
      code: ''
    })
    return this.changeStatus('', '绑定新手机号')
    if (!this.data.code) return app.noIconToast('请填写验证码')
    wx.showLoading({
      title: '验证中',
      mask: true
    })
    util.request({
      method: 'get',
      url: '/account/Validated/' + this.data.code + '/' + phone
    }).then(res => {
      wx.hideLoading()
      if (res.data) {
        app.noIconToast('验证成功')
        this.setData({
          code: ''
        })
        this.changeStatus('', '绑定新手机号')
      } else {
        app.noIconToast('验证失败')
      }
    })
  },

  // 获取手机验证码
  getCheckCode(e) {
    if (this.data.getCodeStatus) return wx.showToast({
      title: '请不要频繁操作',
      icon: 'none',
    });
    let phoneNumber = e.currentTarget.dataset.phone
    if (this.checkPhone(phoneNumber)) return wx.showToast({
      title: '请输入正确的手机号',
      icon: 'none',
      mask: true
    });
    else {
      this.startClock()
      util.request({
        url: '/login/sendsms/' + phoneNumber,
        header: {
          'content-type': 'application/json',
        }
      }).then((res) => {
        if (res.code === 200 && res.msg === '请求成功') {
          if (!res.data) {
            time = -1
            return app.noIconToast({}, '请尝试重新发送')
          }
          app.noIconToast('发送成功')
        }
      })
    }
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

  // 手机号检查
  checkPhone(phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone)))
      return true
    return false
  },

  // 页面状态 修改模块
  changeStatus(e, type = null) {
    if (!type) {
      type = e.currentTarget.dataset.pagetype
    }
    if (type == '验证新手机号') {
      this.checkPhoneCode(this.data.userData.phone)
    } else if (type == '绑定新手机号') {
      time = -1
      this.setData({
        pageType: type
      })
      wx.setNavigationBarTitle({
        title: type
      })
    } else if (type == '确定') {
      this.bindNewPhone()
    } else {
      this.setData({
        pageType: type
      })
      wx.setNavigationBarTitle({
        title: type
      })
    }
  },

  // 退出登录
  logOut(e) {
    getApp().toLoginPage('/pages/home/index')
  },

  // 获取用户信息
  getUserData(e) {
    this.setData({
      userData: getApp().globalData.shopInfo
    })
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.getUserData()
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})