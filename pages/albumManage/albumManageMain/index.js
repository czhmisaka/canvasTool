// pages/albumManage/alnumManageMain/index.js
const app = getApp()
const util = require('../../../utils/util.js')
let swiperLock = false
let swiperChangeLock = false
Page({

  // 数据
  data: {
    typeList: [
      '全部',
      '未发布',
      '已发布'
    ],
    selectType: 0,
    orderList: [],
    data: [
      [],
      [],
      []
    ], // 数据保存表
    checkIndex: [
      [],
      [],
      []
    ], // 记录选择用表
    checkMore: [false, false, false], // 多选开启
    checkData: [], // 自定义 侧滑菜单 选项
    checkStatus: false,
  },
  watch: {},

  // 页面切换
  swiperChaneg(e) {
    this.switchSubtitle(e.detail.current)
  },
  // 页面切换
  switchSubtitle(e) {
    var that = this
    if (e.currentTarget) {
      e = e.currentTarget.dataset.index
    }
    if (e === that.data.selectType.index) return
    this.offCheck()
    let node = wx.createSelectorQuery()
    node.selectAll('.type').boundingClientRect()
    node.exec((res) => {
      let selectType = {
        index: e,
        len: that.data.typeList[e].length,
        left: res[0][e].left
      }
      this.setData({
        selectType: selectType
      })
      setTimeout(() => {
        if (that.data.data[e].length == 0) {
          that.getAblum()
        }
      }, 10)
    })
  },

  // 获取相册
  getAblum(e) {
    if (swiperLock) return
    swiperLock = true
    let that = this
    let photoShow = that.data.selectType.index != 0 ? that.data.selectType.index - 1 : ''
    util.request({
      url: '/photo/list',
      data: {
        storeId: app.globalData.shopInfo.storeVo.id,
        pageNum: 1,
        pageSize: 100,
        photoShow
      }
    }).then((res) => {
      res = res.data
      let {
        checkIndex,
        data
      } = that.data
      res.data.forEach((item) => {
        data[that.data.selectType.index ? that.data.selectType.index : 0].push(item)
        checkIndex[that.data.selectType.index ? that.data.selectType.index : 0].push({
          checkIndex: false
        })
      })
      that.setData({
        data: data
      })
      swiperLock = false
    })
  },

  //简化跳转逻辑
  navTo(e) {
    let {
      url,
      query
    } = e.currentTarget.dataset
    if (query) {
      url = url + query
    }
    wx.navigateTo({
      url: url
    });
  },

  // 批量选择 -状态切换
  checkMoreStatusChange() {
    let {
      checkMore
    } = this.data
    checkMore[this.data.selectType.index] = !checkMore[this.data.selectType.index]
    this.setData({
      checkMore
    })
  },

  // 批量选择 -选中某个元素
  changeCheck(e) {
    console.log(e)
    let {
      type
    } = e.detail
    let {
      id
    } = e.currentTarget
    let {
      checkIndex
    } = this.data
    checkIndex[this.data.selectType.index ? this.data.selectType.index : 0][id].checkIndex = !type
    this.setData({
      checkIndex
    })
  },

  // 关闭批量选择
  offCheck(e) {
    let {
      checkIndex
    } = this.data
    checkIndex.forEach(res => {
      res.forEach(item => {
        item.checkIndex = false
      })
    })
    this.setData({
      checkMore: [false, false, false],
      checkIndex
    })
  },

  // 获取选择项 - 商品品类以及 相册标签
  getCheckList(e) {
    util.request({
      url: 'photo/goodsClass',
      data: {
        id: app.globalData.shopInfo.storeVo.id
      }
    }).then(res => {
      let {
        checkData
      } = this.data
      if (res.data) {
        let tab = {
          title:'品类',
          tabList:[]
        }
        res.data.forEach((item, index) => {
          tab.tabList.push({
            tab: item.goodsClassName,
            check: false,
            id: item.id
          })
        })
        checkData.push(tab)
      }
      util.request({
        url: '/customer/label/allList',
        data: { 
          id: app.globalData.shopInfo.storeVo.id
        }
      }).then(result => {
        let tab = {
          title:"对谁可见",
          tabList:[]
        }
        result.data.data.forEach((item, index) => {
          tab.tabList.push({
            tab: item.labelName,
            id: item.id,
            check: false
          })
        })
        checkData.push(tab)
        this.setData({
          checkData,
        })
      })
    })
  },

  // 处理筛选后返回数据
  checkReturn(e) {
  // console.log(e.detail.check,e.detail.chec==checkData)
    this.setData({
      checkData:e.detail.check
    })
    if(e.detail.start){
      // 触发搜索函数
    }
  },

  // 关闭筛选
  checkCancel(e) {
    this.setData({
      checkStatus:false
    })
  },

  // 打开筛选
  checkOpen(e) {
    this.setData({
      checkStatus:true
    })
  },

  // 初始化函数
  initFn() {
    this.switchSubtitle(0)
  },


  onLoad: function (options) {
    this.initFn()
    this.getCheckList()
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