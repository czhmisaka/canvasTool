// pages/cus/tabDetail/index.js
const app = getApp()
const util = require('../../../utils/util.js')
Component({
  propertise: {
    options: Object,
  },
  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    options: {}
  },

  methods: {
    // 退出创建标签
    back(e) {
      if (e.currentTarget && e.currentTarget.dataset.check) {
        this.triggerEvent('returnBack', {
          data: false
        })
      } else {
        this.triggerEvent('returnBack', {
          data: e
        })
      }
    },

    // 新建标签 并跳转 
    createTabAndNavToNext(e) {
      let data = {
        labelName: this.data.value,
        storeId: getApp().globalData.shopInfo.storeVo.id
      }
      if (this.data.options.id) data.id = this.data.options.id
      util.request({
        url: '/customer/label/add',
        data
      }).then((res) => {
        if (res.code == 200) {
          this.back(res.data)
          app.noIconToast('创建成功', "success")
        } else {
          app.errorTimeOutBack('创建失败')
        }
      })
    },
    // 绑定输入
    bindInput(e) {
      this.setData({
        value: e.detail.value
      })
    },
  },
  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.setData({
      options
    })
    if (options.labelName) {
      this.setData({
        value: options.labelName
      })
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})