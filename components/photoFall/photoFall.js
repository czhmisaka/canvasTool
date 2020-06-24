const utils = require('../../utils/util.js')
// components/photoFall/photoFall.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      value: '',
      type: String,
      observer: function () {
        this.getPhotoList()
      }
    }
  },


  /**
   * 组件的初始数据
   */
  data: {
    leftLine: [],
    rightLine: []
  },

  /**
   * 组件的方法列表
   */
  methods: {
    getPhotoList: function () {
      if (this.properties.storeId) {
        utils.request({
          url: '/photo/list',
          data: {
            storeId: this.properties.storeId
          }
        }).then((res) => {
          this.calcHeight(res.data.data)
        })
      }
    },
    calcHeight: function (data) {
      this.setData({
        line:data
      })
    }
  }
})