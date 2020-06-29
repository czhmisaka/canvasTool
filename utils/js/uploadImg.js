const base64 = require('base64.js');
require('hmac.js');
require('sha1.js');
const Crypto = require('crypto.js');
const util = require('../util.js');
let env = {}

const getEnv = () => {
  return new Promise((resolve, reject) => {
    if (env.host) {
      resolve(env)
    } else {
      util.request({
        url: '/account/oss/getSign',
        method: 'get'
      }).then((res) => {
        if (res.code == 200) {
          env = res.data
          resolve(env)
        }
      })
    }
  })
}


const checkEnv = function () {
  return new Promise((resolve, reject) => {
    // getEnv().then(env=>{
    //   resolve(env)
    // })
    // let env = getApp().globalData.ossEnv
    if (!env.host) {
      let times = 0
      let timer = setInterval(() => {
        // let env = getApp().globalData.ossEnv
        if (env.host) {
          let res = env
          resolve(res)
          clearInterval(timer)
        } else if (times > 20) {
          clearInterval(timer)
          wx.showToast({
            title: '上传失败',
            icon: 'none',
          });
          reject()
        } else {
          times++
        }
      }, 200)
    } else {
      resolve(env)
    }
  })
}

const clearEnv = () => {
  env = {}
}
/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
  @param - path :上传oss哪个路径下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */
const uploadFile = (filePath, clear = false) => {
  return new Promise((resolve, reject) => {
    getEnv().then((res) => {
      if (!filePath || filePath.length < 9) {
        wx.showModal({
          title: '图片错误',
          content: '请重试',
          showCancel: false,
        })
        return;
      }
      const aliyunFileKey = res.dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
      const aliyunServerURL = res.host;
      const accessid = res.accessId;
      wx.uploadFile({
        url: aliyunServerURL, //开发者服务器 url
        filePath: filePath, //要上传文件资源的路径
        name: 'file', //必须填file
        formData: {
          'key': aliyunFileKey,
          'policy': res.policy,
          'OSSAccessKeyId': accessid,
          'signature': res.signature,
          'success_action_status': '200',
        },
        success: function (res) {
          if (res.statusCode != 200) {
            reject();
          }
          if(clear){
            clearEnv()
          }
          resolve(aliyunServerURL + '/' + aliyunFileKey)
        },
        fail: function (err) {
          err.wxaddinfo = aliyunServerURL;
          failc(err);
        },
      })
    })

  })

}

const getPolicyBase64 = function () {
  let date = new Date();
  date.setHours(date.getHours() + 87600);
  let srcT = date.toISOString();
  const policyText = {
    "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 
    "conditions": [
      ["content-length-range", 0, 5 * 1024 * 1024] // 设置上传文件的大小限制,5mb
    ]
  };
  const policyBase64 = base64.encode(JSON.stringify(policyText));
  return policyBase64;
}

const getSignature = function (policyBase64) {
  let env = getApp().globalData.ossEnv
  const accesskey = env.signature;
  const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
    asBytes: true
  });
  const signature = Crypto.util.bytesToBase64(bytes);
  return env.signature;
}

module.exports = uploadFile;