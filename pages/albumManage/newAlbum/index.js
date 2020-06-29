// pages/albumManage/newAlbum/index.js

const uploadImage = require('../../../utils/js/uploadImg.js');
const utils = require('../../../utils/util.js')
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    word: ''
  },
  typing: function (e) {
    this.setData({
      word: e.detail.value
    })
  },
  chooseImg: function (e) {
    wx.chooseImage({
      count: (20 - this.data.imageList.length) > 9 ? '9' : (20 - this.data.imageList.length),
      success: res => {
        let {
          imageList
        } = this.data
        res.tempFilePaths.forEach(item => {
          if (imageList.length < 20) {
            imageList.push(item)
          } else {
            this.setData({
              imageList
            })
            return wx.showToast({
              title: '最多上传20张图哦',
              icon: 'none',
            });
          }
        })
        this.setData({
          imageList
        })
      }
    });
  },
  delete: function (e) {
    let {
      index
    } = e.currentTarget.dataset
    let {
      imageList
    } = this.data
    imageList.splice(index, 1)
    this.setData({
      imageList
    })
  },
  submit: function (e) {
    let that = this
    let times = 0
    let {
      imageList
    } = that.data
    if (imageList.length == 0) return wx.showToast({
      title: '请上传图片后提交', //提示的内容,
      icon: 'none', //图标,
      duration: 2000, //延迟时间,
      mask: true, //显示透明蒙层，防止触摸穿透,
      success: res => {}
    });
    let imageSrcList = []
    wx.showLoading({
      title: '上传中', //提示的内容,
      mask: true, //显示透明蒙层，防止触摸穿透,
      success: res => {}
    });
    imageList.forEach((item, index) => {
      imageSrcList.push([])
    })
    imageList.forEach((item, index) => {
      uploadImage(item, 'images/',
        function (result) {
          times++
          imageSrcList[index] = result
          if (times == imageList.length) {
            that.addPhoto(imageSrcList)
          }
        },
        function (result) {}
      )
    })
  },
  addPhoto: function (imageSrcList) {
    let photoImageMore = ''
    imageSrcList.forEach((item, index) => {
      photoImageMore += item
      if (index < imageSrcList.length - 1)
        photoImageMore += ','
    })
    utils.request({
      url: '/photo/add',
      data: {
        "contentType": 0,
        "goodsId": "",
        "goodsPriceAddDtos": [{
          "editType": 0,
          "favorableNum": 0,
          "goodsPhotoId": "",
          "goodsPrice": 0
        }],
        "photoDesc": this.data.word,
        "photoImage": imageSrcList[0],
        "photoImageMore": photoImageMore,
        "photoVedio": "",
        "photoVedioMore": "",
        "storeId": app.globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      wx.hideLoading();
      if (res.data) {
        this.setData({
          imageList: [],
          word: ''
        })
        wx.showToast({
          title: '上传成功', //提示的内容,
          icon: 'success', //图标,
          duration: 2000, //延迟时间,
          mask: true, //显示透明蒙层，防止触摸穿透,
        });
      }
    })
  },
  onLoad: function (options) {},
  onReady: function () {},
  onShow: function () {
    // console.log(app.globalData.ossEnv)
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})