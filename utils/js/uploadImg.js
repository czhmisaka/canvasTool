// const env = require('config.js');

const base64 = require('base64.js');
require('hmac.js');
require('sha1.js');
const Crypto = require('crypto.js');
const util = require('../util.js')


let getEnv = () => {
  return new Promise((resolve, reject) => {
    utils.request({
      url: '/account/oss/getSign',
      method: 'get'
    }).then((res) => {
      getApp().globalData.ossEnv = res.data
      resolve(res.data)
      // console.log('a',this.globalData.ossEnv)
    })
  })
}


/*
 *上传文件到阿里云oss
 *@param - filePath :图片的本地资源路径
  @param - path :上传oss哪个路径下
 *@param - successc:成功回调
 *@param - failc:失败回调
 */
const uploadFile = function (filePath, path, successc, failc) {
  let env = getApp().globalData.ossEnv
  if(!env){
    getEnv()
  }
  console.log(env)
  if (!filePath || filePath.length < 9) {
    wx.showModal({
      title: '图片错误',
      content: '请重试',
      showCancel: false,
    })
    return;
  }
  //存放图片命名格式：自定义时间戳给图片名字(可以自己改)
  const aliyunFileKey = env.dir + new Date().getTime() + Math.floor(Math.random() * 150) + '.png';
  const aliyunServerURL = env.host; //OSS地址，https
  const accessid = env.accessId;
  // const policyBase64 = getPolicyBase64();
  // const signature = getSignature(policyBase64);
  wx.uploadFile({
    url: aliyunServerURL, //开发者服务器 url
    filePath: filePath, //要上传文件资源的路径
    name: 'file', //必须填file
    formData: {
      'key': aliyunFileKey,
      'policy': env.policy,
      'OSSAccessKeyId': accessid,
      'signature': env.signature,
      'success_action_status': '200',
    },
    success: function (res) {
      if (res.statusCode != 200) {
        failc(new Error('上传错误:' + JSON.stringify(res)))
        return;
      }
      successc(aliyunServerURL + '/' + aliyunFileKey);
    },
    fail: function (err) {
      err.wxaddinfo = aliyunServerURL;
      failc(err);
    },
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