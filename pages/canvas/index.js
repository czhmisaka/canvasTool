// /pages/canvas/index
const util = require('../../utils/util.js')
const app = getApp()
Page({
  data: {
    painting: {},
    shareImage: '',
    data: {
      avatarUrl: '/static/images/canvasTool/bg.png',
      nickName: '胡一天的店铺',
      mainImg: '/static/images/canvasTool/bg.png',
      price: '￥200',
      context: '#248768上衣白色夏季新品及时抢购',
      qrCodeImg: '/static/images/canvasTool/bg.png',
      qrCodeSub: '长按识别二维码'
    },
    detail: {}
  },

  onShareAppMessage: function () {
    return {
      title: this.data.data.context,
      path: '/pages/orderManage/orderDetail/orderDetail?id=' + this.data.detail.id,
      imageUrl: this.data.shareImage
    }
  },
  // 目前也不支持
  // onShareTimeline: function () {
  //   return {
  //     title: this.data.data.context,
  //     path: '/pages/orderManage/orderDetail/orderDetail?id=' + this.data.detail.id,
  //     imageUrl: this.data.shareImage
  //   }
  // },
  onLoad(options) {
    if (options.id && options.type == "goods") {
      this.getAlbumDetial(options.id).then((url) => {
        this.goodsDetailDraw(app.globalData.shopInfo, url, this.data.detail)
      })
    } else if (options.id && options.type == "shop") {
      this.getShopInfoDetail()
    } else {
      app.errorTimeOutBack('分享失败')
    }

  },

  // 用id 获商品数据 留个坑等待优化
  getAlbumDetial: function (id) {
    let that = this
    wx.showLoading({
      title: '获取相册详情中'
    })
    return new Promise((resolve, reject) => {
      util.request({
        url: '/photo/' + id,
        method: 'get'
      }).then((res) => {
        if (res.data.photoImage) {
          that.setData({
            detail: res.data
          })
          wx.hideLoading()
          wx.showLoading({
            title: '获取二维码中'
          })
          util.request({
            url: 'photo/share',
            data: {
              id: id
            },
            responseType: 'arraybuffer'
          }).then((result) => {
            that.send_code(result.data).then((src) => {
              resolve(src)
            })
          })
        } else {
          app.errorTimeOutBack('获取相册失败。')
        }
      })
    })
  },

  // 保存 base64
  send_code(code) {
    return new Promise((reslove, reject) => {
      const fs = wx.getFileSystemManager();
      var times = new Date().getTime();
      var codeimg = wx.env.USER_DATA_PATH + '/' + times + '.png';
      fs.writeFile({
        filePath: codeimg,
        data: code,
        encoding: 'base64',
        success: (e) => {
          reslove(codeimg)
          reject(codeimg)
          this.setData({
            codeimg
          })
        },
        fail: (e) => {}
      });
    })
  },

  // 渲染完成后删除 本地缓存
  finish(e) {
    const fs = wx.getFileSystemManager();
    fs.unlink({
      filePath: this.data.codeimg,
      complete: (e) => {}
    })
  },

  // 绘制预处理函数 商品详情
  goodsDetailDraw(shopInfo, qrCodeImage, goodDetail) {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    this.setData({
      painting: {
        width: 340,
        height: 560,
        clear: true,
        views: [{
            type: 'image',
            url: '/static/images/canvasTool/ShareBg1.png',
            top: 0,
            left: 0,
            width: 340,
            height: 560
          }, {
            type: 'image',
            // url: shopInfo.storeVo.storeLogo,
            url: qrCodeImage,
            top: 20,
            left: 20,
            width: 50,
            height: 50
          },
          {
            type: 'image', // 这个用来当遮罩层
            url: '/static/images/canvasTool/avatarBg.png',
            top: 20,
            left: 20,
            width: 50,
            height: 50
          },
          {
            type: 'text',
            content: shopInfo.storeVo.storeName,
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 37,
            left: 90,
            bolder: true
          },
          {
            type: 'image',
            url: goodDetail.photoImage,
            top: 90,
            left: 20,
            width: 300,
            height: 320
          },
          {
            type: 'image',
            url: '/static/images/canvasTool/avatarBg.png',
            top: 415,
            left: 240,
            width: 80,
            height: 80
          },
          {
            type: 'image',
            url: qrCodeImage,
            top: 415,
            left: 240,
            width: 80,
            height: 78
          },
          {
            type: 'text',
            content: goodDetail.photoDesc,
            fontSize: 14,
            lineHeight: 22,
            color: '#666',
            textAlign: 'left',
            top: 450,
            left: 20,
            width: 180,
            MaxLineNumber: 3,
            breakWord: true,
            bolder: true
          },
          {
            type: 'text',
            content: goodDetail.goodsPriceVos.length > 0 ? '￥' + goodDetail.goodsPriceVos[0].goodsPrice : '暂无',
            fontSize: 20,
            color: '#EE4866',
            textAlign: 'left',
            top: 420,
            left: 20,
            bolder: true
          },
          {
            type: 'text',
            content: this.data.data.qrCodeSub,
            fontSize: 12,
            color: '#999',
            textAlign: 'left',
            top: 500,
            left: 235,
            lineHeight: 20,
            MaxLineNumber: 2,
            breakWord: true,
            width: 125
          }
        ]
      }
    })
  },

  // 绘制预处理函数 店铺分享
  shopDetailDraw() {
    wx.showLoading({
      title: '绘制分享图片中',
      mask: true
    })
    this.setData({
      painting:{
        
      }
    })
  },

  // 保存函数
  eventSave(e) {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.shareImage,
      success(res) {
        wx.showToast({
          title: '保存图片成功',
          icon: 'success',
          duration: 2000
        })
      }
    })
  },

  // 获取图片资源
  eventGetImage(event) {
    wx.hideLoading()
    const {
      tempFilePath,
      errMsg
    } = event.detail
    if (errMsg === 'canvasdrawer:ok') {
      this.setData({
        shareImage: tempFilePath
      })
    }
  }
})