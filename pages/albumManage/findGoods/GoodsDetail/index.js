// pages/albumManage/findGoods/GoodsDetail/index.js
const app = getApp()
const util = require('../../../../utils/util.js');
Page({
  data: {
    goodsId: '',
    goodsDetail: {},
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
  },

  // 输入绑定-货号
  inputType(e) {
    if (!this.data.new) {
      let {
        goodsDetail
      } = this.data
      goodsDetail.goodsSerial = e.currentTarget.value
      this.setData({
        goodsDetail
      })
    } else {
      let {
        goodsDetail
      } = this.data
      this.setData({
        goodsDetail
      })
    }
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
        tabCheckList.forEach((tab, index) => {
          if (item.goodsAttrId == tab.id) {
            if (tabCheckList[index].word.split('/').indexOf(item.goodsAttrValueName)) {
              if (tabCheckList[index].word.length != 0) {
                tabCheckList[index].word += '/'
              }
              tab.word += item.goodsAttrValueName
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
    wx.navigateTo({
      url: e.currentTarget.dataset.url
    });
  },

  // 获取自定义选择用列表
  getCheckList(id = '') {
    let tabCheckList = []
    util.request({
      url: 'photo/goodsAttr',
      data: {
        id: app.globalData.shopInfo.storeVo.id
      }
    }).then((res) => {
      res.data.forEach((item) => {
        let tabList = []
        item.goodsAttrValueVos.forEach((res) => {
          tabList.push(res)
        })
        tabCheckList.push({
          id: item.id,
          title: item.attrName,
          tabList: tabList,
          word: ''
        })
      })
      this.setData({
        tabCheckList
      })
      if (id) {
        this.getGoodsDetailById(id)
      }
    })
  },

  // 获取选择项
  setCheck(e) {
    console.log(e)
  },

  // 跳出自定义选择
  checkCancel(e) {
    this.setData({
      checkStatus: false,
      checkData: {
        title: '',
        tabList: []
      }
    })
  },

  // 调起自定义选择
  letCusCheck(e) {
    if (!this.data.new) return wx.showToast({
      title: '请在pc端页面编辑',
      icon: 'none',
    });
    let {
      type
    } = e.currentTarget.dataset
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
  },

  // 提交关联
  submit(e) {
    let pages = getCurrentPages()
    pages.forEach((item, index) => {
      if (item.route == "pages/albumManage/newAlbum/index") {
        item.setData({
          goodsSerial: this.data.goodsDetail.goodsSerial
        })
        wx.showToast({
          title: '关联成功',
          icon: 'success',
          duration: 1000,
          mask: true,
          success: res => {
            wx.navigateBack({
              delta: pages.length - index - 1
            });
          }
        });
      }
    })
  },

  onLoad: function (options) {
    if (options.id) {
      this.setData({
        goodsId: options.id
      })
      this.getCheckList(options.id)
    } else {
      this.setData({
        new: true
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
  onReachBottom: function () {}
})