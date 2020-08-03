const utils = require('../../utils/util.js')
const app = getApp()
// components/photoFall/photoFall.js
let index = 0
let page = 1
let open = true
let finish = true
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    storeId: {
      value: '',
      type: String,
      observer: function () {
        var that = this
        that.refresh()
      }
    }
  },

  lifetimes: {
    attached: function () {},
    detached: function () {},
  },
  /**
   * 组件的初始数据
   */
  data: {
    leftLine: [],
    rightLine: [],
    line: [],
    data: [],
    shareId: '' // 分享用的哈
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 刷新
    refresh: function () {
      this.setData({
        leftLine: [],
        rightLine: [],
        line: [],
        data: [],
      })
      index = 0
      page = 1
      open = true
      finish = true
      this.getPhotoList()
    },
    // 去添加新相册
    toAdd: function () {
      if (!app.globalData.isLogin) return utils.toLogin()
      wx.navigateTo({
        url: '/pages/albumManage/newAlbum/index'
      });
    },

    // 分享用 回调函数
    returnBack: function (e) {
      this.triggerEvent('returnBack', {
        back: e.detail.back
      })
    },
    // 下拉加载预置
    getMore: function () {
      if (!finish) return wx.showToast({
        title: '再滑也没有啦！',
        icon: 'none',
        duration: 2000,
        mask: true,
      });
      this.getPhotoList(page)
    },
    // 数据获取
    getPhotoList: function (num) {
      if (!open) return;
      if (!finish) return;
      if (this.properties.storeId) {
        open = false
        utils.request({
          url: '/photo/list',
          data: {
            storeId: this.properties.storeId,
            pageNum: num,
            pageSize: 6
          }
        }).then((res) => {
          if (res.data.pages === page)
            finish = false
          page++
          let {
            data
          } = this.data
          res.data.data.forEach(item => {
            data.push(item)
          })
          this.setData({
            data: data
          })
          this.compareAndFix()
        })
      }
    },
    // 比对左右高度并填充数据
    compareAndFix: function (e) {
      var that = this
      let {
        data,
        leftLine,
        rightLine
      } = that.data
      if (data.length <= index) return open = true;
      var query = that.createSelectorQuery();
      query.select('#l').boundingClientRect()
      query.select('#r').boundingClientRect()
      query.exec(function (res) {
        if (res[0].height < res[1].height) {
          leftLine.push(data[index])
        } else {
          rightLine.push(data[index])
        }
        index++;
        that.setData({
          leftLine,
          rightLine
        })
        setTimeout(() => {
          that.compareAndFix()
        }, 100)
      })
    }
  }
})