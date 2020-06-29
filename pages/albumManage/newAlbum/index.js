// pages/albumManage/newAlbum/index.js

const uploadImage = require('../../../utils/js/uploadImg.js');
const utils = require('../../../utils/util.js')
const app = getApp()
let times = 0
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
    let {
      imageList
    } = that.data
    if (imageList.length == 0) return wx.showToast({
      title: '请上传图片后提交',
      icon: 'none',
    });

    wx.showLoading({
      title: '上传中',
      mask: true,
      success: res => {}
    });
    that.upload(imageList)
  },
  upload(imageList, imageSrcList = []) {
    let that = this
    if (imageSrcList == []) {
      imageList.forEach(() => {
        imageSrcList.push([])
      })
    }
    let clear = (times == imageList.length - 1)
    uploadImage(imageList[times], clear).then((result) => {
      wx.hideLoading();
      times++
      wx.showLoading({
        title: times + '/' + imageList.length
      })
      imageSrcList[times - 1] = result
      if (times == imageList.length) {
        times = 0
        that.addPhoto(imageSrcList)
      } else {
        that.upload(imageList, imageSrcList)
      }
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
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})