const utils = require('utils/util.js')
const tools = require('utils/appTool.js')
const dataWork = require('utils/dataWork/dataWork.js')
const {
  config
} = require('config/config.js')
// const {
//   promisifyAll,
//   promisify
// } = require('miniprogram-api-promise')
// 将wx的api proimse化
// promisifyAll(wx, wxp)
//app.js

App({
  globalData: {
    accessToken: null,
    userInfo: null,
    code: null,
    config: config,
    shopInfo: null,
    ossEnv: {},
    refreshHome: false,
    ossEnv: {},
    needRefresh: [],
    onShowOptions: {},
    dataWorkHistory: []
  },

  ...dataWork,
  ...tools,


  onShow: function (options) {
    this.globalData.onShowOptions = options.query
    setTimeout(() => {
      this.setSceneWhenMPStart(options)
    }, 1000)
  },

  onHide: function () {
    wx.setStorageSync('globalData', this.globalData)
  },

  onLaunch: function () {
    // 检查小程序版本
    utils.checkVersion()
    this.getGlobalDataStorage()

    // 获取渲染必备数据
    // 相关组件 components/navBarCustom
    // 自定义 导航栏
    let menuButtonObject = wx.getMenuButtonBoundingClientRect();
    wx.getSystemInfo({
      success: res => {
        let statusBarHeight = res.statusBarHeight,
          navTop = menuButtonObject.top, //胶囊按钮与顶部的距离
          navHeight = statusBarHeight + menuButtonObject.height + (menuButtonObject.top - statusBarHeight) * 2; //导航高度
        this.globalData.navHeight = navHeight;
        this.globalData.navTop = navTop;
        this.globalData.windowHeight = res.windowHeight;
      },
      fail(err) {
        console.log(err);
      }
    })


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
  setStorage: function () {
    wx.setStorageSync('globalData', this.globalData)
  },
  getGlobalDataStorage: function () { // 缓存机制需要修改
    if (wx.getStorageSync('globalData'))
      this.globalData = wx.getStorageSync('globalData');
    else {
      wx.reLaunch({
        url: '/pages/login/index'
      })
    }
  },

  // 检查当前用户的档口是否填写完全
  checkShopInfoInGlobalData(e) {
    let {
      storeVo
    } = this.globalData.shopInfo
    let key_checkList = ['storeLogo', 'storeName', 'storeAddress'],
      back = true;
    key_checkList.forEach((item, index) => {
      if (storeVo[item] == '' || storeVo[item] == null || !storeVo[item]) back = false
    })
    return back
  },
})