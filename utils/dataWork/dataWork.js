const {
    config
  } = require('../config/config.js')
  const api = require('../config/api.js')
  const app = getApp()
  
  const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()
    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
  }
  const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
  }
  
  let getConfig = (type = "baseUrl") => {
    switch (type) {
      case 'baseUrl':
        return config.api_protocal + config.api_server
    }
  }
  
  let request = obj => {
    obj.url = obj.url || '/'
    let baseUrl = config.api_protocal + config.api_server
    if (obj.type && obj.type == "noLogin") {
      return new Promise((resolve, reject) => {
        if (getApp().globalData.accessToken) {
          obj.header = {
            'content-type': 'application/json',
            'Authorization': getApp().globalData.accessToken
          }
        }
        wx.request({
          url: baseUrl + obj.url,
          data: obj.data || {},
          header: obj.header || {
            'content-type': 'application/json',
          },
          method: obj.method || 'post',
          success(res) {
            console.log('asd', res)
            resolve(res.data)
          }
        })
      })
    } else if (!obj.responseType) {
      return new Promise((resolve, reject) => {
        wx.request({
          url: baseUrl + obj.url,
          data: obj.data || {},
          header: obj.header || {
            'content-type': 'application/json',
            'Authorization': getApp().globalData.accessToken ? getApp().globalData.accessToken : ''
          },
          method: obj.method || 'post',
          success(res) {
            let fromPage = obj.fromPage
            switch (res.statusCode) {
              case 200:
                if (res.header.Authorization) {
                  resolve(res)
                }
                if (res.data.code == 403) {
                  // toLogin(fromPage)
                  // return noLoginShowToast()
                  return 0
                }
                if (res.data.errno == 501) {
                  // toLogin(fromPage)
                  // return noLoginShowToast()
                  return 0
                }
                resolve(res.data)
                break;
              case 503:
                return wx.showToast({
                  title: '系统开小差了',
                  icon: 'none',
                });
                break;
              case 500:
                return wx.showToast({
                  title: '系统开小差了',
                  icon: 'none',
                });
                break;
            }
          },
          fail(err) {
            reject(err)
          },
        })
      })
    } else {
      return new Promise((resolve, reject) => {
        wx.request({
          url: baseUrl + obj.url,
          data: obj.data || {},
          header: obj.header || {
            'content-type': 'application/json',
            'Authorization': getApp().globalData.accessToken ? getApp().globalData.accessToken : ''
          },
          method: obj.method || 'post',
          responseType: obj.responseType,
          success(res) {
            resolve(res)
          }
        })
      })
    }
  }
  
  // 弹窗提示 登录
  let noLoginShowToast = (e) => {
    let that = this
    wx.showModal({
      title: '前往登录',
      content: '商家登录后可以使用，是否前往登录',
      success: (res) => {
        if (res.confirm) {
          toLogin()
        } else if (res.cancel) {
  
        }
      }
    })
  }
  
  // 跳转回登录页
  let toLogin = (fromPage) => {
    let pageStock = getCurrentPages()
    let page = pageStock[pageStock.length - 1]
    let route = page.route
    if (page.options) {
      route = '/' + route + '?'
      let options = JSON.stringify(page.options)
      options = options.split('{')[1].split('}')[0].replace(/,/g, '&').replace(/:/g, '=')
      options.split('"').forEach((item) => {
        route += item
      })
    }
    try {
      getApp().cleanGlobalData()
      getApp().cleanStorage()
    } catch (e) {
      getApp().noIconToast('清楚缓存失败:' + e)
    } finally {
      return getApp().toLoginPage(fromPage ? fromPage : route)
    }
  }
  
  let handleNewsNum = (num, app) => {
    if (num < 0) return
    if (num > 99) num = '99+'
    // 没有消息不显示
    if (num === 0) {
      wx.removeTabBarBadge({
        index: 2
      })
      wx.hideTabBarRedDot({
        index: 2
      })
      app.globalData.newMsgNum = num
      return
    }
    // 保存未读消息数
    app.globalData.newMsgNum = num
    // 如果有未读消息就显示一个数量
    wx.setTabBarBadge({
      index: 2,
      text: num.toString()
    })
  }
  
  let getTouchData = (endX, endY, startX, startY) => {
    let turn = "";
    if (endX - startX > 50 && Math.abs(endY - startY) < 50) { //右滑
      turn = "right";
    } else if (endX - startX < -50 && Math.abs(endY - startY) < 50) { //左滑
      turn = "left";
    } else if (endY - startY > 50 && Math.abs(endX - startX) < 50) { //下滑
      turn = "bottom";
    } else if (endY - startY < -50 && Math.abs(endX - startX) < 50) { //上滑
      turn = "top";
    }
    return turn;
  }
  
  function get_random() {
    const s = [];
    const hexDigits = '0123456789abcdef';
    for (let i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = '4';
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
    s[8] = s[13] = s[18] = s[23] = '-';
    return s.join('');
  }
  
  function checkVersion() {
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            wx.showModal({
              title: '更新提示',
              content: '新版本已经准备好，是否重启应用？',
              success: function (res) {
                if (res.confirm) {
                  updateManager.applyUpdate()
                }
              }
            })
          })
          updateManager.onUpdateFailed(function () {
            wx.showModal({
              title: '已经有新版本了哟~',
              content: '新版本已经上线啦~，请您删除当前小程序，重新搜索打开哟~'
            })
          })
        }
      })
    }
  }
  
  function cartesianProductOf() {
    return Array.prototype.reduce.call(arguments, function (a, b) {
      var ret = [];
      a.forEach(function (a) {
        b.forEach(function (b) {
          ret.push(a.concat([b]));
        });
      });
      return ret;
    }, [
      []
    ]);
  }
  
  function validateNumber(val) {
    return val.replace(/\D/g, '')
  }
  
  function checkFloat(value) {
    if (value.split('.').length > 1 && value.split('.')[1].length) {
      value = validateNumber(value.split('.')[0]) * 1 + '.' + ((value.split('.')[1].substr(0, 2) * 1 || value.split('.')[1].substr(0, 2) * 1 == 0) ? value.split('.')[1].substr(0, 2) : '')
    } else if (value.split('.')[1] == '') {
      value = validateNumber(value.split('.')[0]) * 1 + '.'
    } else if (!value.split('.')[1]) {
      value = validateNumber(value.split('.')[0]) * 1
    }
    return value
  }
  
  
  module.exports = {
    toLogin,
    noLoginShowToast,
    checkFloat,
    checkVersion,
    validateNumber,
    get_random,
    request,
    getTouchData,
    formatTime,
    handleNewsNum,
    formatTime: formatTime,
    cartesianProductOf,
    getConfig
  }