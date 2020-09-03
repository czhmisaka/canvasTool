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
    publish: false,
    isDelete:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 初始化函数
    initFn: function (e) {
      let price = '未设置价格',
        photoList = [],
        photoNum = 0
      let {
        data
      } = this.properties
      if (data.photoImage != '') {
        photoList.push(data.photoImage)
        if (data.photoImageMore != '') {
          data.photoImageMore.split(',').forEach((item, index) => {
            if (index < 3 && index != 0) {
              photoList.push(item)
            }
          })
          photoNum = data.photoImageMore.split(',').length
        }
        photoList.forEach((item, i) => {
          if (item[0] != 'h')
            photoList[i] = getApp().getCdnEnv()+item
        })
      }
      if (data.goodsPriceVos && data.goodsPriceVos.length != 0) {
        let list = data.goodsPriceVos
        list.sort((a, b) => {
          return a.goodsPrice - b.goodsPrice
        })
        price = list[0].goodsPrice
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
      getApp().navTo('/pages/albumManage/newAlbum/index?id=' + this.properties.data.id);
    },

    // 选择函数
    changeCheck: function () {
      this.triggerEvent('changeCheck', {
        type: this.properties.checkindex,
        id: this.properties.id
      })
    },

    // 删除当前相册
    delete(e){
      wx.showLoading({
        title:'删除中',
        mask:true
      })
      util.request({
        url: 'photo/del',
        data: [this.properties.data.id]
      }).then(res => {
        wx.hideLoading()
        if (res.data) return this.setData({
          isDelete:true
        })
      });
    },

    // 按钮事件处理
    eventBtn: function (e) {
      let that = this
      let {
        type, // true 已发布，false未发布
        photoid
      } = e.currentTarget.dataset
      if (type) {
        this.triggerEvent('returnBack', {
          back: {
            id: photoid,
            image: this.properties.data.photoImage,
            title: this.properties.data.photoDesc
          }
        })
      } else {
        this.triggerEvent('returnBack', {
          back: {
            id: photoid,
            type: 'publish'
          }
        })
        // util.request({
        //   url: '/photo/publish',
        //   data: {
        //     photoIds: [photoid],
        //     labelIds: [1]
        //   }
        // }).then((res) => {
        //   if (res.data) {
        //     that.setData({
        //       publish: true
        //     })
        //     wx.showToast({
        //       title: '发布成功',
        //       icon: 'success',
        //     });
        //     this.callBack(true)
        //   } else {
        //     wx.showToast({
        //       title: '发布失败',
        //       icon: 'none'
        //     })
        //   }
        // })
      }
    }
  }
})