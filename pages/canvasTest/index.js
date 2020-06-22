//index.js

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
    }
  },
  onLoad() {
    this.eventDraw()
  },
  eventDraw() {
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
            url: '/static/images/ShareBg1.png',
            top: 0,
            left: 0,
            width: 340,
            height: 560
          }, {
            type: 'image',
            url: this.data.data.avatarUrl,
            top: 20,
            left: 20,
            width: 50,
            height: 50
          },
          {
            type: 'image', // 这个用来当遮罩层
            url: '/static/images/avatarBg.png',
            top: 20,
            left: 20,
            width: 50,
            height: 50
          },
          {
            type: 'text',
            content: this.data.data.nickName,
            fontSize: 16,
            color: '#402D16',
            textAlign: 'left',
            top: 37,
            left: 90,
            bolder: true
          },
          {
            type: 'image',
            url: this.data.data.mainImg,
            top: 90,
            left: 20,
            width: 300,
            height: 320
          },
          {
            type: 'image',
            url: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=810988444,1648289218&fm=11&gp=0.jpg',
            top:415,
            left: 240,
            width: 80,
            height: 80
          },
          {
            type: 'text',
            content: this.data.data.context,
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
            content: this.data.data.price,
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
  eventSave() {
    console.log(this.data.shareImage)
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
  eventGetImage(event) {
    console.log(event)
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