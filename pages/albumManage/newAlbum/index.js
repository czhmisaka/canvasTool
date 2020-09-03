// pages/albumManage/newAlbum/index.js

const uploadImage = require('../../../utils/js/uploadImg.js');
const utils = require('../../../utils/util.js');
const util = require('../../../utils/util.js');
const {
  config
} = require('../../../config/config.js');
const app = getApp()
let times = 0
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cdn: config.cdn,
    imageList: [],
    word: '',
    goodsList: [],
    goodsSerial: "",
    goodsId: '',
    albumData: {},
    pageType: 0, // 0 新建 , 1 编辑 
    id: '',
    price: [{
      favorableNum: 0,
      goodsPrice: 0
    }],
    goodsPriceAddDtos: [],
    // 自定义弹窗控制
    checkStatus: false, // 自定义组件 显示控制
    checkData: {
      title: '',
      tabList: []
    }, // 自定义组件 显示数据
    isVideo: false,
    videoDetail: [],
    wholePlay: false,
    options: null
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

  // 预览图片 
  preWatchImg(e) {
    wx.previewImage({
      current: e.currentTarget.dataset.url,
      urls: this.data.isVideo ? [this.data.videoDetail.thumbTempFilePath] : this.data.imageList
    });
  },

  // 预览视频
  toWholePlay(e) {
    this.setData({
      wholePlay: true
    })
  },

  // 选择图片
  chooseImg: function (e) {
    if (this.data.pageType != 0) return wx.showToast({
      title: '暂时不支持修改',
      icon: 'none',
    });
    wx.chooseMedia({
      count: (20 - this.data.imageList.length) > 9 ? '9' : (20 - this.data.imageList.length),
      sizeType: ['compressed', 'original'],
      mediaType: this.data.imageList.length != 0 ? ['image'] : ['image', 'video'],
      sourceType: ['album', 'camera'],
      maxDuration: 30,
      success: res => {
        if (res.type == "image") {
          let {
            imageList
          } = this.data
          res.tempFiles.forEach(item => {
            if (imageList.length < 20) {
              imageList.push(item.tempFilePath)
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
        } else if (res.type == "video") {
          let videoDetail = res.tempFiles[0]
          videoDetail.duration = Math.round(videoDetail.duration, 4) + ' s'
          this.setData({
            videoDetail,
            isVideo: true
          })
        }
      },
      fail: res => {
        wx.navigateBack()
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
    app.setNeedRefresh('pages/albumManage/albumManageMain/index', {
      refresh: true
    })
    this.setData({
      imageList
    })
  },

  // 删除视频
  deleteVideo: function (e) {
    this.setData({
      videoDetail: {},
      isVideo: false
    })
  },

  // 上传图片预处理 -- 新建
  submit: function (e) {
    let that = this
    let {
      imageList,
      videoDetail
    } = that.data
    if (imageList.length == 0) {
      if (!videoDetail.duration) return app.noIconToast('请选择照片或者视频后提交')
      else {
        app.setNeedRefresh('pages/albumManage/albumManageMain/index', {
          refresh: true
        })
        wx.showLoading({
          title: '上传中',
          mask: true
        });
        that.upload([videoDetail.thumbTempFilePath, videoDetail.tempFilePath])
      }
    } else {
      app.setNeedRefresh('pages/albumManage/albumManageMain/index', {
        refresh: true
      })
      wx.showLoading({
        title: '上传中',
        mask: true,
        success: res => {}
      });
      that.upload(imageList)
    }
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
    let data = {
      "contentType": 0,
      "goodsId": this.data.goodsId,
      "goodsPriceAddDtos": this.data.goodsPriceAddDtos,
      "photoDesc": this.data.word,
      "photoImage": imageSrcList[0],
      "photoImageMore": photoImageMore,
      "photoVedio": "",
      "photoVedioMore": "",
      "storeId": app.globalData.shopInfo.storeVo.id,
      "goodsSerial": this.data.goodsSerial,
      "goodsAddDto":this.data.albumData.goodsAddDto,
      "labelIds":this.data.albumData.labelIds||[]
    }
    if (this.data.isVideo) {
      data.photoImageMore = []
      data.photoVedio = imageSrcList[1]
    }
    if (this.data.goodsId && this.data.goodsPriceAddDtos.length < 1) return this.show('请添加价格信息')
    utils.request({
      url: '/photo/savePhoto',
      // url:'photo/add',
      data
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
            app.setNeedRefresh('/pages/albumManage/albumManageMain/index', {
              refresh: true
            })
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

  // 打开删除弹窗
  openDeleteAlbum: function (e) {
    let that = this
    wx.showModal({
      title: '删除相册',
      content: '确定要删除该相册？',
      showCancel: true,
      success: function (res) {
        if (res.confirm) {
          app.setNeedRefresh('/pages/albumManage/albumManageMain/index', {
            refresh: true
          })
          that.deleteAlbum()
        }
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
    let price = []
    let imageList = []
    let videoDetail = {}
    let isVideo = false
    if (data.photoVedio) {
      videoDetail.thumbTempFilePath = (data.photoImage[0] != 'h' ? this.data.cdn : '') + data.photoImage
      videoDetail.tempFilePath = (data.photoVedio[0] != 'h' ? this.data.cdn : '') + data.photoVedio
      isVideo = true
    } else {
      data.photoImageMore.split(',').forEach(item => {
        if (item[0] != 'h')
          imageList.push(getApp().getCdnEnv() + item)
        else
          imageList.push(item)
      })
    }
    data.goodsPriceVos.forEach(item => {
      price.push(item)
    })
    price = price.sort((a, b) => {
      return a.goodsPrice - b.goodsPrice
    })
    wx.setNavigationBarTitle({
      title: '查看相册'
    })
    this.setData({
      isVideo,
      albumData: data,
      goodsSerial: data.goodsSerial,
      imageList,
      word: data.photoDesc,
      price,
      videoDetail
    })
  },

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
    app.navTo(e.currentTarget.dataset.url);
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
    if (this.data.pageType == 1) return this.show('编辑功能未开放')
    let {
      type
    } = e.currentTarget.dataset
    let checkData = {
      title: type,
      tabList: this.data.price,
      isNew: (this.data.pageType == 0),
      priceData: this.data.albumData.goodsPriceVos,
      type: this.data.price.length > 1 ? true : false
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
    this.setData({
      price: check.goodsPriceAddDtos,
      goodsPriceAddDtos: check.goodsPriceAddDtos
    })
  },

  // 绑定商品组件的输入
  setGoodsAddDto(e) {
    let {
      albumData
    } = this.data
    albumData.goodsAddDto = e.detail
    this.setData({
      albumData
    })
    console.log(albumData)
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    // 判断页面状态
    this.setData({
      options
    })
    if (options.openChoose)
      this.chooseImg()
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