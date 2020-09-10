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
    albumNu: Number
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
      // 直接触发分享事件
      this.clickToPurduceShareImage()
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
      console.log('shopDetail', shopDetail.num, )
      this.setData({
        painting: {
          width: 680,
          height: 970,
          clear: true,
          views: [{
            type: 'roundRect',
            top: 0,
            left: 0,
            width: 680,
            height: 970,
            raidus: 24,
            fillColor: '#fff'
          }, {
            type: 'image',
            url: shopDetail.storeBackground,
            top: 0,
            left: 0,
            width: 680,
            height: 380,
          }, {
            type: 'image',
            url: '/static/images/canvasTool/white.png',
            top: 314,
            left: 254,
            width: 172,
            height: 172,
            borderRadius: 86
          }, {
            type: 'image',
            url: shopDetail.storeLogo,
            top: 320,
            left: 260,
            width: 160,
            height: 160,
            borderRadius: 80
          }, {
            type: 'image',
            url: qrCodeImage,
            top: 803,
            left: 276,
            width: 128,
            height: 128,
            borderRadius: 64
          }, {
            type: 'rect',
            top: 769,
            left: 0,
            width: 680,
            height: 1,
            background: '#e6e6e6'
          }, {
            type: 'rect',
            top: 604,
            left: 339.5,
            width: 1,
            height: 86,
            background: '#e6e6e6'
          }, {
            type: 'text',
            content: shopDetail.storeName,
            fontSize: 40,
            color: '#3D3D3D',
            textAlign: 'left',
            top: 504,
            left: 340 - shopDetail.storeName.length * 40 / 2,
            bolder: true
          }, {
            type: 'text',
            content: '长按小程序码',
            fontSize: 24,
            color: '#999',
            textAlign: 'left',
            top: 853,
            left: 142 - 6 * 24 / 2,
          }, {
            type: 'text',
            content: '查看Ta的档口',
            fontSize: 24,
            color: '#999',
            textAlign: 'left',
            top: 853,
            left: 532 - 6 * 24 / 2,
          }, {
            type: 'text',
            content: '商品总量',
            fontSize: 28,
            color: '#999',
            textAlign: 'left',
            top: 662,
            left: 173,
          }, {
            type: 'text',
            content: '近3天上新',
            fontSize: 28,
            color: '#999',
            textAlign: 'left',
            top: 662,
            left: 396,
          }, {
            type: 'text',
            content: this.properties.albumNu,
            fontSize: 48,
            color: '#3D3D3D',
            textAlign: 'center',
            top: 604,
            left: 241 - ('' + this.properties.albumNu).length * 12,
            bolder: true
          }, {
            type: 'text',
            content: shopDetail.num,
            fontSize: 48,
            color: '#3d3d3d',
            textAlign: 'center',
            top: 604,
            left: 470 - ('' + shopDetail.num).length * 12,
            bolder: true
          }]
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

      goodDetail.photoDesc = (goodDetail.goodsVo ? goodDetail.goodsVo.goodsSerial : '') + '  ' + goodDetail.photoDesc
      this.setData({
        painting: {
          width: 680,
          height: 970,
          clear: true,
          views: [{
              type: 'roundRect',
              top: 0,
              left: 0,
              width: 680,
              height: 970,
              raidus: 24,
              fillColor: '#fff'
            }, {
              type: 'rect',
              top: 769,
              left: 0,
              width: 680,
              height: 1,
              background: '#e6e6e6'
            },
            {
              type: 'image',
              url: shopInfo.storeVo.storeLogo,
              top: 629,
              left: 43,
              width: 74,
              height: 74,
              borderRadius: 37
            },
            {
              type: 'text',
              content: shopInfo.storeVo.storeName,
              fontSize: 32,
              color: '#3D3D3D',
              textAlign: 'left',
              top: 651,
              left: 140,
              bolder: true
            }, {
              type: 'text',
              content: '长按小程序码',
              fontSize: 24,
              color: '#999',
              textAlign: 'left',
              top: 853,
              left: 142 - 6 * 24 / 2,
            }, {
              type: 'text',
              content: '查看商品详情',
              fontSize: 24,
              color: '#999',
              textAlign: 'left',
              top: 853,
              left: 532 - 6 * 24 / 2,
            },
            {
              type: 'image',
              url: (goodDetail.photoImage[0] != 'h' ? this.data.cdn : '') + goodDetail.photoImage + '?x-oss-process=image/crop,g_center,w_600,h_466',
              top: 40,
              left: 40,
              width: 600,
              height: 466
            },
            {
              type: 'image',
              url: qrCodeImage,
              top: 803,
              left: 276,
              width: 128,
              height: 128,
              borderRadius: 64
            },
            {
              type: 'text',
              content: goodDetail.photoDesc,
              fontSize: 32,
              lineHeight: 32,
              color: '#666',
              textAlign: 'left',
              top: 534,
              left: 40 + ((goodDetail.goodsPriceVos[0] ? goodDetail.goodsPriceVos[0].goodsPrice : '') + '').length * 32 + 5,
              width: 680 - (40 + (goodDetail.goodsPriceVos[0] ? goodDetail.goodsPriceVos[0].goodsPrice : '').length * 32 + 5) - 50,
              MaxLineNumber: 1,
              breakWord: true,
              bolder: true
            },
            {
              type: 'text',
              content: goodDetail.goodsPriceVos.length > 0 ? '￥' + goodDetail.goodsPriceVos[0].goodsPrice : '',
              fontSize: 32,
              color: '#F57171',
              textAlign: 'left',
              top: 534,
              left: 40,
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
        wx.previewImage({
          urls: [tempFilePath]
        })
      }
    }
  }
})