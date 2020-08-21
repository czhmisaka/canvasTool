// components/shareToast/shareToast.js
const util = require('../../utils/util.js')
const config = require('../../config/config.js')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    type: {
      type: String,
      value: ''
    },
    dataid: {
      type: String,
    },
    shareDetail: {
      type: Object,
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    painting: {},
    shareImage: '',
    data: {},
    detail: {},
    showTabbar: true,
    cdn: config.config.cdn
  },

  /**
   * 组件的方法列表
   */
  methods: {
    show: function () {
      this.setData({
        show: false,
        painting: {},
        shareImage: '',
        data: {},
        detail: {},
        showTabbar: true
      })
      this.setData({
        show: true
      })
    },

    hide: function () {
      this.setData({
        show: false
      })
      this.triggerEvent('closeShare', {
        back: false
      })
    },

    // 跳转云上新
    toYSXminiProgram: function (e) {
      let that = this
      let id = app.globalData.shopInfo.storeVo.id
      wx.navigateToMiniProgram({
        appId: "wx06a1bdb123d6a27e",
        path: '/pages/storeDetail/storeDetail?id=' + id,
        envVersion: 'trial',
        extraData: {
          id: id,
          type: 'toOther'
        },
        success(res) {}
      })
    },

    // 点击生成海报
    clickToPurduceShareImage: function () {
      this.setData({
        showTabbar: false
      })
      let {
        dataid,
        type
      } = this.properties
      if (dataid && type == "goods") {
        this.getAlbumDetial(dataid).then((url) => {
          this.goodsDetailDraw(app.globalData.shopInfo, url, this.data.detail)
        })
      } else if (dataid && type == "shop") {
        this.getShopInfoDetail(dataid).then((url) => {
          this.shopDetailDraw(app.globalData.shopInfo, url, this.data.detail)
        })
      } else {
        app.errorTimeOutBack('分享失败')
      }
    },

    // 用id 获取商铺详情
    getShopInfoDetail: function (id) {
      return new Promise((resolve, reject) => {
        util.request({
          url: '/store/' + id,
          method: 'get'
        }).then((res) => {
          if (res.code == 200 && res.msg == "请求成功") {
            this.setData({
              detail: res.data
            })
            util.request({
              url: 'store/share',
              data: {
                id
              },
              responseType: 'arraybuffer'
            }).then((result) => {
              wx.hideLoading()
              wx.showLoading({
                title: '获取二维码中'
              })
              this.send_code(result.data).then((src) => {
                resolve(src)
                reject(src)
              })
            })
          }
        })
      })
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

    // 绘制预处理函数 档口详情
    shopDetailDraw(shopInfo, qrCodeImage, shopDetail) {
      wx.hideLoading()
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
            url: shopDetail.storeLogo,
            top: 50,
            left: 140,
            width: 60,
            height: 60
          }, {
            type: 'image',
            url: '/static/images/canvasTool/img_bg.png',
            top: 0,
            left: 0,
            width: 340,
            height: 560
          }, {
            type: 'image',
            url: qrCodeImage,
            top: 215,
            left: 50,
            width: 240,
            height: 240
          }, {
            type: 'text',
            content: "关注我  新品抢先看",
            fontSize: 16,
            color: '#fff',
            textAlign: 'left',
            top: 178,
            left: 170 - 9 * 16 / 2,
            bolder: true
          }, {
            type: 'text',
            content: shopDetail.storeName,
            fontSize: 16,
            color: '#3D3D3D',
            textAlign: 'left',
            top: 130,
            left: 170 - shopDetail.storeName.length * 16 / 2,
            bolder: true
          }, {
            type: 'text',
            content: "长按识别二维码，进店看上新",
            fontSize: 16,
            color: '#3d3d3d',
            textAlign: 'left',
            top: 465,
            left: 170 - 13 * 16 / 2,
            bolder: true
          }, ]
        }
      })
    },

    // 绘制预处理函数 商品详情
    goodsDetailDraw(shopInfo, qrCodeImage, goodDetail) {
      wx.hideLoading()
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
            },
            {
              type: 'image',
              url: shopInfo.storeVo.storeLogo,
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
              url: (goodDetail.photoImage[0] != 'h' ? this.data.cdn : '') + goodDetail.photoImage+'?x-oss-process=image/resize,m_pad,w_640,h_580',
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
              content: goodDetail.goodsPriceVos.length > 0 ? '￥' + goodDetail.goodsPriceVos[0].goodsPrice : '',
              fontSize: 20,
              color: '#F57171',
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
  }
})