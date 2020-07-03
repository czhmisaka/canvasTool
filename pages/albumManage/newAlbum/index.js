// pages/albumManage/newAlbum/index.js

const uploadImage = require('../../../utils/js/uploadImg.js');
const utils = require('../../../utils/util.js');
const util = require('../../../utils/util.js');
const app = getApp()
let times = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imageList: [],
    word: '',
    goodsList: [],
    goodsSerial: "",
    goodsId:'',
    albumData: {},
    pageType: 0, // 0 新建 , 1 编辑 
    id: '',
    price: '',
    goodsPriceAddDtos: [],
    // 自定义弹窗控制
    checkStatus: false, // 自定义组件 显示控制
    checkData: {
      title: '',
      tabList: []
    }, // 自定义组件 显示数据
    
  },

  // 绑定输入
  typing: function (e) {
    if (this.data.pageType != 0) return wx.showToast({
      title: '暂时不支持修改',
      icon: 'none',
    });
    this.setData({
      word: e.detail.value
    })
  },

  // 选择图片
  chooseImg: function (e) {
    if (this.data.pageType != 0) return wx.showToast({
      title: '暂时不支持修改',
      icon: 'none',
    });
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

  // 删除
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

  // 上传图片预处理 -- 新建
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

  // 上传图片
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

  // 提交请求 -需要上传完图片后操作
  addPhoto: function (imageSrcList) {
    let photoImageMore = ''
    imageSrcList.forEach((item, index) => {
      photoImageMore += item
      if (index < imageSrcList.length - 1)
        photoImageMore += ','
    })
    console.log(this.data.goodsPriceAddDtos)
    if (this.data.goodsId && this.data.goodsPriceAddDtos.length < 1) return this.show('请添加价格信息')
    console.log(this.data.goodsId)
    utils.request({
      url: '/photo/add',
      data: {
        "contentType": 0,
        "goodsId": this.data.goodsId,
        "goodsPriceAddDtos": this.data.goodsPriceAddDtos,
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
          title: '上传成功',
          icon: 'success',
          success: () => {
            setTimeout(() => {
              wx.navigateBack({
                delta: 1
              });
            }, 1000)
          }
        });
      }
    })
  },

  // 删除 新建编辑状态中
  deleteAlbum: function () {
    util.request({
      url: 'photo/del',
      data: [this.data.id]
    }).then(res => {
      if (res.data) return wx.showToast({
        title: '删除成功',
        icon: 'success',
        success: res => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1000)
        }
      });
      wx.showToast({
        title: res.msg,
        icon: 'none',
        success: res => {
          setTimeout(() => {
            wx.navigateBack({
              delta: 1
            });
          }, 1000)
        }
      });
    })
  },

  // 图片相册处理
  imageAlbumInitFn: function (data) {
    this.setData({
      albumData: data,
      goodsSerial: data.goodsSerial,
      imageList: data.photoImageMore.split(','),
      word: data.photoDesc
    })
  },

  // 视频相册处理
  videoAlbumInitFn: function (data) {},

  // 获取相册详情
  getAlbumDetial: function (id) {
    this.setData({
      pageType: 1,
      id
    })
    utils.request({
      url: '/photo/' + id,
      method: 'get'
    }).then((res) => {
      if (res.data.photoImage) {
        this.imageAlbumInitFn(res.data)
      }
    })
  },

  // 通用跳转函数
  navTo: function (e) {
    if (this.data.pageType != 0) return wx.showToast({
      title: '暂时不支持修改',
      icon: 'none',
    });
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },

  // 通用弹窗提示
  show(word) {
    wx.showToast({
      title: word,
      icon: 'none',
    });
  },

  // 调起自定义选择
  letCusCheck(e) {
    let {
      type
    } = e.currentTarget.dataset
    let checkData = {
      title: type,
      tabList: this.data.price
    }
    this.setData({
      checkData,
      checkStatus: true
    })
  },

  // 跳出自定义选择
  checkCancel(e) {
    this.setData({
      checkStatus: false,
      checkData: {
        title: '',
        tabList: [],
        goodsPriceAddDtos: this.data.goodsPriceAddDtos
      }
    })
    setTimeout(() => {
      this.setData({
        checkStatus: false
      })
    }, 50)
  },

  // 获取选择项
  setCheck(e) {
    let {
      check
    } = e.detail
    console.log(check)
    this.setData({
      price: check.goodsPriceAddDtos[0].goodsPrice,
      goodsPriceAddDtos: check.goodsPriceAddDtos
    })
  },

  onLoad: function (options) {
    // 判断页面状态
    if (options.id) {
      this.getAlbumDetial(options.id)
      this.setData({
        pageType: 1
      })
    } else {
      this.setData({
        pageType: 0
      })
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})