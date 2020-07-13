// pages/mine/myShop/index.js

const app = getApp()
const util = require('../../../utils/util')
const {
  WxApiRoot
} = require('../../../config/api')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    isNew: false,
    shopDetail: {},
    btnState: ['启用', '停用', '']
  },

  // 绑定输入
  bindInput(e) {
    let {
      shopDetail
    } = this.data
    shopDetail[e.currentTarget.dataset.key] = e.detail.value
    this.setData({
      shopDetail
    });
  },

  // 修改头像 - 选择图片
  changeHeadImage(e) {
    wx.chooseImage({
      count: 1,
      sizeType: ['compressed'],
      success: function (res) {
        const tempFilePaths = res.tempFilePaths
      }
    })
  },

  // 修改店铺详情
  submitShopDetail(e) {
    util.request({
      url: 'store/update',
      data: this.data.shopDetail
    }).then((res) => {
      if (res.data) {
        let page = getCurrentPages()
        let prePage = page[page.length - 2]
        let {
          shopList
        } = prePage.data
        shopList.forEach((item, index) => {
          if (item.id == this.data.shopDetail.id) {
            shopList[index] = this.data.shopDetail
          }
        })
        prePage.setData({
          shopList
        })
        app.successTimeOutBack(res.msg)
      } else {
        wx.showToast({
          title: res.msg
        })
      }
    })
  },

  // 获取档口详情
  getDetail: function (id) {
    util.request({
      url: '/store/' + id,
      method: 'get'
    }).then((res) => {
      if (res.code == 200) {
        this.setData({
          shopDetail: res.data
        })
        wx.setNavigationBarTitle({
          title: res.data.storeName
        })
      } else {
        app.errorTimeOutBack('没找到这个店铺哦')
      }
    })
  },

  onLoad: function (options) {
    if (options.id) {
      this.getDetail(options.id)
      this.setData({
        id: options.id
      })
    } else {
      this.setData({
        isNew: true
      })
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})