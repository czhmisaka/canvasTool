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
    price: ''
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
    getNumber: function () {
      if (this.properties.photo.photoImageMore) {
        let number = this.properties.photo.photoImageMore.split(',')
        this.setData({
          number: number.length
        })
      }
    },
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