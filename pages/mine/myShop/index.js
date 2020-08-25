// pages/mine/myShop/index.js

const app = getApp()
const util = require('../../../utils/util')
let formatImage = null
const uploadImage = require('../../../utils/js/uploadImg.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '',
    isNew: false,
    shopDetail: {},
    btnState: ['启用', '停用', ''],
    src: '',
    width: 250, //宽度
    height: 250, //高度
    cropperKey: '',
    isNew: true,
    canDelete: true,
    show: false, // 图片裁剪控件
    newCusStep: 0
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

  // 切换页面显示
  changePage(e) {
    this.setData({
      newCusStep: e.currentTarget.dataset.page
    })
  },

  // 修改 - 选择图片
  changeImage: function (e) {
    this.getImage(e).then((res) => {
      wx.hideLoading()
      if (!res) return this.setData({
        show: false
      })
      const tempFilePaths = res.tempFilePaths
      formatImage = this.selectComponent("#image-cropper");
      let width = 0;
      let height = 0
      if (e.currentTarget.dataset.key == 'storeBackground') {
        width = 320
        height = 180
      } else {
        width = 300
        height = 300
      }
      this.setData({
        cropperKey: e.currentTarget.dataset.key,
        src: tempFilePaths[0],
        width,
        height
      });
      wx.showLoading({
        title: '加载中'
      })
    })
  },

  // 检查当前用户的档口是否填写完全
  checkShopInfoInGlobalData(e) {
    let {
      storeVo
    } = getApp().globalData.shopInfo
    let key_checkList = ['storeLogo', 'storeName', 'storeAddress'],
      back = true;
    key_checkList.forEach((item, index) => {
      if (storeVo[item] == '' || storeVo[item] == null || !storeVo[item]) back = false
    })
    return back
  },

  // 加载图片
  loadimage(e) {
    formatImage = this.selectComponent("#image-cropper");
    wx.hideLoading(); //重置图片角度、缩放、位置
    formatImage.imgReset();
  },


  // 点击确认裁剪
  clickForCut(e) {
    formatImage = this.selectComponent("#image-cropper");
    formatImage._click(e, true)
  },

  // 确认后返回
  clickcut(e) {
    let {
      shopDetail
    } = this.data
    wx.showLoading({
      title: '上传中',
      mask: true
    })
    uploadImage(e.detail.url, true, true).then((result) => {
      wx.hideLoading()
      wx.showToast({
        title: '上传成功'
      })
      shopDetail[this.data.cropperKey] = result
      this.setData({
        shopDetail,
        show: false
      })
    })
  },

  // 点击取消裁剪
  closeImageFormat(e) {
    this.setData({
      show: false
    })
  },

  // 获取图片
  getImage(e) {
    return new Promise((reslove, reject) => {
      this.setData({
        show: true
      })
      wx.showLoading({
        title: '加载中'
      })
      wx.chooseImage({
        count: 1,
        success: function (res) {
          setTimeout(() => {
            reslove(res)
          }, 100)
        },
        fail: function (res) {
          reslove(false)
        }
      })
    })
  },

  // 新增一个店铺
  submitAddNewShop(e) {
    let data = this.data.shopDetail
    data.sellerId = this.data.data.shopInfo.id
    util.request({
      url: 'store/addStore',
      data
    }).then((res) => {
      if (res.data) {
        wx.showToast({
          title: '新增成功'
        })
        let page = getCurrentPages()
        let prePage = page[page.length - 2]
        let {
          shopList
        } = prePage.data
        shopList.push(res.data)
        prePage.setData({
          shopList
        })
        app.globalData.shopInfo.storeVo = res.data
        app.setStorage()
        app.successTimeOutBack(res.msg)
      } else {
        wx.showToast({
          title: res.msg,
          icon: 'none'
        })
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
        if (page.length == 1)
          getApp().toHomePage()
        let prePage = page[page.length - 2]
        if (prePage) {
          let {
            shopList
          } = prePage.data
          if (shopList) shopList.forEach((item, index) => {
            if (item.id == this.data.shopDetail.id) {
              shopList[index] = this.data.shopDetail
            }
          })
          prePage.setData({
            shopList
          })
        }
        app.globalData.shopInfo.storeVo = this.data.shopDetail
        app.setStorage()
        app.successTimeOutBack(this.data.canDelete ? res.msg : '准备就绪')
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
        if (this.data.canDelete)
          wx.setNavigationBarTitle({
            title: res.data.storeName
          })
        else
          wx.setNavigationBarTitle({
            title: '填写档口信息'
          })
      } else {
        app.errorTimeOutBack('没找到这个店铺哦')
      }
    })
  },

  nextStep(e) {

  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    if (options.id) {
      this.getDetail(options.id)
      this.setData({
        id: options.id,
        isNew: false
      })
    } else {
      this.setData({
        isNew: true
      })
    }
    if (options.canDelete && options.canDelete == 'false') {
      wx.hideHomeButton()
      this.setData({
        canDelete: false
      })
    }
    this.setData({
      data: app.globalData
    })
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
})