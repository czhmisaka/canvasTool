function version() {
  let testMode
  try {
    testMode = require('./test_mode.js')
  } catch (err) {}

  try {
    switch (__wxConfig.envVersion) {
      case 'develop':
        return {
          api_server: "wxapi.91bkw.com/photo/workbench",
            api_protocal: "https://"
        }
        // 正式版
        case 'release':
          return {
            api_server: "wxapi.91bkw.com/photo/workbench",
              api_protocal: "https://"
          };
        default:
          return {
            api_server: "wxapi.91bkw.com/photo/workbench",
              api_protocal: "https://"
          }
    }
  } catch (err) {
    return {}
  }

}
let config = version()
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
let myRequest = obj => {
  obj.url = obj.url || '/'
  let baseUrl = config.api_protocal + config.api_server // 'https://match-dev.new-talk.cn'
  return new Promise((resolve, reject) => {
    wx.request({
      url: baseUrl + obj.url, // 仅为示例，并非真实的接口地址
      data: obj.data || {},
      header: obj.header || {
        'content-type': 'application/json', // 默认值
        // 'content-type': 'application/x-www-form-urlencoded'
        'token': getApp().globalData.accessToken ? getApp().globalData.accessToken.Token : ''

      },
      method: obj.method || 'get',
      success(res) {
        resolve(res)
      },
      fail(err) {
        reject(err)
      }
    })
  })
}

let uploadAudio = (obj, callback, msg_fail_callback) => {
  const MY_NAMESPACE = '1b671a64-40d5-491e-99b0-da01ff5f3341';
  let fileName = uuidv5(get_random() + obj.uid + Date.now().toString(), MY_NAMESPACE);
  //获取文件后缀
  let fileExt = obj.tmpFilePath.replace(/.+\./, "");
  let key = obj.catalog + '/messages' + '/' + obj.roomId + '/' + obj.uid + '/' + fileName + '.' + fileExt
  cos.postObject({
    Bucket: config.bucket,
    Region: config.region,
    Key: key,
    FilePath: obj.tmpFilePath,
  }, function (err, data) {
    if (err) return msg_fail_callback && msg_fail_callback()
    callback && callback('https://' + data.Location, obj.duration)
  })
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
    // onProgress: function (info) {
    //   console.log(JSON.stringify(info));
    // }
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

module.exports = {
  get_random,
  myRequest,
  myUploadFile,
  getTouchData,
  formatTime,
  handleNewsNum,
  uploadPhoto,
  uploadAudio,
  formatTime: formatTime
}