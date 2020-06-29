const util = require("../../../../utils/util")

// pages/albumManage/components/albumCard/albumCard.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    data: {
      type: Object,
      value: {},
      observer: function () {
        this.initFn()
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    price: 0,
    photoList: [],
    photoNum: 0,
    publish: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 获取价格
    initFn: function (e) {
      let price = 0,
        photoList = [],
        photoNum = 0
      let {
        data
      } = this.properties
      if (data.photoImage != '') {
        photoList.push(data.photoImage)
        if (data.photoImageMore != '') {
          data.photoImageMore.split(',').forEach((item, index) => {
            if (index < 3 && index != 0)
              photoList.push(item)
          })
          photoNum = data.photoImageMore.split(',').length
        }
      }
      this.setData({
        photoList,
        price,
        photoNum,
        publish: (data.photoShow == 1)
      })
    },
    eventBtn: function (e) {
      let that = this
      let {
        type, // 1 已发布，0未发布
        photoid
      } = e.currentTarget.dataset
      if (type == 1) {
        wx.navigateTo({
          url: '/pages/canvas/index?id='+this.properties.data.id
        });
      } else if (type == 0) {
        util.request({
          url: '/photo/publish',
          data: {
            photoIds: [photoid],
            labelIds: [1]
          }
        }).then((res) => {
          if (res.data) {
            that.setData({
              publish: true
            })
            wx.showToast({
              title: '发布成功',
              icon: 'success',
            });
          }
        })
      }
    }
  }
})