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
    constData: {},
    btnState: ['启用', '停用', ''],
    src: '',
    width: 250, //宽度
    height: 250, //高度
    cropperKey: '',
    isNew: true,
    canDelete: true,
    show: false, // 图片裁剪控件
    newCusStep: 0,
    marketList: [
      [],
      []
    ],
    marketIndex: [-1, -1],
    marketData: [],
    isChange: false, // 修改后才会出现 保存按钮
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
    setTimeout(() => {
      this.checkChange()
    }, 100)
  },

  // 对比数据变更
  checkChange(e) {
    let {
      constData,
      shopDetail
    } = this.data
    let res = getApp().Compare(JSON.parse(constData), shopDetail)
    this.setData({
      isChange: !res
    })
  },

  // 切换页面显示
  changePage(e) {
    this.setData({
      newCusStep: e.currentTarget.dataset.page
    })
    switch (e.currentTarget.dataset.page) {
      case '0':
        wx.setNavigationBarTitle({
          title: '填写档口信息'
        })
        break;
      case '1':
        wx.setNavigationBarTitle({
          title: '添加联系方式'
        })
        break;
    }
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
      setTimeout(() => {
        this.checkChange()
      }, 100)
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

  // 检查档口必填数据 是否完成
  checkShopInfoInGlobalData(e) {
    let
      storeVo = this.data.shopDetail
    let key_checkList = ['storeLogo', 'storeName', 'storeAddress'],
      back = true;
    key_checkList.forEach((item, index) => {
      if (storeVo[item] == '' || storeVo[item] == null || !storeVo[item]) back = false
    })
    return back
  },

  // 修改店铺详情
  submitShopDetail(e) {
    if (this.checkShopInfoInGlobalData())
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
    else
      app.noIconToast('请至少填写档口名称，头像和所在市场')
  },

  // 获取档口详情
  getDetail: function (id) {
    util.request({
      url: '/store/' + id,
      method: 'get'
    }).then((res) => {
      if (res.code == 200) {
        this.setData({
          shopDetail: res.data,
          constData: JSON.stringify(res.data)
        })
        if (res.data.marketName && this.data.marketList[1].length != 0) {
          let __mName = res.data.marketName,
            marketIndex = [0, 0],
            marketList = this.data.marketList
          this.data.marketList[0].forEach((item, index) => {
            if (item == __mName.split('-')[0]) {
              marketIndex[0] = index
            }
          })
          marketList[1] = []
          this.data.marketData.forEach(item => {
            if (item.cityName == marketList[0][marketIndex[0]]) {
              marketList[1].push(item.marketName)
            }
          })
          this.data.marketList[1].forEach((item, index) => {
            if (item == __mName.split('-')[1]) {
              marketIndex[1] = index
            }
          })
          this.setData({
            marketIndex,
            marketList
          })
        }
        if (this.data.canDelete)
          wx.setNavigationBarTitle({
            title: res.data.storeName
          })
        else
          wx.setNavigationBarTitle({
            title: '填写档口信息'
          })
      } else {
        app.errorTimeOutBack(res.msg[0] != 'c' ? res.msg : '没找到这个店铺哦')
      }
    })
  },

  // 获取所有市场信息
  getAllMarketDetail(e) {
    wx.showLoading({
      title: '信息加载中',
      mask: true
    })
    util.request({
      url: '/store/getStoreMarketList',
      type:'noLogin'
    }).then(res => {
      wx.hideLoading()
      if (res.code != '200') return getApp().noIconToast(res.msg)
      let marketList = [
        [],
        []
      ]
      res.data.forEach(item => {
        if (marketList[0].indexOf(item.cityName) == -1) {
          marketList[0].push(item.cityName)
        }
        if (marketList[0].indexOf(item.cityName) == 0) {
          marketList[1].push(item.marketName)
        }
      })
      if (this.data.shopDetail.marketName && marketList[1].length != 0) {
        let __mName = this.data.shopDetail.marketName,
          marketIndex = [0, 0]
        marketList[0].forEach((item, index) => {
          if (item == __mName.split('-')[0]) {
            marketIndex[0] = index
          }
        })
        marketList[1] = []
        res.data.forEach(item => {
          if (item.cityName == marketList[0][marketIndex[0]])
            marketList[1].push(item.marketName)
        })
        marketList[1].forEach((item, index) => {
          if (item == __mName.split('-')[1]) {
            marketIndex[1] = index
          }
        })
        this.setData({
          marketIndex
        })
      }
      this.setData({
        marketData: res.data,
        marketList
      })
    })
  },

  // 绑定滚轮选择事件 -- 显示选择的值
  bindMarketPickerChange(e) {
    let {
      shopDetail
    } = this.data
    shopDetail.marketName = this.data.marketList[0][e.detail.value[0]] + '-' + this.data.marketList[1][e.detail.value[1]]
    this.data.marketData.forEach((item) => {
      if (item.marketName == this.data.marketList[1][e.detail.value[1]] && item.cityName == this.data.marketList[0][e.detail.value[0]]) {
        shopDetail.marketId = item.id
      }
    })
    this.setData({
      shopDetail
    })
    setTimeout(() => {
      this.checkChange()
    }, 100)
  },

  // 绑定滚轮选择事件 -- 绑定滚轮变化
  bindMarketPickerColumnChange(e) {
    let {
      marketList,
      marketIndex
    } = this.data
    let column = 0,
      value = 0;
    if (e.detail) {
      let {
        column,
        value
      } = e.detail
      marketIndex[column] = value
    } else {
      marketIndex = [0, 0]
    }
    if (column == 0) {
      marketList[1] = []
      this.data.marketData.forEach(item => {
        if (marketList[0][marketIndex[0]].indexOf(item.cityName) == 0) {
          marketList[1].push(item.marketName)
        }
      })
      this.setData({
        marketList,
        marketIndex
      })
    } else {
      this.setData({
        marketIndex
      })
    }
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    this.getAllMarketDetail()
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