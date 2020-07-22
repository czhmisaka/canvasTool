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
    ShareId: '',
    shareDetail: '',
    searchWord: ''
  },
  watch: {},


  // 绑定搜索输入
  searchBind(e) {
    this.setData({
      searchWord: e.detail.value
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
          console.log(showStr, data[selectType.index][index])
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
      // 触发搜索函数
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
        this.initFn()
        this.getCheckList()
      }
    })
  },

  onLoad: function (options) {},

  onReady: function () {},
  onShow: function () {
    this.startFn()
  },
  onHide: function () {},
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