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
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
    number: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
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
        url: '/pages/albumManage/newAlbum/index?id='+this.properties.photo.id
      });
    }
  }
})