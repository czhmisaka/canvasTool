// pages/cus/tabManage/index.js

const app = getApp()
const util = require('../../../utils/util.js')
let pageNum = 0
Page({
  data: {
    tabList: [],
    showToast: false
  },

  // 前往查看标签内的内容
  toTabDetail(e) {
    let {
      id,
      labelName
    } = e.currentTarget.dataset.val
    app.navTo('/pages/cus/cusList/index?id=' + id + '&labelName=' + labelName + '&canAdd=' + (id > 4 ? 'true' : 'false'))
  },

  // 前往新建标签
  toNewTab(e) {
    // app.navTo('/pages/cus/tabDetail/index')
    this.setData({
      showToast: true
    })
  },

  // 获取标签数据
  getTabList(e) {
    util.request({
      url: '/customer/label/list',
      data: {
        id: getApp().globalData.shopInfo.storeVo.id,
        pageNum,
        pageSize: 100
      }
    }).then((res) => {
      if (res.code == 200) {
        this.setData({
          tabList: res.data.data
        })
      } else {
        app.errorTimeOutBack('获取失败')
      }
    })
  },

  // 侧滑点击的触发事件
  slideButtonTap(e) {
    let {
      tabitem
    } = e.currentTarget.dataset
    if (e.detail.index == 0) {
      app.navTo('/pages/cus/tabDetail/index?labelName=' + tabitem.labelName + '&id=' + tabitem.id)
    } else {
      if (tabitem.id == 1 || tabitem.id == 2 || tabitem.id == 3) return app.noIconToast('默认标签无法删除')
      app.showModal('确认删除？').then(back => {
        if (back) {
          wx.showLoading({
            title: '删除中'
          })
          util.request({
            url: '/customer/label/del',
            data: {
              id: tabitem.id
            }
          }).then((res) => {
            if (res.code == 200) {
              let {
                tabList
              } = this.data
              app.noIconToast('删除成功', 'success')
              tabList.forEach((item, index) => {
                if (item.id == tabitem.id) {
                  tabList.splice(index, 1);
                }
              })
              this.setData({
                tabList
              })
            } else {
              app.noIconToast('删除失败')
            }
          })
        }
      })
    }
  },

  // 弹窗回调 函数 处理新建标签（分组）后的数据统一问题
  returnBack(e) {
    this.setData({
      showToast: false
    })
    if (e) {
      let {
        tabList
      } = this.data
      tabList.push(e.detail.data)
      this.setData({
        tabList
      })
    }
  },

  onLoad: function (options) {
    let setPageLife = new getApp().setPageLife()
    wx.setNavigationBarTitle({
      title: '客户分组'
    })
  },
  onReady: function () {},
  onShow: function () {
    this.getTabList()
    this.setData({
      slideButtons: [
        // // 暂时不提供编辑功能
        //   {
        //   text: '编辑',
        //   src: '/static/images/icon_page/ic_xgjg.png', // icon的路径
        // },
        {
          type: 'warn',
          text: '删除',
          src: '/static/images/icon_page/ic_qx.png', // icon的路径
        }
      ],
    });
  },
  onHide: function () {},
  onUnload: function () {},
  onPullDownRefresh: function () {},
  onReachBottom: function () {},
  onShareAppMessage: function () {}
})