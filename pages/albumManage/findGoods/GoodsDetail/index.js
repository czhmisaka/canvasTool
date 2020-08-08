// pages/albumManage/findGoods/GoodsDetail/index.js
const app = getApp()
const util = require('../../../../utils/util.js');
Page({
  data: {
    goodsId: '',
    goodsDetail: {
      goodsSerial: '',
      goodsClassName: ''
    },
    noChoice: '请选择',
    size: '',
    color: '',
    new: false, // 判断是否为新建货物/如果不是新建话就无法编辑（2020 6 30 记录）
    checkStatus: false, // 自定义组件 显示控制
    checkData: {
      title: '',
      tabList: ['', '']
    }, // 自定义组件 显示数据
    tabCheckList: [], // 属性列表
    classList: []
  },

  // 输入绑定-货号
  inputType(e) {
    let {
      goodsDetail
    } = this.data
    goodsDetail.goodsSerial = e.detail.value
    this.setData({
      goodsDetail
    })
  },

  // id查询商品数据
  getGoodsDetailById(id) {
    return new Promise((resolve, reject) => {
      util.request({
        url: 'photo/goods/getGoodsDetail',
        data: {
          id
        }
      }).then((res) => {
        wx.hideLoading()
        if (res.code === 200) {
          this.goodDetailInitFn(res.data)
          this.setData({
            goodsDetail: res.data
          })
        } else {
          wx.showToast({
            title: res.msg,
            icon: 'none',
          });
        }
      })
    })
  },

  // 处理商品数据
  goodDetailInitFn(data) {
    let {
      goodsSpecVos
    } = data
    let {
      tabCheckList
    } = this.data
    let size = '',
      color = '';
    goodsSpecVos.forEach(res => {
      let {
        goodsSpecAttrVos
      } = res
      goodsSpecAttrVos.forEach(item => {
        tabCheckList.forEach((tab) => {
          if (item.goodsAttrId == tab.id) {
            if (tab.word.split('/').indexOf(item.goodsAttrValueName) == -1) {
              if (tab.word.length != 0) {
                tab.word += '/'
              }
              tab.word += item.goodsAttrValueName
              tab.checkIdList.push(item.goodsAttrValueId)
            }
          }
        })
      })
    })
    this.setData({
      size,
      color,
      tabCheckList
    })
  },

  // 通用跳转
  navTo(e) {
    app.navTo( e.currentTarget.dataset.url);
  },

  // 获取自定义选择用列表
  getCheckList(id = '') {
    wx.showLoading({
      title: id ? '获取商品详情中' : '获取商品模板中'
    })
    let tabCheckList = []
    util.request({
      url: 'photo/goodsAttr',
      data: {
        id: app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      this.getClassList(id, false)
      res.data.forEach((item) => {
        let tabList = []
        item.goodsAttrValueVos.forEach((res) => {
          tabList.push(res)
        })
        tabCheckList.push({
          id: item.id,
          title: item.attrName,
          tabList: tabList,
          word: '',
          checkIdList: []
        })
      })
      this.setData({
        tabCheckList
      })
    })
  },

  // 获取商品品类列表
  getClassList(id = "", type = true) {
    if (type)
      wx.showLoading({
        title: '保存中',
        mask: true
      })
    util.request({
      url: 'photo/goodsClass',
      data: {
        id: app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      if (!id || type)
        wx.hideLoading()
      this.setData({
        classList: res.data
      })
      if (id) {
        this.getGoodsDetailById(id)
      }
    })
  },

  // 获取选择项
  setCheck(e) {
    let {
      check
    } = e.detail
    let {
      tabCheckList,
      goodsDetail
    } = this.data
    if (check.title === "品类") {
      goodsDetail.goodsClassName = check.name[0]
      goodsDetail.goodsClassId = check.id[0]
      this.setData({
        goodsDetail
      })
      this.getClassList()
    } else {
      let idList = []
      tabCheckList.forEach(tab => {
        if (tab.title === check.title) {
          tab.word = ''
          tab.checkIdList = check.id
          check.name.forEach(word => {
            if (tab.word.length != 0) {
              tab.word += '/'
            }
            tab.word += word
          })
          // 新增判断
          tab.tabList.forEach(res => {
            idList.push(res.id)
          })
          check.id.forEach((res, index) => {
            if (idList.indexOf(res) == -1) {
              tab.tabList.push({
                attrValueName: check.name[index],
                id: res,
                storeId: app.globalData.shopInfo.storeVo.id
              })
            }
          })
        }
      })

      this.setData({
        tabCheckList
      })
    }
  },

  // 跳出自定义选择
  checkCancel(e) {
    this.setData({
      checkStatus: false,
      checkData: {
        title: '',
        tabList: [],
      }
    })
    setTimeout(() => {
      this.setData({
        checkStatus: false
      })
    }, 50)
  },

  // 调起自定义选择
  letCusCheck(e) {
    if (!this.data.new) return wx.showToast({
      title: '当前不支持编辑',
      icon: 'none',
    });
    let {
      type
    } = e.currentTarget.dataset
    if (type == '品类') {
      let checkData = {
        tabList: [],
        title: '品类',
        only: true
      }
      this.data.classList.forEach(item => {
        checkData.tabList.push({
          attrValueName: item.goodsClassName,
          id: item.id,
          storeId: item.storeId,
        })
      })
      this.setData({
        checkStatus: true,
        checkData
      })
    } else {
      let checkData = {}
      this.data.tabCheckList.forEach(item => {
        if (item.title == type) {
          checkData = item
        }
      })
      this.setData({
        checkStatus: true,
        checkData
      })
    }
  },

  // 提交关联
  submit(e) {
    let pages = getCurrentPages()
    pages.forEach((item, index) => {
      if (item.route == "pages/albumManage/newAlbum/index") {
        item.setData({
          goodsSerial: this.data.goodsDetail.goodsSerial,
          goodsId: this.data.goodsId
        })
        return wx.showToast({
          title: '关联成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: res => {
            setTimeout(() => {
              wx.navigateBack({
                delta: pages.length - index - 1
              });
            }, 1000)
          }
        });
      } else if (index == pages.length) {
        this.show('关联失败，未找到正在编辑的相册')
      }
    })
  },

  // 新建商品
  createGoods(e) {
    if (!this.data.goodsDetail.goodsSerial) return this.show('货号不能为空')
    if (!this.data.goodsDetail.goodsClassId) return this.show('品类不能为空')
    this.data.tabCheckList.forEach(item => {
      if (!item.word.length) return this.show(item.title + '不能为空')
    })
    let {
      goodsDetail,
      tabCheckList
    } = this.data
    wx.showLoading({
      title: '新建商品中',
      mask: true
    })
    util.request({
      url: 'photo/goods/addGoods',
      data: this.dealDataToGoodsDetail(tabCheckList, goodsDetail)
    }).then((res) => {
      wx.hideLoading()
      if (res.msg != "请求成功") {
        this.show(res.msg)
      } else {
        this.setData({
          goodsId: res.data.id
        })
        this.submit()
      }
    })
  },

  // 通用弹窗
  show(word) {
    wx.showToast({
      title: word,
      icon: 'none',
    });
  },

  // 处理属性到 goodsDetail
  dealDataToGoodsDetail(data, goods) {
    let goodsSpecAddDtos_ready = []
    data.forEach((type) => {
      let goodsSpecAttrAddDtos = []
      type.checkIdList.forEach((item, i) => {
        goodsSpecAttrAddDtos.push({
          goodsAttrId: type.id,
          goodsAttrName: type.title,
          goodsAttrValueId: item,
          goodsAttrValueName: type.word.split('/')[i],
        })
      })
      goodsSpecAddDtos_ready.push(goodsSpecAttrAddDtos)
    })
    let list = util.cartesianProductOf(...goodsSpecAddDtos_ready)
    let back = {
      goodsClassId: goods.goodsClassId,
      goodsClassName: goods.goodsClassName,
      goodsSerial: goods.goodsSerial,
      goodsSpecAddDtos: [],
      storeId: app.globalData.shopInfo.storeVo.id,
      storeName: app.globalData.shopInfo.storeVo.storeNamse
    }
    list.forEach(item => {
      back.goodsSpecAddDtos.push({
        goodsSpecAttrAddDtos: item
      })
    })
    return back
  },


  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    if (options.id) {
      this.setData({
        goodsId: options.id
      })
      this.getCheckList(options.id)
    } else {
      this.setData({
        new: true
      })
      this.getCheckList()
    }
  },
  onReady: function () {},
  onShow: function () {},
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {},
  onReachBottom: function () {}
})