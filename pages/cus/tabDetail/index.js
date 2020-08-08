// pages/cus/tabDetail/index.js
const app = getApp()
const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    value: '',
    options: {}
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
        app.noIconToast('创建成功', "success")
        let page = getCurrentPages()
        let prePage = page[page.length - 2]
        let {
          tabList
        } = prePage.data
        let lock = false
        tabList.forEach((item, index) => {
          if (item.id == res.data.id) {
            tabList[index] == res.data
            lock = true
          }
        });
        if (!lock) {
          tabList.push(res.data)
        }
        prePage.setData({
          tabList
        })
        wx.navigateBack()
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