// pages/login/index.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    checkFile: false,
    type: 'phone', // 用于控制当前页面状态 
    input: {
      phoneNumber: '',
      checkCode: ''
    }, // 用于保存 input 输入数据
    getCodeStatus: false,
    time: 60, //倒计时
  },

  checkBoxStatus(e) {
    console.log(e)
    this.setData({
      checkFile: !this.data.checkFile
    })
  },
  changeType(e) {
    this.setData({
      type: e.currentTarget.dataset.type
    })
  },
  loginWithWx(e) {

  },
  inputChange(e) {
    console.log(e)
    let {
      type
    } = e.currentTarget.dataset
    let {
      input
    } = this.data
    input[type] = e.detail.value
  },
  getCheckCode(e) {
    let {
      phoneNumber
    } = this.data.input
    if (this.checkPhone(phoneNumber)) return wx.showToast({
      title: '请输入正确的手机号', 
      icon: 'none',
      mask: true
    });
  },
  checkPhone(phone) {
    if (!(/^1[3456789]\d{9}$/.test(phone)))
      return true
    return false
  },

  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})