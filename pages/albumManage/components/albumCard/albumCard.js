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
    },
    id: Number,
    check: Boolean, // 批量选择
    checkindex: Boolean, // 是否选中
    transitionMax: Number
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

    // 初始化函数
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
        publish: data.photoShow
      })
    },

    // 反馈当前状态
    callBack: function (e) {
      let back = {
        preData: this.properties.data,
        publish: e
      }
      this.triggerEvent("callBack", {
        back
      })
    },

    // 前往详情
    toDetail: function (e) {
      wx.navigateTo({
        url: '/pages/albumManage/newAlbum/index?id=' + this.properties.data.id
      });
    },

    // 选择函数
    changeCheck: function () {
      this.triggerEvent('changeCheck', {
        type: this.properties.checkindex,
        id: this.properties.id
      })
    },

    // 按钮事件处理
    eventBtn: function (e) {
      let that = this
      let {
        type, // true 已发布，false未发布
        photoid
      } = e.currentTarget.dataset
      if (type) {
        wx.navigateTo({
          url: '/pages/canvas/index?id=' + this.properties.data.id
        });
      } else {
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
            this.callBack(true)
          }else{
            wx.showToast({
              title:'发布失败',
              icon:'none'
            })
          }
        })
      }
    }
  }
})