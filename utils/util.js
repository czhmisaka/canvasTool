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
  if (!obj.responseType) {
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
          switch (res.statusCode) {
            case 200:
              if (res.header.Authorization) {
                resolve(res)
              }
              if (res.data.code == 403) {
                toLogin()
              }
              if (res.data.errno == 501) {
                toLogin()
              }
              resolve(res.data)
              break;
            case 503:
              return wx.showToast({
                title: '系统开小差了',
                icon: 'none',
              });
              toLogin()
              break;
            case 500:
              return wx.showToast({
                title: '系统开小差了',
                icon: 'none',
              });
              toLogin()
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
        responseType: 'arraybuffer',
        success(res) {
          resolve(res)
        }
      })
    })
  }
}
let toLogin = () => {
  try {
    getApp().cleanGlobalData()
    getApp().cleanStorage()
  } catch (e) {} finally {
    return getApp().toLoginPage()
  }
}
let uploadPhoto = (obj, callback, msg_fail_callback) => {
  if (obj.index === obj.tmpFilePath.length) return
  const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff5f3341';
  let fileName = uuidv5(get_random() + obj.uid + Date.now().toString(), MY_NAMESPACE);
  //获取文件后缀
  let fileExt = obj.tmpFilePath[obj.index].replace(/.+\./, "");
  let key = obj.catalog + '/messages' + '/' + obj.roomId + '/' + obj.uid + '/' + fileName + '.' + fileExt
  cos.postObject({
    Bucket: config.bucket,
    Region: config.region,
    Key: key,
    FilePath: obj.tmpFilePath[obj.index], // wx.chooseImage 选择文件得到的 tmpFilePath
  }, function (err, data) {
    if (err) return msg_fail_callback && msg_fail_callback(obj.msg_list[obj.index])
    callback && callback('https://' + data.Location, obj.msg_list[obj.index])
    obj.index = obj.index + 1
    uploadPhoto(obj, callback)
  })
}
let myUploadFile = obj => {
  obj.url = obj.url || '/'
  let baseUrl = config.api_protocal + config.api_server // 'https://match-dev.new-talk.cn'
  return new Promise((resolve, reject) => {
    wx.uploadFile({
      url: baseUrl + obj.url,
      filePath: obj.filePath,
      header: {
        'Content-Type': 'multipart/form-data',
        // 'Authorization': wx.getStorageSync("access_token"),  //如果需要token的话要传
        'token': getApp().globalData.accessToken ? getApp().globalData.accessToken.Token : ''
      },
      name: obj.name || 'file',
      formData: obj.formData || {},
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
};


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
  const updateManager = wx.getUpdateManager();
  wx.getUpdateManager().onUpdateReady(function () {
    wx.showModal({
      title: '更新提示',
      content: '新版本已经准备好，是否重启应用？',
      success: function (res) {
        if (res.confirm) {
          // 新的版本已经下载好，调用 applyUpdate 应用新版本并重启
          updateManager.applyUpdate()
        }
      }
    })
  })
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
    value = validateNumber(value.split('.')[0]) * 1 + '.' + validateNumber(value.split('.')[1].substr(0, 2)) * 1
  } else if (value.split('.')[1] == '') {
    value = validateNumber(value.split('.')[0]) * 1 + '.'
  } else if (!value.split('.')[1]) {
    value = validateNumber(value.split('.')[0]) * 1
  }
  return value
}


module.exports = {
  checkFloat,
  checkVersion,
  validateNumber,
  get_random,
  request,
  myUploadFile,
  getTouchData,
  formatTime,
  handleNewsNum,
  uploadPhoto,
  formatTime: formatTime,
  cartesianProductOf,
  getConfig
}