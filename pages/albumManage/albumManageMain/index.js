// pages/albumManage/alnumManageMain/index.js
const app = getApp()
const util = require('../../../utils/util.js')
let swiperLock = false
let swiperChangeLock = false
Page({
  // 数据
  data: {
    typeList: [
      '已发布',
      '暂存'
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
    checkMore: [false, false], // 多选开启
    checkData: [], // 自定义 侧滑菜单 选项
    checkStatus: false,
    ShareId: '',
    shareDetail: '',
    searchWord: '',
    searchHistory: [{
      key: '为添加'
    }],
    searchWord_placeholder: '请输入搜索内容',
    requestData: {
      storeId: getApp().globalData.shopInfo ? getApp().globalData.shopInfo.storeVo.id : '',
      pageNum: 1,
      pageSize: 100,
    },
    checkMoreStatus: 0, // 0 混合 ； 1 未发布 ； 2 已发布 ；
    publish: ['', '批量发布', '设置权限'],
    checkDataForShare: {},
    checkStatusForShare: false
  },
  watch: {},


  // 绑定搜索输入
  searchBind(e) {
    this.setData({
      searchWord: e.detail.value
    })
  },

  // 返回
  setCheckForShare(e) {

  },

  // 打开发布选择
  openCheckForShare(e) {
    let dataa = {}
    let {
      selectType,
      checkIndex,
      data
    } = this.data
    let idList = []
    checkIndex[selectType.index].forEach((res, index) => {
      if (res.checkIndex) {
        idList.push(data[selectType.index][index].id)
      }
    })
    this.data.checkData.forEach((res) => {
      if (res.title == "对谁可见") {
        dataa = res
      }
    })
    if (!e.type || e.type != 'publish') {
      this.setData({
        checkDataForShare: {
          title: '对谁可见',
          tabList: dataa.tabList,
          photoIds: idList
        },
        checkStatusForShare: true
      })
    } else {
      this.setData({
        checkDataForShare: {
          title: '对谁可见  ',
          tabList: dataa.tabList,
          photoIds: [e.id]
        },
        checkStatusForShare: true
      })
    }
  },

  // 发布选择 回调
  checkCancelForShare() {
    this.setData({
      checkMore: [false, false, false],
      checkStatusForShare: false,
      data: [
        [],
        [],
        []
      ],
    })
    setTimeout(() => {
      this.getAblum()
      this.setData({
        checkStatusForShare: false
      })
    }, 100)
  },


  // 获取发布回调

  // 开始搜索
  searchStart(e) {
    let that = this
    let {
      searchHistory,
      requestData
    } = that.data
    requestData.photoDesc = that.data.searchWord
    searchHistory.push({
      key: that.data.searchWord
    })
    that.setData({
      data: [
        [],
        [],
        []
      ],
      searchHistory,
      requestData,
      searchWord_placeholder: that.data.searchWord ? that.data.searchWord : '请输入搜索内容',
      searchWord: ''
    })
    setTimeout(() => {
      that.getAblum()
      that.setSearchHistory()
    }, 100)
  },

  // 获取搜索历史记录
  getSearchHistory(e) {
    app.getSearchHistoryStorage('albumHistory').then(res => {
      let searchHistory = res
      if (!res)
        searchHistory = []
      this.setData({
        searchHistory
      })
    })
  },

  // 记录搜索历史记录
  setSearchHistory(e) {
    let {
      searchHistory
    } = this.data
    app.setSearchHistoryStorage('albumHistory', searchHistory)
  },

  // 点击搜索历史记录
  linkSearch(e) {
    let {
      val
    } = e.currentTarget.dataset
    let {
      requestData
    } = this.data
    requestData.photoDesc = val
    this.setData({
      data: [
        [],
        [],
        []
      ],
      requestData,
      searchWord: '',
      searchWord_placeholder: val
    })
    setTimeout(() => {
      this.getAblum()
    }, 100)
  },

  // 清空搜索历史记录
  cleanSearchHistory(e) {
    app.cleanSearchHistoryStorage('albumHistory')
    this.setData({
      searchHistory: []
    })
  },

  // 页面切换 （滑动触发函数）
  swiperChaneg(e) {
    this.switchSubtitle(e.detail.current)
  },

  // 页面切换 （主函数）
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
      console.log(res[0][e].left)
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
    wx.showLoading({
      title: '加载中'
    })
    let that = this
    // let photoShow = that.data.selectType.index != 0 ? that.data.selectType.index - 1 : ''
    let photoShow = that.data.selectType.index != 1 ? 1 : 0
    let requestData = this.data.requestData
    if (!requestData.storeId) {
      try {
        requestData.storeId = getApp().globalData.shopInfo.storeVo.id
      } catch (e) {
        app.noIconToast("系统警告：" + e)
      }
    }
    requestData.photoShow = photoShow
    util.request({
      url: '/photo/list',
      data: requestData
    }).then((res) => {
      res = res.data
      let {
        checkIndex,
        data
      } = that.data
      if (res && res.data) {
        res.data.forEach((item) => {
          data[that.data.selectType.index ? that.data.selectType.index : 0].push(item)
          checkIndex[that.data.selectType.index ? that.data.selectType.index : 0].push({
            checkIndex: false
          })
        })
        that.setData({
          data: data
        })
      }
      swiperLock = false
      wx.hideLoading()
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
    app.navTo(url)
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
    let {
      type
    } = e.detail
    let {
      id
    } = e.currentTarget
    let {
      checkIndex,
      data
    } = this.data
    let status = 0
    let num = 0
    let change = false
    checkIndex[this.data.selectType.index ? this.data.selectType.index : 0][id].checkIndex = !type
    checkIndex[this.data.selectType.index ? this.data.selectType.index : 0].forEach((res, index) => {
      if (res.checkIndex) {
        if (num == 0) {
          num++
          status = data[this.data.selectType.index ? this.data.selectType.index : 0][index].photoShow
        } else if (!change && data[this.data.selectType.index ? this.data.selectType.index : 0][index].photoShow != status) {
          change = true
        }
      }
    })
    this.setData({
      checkIndex,
      checkMoreStatus: num == 0 ? 0 : change ? 0 : status + 1
    })
  },

  // 批量删除
  checkMoreToDelete(e) {
    let that = this
    let {
      selectType,
      checkIndex,
      data
    } = that.data
    let idList = []
    let showStr = ''
    let num = 0
    checkIndex[selectType.index].forEach((res, index) => {
      if (res.checkIndex) {
        idList.push(data[selectType.index][index].id)
        if (num < 2) {
          showStr = showStr + data[selectType.index][index].goodsSerial
        }
        num++
      }
    })

    wx.showModal({
      content: '确定要删除' + showStr + (num > 1 ? '等 ' + num + ' 相册吗' : '吗'),
      success(res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
            mask: true
          })
          util.request({
            url: 'photo/del',
            data: idList
          }).then(res => {
            if (res.data) {
              app.setNeedRefresh('pages/albumManage/albumManageMain/index', {
                refresh: true
              })
              setTimeout(() => {
                wx.hideLoading()
                that.startFn()
              }, 500)
            } else {
              app.noIconToast('删除失败')
              wx.hideLoading()
            }
          })
        }
      }
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
      let checkData = []
      if (res.data) {
        let tab = {
          title: '品类',
          tabList: []
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
          title: "对谁可见",
          tabList: []
        }
        result.data.forEach((item, index) => {
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
    this.setData({
      checkData: e.detail.check
    })
    if (e.detail.start) {
      this.setData({
        data: [
          [],
          [],
          []
        ]
      })
      let {
        requestData
      } = this.data
      requestData.goodsClassIds = []
      requestData.labelIds = []
      e.detail.check.forEach(res => {
        if (res.tabList)
          res.tabList.forEach((item, index) => {
            if (res.title == "品类") {
              if (item.check)
                requestData.goodsClassIds.push(item.id)
            }
            if (res.title == "对谁可见") {
              if (item.check)
                requestData.labelIds.push(item.id)
            }
          })
      })
      this.getAblum()
    }
  },

  // 关闭筛选
  checkCancel(e) {
    this.setData({
      checkStatus: false
    })
  },

  // 打开筛选
  checkOpen(e) {
    this.setData({
      checkStatus: true
    })
  },

  // 分享
  returnBack(e) {
    if (e.detail.back.type == 'publish') {
      return this.openCheckForShare(e.detail.back)
    }
    this.setData({
      ShareId: e.detail.back.id,
      shareDetail: e.detail.back
    })
    this.selectComponent('#share').show()
  },

  // 获取组件的返回函数
  callBack(e) {
    let {
      preData,
      publish
    } = e.detail.back
    let {
      data
    } = this.data
    // 留个坑 待优化
    data.forEach((tab, index) => {
      tab.forEach((item, i) => {
        if (item.id === preData.id) {
          item.photoShow = publish
          if (index == 1 && index == 0) {
            if (index == 1)
              data[index].splice(i, 1)
            if (data[2].length != 0) {
              let canInsert = true
              data[2].forEach(insert => {
                if (insert.id == preData.id)
                  canInsert = false
              })
              if (canInsert)
                data[2].unshift(preData)
            }
          }
        }
      })
    })
    this.setData({
      data
    })
  },

  // 按时间排序 留个坑 可以优化
  sortDataByTime(e) {
    let {
      data
    } = this.data
    data.forEach(tab => {
      tab.sort((a, b) => {
        let TimeA = new Date(a.createTime),
          TimeB = new Date(b.createTime);
        return TimeB - TimeA
      })
    })
    this.setData({
      data
    })
  },

  // 初始化函数
  initFn() {
    this.switchSubtitle(0)
  },

  // 页面重载函数 - 本来是应该在onshow里直接编写的，但是目前为了简便化刷新操作，故先拆分
  startFn() {
    app.checkNeedRefresh().then(res => {
      console.log(res)
      if (res.refresh) {
        this.setData({
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
        })
        this.initFn()
        this.getAblum()
        this.getCheckList()
      } else {
        this.setData({
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
        })
        this.initFn()
        this.getAblum()
        // 权宜之计
        this.getCheckList()
      }
    })
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
  },

  onReady: function () {},
  onShow: function () {
    this.startFn()
    this.getSearchHistory()
  },
  onHide: function () {
    this.setSearchHistory()
  },
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function (e) {
    if (e.target && e.target.dataset.type == "goods") {
      let {
        sharedetail
      } = e.target.dataset
      return {
        title: sharedetail.title,
        imageUrl: sharedetail.image,
        path: 'pages/albumManage/newAlbum/index?id' + sharedetail.id
      }
    }

  },
  onReachBottom: function () {}
})