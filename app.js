const utils = require('utils/util.js')
const tools = require('utils/appTool.js')
const {
  config
} = require('config/config.js')
// const {
//   promisifyAll,
//   promisify
// } = require('miniprogram-api-promise')
const wxp = {}
// 将wx的api proimse化
// promisifyAll(wx, wxp)
//app.js

App({
  ...tools,
  onLaunch: function () {
    // 检查小程序版本
    utils.checkVersion()
    this.getGlobalDataStorage()

    // 登录
    wx.login({
      success: res => {
        this.globalData.code = res.code
      },
      fail: () => {
        wx.showToast({
          title: '微信登录失败，请检查网络连接',
          icon: 'none'
        })
      }
    })


    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回 
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },

  setToken: (Authorization) => {
    this.globalData.accessToken = Authorization
  },
  checkCode: () => {
    utils.checkCode()
  },
  setStorage: function () {
    wx.setStorageSync('globalData', this.globalData)
  },
  getGlobalDataStorage: function () {
    if (wx.getStorageSync('globalData'))
      this.globalData = wx.getStorageSync('globalData');
  },
  globalData: {
    accessToken: null,
    userInfo: null,
    code: null,
    config: config,
    shopInfo: null
  }
})