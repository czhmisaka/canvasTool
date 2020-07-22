// components/photoFall/photoBox/photoBox.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: Number,
    photo: {
      value: {},
      type: Object,
      observer: function () {
        this.getNumber()
        this.setPrice()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    number: 0,
    price: '',
    whatever: false
  },

  /**
   * 组件的方法列表
   */
  methods: {

    // 前往分享 已废弃
    toShare: function (e) {
      wx.navigateTo({
        url: '/pages/canvas/index?type=goods&id=' + this.data.photo.id
      })
    },

    // 调起通用分享接口
    share(e) {
      this.triggerEvent('returnBack', {
        back: {
          id: this.properties.photo.id,
          image: this.properties.photo.photoImage,
          title: this.properties.photo.photoDesc
        }
      })
    },

    // 设置价格
    setPrice: function () {
      let {
        goodsPriceVos
      } = this.properties.photo
      if (goodsPriceVos) {
        goodsPriceVos = goodsPriceVos.sort((a, b) => {
          return a.goodsPrice - b.goodsPrice
        })
      }
      if (goodsPriceVos[0]) return this.setData({
        price: '￥' + goodsPriceVos[0].goodsPrice
      })
    },

    // 获取图片数据
    getNumber: function () {
      if (this.properties.photo.photoImageMore) {
        let number = this.properties.photo.photoImageMore.split(',')
        this.setData({
          number: number.length
        })
      }
    },

    // 顺序加载
    loadOver: function (e) {
      let that = this
      setTimeout(() => {
        that.setData({
          show: true
        })
      }, this.properties.index * 100)
    },
    toDetail: function (e) {
      wx.navigateTo({
        url: '/pages/albumManage/newAlbum/index?id=' + this.properties.photo.id
      });
    }
  }
})